import SvgSelector from '@/components/SvgSelector'
import { setLayerGroups, setSettingsMesh } from '@/store/slices/meshSlice'
import { setSelectedParts } from '@/store/slices/projectSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../ui-kit/Input'
import { resetSetting } from '@/store/slices/settingSlice'
import Toogle from '../ui-kit/Toogle'
import Select from '../ui-kit/Select'
import setMeshData from '@/api/set_mesh_data'

export default function LayerForm() {
    const dispatch = useDispatch()
    const projectId = useSelector(state => state.project.projectId)
    const selectedParts = useSelector(state => state.project.selectedParts) ?? []
    const geoms = useSelector(state => state.project.geometries) ?? []
    const settingsMesh = useSelector(state => state.mesh.settings) ?? {}
    const formTitle = useSelector(state => state.setting.formTitle)
    const boundaryLayers = useSelector(state => state.mesh.layerGroups) ?? []
    const currentForm = useSelector(state => state.setting.formName)
    const [params, setParams] = useState(null)

    // const thickness = {
    //     FirstLayerThickness: "First layer thickness",
    //     FinalLayerThickness: "Final layer thickness",
    //     Thickness: "Thickness",
    // }

    useEffect(() => {
        boundaryLayers.forEach((item) => {
            if (`Layer ${item.GroupName}` === formTitle) {
                setParams(item)
                dispatch(setSelectedParts(item.faces))
            }
        })
    }, [])

    useEffect(() => {
        setParams(prev => ({ ...prev, faces: selectedParts }))
    }, [selectedParts])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        handleParamsChange()
        dispatch(resetSetting())
    }

    const handleParamsChange = async () => {
        const uidArray = params.faces.map(item => item.uid)
        if (uidArray.length) {
            const newData = settingsMesh.StlGeomertrys.map(({ Regions, ...other }) => ({
                ...other,
                Regions: Regions.map(({ uid, ...other }) => {
                    if (uidArray.includes(uid)) {
                        return {
                            ...other,
                            uid,
                            GroupName: params.GroupName,
                            BoundaryLayer: {
                                NSurfaceLayers: params.NSurfaceLayers,
                                ExpansionRatio: params.ExpansionRatio,
                                FirstLayerThickness: params.FirstLayerThickness,
                            },
                            RefinementSettings: {
                                Min: params.Min,
                                Max: params.Max,
                                IsEnabled: params.Min !== 0 || params.Max !== 0
                            }
                        }
                    } else return { uid, ...other }
                })
            }));
            dispatch(setSettingsMesh({ ...settingsMesh, StlGeomertrys: newData }));
            dispatch(setLayerGroups(boundaryLayers.map((layer) =>
                layer.GroupName === params.GroupName ? params : layer
            )))
            await setMeshData(projectId, { ...settingsMesh, StlGeomertrys: newData })
        } else {
            dispatch(setLayerGroups(boundaryLayers.filter((layer) => layer.GroupName !== params.GroupName)))
        }
    }

    const handleDeleteClick = (_uid) => {
        const newSelectedParts = selectedParts.filter(({ uid }) => uid !== _uid)
        setParams(prev => ({ ...prev, faces: newSelectedParts }))
        const newData = settingsMesh.StlGeomertrys.map(({ Regions, ...other }) => ({
            ...other,
            Regions: Regions.map(({ uid, ...other }) => {
                if (uid === _uid) {
                    return {
                        ...other,
                        uid,
                        BoundaryLayer: {
                            NSurfaceLayers: 0
                        },
                        RefinementSettings: {
                            Min: 0,
                            Max: 0,
                            IsEnabled: false
                        }
                    }
                } else return { uid, ...other }
            })
        }));
        dispatch(setSettingsMesh({ ...settingsMesh, StlGeomertrys: newData }));
        dispatch(setSelectedParts(newSelectedParts))
    }

    const handleSelectAll = () => {
        let parts = []
        geoms.forEach(({ models }) => (
            models.forEach(model => (
                parts.push({ name: model.name, uid: model.uid })
            ))
        ))
        dispatch(setSelectedParts(parts))
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setParams(prev => ({ ...prev, [name]: Number(value) }))
    }

    return (
        <form onSubmit={handleFormSubmit} className='max-h-[calc(100vh-73px)] flex flex-col bg-day-00 rounded-md 
        shadow h-fit text-day-350'>
            <div className='flex flex-row justify-between items-center border-b pb-2 p-3'>
                <p className='font-semibold'>{formTitle}</p>
                <div className='flex flex-row space-x-[6px]'>
                    <button type="submit" className="disabled:bg-orange-disabled text-base font-medium text-white 
                        bg-orange-200 hover:bg-orange-100 active:bg-orange-150 duration-300 
                        rounded-md  w-8 h-8 border flex items-center justify-center">
                        <SvgSelector id='check' />
                    </button>
                    <button className="rounded-md text-day-300 w-8 h-8 border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center">
                        <SvgSelector id='close' />
                    </button>
                </div>
            </div>
            <div className="overflow-y-auto py-3 px-3">
                <Input name='NSurfaceLayers' label='Number of surface layers' value={params?.NSurfaceLayers} onChange={handleChange} />
                <Input label='Expansion ratio' name='ExpansionRatio' value={settingsMesh.ExpansionRatio} onChange={handleChange} />
                <Input label='First layer thickness' name='FirstLayerThickness' value={settingsMesh.FirstLayerThickness} onChange={handleChange} />
                {/* <Toogle label='Relative sizes' name='RelativeSizes' value={settingsMesh.RelativeSizes} onChange={toogleDataChange} /> */}

                {/* <Select label='Layers thickness type' name='LayersThicknessType' options={thickness} onChange={selectDataChange} /> */}

                {/* {settingsMesh.LayersThicknessType === "FirstLayerThickness" &&
                    <Input label='First layer thickness' name='FirstLayerThickness' value={settingsMesh.FirstLayerThickness} onChange={inputDataChange} />}
                {settingsMesh.LayersThicknessType === "FinalLayerThickness" &&
                    <Input label='Final layer thickness' name='FinalLayerThickness' value={settingsMesh.FinalLayerThickness} onChange={inputDataChange} />}
                {settingsMesh.LayersThicknessType === "Thickness" &&
                    <Input label='Thickness' name='Thickness' value={settingsMesh.Thickness} onChange={inputDataChange} />} */}

                <Input name='Min' label='Min refinement number' value={params?.Min} onChange={handleChange} />
                <Input name='Max' label='Max refinement number' value={params?.Max} onChange={handleChange} />

                <div className='flex flex-row justify-between'>
                    <p className='h-8 flex items-center font-semibold'>Assigned faces ({selectedParts.length})</p>
                    <button type='button' className='text-blue-700 hover:underline underline-offset-4 duration-300'
                        onClick={handleSelectAll}>
                        {'Select all faces'}
                    </button>
                </div>
                {selectedParts.length ? <div className='my-1.5 p-1.5 px-1.5 rounded-md bg-yellow-50 border border-yellow-300 flex flex-col'>
                    {
                        selectedParts.map(({ name, uid }) => (
                            <div key={uid} className='flex flex-row items-center justify-between h-8'>
                                <p className='pl-1 text-left text-ellipsis overflow-hidden whitespace-nowrap'>{name}</p>
                                <button className="text-day-300 w-7 h-8 flex items-center justify-center"
                                    onClick={() => handleDeleteClick(uid)}>
                                    <SvgSelector id='close' />
                                </button>
                            </div>
                        ))
                    }
                </div> : <div className="flex items-center p-1.5 my-1.5 rounded-md bg-yellow-50 border border-yellow-300">
                    <div className="flex gap-2 h-8 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div className="self-center">
                            <span className="text-yellow-600">
                                Select faces
                            </span>
                        </div>
                    </div>
                </div>}
            </div >
        </form >
    )
}

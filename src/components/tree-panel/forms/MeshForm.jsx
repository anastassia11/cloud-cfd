import { useDispatch, useSelector } from 'react-redux';
import SvgSelector from '../../SvgSelector';
import { resetSetting } from '@/store/slices/settingSlice';
import { useEffect, useState } from 'react';
import createMesh from '@/api/create_mesh';
import getSettingsMesh from '@/api/get_settings_mesh';
import { setSceneMode, setSelectedParts, setStateBar } from '@/store/slices/projectSlice';
import { setCurrentMesh, setMeshes, setPoint, setSettingsMesh } from '@/store/slices/meshSlice';
import setMeshData from '@/api/set_mesh_data';
import cancelCreateMesh from '@/api/cancel_create_mesh';
import getMeshDataJson from '@/api/get_meshData';
import downloadCase from '@/api/download_case';
import { BASE_SERVER_URL } from '@/utils/constants';
import { BarLoader } from 'react-spinners';
import Input from '../ui-kit/Input';
import Toogle from '../ui-kit/Toogle';

export default function MeshForm({ computeBoundingBox }) {
    const dispatch = useDispatch()
    const projectId = useSelector(state => state.project.projectId)
    const geoms = useSelector(state => state.project.geometries) ?? []
    const meshes = useSelector(state => state.mesh.meshes) ?? []
    const settingsMesh = useSelector(state => state.mesh.settings) ?? {}
    const point = useSelector(state => state.mesh.point)

    const [advancedSettingsVisible, setAdvancedSettingsVisible] = useState(false)
    const [meshState, setMeshState] = useState('not_generated')
    const [downloadDisabled, setDownloadDisabled] = useState(false)

    const addLayers = [
        { name: 'MinThickness', label: 'Min thickness' },
        { name: 'NGrow', label: 'Grow' },
        { name: 'FeatureAngle', label: 'Feature angle' },
        { name: 'NRelaxIterLayer', label: 'Relax iterations layer' },
        { name: 'NSmoothSurfaceNormals', label: 'Smooth surface normals' },
        { name: 'NSmoothThickness', label: 'Smooth thickness' },
        { name: 'MaxFaceThicknessRatio', label: 'Max face thickness ratio' },
        { name: 'MaxThicknessToMedialRatio', label: 'Max thickness to medial ratio' },
        { name: 'MinMedianAxisAngle', label: 'Min median axis angle' },
        { name: 'NBufferCellsNoExtrude', label: 'Buffer cells no extrude' },
        { name: 'NLayerIter', label: 'Layer iterations' },
        { name: 'NRelaxedIter', label: 'Relaxed iterations' }
    ]

    useEffect(() => {
        !meshes.length ? setMeshState('not_generated') : setMeshState('successfully_generated')
    }, [meshes])

    useEffect(() => {
        dispatch(setPoint({ visible: !settingsMesh.AddLayers }))
    }, [settingsMesh.AddLayers])

    useEffect(() => {
        Object.keys(settingsMesh).length && point && dispatch(setSettingsMesh({
            ...settingsMesh, InsidePoint: {
                X: point.position.x,
                Y: point.position.y,
                Z: point.position.z,
            }
        }))
    }, [point.position])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        saveMeshData()
        dispatch(resetSetting())
    }

    const inputDataChange = (e) => {
        const { name, value } = e.target;
        dispatch(setSettingsMesh({ ...settingsMesh, [name]: Number(value) }))
    }

    const pointInputDataChange = (e) => {
        const { name, value } = e.target;
        const _name = name.toLowerCase();
        dispatch(setSettingsMesh({ ...settingsMesh, InsidePoint: { ...settingsMesh.InsidePoint, [name]: Number(value) } }))
        dispatch(setPoint({ position: { ...point.position, [_name]: Number(value) } }));
    }

    const toogleDataChange = (e) => {
        const { name, checked } = e.target;
        dispatch(setSettingsMesh({ ...settingsMesh, [name]: checked }))
    }

    const saveMeshData = async () => {
        Object.keys(settingsMesh).length && await setMeshData(projectId, settingsMesh)
    }

    const fetchMeshes = async () => {
        const result = await getMeshDataJson(projectId)
        if (result.success) {
            dispatch(setMeshes({ meshes: result.data.meshes }))
            dispatch(setCurrentMesh({
                uid: result.data.meshes[0].uid,
                path: result.data.meshes[0].path
            }))
            dispatch(setSceneMode('mesh'))
            dispatch(resetSetting())
        } else {
            // alert(result.message)
        }
    }

    const fetchGenerateMesh = async (settingsMesh) => {
        setMeshState('in_progress')
        dispatch(setStateBar({ type: "status", visible: true, message: 'Mesh' }))
        const result = await createMesh(projectId, settingsMesh)
        if (result.success) {
            setMeshState('successfully_generated')
            dispatch(setStateBar({ type: 'success', visible: true, message: 'Mesh' }))
            fetchMeshes()
        } else {
            setMeshState('successfully_generated')
            dispatch(setStateBar({ type: 'error', visible: true, message: 'Mesh' }))
        }
    }

    const generateMesh = () => {
        const boundingBox = computeBoundingBox()
        const updatedSettingsMesh = { ...settingsMesh }
        for (let item in boundingBox) {
            updatedSettingsMesh[item] = boundingBox[item]
        }
        dispatch(setSettingsMesh(updatedSettingsMesh))
        fetchGenerateMesh(updatedSettingsMesh)
    }

    const handleDownload = async () => {
        setDownloadDisabled(true)
        const result = await downloadCase(projectId)
        if (result.success) {
            const fileUrl = `${BASE_SERVER_URL}${result.data}`
            const link = document.createElement('a')
            link.href = fileUrl
            link.setAttribute('download', 'mesh.zip')
            document.body.appendChild(link)
            link.click()
            setDownloadDisabled(false)
            document.body.removeChild(link)
        }
    }
    const stopCreateMesh = async () => {
        const result = await cancelCreateMesh(projectId)
        if (result.success) {
            setMeshState('not_generated')
            dispatch(setStateBar({ visible: false, type: '', message: '' }))
        }
    }

    const PointInput = ({ label, name, unit }) => {
        return (
            <div className='flex flex-col'>
                <div className='flex flex-row justify-between items-center h-8 '>
                    <p>
                        {label}, {unit}
                    </p>
                    <button type='button' className='text-blue-700 hover:underline underline-offset-4 duration-300'
                        onClick={() => dispatch(setPoint({ visible: !point.visible }))}>
                        {!point.visible ? 'Show' : 'Hide'}
                    </button>
                </div>
                <div className='flex flex-col space-y-2 my-1.5'>
                    <Input name='X' label='X' value={settingsMesh[name] && settingsMesh[name]["X"]} onChange={pointInputDataChange} />
                    <Input name='Y' label='Y' value={settingsMesh[name] && settingsMesh[name]["Y"]} onChange={pointInputDataChange} />
                    <Input name='Z' label='Z' value={settingsMesh[name] && settingsMesh[name]["Z"]} onChange={pointInputDataChange} />
                </div>
            </div>
        )
    }

    const StateBar = ({ }) => {
        switch (meshState) {
            case 'not_generated':
                return (
                    <button type="button" className="rounded-md text-gray-500 p-[5px] h-8 border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center"
                        onClick={generateMesh}>
                        <SvgSelector id='play' /><p className='ml-1'>Generate Mesh</p>
                    </button>
                );
            case 'in_progress':
                return (
                    <>
                        <BarLoader width='100%' color="#d1d5db" height={10} speedMultiplier={0.3} cssOverride={{
                            borderRadius: '5px'
                        }} loading />
                        <button type="button" className="w-8 h-8 rounded-md text-gray-500 p-[5px] border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center"
                            onClick={stopCreateMesh}>
                            <SvgSelector id='stop' />
                        </button>
                    </>
                );
            case 'successfully_generated':
                return (
                    <>
                        <button type="button" disabled={downloadDisabled} className="w-8 h-8 rounded-md text-gray-500 p-[5px] border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center mr-1
                        disabled:opacity-40"
                            onClick={handleDownload}>
                            <SvgSelector id='download' />
                        </button>
                        <div className="w-full flex flex-col text-xs ">
                            <p className='text-green-800'>Finished</p>
                            <p>Overall mesh quality: 00</p>
                        </div>

                        <button type="button" className="h-8 rounded-md text-gray-500 p-[5px] border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center space-x-1"
                            onClick={generateMesh}>
                            <SvgSelector id='update' />
                            <p>Regenerate</p>
                        </button>
                    </>
                );
        }
    }

    const snap = [
        {
            name: 'NSmoothPatch',
            label: 'Smooth patch'
        },
        {
            name: 'Tolerance',
            label: 'Tolerance'
        },
        {
            name: 'NSolveIter',
            label: 'Solve iterations'
        },
        {
            name: 'NRelaxIter',
            label: 'Relax iterations'
        },
        {
            name: 'NFeatureSnapIter',
            label: 'Feature snap iter'
        },
    ]

    return (
        <form onSubmit={handleFormSubmit} className='max-h-[calc(100vh-73px)] flex flex-col bg-day-00 rounded-md 
        shadow h-fit text-day-350'>
            <div className='flex flex-row justify-between items-center border-b pb-2 p-3'>
                <p className='font-semibold'>Mesh</p>
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
            {!geoms.length ?
                <div className="flex m-2 items-center gap-2 rounded-md px-2 h-9 text-base text-red-700 bg-red-50">
                    Add geometry to generate mesh
                </div> :
                <div className='overflow-y-auto py-3'>
                    <div className='px-3'>
                        <p className='h-8 flex items-center font-semibold mb-1.5'>Block mesh settings</p>
                        <Input label='Delta' name='Delta' value={settingsMesh.Delta} onChange={inputDataChange} />

                        {PointInput({ label: 'Inside point', name: 'InsidePoint', unit: 'm' })}

                        <p className='h-8 flex items-center font-semibold mb-1.5'>Castellated mesh controls</p>
                        <Input label='Cells between levels' name='NCellsBetweenLevels' value={settingsMesh.NCellsBetweenLevels} onChange={inputDataChange} />
                        <Input label='Resolve feature angle' name='ResolveFeatureAngle' unit={'\u00B0'} value={settingsMesh.ResolveFeatureAngle} onChange={inputDataChange} />
                    </div>

                    <div className='mt-1 px-2'>
                        <div className='flex flex-row cursor-pointer'
                            onClick={() => setAdvancedSettingsVisible(prev => !prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className={`min-w-[20px] h-5 duration-300 ${advancedSettingsVisible ? 'rotate-180' : ''}`}>
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 
                        1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                            <p className='font-semibold ml-[7px] text-day-350 mb-1.5'>Advanced settings</p>
                        </div>
                        {advancedSettingsVisible ? <div className='flex flex-col ml-[27px]'>
                            <Input label='Merge tolerance' name='MergeTolerance' value={settingsMesh.MergeTolerance} onChange={inputDataChange} />

                            <p className='h-8 flex items-center font-semibold mb-1.5'>Castellated mesh controls</p>
                            <Input label='Max global cells' name='MaxGlobalCells' value={settingsMesh.MaxGlobalCells} onChange={inputDataChange} />
                            <Input label='Resolve feature angle' name='ResolveFeatureAngle' value={settingsMesh.ResolveFeatureAngle} onChange={inputDataChange} />
                            <Toogle label='Allow free standing zone faces' name='AllowFreeStandingZoneFaces' value={settingsMesh.AllowFreeStandingZoneFaces} onChange={toogleDataChange} />

                            <p className='h-8 flex items-center font-semibold mb-1.5'>Snap controls</p>
                            <Toogle label='Snap' name='Snap' value={settingsMesh.Snap} onChange={toogleDataChange} />
                            {settingsMesh.Snap && <ul>
                                {snap.map(({ name, label }) => <li key={name}>
                                    <Input name={name} label={label} value={settingsMesh[name]} onChange={inputDataChange} />
                                </li>)}
                            </ul>}
                            <p className='h-8 flex items-center font-semibold mb-1.5'>Layer adding controls</p>
                            {settingsMesh.AddLayers && <>
                                <ul>
                                    {addLayers.map(({ name, label }) => <li key={name}>
                                        <Input name={name} label={label} value={settingsMesh[name]} onChange={inputDataChange} />
                                    </li>)}
                                </ul>
                            </>}
                        </div> : ''}
                    </div>
                </div>}
            {
                geoms.length ? <div className='w-full border-t flex flex-row justify-end items-center p-3 space-x-[6px]'>
                    <StateBar />
                </div> : ''
            }
        </form >
    )
}

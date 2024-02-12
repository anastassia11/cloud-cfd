import { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'
import { useDispatch, useSelector } from 'react-redux'
import { setSetting } from '@/store/slices/settingSlice'
import { deleteSimulation, setSceneMode } from '@/store/slices/projectSlice'
import Modal from '../Modal'
import requestDeleteSimulation from '@/api/delete_simulation'
import DropdownSettings from './DropdownSettings'
import { setLayerGroups, setSettingsMesh } from '@/store/slices/meshSlice'
import Refinements from './Refinements'
import setMeshData from '@/api/set_mesh_data'

export default function Simulation({ id, name }) {
    const [simulationOpen, setSimulationOpen] = useState(false)
    const [modal, setModal] = useState(false)
    const [layerModal, setLayerModal] = useState(false)
    const projectId = useSelector(state => state.project.projectId)
    const boundaryLayers = useSelector(state => state.mesh.layerGroups) ?? []
    const geoms = useSelector(state => state.project.geometries) ?? []
    const selectedSetting = useSelector(state => state.setting.formName)
    const settingsMesh = useSelector(state => state.mesh.settings) ?? {}
    const dispatch = useDispatch()

    const handleRunClick = () => {

    }

    const handleDeleteClick = (e) => {
        e.stopPropagation()
        setModal(true)
    }

    const handledeleteSimulation = async () => {
        const result = await requestDeleteSimulation(id)
        if (result.success) {
            dispatch(deleteSimulation({ deletedSimulation: id }))
        } else {
            alert(result.message)
        }
        setModal(false)
    }

    const handleSettingClick = (formName, formTitle) => {
        dispatch(setSetting({ formName, formTitle }))
        formName === 'mesh' && dispatch(setSceneMode('geom'))
    }

    const handleLayerCreate = () => {
        const maxGroupName = boundaryLayers.reduce((max, obj) => (obj.GroupName > max ? obj.GroupName : max), boundaryLayers[0]?.GroupName) || 0;
        const num = boundaryLayers.length ? Number(maxGroupName) + 1 : 0
        dispatch(setLayerGroups([...boundaryLayers,
        {
            NSurfaceLayers: 5,
            ExpansionRatio: 1.1,
            FirstLayerThickness: 0.3,
            Min: 3,
            Max: 4,
            faces: [],
            GroupName: `${num}`
        }]))
        dispatch(setSetting({
            formName: `layer_${num}`,
            formTitle: `Layer ${num}`
        }))
    }

    const handleLayerDelete = async (e, name) => {
        e.stopPropagation()
        const newData = settingsMesh.StlGeomertrys.map(({ Regions, ...other }) => ({
            ...other,
            Regions: Regions.map(({ GroupName, ...other }) => {
                if (GroupName === name) {
                    return {
                        ...other,
                        GroupName: '',
                        BoundaryLayer: {
                            NSurfaceLayers: 0,
                        },
                        RefinementSettings: {
                            Min: 0,
                            Max: 0,
                            IsEnabled: false
                        }
                    }
                } else return { GroupName, ...other }
            })
        }));
        dispatch(setSettingsMesh({ ...settingsMesh, StlGeomertrys: newData }))
        dispatch(setLayerGroups(boundaryLayers.filter(({ GroupName }) => GroupName !== name)))
        await setMeshData(projectId, { ...settingsMesh, StlGeomertrys: newData })
    }

    const Setting = ({ formName, formTitle, onDeleteClick }) => {
        return (
            <>
                <div className={`group flex items-center justify-between rounded-lg pl-2 pr-1.5 cursor-pointer text-day-1000 h-9
                hover:bg-day-150 active:bg-day-200 ${selectedSetting === formName && 'bg-day-150'}`}
                    onClick={(e) => handleSettingClick(formName, formTitle)}>
                    <p className='text-ellipsis whitespace-nowrap overflow-hidden'>{formTitle}</p>
                    {onDeleteClick && <button className='invisible group-hover:visible overflow-hidden'
                        onClick={onDeleteClick}>
                        <span className='min-w-[25px] flex items-center justify-center'>
                            <SvgSelector id='delete' className="h-5 w-5 " />
                        </span>
                    </button>}
                </div>
            </>
        )
    }

    return (
        <div>
            <div className="group w-full flex items-center justify-between text-day-350 px-1.5 h-9 rounded-lg 
            hover:bg-day-150 active:bg-day-200 overflow-hidden min-w-0 cursor-pointer"
                onClick={() => setSimulationOpen(!simulationOpen)}>
                <div className="flex items-center gap-x-1.5 font-medium text-ellipsis whitespace-nowrap overflow-hidden" >
                    <span className='min-w-[20px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            className={`w-5 h-5 duration-300 ${simulationOpen ? 'rotate-180' : ''}`}>
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd" />
                        </svg>
                    </span>
                    <p className='text-ellipsis whitespace-nowrap overflow-hidden'>{name}</p>
                </div>
                <div className='flex flex-row items-center justify-center overflow-hidden'>
                    <button className='invisible group-hover:visible pr-[3px] overflow-hidden'
                        onClick={handleDeleteClick}>
                        <span className='min-w-[20px]'>
                            <SvgSelector id='delete' className="h-5 w-5 " />
                        </span>
                    </button>

                </div>
            </div>
            {
                simulationOpen ? (
                    <div className="border-l ml-[16px]">
                        <div className="text-base font-normal flex-1 ml-2">
                            <Setting formTitle='Geomerty' formName='geomerty' />
                            <Setting formTitle='Materials' formName='materials' />

                            <DropdownSettings title='Initial conditions'>
                                <Setting formTitle='(P) Gaude pressure' formName='gaudePressureForm' />
                                <Setting formTitle='(U) Velocity' formName='velocityForm' />
                                <Setting formTitle='(k) Turb. kinetic energy' formName='turbKineticForm' />
                                <Setting formTitle='(ω) Specific dissipation rate' formName='dissipationForm' />
                            </DropdownSettings>

                            <DropdownSettings title='Advanced concept'>
                                <Setting formTitle='Simulation control' formName='simulationControlForm' />
                            </DropdownSettings>

                            <DropdownSettings title='Mesh'>
                                <Setting formTitle='Mesh settings' formName='mesh' />
                                {geoms.length ? <Refinements onCreate={handleLayerCreate}>
                                    {boundaryLayers.length ? <ul>
                                        {boundaryLayers.map((layer) => <li key={`layer_${layer.GroupName}`}>
                                            <Setting formTitle={`Layer ${layer.GroupName}`} formName={`layer_${layer.GroupName}`}
                                                onDeleteClick={(e) => handleLayerDelete(e, layer.GroupName)} />
                                        </li>
                                        )}
                                    </ul> : ''}
                                </Refinements> : ''}
                            </DropdownSettings>

                            <button className="flex w-full items-center gap-2 rounded-lg px-2 h-9 text-base font-normal 
                            text-[#ef7931] hover:bg-day-150 active:bg-day-200 duration-300 "
                                onClick={handleRunClick}>
                                <span className='w-5'>
                                    <SvgSelector id='run' />
                                </span>
                                <p className='text-ellipsis whitespace-nowrap overflow-hidden'>Simulation Run</p>
                            </button>

                        </div>
                    </div>
                ) : ""
            }
            <div className='absolute z-20'>
                {modal ? <Modal onCloseClick={() => setModal(false)} onActionClick={handledeleteSimulation}
                    title='Delete simulation' message={`'${name}' will be deleted forever`} btnTitle='Delete' /> : ''}
            </div>
        </div >
    )
}

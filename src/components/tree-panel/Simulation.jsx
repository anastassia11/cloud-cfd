import { useState } from 'react'
import SvgSelector from '../SvgSelector'
import DropdownSettings from './DropdownSettings'
import DeleteSimulation from './DeleteSimulation'
import Setting from './Setting'
import { useSelector } from 'react-redux'
import { setUserValue } from '@/store/slices/paramsSlice'

export default function Simulation({ id, name }) {
    const [simulationOpen, setSimulationOpen] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const userValue = useSelector(state => state.params.params)

    const handleRunClick = async () => {

    }

    // const handleFormChange = (formName, updatedValue) => {
    //     dispatch(setUserValue(formName, updatedValue))
    // }

    const handleDeleteClick = (e) => {
        e.stopPropagation()
        setDeleteModal(true)
    }

    const deleteSimulation = async () => {
        onDeleteClick()
        setDeleteModal(false)
    }

    const initialChildren = [
        {
            setting: <Setting formTitle='(P) Gaude pressure' formName='gaudePressureForm'
                inputs={userValue.gaudePressureForm} />,
            child: false
        },
        {
            setting: <Setting formTitle='(U) Velocity' formName='velocityForm'
                inputs={userValue.velocityForm} />,
            child: false
        },
        {
            setting: <Setting formTitle='(k) Turb. kinetic energy' formName='turbKineticForm'
                inputs={userValue.turbKineticForm} />,
            child: false
        },
        {
            setting: <Setting formTitle='(ω) Specific dissipation rate' formName='dissipationForm'
                inputs={userValue.dissipationForm} />,
            child: false
        }
    ]
    const advancedChildren = [
        {
            setting: <Setting formTitle='Simulation control' formName='simulationControlForm'
                inputs={userValue.simulationControlForm} />,
            child: false
        },
    ]
    const settings = [
        { setting: <Setting formTitle='Geomerty' formName='geomerty' />, child: false },
        { setting: <Setting formTitle='Materials' formName='materials' />, child: false },
        {
            setting: <DropdownSettings items={initialChildren}>
                Initial conditions
            </DropdownSettings>,
            child: true
        },
        {
            setting: <DropdownSettings items={advancedChildren}>
                Advanced concept
            </DropdownSettings>,
            child: true
        }
    ]

    return (
        <div>
            <div className="group w-full flex items-center justify-between text-day-350 px-2 h-9 rounded-lg 
            hover:bg-day-150 active:bg-day-200 overflow-hidden min-w-0 cursor-pointer"
                onClick={() => setSimulationOpen(!simulationOpen)}>
                <div className="flex items-center gap-x-2 font-medium text-ellipsis whitespace-nowrap overflow-hidden" >
                    <span className='min-w-[22px]'>
                        <SvgSelector id='simulation' />
                    </span>
                    <p className='text-ellipsis whitespace-nowrap overflow-hidden'>{name}</p>
                </div>
                <div className='flex flex-row items-center justify-center overflow-hidden'>
                    <button className='invisible group-hover:visible mr-1 overflow-hidden'
                        onClick={handleDeleteClick}>
                        <span className='min-w-[20px]'>
                            <SvgSelector id='delete' className="h-5 w-5 " />
                        </span>
                    </button>
                    <span className='min-w-[20px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            className={`w-5 h-5 duration-300 ${simulationOpen ? 'rotate-180' : ''}`}>
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>
            {
                simulationOpen ? (
                    <div className="border-l ml-[17px]">
                        <ul className="text-base font-normal flex-1 ml-3">
                            {settings.map((item) => {
                                return item.child ? <li key={item.setting}>{item.setting}</li> :
                                    <li key={item.setting}>
                                        {item.setting}
                                    </li>
                            }
                            )}
                            <button className="flex w-full items-center gap-2 rounded-lg px-2 h-9 text-base font-normal 
                            text-orange-100 hover:bg-day-150 active:bg-day-200 duration-300 "
                                onClick={handleRunClick}>
                                <span className='w-5'>
                                    <SvgSelector id='run' />
                                </span>
                                <p className='text-ellipsis whitespace-nowrap overflow-hidden'>Simulation Run</p>
                            </button>
                        </ul>
                    </div>
                ) : ""
            }
            {deleteModal ? <DeleteSimulation simulationName={name} simulationId={id}
                onCloseClick={() => setDeleteModal(false)}
                onDeleteClick={() => deleteSimulation()} /> : ''}
        </div>
    )
}

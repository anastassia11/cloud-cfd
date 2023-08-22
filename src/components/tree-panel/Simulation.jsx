import { useState } from 'react'
import SvgSelector from '../SvgSelector'
import FormGenerator from './FormGenerator'
import GeometryForm from './GeometryForm'
import formDefault from './assets/formData.json'
import DropdownSettings from './DropdownSettings'
import DeleteSimulation from './DeleteSimulation'

export default function Simulation({ name, onDeleteClick, id }) {
    const [selectedItem, setSelectedItem] = useState(null)
    const [userValue, setUserValue] = useState(formDefault)
    const [simulationOpen, setSimulationOpen] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const handleRunClick = async () => {

    }

    const handleFormChange = (formName, updatedValue) => {
        setUserValue(prev => ({ ...prev, [formName]: updatedValue }))
    }

    const handleDeleteClick = (e) => {
        e.stopPropagation()
        setDeleteModal(true)
    }

    const deleteSimulation = async () => {
        onDeleteClick()
        setDeleteModal(false)
    }

    const Setting = ({ formName, name, inputs = {}, onFormChange }) => {
        const handleItemClick = (id) => {
            setSelectedItem((prev) => (prev === id ? null : id))
            console.log(id)
        }
        const Form = ({ formName }) => {
            if (formName == 'geomerty') {
                return <GeometryForm onItemClick={() => handleItemClick(formName)} />

            } else {
                return <FormGenerator value={inputs} formTitle={name}
                    setUserValue={(updatedValue) => onFormChange(formName, updatedValue)}
                    onItemClick={() => handleItemClick(formName)} />
            }
        }
        return (
            <>
                <div className='w-full flex items-center rounded-md px-2 cursor-pointer text-day-350 h-9 
                hover:bg-day-150 active:bg-day-200 duration-300'
                    onClick={() => handleItemClick(formName)}>{name}</div>
                <div className={`absolute top-2 left-[350px] ${selectedItem === (formName) ? '' : 'invisible'}`}>
                    <Form formName={formName} />
                </div>
            </>
        )
    }

    const initialChildren = [
        {
            setting: <Setting name='(P) Gaude pressure' formName='gaudePressureForm'
                inputs={userValue.gaudePressureForm} onFormChange={handleFormChange} />,
            child: false
        },
        {
            setting: <Setting name='(U) Velocity' formName='velocityForm'
                inputs={userValue.velocityForm} onFormChange={handleFormChange} />,
            child: false
        },
        {
            setting: <Setting name='(k) Turb. kinetic energy' formName='turbKineticForm'
                inputs={userValue.turbKineticForm} onFormChange={handleFormChange} />,
            child: false
        },
        {
            setting: <Setting name='(ω) Specific dissipation rate' formName='dissipationForm'
                inputs={userValue.dissipationForm} onFormChange={handleFormChange} />,
            child: false
        }
    ]
    const advancedChildren = [
        {
            setting: <Setting name='Simulation control' formName='simulationControlForm'
                inputs={userValue.simulationControlForm} onFormChange={handleFormChange} />,
            child: false
        },
    ]
    const settings = [
        { setting: <Setting name='Geomerty' formName='geomerty' />, child: false },
        { setting: <Setting name='Materials' formName='materials' />, child: false },
        {
            setting: <DropdownSettings items={initialChildren}>
                Initial conditions
            </DropdownSettings>,
            child: true
        },
        {
            setting: <DropdownSettings items={initialChildren}>
                Boundary conditions
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
            <button className="group w-full flex items-center justify-between text-day-350 px-2 h-9 rounded-lg 
            hover:bg-day-150 active:bg-day-200 duration-300"
                onClick={() => setSimulationOpen(!simulationOpen)}>
                <div className="flex items-center gap-x-2 font-medium" >
                    <SvgSelector id='simulation' />
                    {name}
                </div>
                <div className='flex flex-row items-center justify-center'>
                    <button className='invisible group-hover:visible mr-1'
                        onClick={handleDeleteClick}>
                        <SvgSelector id='delete' className="h-5 w-5" />
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        className={`w-5 h-5 duration-300 ${simulationOpen ? 'rotate-180' : ''}`}>
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd" />
                    </svg>
                </div>
            </button>
            {
                simulationOpen ? (
                    <div className="overflow-auto border-l ml-[17px]">
                        <ul className="text-base font-normal flex-1 ml-3">
                            {settings.map((item) => {
                                return item.child ? <li>{item.setting}</li> :
                                    <li key={''}
                                        className=''>
                                        {item.setting}
                                    </li>
                            }
                            )}
                            <button className="flex w-full items-center gap-2 rounded-lg px-2 h-9 text-base font-normal 
                            text-orange-100 hover:bg-day-150 active:bg-day-200 duration-300"
                                onClick={handleRunClick}>
                                <SvgSelector id='run' />
                                Simulation Run
                            </button>
                        </ul>
                    </div>
                ) : ""
            }
            {deleteModal ? <DeleteSimulation simulationName={name}
                onCloseClick={() => setDeleteModal(false)}
                onDeleteClick={() => deleteSimulation()} /> : ''}
        </div>
    )
}

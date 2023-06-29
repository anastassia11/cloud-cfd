import { useEffect, useRef, useState } from 'react'
import SvgSelector from '../SvgSelector'
import FormGenerator from './FormGenerator'
import GeometryForm from './GeometryForm'
import formDefault from './assets/formData.json'
import DropdownSettings from './DropdownSettings'

export default function Simulation({ name, onDeleteClick, id }) {
    const [selectedItem, setSelectedItem] = useState(null)
    const [userValue, setUserValue] = useState(formDefault)
    const [simulationOpen, setSimulationOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    // const [formData, setFormData] = useState(new FormData())
    const contextmenuRef = useRef()
    const contextmenuHandler = useRef()

    useEffect(() => {
        document.addEventListener("click", () => resetToDefault())
        document.addEventListener("contextmenu", (e) => {
            if (contextmenuHandler.current && !contextmenuHandler.current.contains(e.target)) resetToDefault()
        })
    }, [])

    const handlecontextMenu = (e) => {
        e.preventDefault()
        const { pageX, pageY } = e
        setIsActive(true)
        setTimeout(() => {
            const rect = contextmenuRef.current.getBoundingClientRect();
            const x = (pageX + rect.width) > window.innerWidth ? (window.innerWidth - rect.width) : pageX + 2;
            const y = (pageY + rect.height) > window.innerHeight ? (window.innerHeight - rect.height) : pageY + 2;
            setPosition({ x, y })
            contextmenuRef.current.classList.remove("opacity-0")
        }, 100)
    }

    const resetToDefault = () => {
        setIsActive(false)
        document.documentElement.classList.remove("overflow-hidden")
    }


    const handleRunClick = async () => {
        // mockapi не понимает FormData
        // Object.keys(userValue).map((key) => {
        //     const array = userValue[key]
        //     Object.keys(array).map((key) => {
        //         formData.set(`${key}`, array[key].value)
        //     })
        // })
        // console.log([...formData.entries()]);
        const request_body = {
            id, userValue
        }

        try {
            await fetch(`https://644a81a3a8370fb32150ac69.mockapi.io/simulations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request_body)
            })
            //const data = await response.json()
        } catch (error) {
            console.error(error)
        }
    }

    const handleFormChange = (formName, updatedValue) => {
        setUserValue(prev => ({ ...prev, [formName]: updatedValue }))
    }
    const handleDeleteClick = (event) => {
        event.stopPropagation()
        onDeleteClick()
    }
    const Setting = ({ formName, name, inputs = {}, onFormChange, simulation_name }) => {
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
                <div className='w-full flex items-center rounded-md px-2 cursor-pointer text-day-350 h-9 hover:bg-day-150 active:bg-day-200 duration-300'
                    onClick={() => handleItemClick(formName)}>{name}</div>
                <div className={`absolute top-[63px] left-[350px] ${selectedItem === (formName) ? '' : 'invisible'}`}>
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
            <button className="w-full flex items-center justify-between text-day-350 px-2 h-9 rounded-lg hover:bg-day-150 active:bg-day-200 duration-300"
                onClick={() => setSimulationOpen(!simulationOpen)}
                ref={contextmenuHandler} onContextMenu={handlecontextMenu}>
                <div className="flex items-center gap-x-2 font-medium" >
                    <SvgSelector id='simulation' />
                    {name}
                    {
                        isActive ? (
                            <div ref={contextmenuRef} className="fixed z-10 opacity-0 w-32 rounded-md bg-white shadow border text-day-350" style={{ top: `${position.y}px`, left: `${position.x}px` }}>
                                <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-red-600 hover:bg-day-150"
                                    onClick={handleDeleteClick}>
                                    Delete
                                </button>
                            </div>
                        ) : ""
                    }
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 duration-300 ${simulationOpen ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
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
                            <button className="flex w-full items-center gap-2 rounded-lg px-2 h-9 text-base font-normal text-orange-100 hover:bg-day-150 active:bg-day-200 duration-300"
                                onClick={handleRunClick}>
                                <SvgSelector id='run' />
                                Simulation Run
                            </button>
                        </ul>
                    </div>
                ) : ""
            }
        </div>
    )
}

import { useState } from 'react'
import axios from 'axios'
import clsx from 'clsx'
import SvgSelector from '../SvgSelector'
import FormGenerator from './FormGenerator'
import GeometryForm from './GeometryForm'
import formDefault from './assets/formData.json'

export default function Simulation({ name, onDeleteClick, id }) {
    const [showSimulation, setShowSimulation] = useState(true)
    const [selectedItem, setSelectedItem] = useState(null)
    const [userValue, setUserValue] = useState(formDefault)
    const formData = new FormData()

    const handleRunClick = async () => {
        Object.keys(userValue).map((key) => {
            const array = userValue[key]
            Object.keys(array).map((key) => {
                formData.set(`${key}`, array[key].value)
            })
        })
        console.log([...formData.entries()])

        try {
            const response = await axios.post('url', { id, formData })
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }

        // const request_body = {
        //     id, userValue
        // }
        // try {
        //     await fetch(`https://644a81a3a8370fb32150ac69.mockapi.io/simulations`, {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(request_body)
        //     })
        //     //const data = await response.json()
        // } catch (error) {
        //     console.error(error)
        // }
    }

    const handleFormChange = (formName, updatedValue) => {
        setUserValue(prev => ({ ...prev, [formName]: updatedValue }))
    }

    const Setting = ({ formName, name, groupName, groupItem, children, inputs = {}, onFormChange }) => {
        const [showChildren, setShowChildren] = useState(true)

        const handleItemClick = (id) => {
            setSelectedItem((prev) => (prev === id ? null : id));
        }

        const Form = ({ formName }) => {
            if (formName == 'geomerty') {
                return <GeometryForm onItemClick={() => handleItemClick(formName)} />

            } else {
                return <FormGenerator value={inputs} formTitle={name} setUserValue={(updatedValue) => onFormChange(formName, updatedValue)}
                    onItemClick={() => handleItemClick(formName)} />
            }
        }

        return (
            children
                ? <>
                    <div className='pl-8 py-1 space-x-2 flex flex-row items-center '>
                        <button onClick={() => setShowChildren(!showChildren)}
                            className='flex justify-center items-center w-4 h-4 border-solid border-[1.5px] border-gray-400 hover:border-gray-600'>
                            {showChildren ? <SvgSelector id='minus' /> : <SvgSelector id='plus' />}
                        </button>
                        <span>{groupName}</span>
                    </div>
                    {showChildren && <div>{children}</div>}
                </>
                : <>
                    <div className={clsx('hover:bg-gray-100 active:shadow-inner py-1 cursor-pointer', {
                        'pl-[75px]': groupItem,
                        'pl-14': !groupItem,
                        'bg-slate-200': selectedItem === formName
                    })} onClick={() => handleItemClick(formName)}>
                        {name}
                    </div>
                    <div className={clsx('absolute top-3 left-[410px]', {
                        'invisible': selectedItem !== formName
                    })}>
                        <Form formName={formName} />
                    </div>
                </>
        )
    }

    return (
        <div>
            <div className='flex flex-row justify-between items-center px-2 py-1 hover:bg-gray-100'>
                <div className='flex flex-row items-center space-x-2'>
                    <button onClick={() => setShowSimulation(!showSimulation)}
                        className='flex justify-center items-center w-4 h-4 border-solid border-[1.5px] border-gray-400 hover:border-gray-600'>
                        {showSimulation ? <SvgSelector id='minus' /> : <SvgSelector id='plus' />}
                    </button>
                    <span>{name}</span>
                </div>
                <button onClick={onDeleteClick}>
                    <SvgSelector id='delete' />
                </button>
            </div>
            {showSimulation && <div className='flex flex-col'>
                <Setting name='Geomerty' formName='geomerty' />
                <Setting name='Materials' formName='materials' />
                <Setting groupName='Initial conditions'>
                    <Setting name='(P) Gaude pressure' groupItem='true' formName='gaudePressureForm' inputs={userValue.gaudePressureForm} onFormChange={handleFormChange} />
                    <Setting name='(U) Velocity' groupItem='true' formName='velocityForm' inputs={userValue.velocityForm} onFormChange={handleFormChange} />
                    <Setting name='(k) Turb. kinetic energy' groupItem='true' formName='turbKineticForm' inputs={userValue.turbKineticForm} onFormChange={handleFormChange} />
                    <Setting name='(ω) Specific dissipation rate' groupItem='true' formName='dissipationForm' inputs={userValue.dissipationForm} onFormChange={handleFormChange} />
                </Setting>
                <Setting groupName='Advanced concept'>
                    <Setting name='Simulation control' groupItem='true' formName='simulationControlForm' inputs={userValue.simulationControlForm} onFormChange={handleFormChange} />
                </Setting>

                <button onClick={handleRunClick}
                    className='flex justify-center items-center mx-[10px] mb-2 mt-2 h-8 bg-gray-200 rounded text-gray-600 hover:text-gray-800 hover:shadow hover:bg-gray-300 active:shadow-inner'>simulation run</button>
            </div >}
        </div >
    )
}

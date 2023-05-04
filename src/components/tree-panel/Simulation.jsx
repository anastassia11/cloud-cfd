import { useState } from 'react'
import SvgSelector from '../SvgSelector'
import FormGenerator from './FormGenerator'
import formData from './assets/formData.json'

export default function Simulation({ name, onDeleteClick }) {
    const [showSimulation, setShowSimulation] = useState(true)
    const [selectedItem, setSelectedItem] = useState(null)

    const Setting = ({ id, name, groupName, groupItem, children, inputs = {} }) => {
        const [showChildren, setShowChildren] = useState(true)

        const handleItemClick = (id) => {
            setSelectedItem((prev) => (prev === id ? null : id));
        }

        return (
            children ? <>
                <div className='pl-8 py-1 space-x-2 flex flex-row items-center hover:bg-gray-100'>
                    <button onClick={() => setShowChildren(!showChildren)}
                        className='flex justify-center items-center w-4 h-4 border-solid border-[1.5px] border-gray-400 hover:border-gray-600'>
                        {showChildren ? <SvgSelector id='minus' /> : <SvgSelector id='plus' />}
                    </button>
                    <span>{groupName}</span>
                </div>
                {showChildren && <div>{children}</div>}
            </>
                :
                <>
                    <div className={`hover:bg-gray-100 py-1 cursor-pointer ${groupItem ? 'pl-[75px]' : 'pl-14'} `}
                        onClick={() => handleItemClick(id)}>{name}</div>
                    <div className={`absolute top-3 left-[410px] ${selectedItem === id ? '' : 'invisible'}`}>
                        <FormGenerator value={inputs} formName={name} />
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
                <Setting name='Geomerty' />
                <Setting name='Materials' />
                <Setting groupName='Initial conditions'>
                    <Setting name='(P) Gaude pressure' groupItem='true' id='gaudePressure' inputs={formData.gaudePressureForm} />
                    <Setting name='(U) Velocity' groupItem='true' id='velocity' inputs={formData.velocityForm} />
                    <Setting name='(k) Turb. kinetic energy' groupItem='true' id='turbKinetic' inputs={formData.turbKineticForm} />
                    <Setting name='(ω) Specific dissipation rate' groupItem='true' id='dissipation' inputs={formData.dissipationForm} />
                </Setting>
            </div >}
        </div >
    )
}

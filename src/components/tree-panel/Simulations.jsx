import SvgSelector from '../SvgSelector'
import { useEffect, useState } from 'react'
import Simulation from './Simulation'

export default function Simulations() {
    const [simulations, setSimulations] = useState([])
    const [showSimulations, setShowSimulations] = useState(false)

    const handleDeleteClick = (id) => {
        setSimulations(prev => prev.filter((simulation) => simulation.id !== id))
    }

    const handleAddClick = () => {
        const simulationId = simulations.length
        setShowSimulations(true)
        setSimulations(prev => [...prev, {
            simulation: <Simulation id={simulationId} name={`Simulation ${simulations.length}`}
                onDeleteClick={() => handleDeleteClick(simulationId)} />,
            id: simulationId
        }])
    }

    return (
        <div className='flex-flex-col'>
            <div className='flex flex-row justify-between items-center px-2 py-1'>
                <div className='flex flex-row cursor-pointer items-center'
                    onClick={() => setShowSimulations(!showSimulations)}>
                    {showSimulations ? <SvgSelector id='collapse' /> : <SvgSelector id='expand' />}
                    <p className='flex items-center pl-2 font-semibold'>
                        SIMULATIONS {!showSimulations ? `(${simulations.length})` : ''}
                    </p>
                </div>
                <button onClick={() => handleAddClick()}>
                    <SvgSelector id='add' />
                </button>
            </div>
            {
                showSimulations && <ul>
                    {simulations.map((item, index) =>
                        <li key={index} className='w-full'>
                            {item.simulation}
                        </li>)}
                </ul>
            }
        </div >
    )
}

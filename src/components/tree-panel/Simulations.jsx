import { useState } from 'react'
import uuid from 'react-uuid'
import Simulation from './Simulation'
import SvgSelector from '../SvgSelector'

export default function Simulations() {
    const [simulations, setSimulations] = useState([])
    const [show, setShow] = useState(false)

    const handleAddClick = () => {
        setShow(true)
        const sim_id = uuid()
        setSimulations(prev => [...prev, { sim: <Simulation name={`Simulation ${simulations.length}`} onDeleteClick={() => handleDeleteClick(sim_id)} />, id: sim_id }])
    }
    const handleShowClick = () => {
        setShow(!show)
    }
    const handleDeleteClick = (id) => {
        setSimulations(prev => prev.filter((item) => item.id !== id))
    }

    return (
        <>
            <div className='flex flex-row justify-between items-center px-2 py-1'>
                <div className='flex flex-row cursor-pointer items-center' onClick={handleShowClick}>
                    {show ? <SvgSelector id='collapse' /> : <SvgSelector id='expand' />}
                    <p className='flex items-center pl-2 font-semibold'>SIMULATIONS {!show ? `(${simulations.length})` : ''}</p>
                </div>
                <button onClick={handleAddClick}>
                    <SvgSelector id='add' />
                </button>
            </div>
            {show && <ul>
                {simulations.map((simulation, index) =>
                    <li key={index} className='w-full'>
                        {simulation.sim}
                    </li>)}
            </ul>}
        </>
    )
}

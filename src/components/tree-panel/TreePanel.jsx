import { useState } from "react";
import SvgSelector from '../SvgSelector';
import Simulation from './Simulation';
import uuid from 'react-uuid';

export default function TreePanel() {
    const [simulations, setSimulations] = useState([])
    const handleDeleteClick = (id) => {
        setSimulations(prev => prev.filter((item) => item.id !== id))
    }
    const handleAddClick = () => {
        const sim_id = uuid()
        setSimulations(prev => [...prev, { sim: <Simulation name={`Simulation ${simulations.length}`} onDeleteClick={() => handleDeleteClick(sim_id)} id={sim_id} />, id: sim_id }])
    }
    return (
        <nav className="max-h-[calc(100vh-73px)] bg-day-00 space-y-8 w-[335px] overflow-y-auto pb-2 m-2 rounded-md shadow h-fit">
            <div className="flex flex-col h-full px-2 ">
                <div className="text-day-350 w-full flex items-center justify-between gap-x-1 border-b pt-3 pb-2 pl-[6px] pr-[1px]">
                    <div className='flex flex-row gap-x-1'>
                        <SvgSelector id='simulations' />
                        <span className="block text-base font-semibold ">SIMULATIONS {`(${simulations.length})`}</span>
                    </div>
                    <button className="rounded-md text-day-350 w-8 h-8 border bg-day-50 hover:bg-day-100 active:bg-day-150 flex items-center justify-center"
                        onClick={handleAddClick} >
                        <SvgSelector id='plus' />
                    </button>
                </div>
                <ul className='mt-2'>
                    {simulations.map((simulation, index) =>
                        <li key={index} className=''>
                            {simulation.sim}
                        </li>)}
                </ul>
            </div>
        </nav>
    )
}

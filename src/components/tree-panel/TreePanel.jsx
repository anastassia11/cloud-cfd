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
        <nav className="h-full max-h-[calc(100vh-72px)] border-r rounded-lg bg-white space-y-8 w-96 overflow-y-auto shadow pb-2">
            <div class="flex flex-col h-full px-2">
                <div className="w-full flex items-center gap-x-1 border-b pt-3 pb-2 pl-[6px] pr-[1px]">
                    <SvgSelector id='simulations' />
                    <span className="block text-gray-700 text-base font-semibold">SIMULATIONS {`(${simulations.length})`}</span>
                    <div className="relative flex-1 text-right">
                        <button className="p-2 rounded-md text-gray-500 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 duration-150"
                            onClick={handleAddClick} >
                            <SvgSelector id='plus' />
                        </button>
                    </div>
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

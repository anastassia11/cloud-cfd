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
        setSimulations(prev => [...prev, {
            sim: <Simulation name={`Simulation ${simulations.length}`}
                onDeleteClick={() => handleDeleteClick(sim_id)} id={sim_id} />, id: sim_id
        }])
    }

    return (
        <nav className="max-h-[calc(100vh-73px)] bg-day-00 overflow-y-auto pb-2 rounded-md 
            shadow h-fit">

            <div className="flex flex-col h-full px-2 ">
                <div className="text-day-350 flex items-center justify-between pt-[10px] 
                    pl-[6px] pr-[1px] overflow-hidden">
                    <div className="flex items-center gap-x-1 ">
                        <span className='min-w-[24px]'>
                            <SvgSelector id='simulations' />
                        </span>

                        <span className="block text-base font-semibold pt-[2px]">
                            <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
                                SIMULATIONS {`(${simulations.length})`}
                            </p>
                        </span>
                    </div>
                    <button className="rounded-md min-h-[32px] min-w-[32px] w-8 h-8 border bg-day-50 
                        hover:bg-day-100 active:bg-day-150 flex items-center justify-center"
                        onClick={handleAddClick} >
                        <SvgSelector id='plus' />
                    </button>
                </div>
                {simulations.length > 0 ? <ul className='mt-[9px] pt-2 border-t'>
                    {simulations.map((simulation, index) =>
                        <li key={index} className=''>
                            {simulation.sim}
                        </li>)}
                </ul> : ''}
            </div>
        </nav>
    )
}

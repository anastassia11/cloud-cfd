import { useSelector, useDispatch } from 'react-redux'
import { addSimulationClick, showSimulationsClick } from '@/store/slices/simulationSlice'
import uuid from 'react-uuid'
import SvgSelector from '../SvgSelector'

export default function Simulations() {
    const simulations = useSelector(state => state.simulations.simulations)
    const showSimulations = useSelector(state => state.simulations.showSimulations)
    const dispatch = useDispatch()

    return (
        <div className='flex-flex-col'>
            <div className='flex flex-row justify-between items-center px-2 py-1'>
                <div className='flex flex-row cursor-pointer items-center' onClick={() => dispatch(showSimulationsClick())}>
                    {showSimulations ? <SvgSelector id='collapse' /> : <SvgSelector id='expand' />}
                    <p className='flex items-center pl-2 font-semibold'>SIMULATIONS {!showSimulations ? `(${simulations.length})` : ''}</p>
                </div>
                <button onClick={() => dispatch(addSimulationClick({ id: uuid(), name: `Simulation ${simulations.length}` }))}>
                    <SvgSelector id='add' />
                </button>
            </div>
            {showSimulations && <ul>
                {simulations.map((simulation, index) =>
                    <li key={index} className='w-full'>
                        {simulation.sim}
                    </li>)}
            </ul>}
        </div>
    )
}

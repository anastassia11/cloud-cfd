import { useEffect } from "react"
import SvgSelector from '../SvgSelector'
import createSimulation from '@/api/create_simulation'
import { useDispatch, useSelector } from 'react-redux'
import { addSimulation, setSimulations } from '@/store/slices/projectSlice'
import { setLoader } from '@/store/slices/loaderSlice'
import getSimulations from '@/api/get_simulations'
import Simulation from './Simulation'

export default function TreePanel() {
    const simulations = useSelector(state => state.project.simulations)
    const projectId = useSelector(state => state.project.projectId)

    const dispatch = useDispatch()

    const fetchSimulations = async () => {
        dispatch(setLoader(true))
        const result = await getSimulations(projectId)
        if (result.success) {
            dispatch(setSimulations({ simulations: result.data }))
            dispatch(setLoader(false))
        } else {
            alert(result.message)
            dispatch(setLoader(false))
        }
    }

    const handleAddClick = async () => {
        const simulationName = `Simulation ${simulations.length}`
        const result = await createSimulation(projectId, simulationName)
        if (result.success) {
            dispatch(addSimulation({ newSimulation: result.data }))
        } else {
            alert(result.message)
        }
    }

    useEffect(() => {
        fetchSimulations()
    }, [])

    return (
        <>
            <div className='flex flex-col bg-day-00 rounded-md max-h-[calc(100vh-73px)]
                shadow'>
                <div className='p-3 pb-0'>
                    <div className="text-day-350 flex items-center justify-between border-b pb-2 overflow-x-hidden">
                        <div className="flex items-center gap-x-1 ">
                            <span className='min-w-[24px]'>
                                <SvgSelector id='simulations' />
                            </span>

                            <span className="block text-base font-semibold pt-[2px]">
                                <p className='text-ellipsis whitespace-nowrap'>
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
                </div>
                <div className='overflow-y-auto '>
                    {simulations.length > 0 ? <ul className='m-2'>
                        {simulations.map((simulation) =>
                            <li key={simulation.id}>
                                <Simulation id={simulation.id} name={simulation.name} />
                            </li>)}
                    </ul> : ''}
                </div>
            </div>
        </>
    )
}

import { useSelector, useDispatch } from 'react-redux'
import { deleteSimulationClick, showSimulationClick } from '../../store/simulationSlice'
import axios from 'axios'
import SvgSelector from '../SvgSelector'
import Setting from './Setting'


export default function Simulation({ name, id }) {
    const showSimulation = useSelector(state => state.simulations.showSimulation)
    const userParams = useSelector(state => state.simulations.userParams)
    const dispatch = useDispatch()
    const formData = new FormData()

    const handleRunClick = async () => {
        Object.keys(userParams).map((key) => {
            const array = userParams[key]
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
    }

    return (
        <div>
            <div className='flex flex-row justify-between items-center px-2 py-1 hover:bg-gray-100'>
                <div className='flex flex-row items-center space-x-2'>
                    <button onClick={() => dispatch(showSimulationClick())}
                        className='flex justify-center items-center w-4 h-4 border-solid border-[1.5px] border-gray-400 hover:border-gray-600'>
                        {showSimulation ? <SvgSelector id='minus' /> : <SvgSelector id='plus' />}
                    </button>
                    <span>{name}</span>
                </div>
                <button onClick={() => dispatch(deleteSimulationClick({ id }))}>
                    <SvgSelector id='delete' />
                </button>
            </div>
            {showSimulation && <div className='flex flex-col'>
                <Setting name='Geomerty' formName='geomerty' />
                <Setting name='Materials' formName='materials' />
                <Setting groupName='Initial conditions'>
                    <Setting name='(P) Gaude pressure' groupItem='true' formName='gaudePressureForm' inputs={userParams.gaudePressureForm} />
                    <Setting name='(U) Velocity' groupItem='true' formName='velocityForm' inputs={userParams.velocityForm} />
                    <Setting name='(k) Turb. kinetic energy' groupItem='true' formName='turbKineticForm' inputs={userParams.turbKineticForm} />
                    <Setting name='(ω) Specific dissipation rate' groupItem='true' formName='dissipationForm' inputs={userParams.dissipationForm} />
                </Setting>
                <Setting groupName='Advanced concept'>
                    <Setting name='Simulation control' groupItem='true' formName='simulationControlForm' inputs={userParams.simulationControlForm} />
                </Setting>

                <button onClick={handleRunClick}
                    className='flex justify-center items-center mx-[10px] mb-2 mt-2 h-8 bg-gray-200 rounded text-gray-600 hover:text-gray-800 hover:shadow hover:bg-gray-300 active:shadow-inner'>simulation run</button>
            </div >}
        </div >
    )
}

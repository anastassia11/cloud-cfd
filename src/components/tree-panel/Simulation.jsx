import { useSelector } from 'react-redux'
import axios from 'axios'
import SvgSelector from '../SvgSelector'
import Setting from './Setting'
import { useState } from 'react'

export default function Simulation({ id, name, onDeleteClick }) {
    const [showSimulation, setShowSimulation] = useState(true)
    const [selectedSetting, setSelectedSetting] = useState(null)

    const userParams = useSelector(state => state.simulations.userParams)
    const formData = new FormData()

    const handleSettingClick = (formName) => {
        setSelectedSetting((prev) => (prev === formName ? null : formName))
    }
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
                    <Setting name='(P) Gaude pressure' groupItem='true' formName='gaudePressureForm' inputs={userParams.gaudePressureForm} onSettingClick={(formName) => handleSettingClick(formName)} />
                    <Setting name='(U) Velocity' groupItem='true' formName='velocityForm' inputs={userParams.velocityForm} onSettingClick={(formName) => handleSettingClick(formName)} />
                    <Setting name='(k) Turb. kinetic energy' groupItem='true' formName='turbKineticForm' inputs={userParams.turbKineticForm} onSettingClick={(formName) => handleSettingClick(formName)} />
                    <Setting name='(ω) Specific dissipation rate' groupItem='true' formName='dissipationForm' inputs={userParams.dissipationForm} onSettingClick={(formName) => handleSettingClick(formName)} />
                </Setting>
                <Setting groupName='Advanced concept'>
                    <Setting name='Simulation control' groupItem='true' formName='simulationControlForm' inputs={userParams.simulationControlForm} onSettingClick={(formName) => handleSettingClick(formName)} />
                </Setting>

                <button onClick={handleRunClick}
                    className='flex justify-center items-center mx-[10px] mb-2 mt-2 h-8 bg-gray-200 rounded text-gray-600 hover:text-gray-800 hover:shadow hover:bg-gray-300 active:shadow-inner'>simulation run</button>
            </div >}
        </div >
    )
}

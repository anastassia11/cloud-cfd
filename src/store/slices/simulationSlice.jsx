import Simulation from '@/components/tree-panel/Simulation'
import formDefaultValues from '@/components/tree-panel/assets/formData.json'
import { createSlice } from '@reduxjs/toolkit'

const simulationSlice = createSlice({
    name: 'simulations',
    initialState: {
        simulations: [],
        showSimulations: false,
        showSimulation: true,
        selectedSetting: null,
        userParams: formDefaultValues,
    },
    reducers: {
        addSimulationClick(state, action) {
            state.showSimulations = true
            state.simulations.push({
                sim: <Simulation id={action.payload.id} name={action.payload.name} />,
                id: action.payload.id
            })
        },
        deleteSimulationClick(state, action) {
            state.simulations = state.simulations.filter((simulation) => simulation.id !== action.payload.id)
        },
        showSimulationsClick(state) {
            state.showSimulations = !state.showSimulations
        },
        showSimulationClick(state) {
            state.showSimulation = !state.showSimulation
        },
        settingClick(state, action) {
            state.selectedSetting === action.payload.formName ? state.selectedSetting = null : state.selectedSetting = action.payload.formName
        },
        formValuesChange(state, action) {
            state.userParams = { ...state.userParams, [action.payload.formName]: action.payload.updatedValue }
        },
    }
})

export const { addSimulationClick,
    deleteSimulationClick,
    showSimulationsClick,
    showSimulationClick,
    settingClick,
    formValuesChange } = simulationSlice.actions
export default simulationSlice.reducer
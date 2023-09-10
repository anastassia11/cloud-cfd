import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function delete_Simulation(simulationId) {
    try {
        const response = await axios.delete(`${BASE_SERVER_URL}/api/Simulation/Delete/${simulationId}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            throw new Error('Error simulation deletion')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
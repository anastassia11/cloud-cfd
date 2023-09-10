import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function getSimulations(projectId) {
    try {
        const response = await axios.get(`${BASE_SERVER_URL}/api/Simulation/GetAll/` + projectId,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            throw new Error('Error getting list of project simulations')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
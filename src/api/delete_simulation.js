import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'
import tokenVerification from './token_verification'

export default async function delete_Simulation(simulationId) {
    try {
        await tokenVerification()
        const response = await axios.delete(`${BASE_SERVER_URL}/api/Simulation/Delete/${simulationId}`,
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenData')).token}`
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
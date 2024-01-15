import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'
import tokenVerification from './token_verification'

export default async function cancelCreateMesh(idProject) {
    try {
        await tokenVerification()
        const response = await axios.post(`${BASE_SERVER_URL}/api/Mesh/CancelCreateMesh/${idProject}`,
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenData')).token}`
                }
            })
        if (response.status === 200 || response.status === 204) {
            return { success: true, status: response.status, data: response.data }
        } else {
            return { success: false, message: `Error getting settings mesh with status ${response.status}` }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
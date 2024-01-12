import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'
import tokenVerification from './token_verification'

export default async function setMeshData(projectId, meshData) {
    try {
        await tokenVerification()
        const response = await axios.post(`${BASE_SERVER_URL}/api/Mesh/SetMeshData/${projectId}`,
            meshData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenData')).token}`
                },
            }
        )
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            return { success: false, message: `Error set mesh data with status ${response.status}` }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
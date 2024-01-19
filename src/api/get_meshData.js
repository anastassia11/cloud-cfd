import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'
import tokenVerification from './token_verification'

export default async function getMeshDataJson(idProject) {
    try {
        await tokenVerification()
        const response = await axios.get(`${BASE_SERVER_URL}/api/Mesh/GetMeshDataJson/${idProject}`,
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenData')).token}`
                }
            })
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            throw new Error('Error getting mesh data')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
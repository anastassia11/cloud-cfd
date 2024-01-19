import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'
import tokenVerification from './token_verification'

export default async function deleteMesh(projectId) {
    try {
        await tokenVerification()
        const response = await axios.delete(`${BASE_SERVER_URL}/api/Mesh/DeleteMesh/${projectId}`,
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenData')).token}`
                }
            })
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            throw new Error('Error mesh deletion')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
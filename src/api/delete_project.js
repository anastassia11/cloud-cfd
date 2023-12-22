import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'
import tokenVerification from './token_verification'

export default async function deleteProject(projectId) {
    try {
        await tokenVerification()
        const response = await axios.delete(`${BASE_SERVER_URL}/api/Project/Delete/${projectId}`,
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenData')).token}`
                }
            })
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            throw new Error('Error project deletion')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
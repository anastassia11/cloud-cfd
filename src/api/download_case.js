import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'
import tokenVerification from './token_verification'

export default async function downloadCase(idProject) {
    try {
        await tokenVerification()
        const response = await axios.get(`${BASE_SERVER_URL}/api/Project/DownloadCase/${idProject}`,
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenData')).token}`
                }
            })
        if (response.status === 200 || response.status === 204) {
            return { success: true, status: response.status, data: response.data }
        } else {
            return { success: false, message: `Error download сase ${response.status}` }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
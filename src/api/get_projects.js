import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'
import tokenVerification from './token_verification'

export default async function getProjects() {
    try {
        await tokenVerification()
        const response = await axios.get(`${BASE_SERVER_URL}/api/User/Get_Projects`,
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenData')).token}`
                }
            })
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            throw new Error('Error getting list of user projects')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
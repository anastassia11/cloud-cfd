import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'
import tokenVerification from './token_verification'

export default async function createProject(name, description) {
    try {
        await tokenVerification()
        const response = await axios.post(`${BASE_SERVER_URL}/api/Project/Create`,
            { name, description },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenData')).token}`
                }
            }
        )
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            throw new Error('Error creating project')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}


import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function createProject(name, description) {
    try {
        const response = await axios.post(`${BASE_SERVER_URL}/api/Project/Create`,
            { name, description },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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


import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function createProject(projectName) {
    try {
        const response = await axios.post(`${BASE_SERVER_URL}/api/Project/Create`,
            projectName,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
        if (response.status === 200) {
            console.log(response)
            return { success: true, data: response.data }
        } else {
            throw new Error('Error creating project')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
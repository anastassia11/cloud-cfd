import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function create_project(projectName) {
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
            console.log(response.data)
            return { success: true }
        } else {
            throw new Error('Error creating project')
        }

    } catch (error) {
        return { success: false, message: error.message }
    }
}
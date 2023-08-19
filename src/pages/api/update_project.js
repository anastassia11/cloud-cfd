import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function updateProject(idProject, name, description) {
    try {
        const response = await axios.put(`${BASE_SERVER_URL}/api/Project/Update/${idProject}`,
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
            throw new Error('Error updating project')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
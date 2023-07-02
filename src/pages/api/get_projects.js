import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function getProjects() {
    try {
        const response = await axios.get(`${BASE_SERVER_URL}/api/User/Get_Projects`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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
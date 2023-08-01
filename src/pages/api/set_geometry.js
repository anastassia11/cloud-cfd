import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function setGeometry(formData) {
    try {
        const response = await axios.post(`${BASE_SERVER_URL}/api/GeometrySTL/Set`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        if (response.status === 200) {
            console.log(response)
            return { success: true, data: response.data }
        } else {
            throw new Error('Error loading geometry')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
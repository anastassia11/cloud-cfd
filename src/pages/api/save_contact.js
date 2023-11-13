import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function saveContact(formData) {
    try {
        const response = await axios.post(`${BASE_SERVER_URL}/api/User/SaveContact`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            throw new Error('Error saving contact')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
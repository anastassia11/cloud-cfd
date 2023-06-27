import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function login(url, email, password) {
    try {
        const response = await axios.post(`${BASE_SERVER_URL}/api/Auth/${url}`, {
            email,
            password
        })

        if (response.status === 200) {
            const token = response.data
            localStorage.setItem('token', token)
            return { success: true }
        } else {
            throw new Error('Invalid user')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
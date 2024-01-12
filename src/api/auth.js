import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function auth(url, email, password) {
    const time = Date.now()
    try {
        const response = await axios.post(`${BASE_SERVER_URL}/api/Auth/${url}`,
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.status === 200) {

            const tokenData = { ...response.data, time }
            localStorage.setItem('tokenData', JSON.stringify(tokenData))
            return { success: true }
        } else {
            throw new Error('Invalid user')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

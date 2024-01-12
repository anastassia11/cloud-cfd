import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function tokenVerification() {
    const loginUrl = '/login'
    let tokenData = localStorage.getItem('tokenData') ? JSON.parse(localStorage.getItem('tokenData')) : null
    const refreshToken = async (token) => {
        try {
            const response = await axios.post(`${BASE_SERVER_URL}/api/Auth/RefreshToken`,
                token,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.status === 200) {
                const tokenData = { ...response.data, time: Date.now() }
                localStorage.setItem('tokenData', JSON.stringify(tokenData))
                return { success: true, status: response.status, data: response.data }
            } else {
                return { success: false, message: `Error refreshing token ${response.status}` }
            }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }
    if (tokenData) {
        if (tokenData.time + tokenData.deadTime * 1000 < Date.now()) {
            try {
                const response = await refreshToken(tokenData.refreshToken)
                if (response.status === 200) {
                    return { success: true }
                } else {
                    throw new Error('Error')
                }
            } catch (error) {

            }
        }
    } else {
        return window.location.replace(loginUrl)
    }
}

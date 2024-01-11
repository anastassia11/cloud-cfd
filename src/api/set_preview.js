import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'
import tokenVerification from './token_verification'

export default async function setPreview(projectId, preview) {
    const form = new FormData()
    form.append('PreviewImage', preview, 'preview.jpeg')

    try {
        await tokenVerification()
        const response = await axios.post(`${BASE_SERVER_URL}/api/Project/SetPreview/${projectId}`,
            form,
            {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenData')).token}`
                },
            }
        )
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            throw new Error('Error setting preview')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
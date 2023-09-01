import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function addGeometry(formData) {
    const form = new FormData()
    form.append('Angle', formData.Angle)
    form.append('IdProject', formData.IdProject)
    form.append('File', formData.File)

    try {
        const response = await axios.post(`${BASE_SERVER_URL}/api/GeometrySTL/Set`,
            form,
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
                },
            }
        )
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            throw new Error('Error loading geometry')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
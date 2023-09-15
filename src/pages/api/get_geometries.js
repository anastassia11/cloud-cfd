import { BASE_SERVER_URL } from '@/utils/constants'
import axios from 'axios'

export default async function getGeometries(projectId) {
    try {
        const response = await axios.get(`${BASE_SERVER_URL}/api/Project/Get_Geometries/` + projectId)
        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            throw new Error('Error getting geometries')
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}
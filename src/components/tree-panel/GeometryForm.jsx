import { useEffect, useState } from "react"
import SvgSelector from "../SvgSelector"
import addGeometry from '@/pages/api/set_geometry'
import { useDispatch, useSelector } from 'react-redux'
import getGeometries from '@/pages/api/get_geometries'
import { setGeometries } from '@/store/slices/projectSlice'
import GeometryRow from './GeometryRow'
import { resetSetting } from '@/store/slices/settingSlice'

export default function GeometryForm({ }) {
    const [drag, setDrag] = useState(false)
    const [loading, setLoading] = useState([])
    const geoms = useSelector(state => state.project.geometries)
    const projectId = useSelector(state => state.project.projectId)
    const [files, setFiles] = useState(geoms || [])
    const [fileCount, setFileCount] = useState(geoms?.length)
    const dispatch = useDispatch()

    useEffect(() => {
        setFiles(geoms)
        setFileCount(geoms?.length)
    }, [geoms])

    const handleGeometrySubmit = (e) => {
        e.preventDefault()
        dispatch(resetSetting())
    }

    const handleDragStart = (e) => {
        e.preventDefault()
        setDrag(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setDrag(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDrag(false)
        const newFiles = Array.from(e.dataTransfer.files)
        setFiles((prevFiles) => [...prevFiles, ...newFiles])
        setLoading((prevLoading) => [...prevLoading, ...newFiles.map(() => false)])
        setFileCount((prevCount) => prevCount + newFiles.length)
        newFiles.forEach((file, index) => {
            handleSetGeometry({ 'Angle': '120', 'IdProject': projectId, 'File': file }, fileCount + index)
        })
    }

    const loadGeoms = async () => {
        const result = await getGeometries(projectId)
        if (result.success) {
            dispatch(setGeometries({ geometries: result.data.geometryDataList }))
            // обновление данных на сцене
            // loadSTL(result.data.geometryDataList)
        } else {
            alert(result.message)
        }
    }

    const handleSetGeometry = async (geometryData, index) => {
        setLoading((prevLoading) => {
            const newLoading = [...prevLoading]
            newLoading[index] = true
            return newLoading
        })
        console.log(geometryData)
        const result = await addGeometry(geometryData)
        if (result.success) {
            loadGeoms()
        } else {
            alert(result.message)
        }
        setLoading((prevLoading) => {
            const newLoading = [...prevLoading]
            newLoading[index] = false
            return newLoading
        })
    }

    const handleChange = (e) => {
        e.preventDefault()
        const newFiles = Array.from(e.target.files)
        setFiles((prevFiles) => [...prevFiles, ...newFiles])
        setLoading((prevLoading) => [...prevLoading, ...newFiles.map(() => false)])
        setFileCount((prevCount) => prevCount + newFiles.length)
        newFiles.forEach((file, index) => {
            handleSetGeometry({ 'Angle': '120', 'IdProject': projectId, 'File': file }, fileCount + index)
        })
    }

    const filesArray = <div className='mt-2'>
        {files?.map((file, index) => (
            <div key={index}>
                <GeometryRow geometry={file} loading={loading[index]} />
            </div>
        )
        )}
    </div>

    const upload = <div className='h-36 pt-3'>
        {drag
            ? <div className="bg-day-100 flex flex-col text-day-350 justify-start pt-4 items-center rounded 
                        border-dashed border-[1.5px] duration-300 border-gray-400 h-full"
                onDragStart={e => handleDragStart(e)}
                onDragLeave={e => handleDragLeave(e)}
                onDragOver={e => handleDragStart(e)}
                onDrop={e => handleDrop(e)}>
                <SvgSelector id='cloud-drop' />
                <p className="text-sm pt-2">Add your file</p></div>
            : <label for='geometry_file'
                className="flex flex-col text-day-350 justify-start pt-4 items-center space-y-2 bg-day-50 
                    hover:bg-day-100 hover:border-gray-400 h-full rounded border-dashed border-[1.5px] 
                    border-gray-300 duration-300 cursor-pointer"
                onDragStart={e => handleDragStart(e)}
                onDragLeave={e => handleDragLeave(e)}
                onDragOver={e => handleDragStart(e)}>
                <div className="flex flex-col justify-center items-center text-day-300">
                    <SvgSelector id='cloud-drag' />
                    <p className='text-sm pt-2'><span className='font-semibold'>Click to upload</span> or drag and drop</p>
                </div>
                <input type="file" multiple id='geometry_file' className="w-0 h-0"
                    onChange={e => handleChange(e)} />
                <p className="text-xs">Supported file formats: STL</p></label>}
    </div>

    return (
        <>
            <form onSubmit={handleGeometrySubmit} className='flex flex-col bg-white p-3 shadow rounded-md'>
                <div className='flex flex-row justify-between items-center border-b pb-2'>
                    <p className='self-end font-medium text-day-350'>Geomerty</p>
                    <div className='flex flex-row space-x-[6px]'>
                        <button type="submit" className="text-base font-medium text-white 
                            bg-orange-200 hover:bg-orange-100 active:bg-orange-150 duration-300 
                            rounded-md  w-8 h-8 border flex items-center justify-center">
                            <SvgSelector id='check' />
                        </button>
                        <button className="rounded-md text-day-300 w-8 h-8 border bg-day-50 hover:bg-day-100 
                            active:bg-day-150 flex items-center justify-center">
                            <SvgSelector id='close' />
                        </button>
                    </div>
                </div>
                {upload}
                {files?.length > 0 ? filesArray : ''}
            </form>
        </>
    )
}

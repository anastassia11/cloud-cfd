import { useEffect, useState } from "react"
import SvgSelector from "../SvgSelector"
import addGeometry from '@/pages/api/set_geometry'
import { Oval } from 'react-loader-spinner'
import getGeometries from '@/pages/api/get_geometries'

export default function GeometryForm({ onItemClick }) {
    const [drag, setDrag] = useState(false)
    const [loading, setLoading] = useState([])
    const [files, setFiles] = useState([])
    const [fileCount, setFileCount] = useState(0)

    const loadGeoms = async () => {
        const idProject = 1
        const result = await getGeometries(idProject)
        if (result.success) {
            setFiles(result.data.geometryDataList)
            setFileCount(result.data.geometryDataList.length)
            console.log(result.data.geometryDataList.length)
        } else {
            alert(result.message)
        }
    }

    const handleGeometrySubmit = (e) => {
        e.preventDefault()
        onItemClick()
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
            console.log(fileCount + index)
            handleSetGeometry({ 'Angle': '120', 'IdProject': '1', 'File': file }, fileCount + index)
        })
    }

    const handleSetGeometry = async (geometryData, index) => {
        setLoading((prevLoading) => {
            const newLoading = [...prevLoading]
            newLoading[index] = true
            return newLoading
        })
        const result = await addGeometry(geometryData)
        if (result.success) {
            console.log(result)
        } else {
            alert(result.message)
        }
        setLoading((prevLoading) => {
            const newLoading = [...prevLoading]
            newLoading[index] = false
            return newLoading
        })
    }

    const handleDeleteClick = async (idGeometry) => {

    }

    const handleChange = (e) => {
        e.preventDefault()
        const newFiles = Array.from(e.target.files)
        setFiles((prevFiles) => [...prevFiles, ...newFiles])
        setLoading((prevLoading) => [...prevLoading, ...newFiles.map(() => false)])
        setFileCount((prevCount) => prevCount + newFiles.length)
        newFiles.forEach((file, index) => {
            console.log(fileCount + index)
            handleSetGeometry({ 'Angle': '120', 'IdProject': '1', 'File': file }, fileCount + index)
        })
    }

    useEffect(() => {
        loadGeoms()
    }, [])

    const filesArray = <div className='mt-2'>
        {files.map((file, index) => (
            <div key={file.name}
                className='w-full flex items-center justify-between rounded-md text-day-350 h-9 hover:bg-day-100 duration-300' >
                <p className='pl-2'>{file.name}</p>
                <div className='pr-2 flex flex-row items-center'>
                    {loading[index] ?
                        <Oval
                            height={18}
                            width={18}
                            color="#6a6a6a"
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#6a6a6a"
                            strokeWidth={4}
                            strokeWidthSecondary={4} /> : ''
                    }
                    <button className="pl-1" id='button'
                        onClick={() => handleDeleteClick()}>
                        <SvgSelector id='delete' className='w-5 h-5' stroke-width={1.3} />
                    </button>
                </div>
            </div>)
        )}
    </div>

    const upload = <div className='h-36 pt-3'>
        {drag
            ? <div className="bg-day-100 flex flex-col text-day-350 justify-start pt-4 items-center rounded border-dashed border-[1.5px] duration-300 border-gray-400 h-full"
                onDragStart={e => handleDragStart(e)}
                onDragLeave={e => handleDragLeave(e)}
                onDragOver={e => handleDragStart(e)}
                onDrop={e => handleDrop(e)}>
                <SvgSelector id='cloud-drop' />
                <p className="text-sm pt-2">Add your file</p></div>
            : <label for='geometry_file'
                className="flex flex-col text-day-350 justify-start pt-4 items-center space-y-2 bg-day-50 hover:bg-day-100 hover:border-gray-400 h-full rounded border-dashed border-[1.5px] border-gray-300 duration-300 cursor-pointer"
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
        <form onSubmit={handleGeometrySubmit} className='flex flex-col bg-white w-[335px] p-3 shadow rounded-md'>
            <div className='flex flex-row justify-between items-center border-b pb-2'>
                <p className='self-end font-medium text-day-350'>Geomerty</p>

                <button type="submit" className="rounded-md text-day-300 w-8 h-8 border bg-day-50 hover:bg-day-100 active:bg-day-150 flex items-center justify-center">
                    <SvgSelector id='check' />
                </button>
            </div>
            {upload}
            {files.length > 0 ? filesArray : ''}
        </form>
    )
}

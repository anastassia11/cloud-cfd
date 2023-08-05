import { useState } from "react"
import SvgSelector from "../SvgSelector"
import setGeometry from '@/pages/api/set_geometry'
import deleteGeometry from '@/pages/api/delete_geometry'

export default function GeometryForm({ onItemClick }) {
    const [drag, setDrag] = useState(false)
    const [showFileInfo, setShowFileInfo] = useState(false)
    const [geometry, setGeometry] = useState()

    const geometryData = new FormData()

    const handleGeometrySubmit = (e) => {
        e.preventDefault()
        onItemClick()
        handleSetGeometry(geometryData)
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
        geometryData.append('Angle', 120)
        geometryData.append('IdProject', 1)
        geometryData.append('File', e.dataTransfer.files[0])
        setGeometry(e.dataTransfer.files[0].name)
        setShowFileInfo(true)
        console.log(showFileInfo)
        console.log(geometry)
    }

    const handleSetGeometry = async (geometryData) => {
        const result = await setGeometry(geometryData)
        if (result.success) {
            console.log('success')
        } else {
            alert(result.message)
        }
    }

    const handleDeleteClick = async (idGeometry) => {
        const result = await deleteGeometry(idGeometry)
        if (result.success) {
            console.log('success')
        } else {
            alert(result.message)
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        geometryData.append('Angle', 120)
        geometryData.append('IdProject', 1)
        geometryData.append('File', e.target.files[0])
        setGeometry(e.target.files[0].name)
        setShowFileInfo(true)
        console.log(showFileInfo)
        console.log(geometry)
    }

    let upload = ''
    if (showFileInfo) {
        upload =
            <div className="flex flex-row h-[124px]">
                <div className='flex flex-row h-fit justify-between w-full items-center mt-2'>
                    <div className="bg-day-100 flex flex-col text-day-350 justify-center items-start p-2 h-9 rounded border border-day-200">
                        {geometry}
                    </div>
                    <button className="p-2 rounded-md text-day-300 hover:text-black duration-300 w-8 h-8"
                        onClick={() => handleDeleteClick()}>
                        <SvgSelector id='close' />
                    </button>
                </div>

            </div>
    } else {
        upload = <div className='h-36 pt-3'>
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
                    <input type="file" id='geometry_file' className="w-0 h-0"
                        onChange={e => handleChange(e)} />
                    <p className="text-xs">Supported file formats: STL</p></label>}
        </div>
    }
    return (
        <form onSubmit={handleGeometrySubmit} className='flex flex-col bg-white w-[335px] p-3 shadow rounded-md'>
            <div className='flex flex-row justify-between items-center border-b pb-2'>
                <p className='self-end font-medium text-day-350'>Geomerty</p>
                <button type="submit" className='flex items-center self-end justify-center w-8 h-8 bg-day-100 rounded hover:bg-day-150 active:bg-day-200 text-day-350 hover:text-black'>
                    <SvgSelector id='check' />
                </button>
            </div>
            {upload}
        </form>
    )
}

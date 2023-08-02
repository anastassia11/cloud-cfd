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
        upload = <div>
            {drag
                ? <div className="bg-day-150 flex flex-col text-day-350 justify-center items-center mt-3 h-28 rounded border-dashed border border-gray-300"
                    onDragStart={e => handleDragStart(e)}
                    onDragLeave={e => handleDragLeave(e)}
                    onDragOver={e => handleDragStart(e)}
                    onDrop={e => handleDrop(e)}>
                    <SvgSelector id='cloud-drop' />
                    <p className="italic text-sm">Add your file</p></div>
                : <div className="flex flex-col text-day-350 justify-center items-center space-y-2 bg-day-100 mt-3 h-28 rounded border-dashed border border-gray-300"
                    onDragStart={e => handleDragStart(e)}
                    onDragLeave={e => handleDragLeave(e)}
                    onDragOver={e => handleDragStart(e)}>
                    <div className="flex flex-row justify-center">
                        <SvgSelector id='cloud-drag' />
                        <p className='text-sm pt-2 pl-1'>Drag and drop<span className='italic pl-1'>or</span></p>
                    </div>
                    <form>
                        <div className="flex items-center">
                            <label for='geometry_file' className='px-2 h-8 w-fit text-sm flex flex-row items-center bg-day-00 rounded border border-day-200 hover:shadow active:shadow-inner cursor-pointer'>
                                <SvgSelector id='computer' />
                                <p className='text-sm pl-1'>Import from Computer</p>
                            </label>
                            <input type="file" id='geometry_file' className="w-0"
                                onChange={e => handleChange(e)} />
                        </div>
                    </form>

                    <p className="text-xs italic">Supported file formats: .stl</p></div>}
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

import { useState } from "react"
import SvgSelector from "../svg/SvgSelector"

export default function GeometryForm({ onItemClick }) {
    const [drag, setDrag] = useState(false)
    const [showFileInfo, setShowFileInfo] = useState(false)
    const [file, setFile] = useState()
    const geometryData = new FormData()

    const handleGeometrySubmit = (e) => {
        e.preventDefault()
        onItemClick()
        geometryData.append('geomerty', file)
        //здесь фечится geometryData или стейт file
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
        let file = e.dataTransfer.files
        setDrag(false)
        setFile(file[0])
        setShowFileInfo(true)
    }
    let upload = ''
    if (showFileInfo) {
        upload =
            <div className="flex flex-row">
                <div className="bg-gray-100 flex flex-col text-gray-700 justify-center items-start p-2 mt-3 h-9 rounded border border-gray-300">
                    {file.name}
                </div>
            </div>
    } else {
        upload = <div>
            {drag
                ? <div className="bg-slate-200 flex flex-col text-gray-700 justify-center items-center mt-3 h-28 rounded border-dashed border border-gray-300"
                    onDragStart={e => handleDragStart(e)}
                    onDragLeave={e => handleDragLeave(e)}
                    onDragOver={e => handleDragStart(e)}
                    onDrop={e => handleDrop(e)}>
                    <SvgSelector id='cloud-drop' />
                    <p className="italic">Add your file</p></div>
                : <div className="flex flex-col text-gray-700 justify-center items-center space-y-2 bg-gray-100 mt-3 h-28 rounded border-dashed border border-gray-300"
                    onDragStart={e => handleDragStart(e)}
                    onDragLeave={e => handleDragLeave(e)}
                    onDragOver={e => handleDragStart(e)}>
                    <div className="flex flex-row justify-center items-center">
                        <SvgSelector id='cloud-drag' />
                        <p>Drag and drop</p>
                    </div>
                    <p className="text-xs italic">Supported file formats: .stl</p></div>}
        </div>
    }
    return (
        <form onSubmit={handleGeometrySubmit} className='flex flex-col bg-white w-96 p-3 shadow rounded-lg'>
            <div className='flex flex-row justify-between items-center border-b pb-2'>
                <p className='self-end font-semibold'>Geomerty</p>
                <button type="submit" className='flex items-center self-end justify-center w-8 h-8 bg-gray-100 rounded hover:bg-gray-200 active:bg-gray-300'>
                    <SvgSelector id='check' />
                </button>
            </div>
            {upload}
        </form>
    )
}

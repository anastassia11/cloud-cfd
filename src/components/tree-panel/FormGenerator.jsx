import { useState } from "react"
import SvgSelector from "../SvgSelector"

export default function FormGenerator({ formTitle, value, setUserValue, onItemClick }) {
    const [formValues, setFormValues] = useState(value)
    const [selectedOption, setSelectedOption] = useState({});
    const [drag, setDrag] = useState(false)
    const [showFileInfo, setShowFileInfo] = useState(false)
    const [file, setFile] = useState()

    // const geometryData = new FormData()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues(prev => ({ ...prev, [name]: { ...prev[name], value: value } }))
    }
    const handleSelectChange = (e, name) => {
        const { value } = e.target
        setSelectedOption(prev => ({ ...prev, [name]: value }))
        setFormValues(prev => ({ ...prev, [name]: { ...prev[name], value: value } }))
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        setUserValue(formValues)
        onItemClick()
    }
    const handleGeometrySubmit = (e) => {
        e.preventDefault()
        onItemClick()
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
        // cтейт заменить на FormData()
        // geometryData.append('geomerty', file[0])
        setFile(file[0])
        setShowFileInfo(true)
    }

    const inputs = Object.keys(formValues).map((key) => {
        const isSelect = formValues[key].select
        const input = isSelect
            ? <select value={selectedOption[key] || formValues[key].value} onChange={(e) => handleSelectChange(e, key)}
                className="p-0 h-8 w-full rounded-sm border-2 border-gray-100 focus:outline-[0]">
                {formValues[key].options.map((item) => <option value={item}>{item}</option>)}
            </select >
            : <div className="flex flex-row items-center">
                <input key={key} type="number" name={key} value={formValues[key].value} onChange={handleInputChange}
                    className='h-8 w-3/4 rounded-sm border-2 border-gray-100 p-2 focus:outline-[0]' >
                </input>
                <span className=" px-2 w-1/4 text-center">{formValues[key].unit}</span>
            </div>
        return (
            <div className='flex flex-row items-end mt-2'>
                <label htmlFor={key}
                    className='w-1/2'>{formValues[key].name}</label>
                <div className='w-1/2'>
                    {input}
                </div>
            </div >
        )
    })

    let upload = ''
    if (showFileInfo) {
        upload =
            <div className="flex flex-row">
                <div className="bg-gray-100 flex flex-col text-gray-700 justify-center items-start p-2 mt-3 h-9 rounded border border-gray-300">
                    {file.name}
                </div>
                {/* <button onClick={}>delete</button> */}
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
                    <p className="text-xs italic">Supported file formats: .vtk</p></div>}
        </div>
    }

    if (formTitle === 'Geomerty') {
        return (
            <form onSubmit={handleGeometrySubmit} className='flex flex-col bg-white w-96 p-3 shadow'>
                <div className='flex flex-row justify-between items-center border-b-2 pb-2'>
                    <p className='self-end font-semibold'>{formTitle}</p>
                    <button type="submit"
                        className='flex items-center self-end justify-center w-8 h-8 bg-gray-200 rounded hover:shadow hover:bg-gray-300 active:shadow-inner'>
                        <SvgSelector id='check' />
                    </button>
                </div>
                {upload}
            </form>
        )
    } else {
        return (
            <form onSubmit={handleFormSubmit} className='flex flex-col bg-white w-96 p-3 shadow'>
                <div className='flex flex-row justify-between items-center border-b-2 pb-2'>
                    <p className='self-end font-semibold'>{formTitle}</p>
                    <button type="submit"
                        className='flex items-center self-end justify-center w-8 h-8 bg-gray-200 rounded hover:shadow hover:bg-gray-300 active:shadow-inner'>
                        <SvgSelector id='check' />
                    </button>
                </div>
                {inputs}
            </form>
        )
    }
}

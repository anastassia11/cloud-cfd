import { useEffect, useState } from "react"
import SvgSelector from "../SvgSelector"
import addGeometry from '@/api/set_geometry'
import { useDispatch, useSelector } from 'react-redux'
import getGeometries from '@/api/get_geometries'
import { setGeometries } from '@/store/slices/projectSlice'
import { resetSetting } from '@/store/slices/settingSlice'
import { Oval } from 'react-loader-spinner'
import DeleteGeometry from '../geometries-panel/DeleteGeometry'

export default function GeometryForm({ }) {
    const geoms = useSelector(state => state.project.geometries)
    const projectId = useSelector(state => state.project.projectId)

    const [drag, setDrag] = useState(false)
    const [loading, setLoading] = useState([])
    const [files, setFiles] = useState(geoms || [])
    const [fileCount, setFileCount] = useState(geoms?.length ?? 0)

    const dispatch = useDispatch()


    useEffect(() => {
        geoms && setFiles(geoms)
        setFileCount(geoms?.length ?? 0)
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
        setFileCount((prevCount) => prevCount + newFiles.length)
        newFiles.forEach((file, index) => {
            handleSetGeometry({ 'Angle': '120', 'IdProject': projectId, 'File': file }, fileCount + index)
        })
    }

    const loadGeoms = async () => {
        const result = await getGeometries(projectId)
        if (result.success) {
            dispatch(setGeometries({ geometries: result.data.geometryDataList }))
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

        const result = await addGeometry(geometryData)
        if (result.success) {
            loadGeoms()
            setLoading((prevLoading) => {
                const newLoading = [...prevLoading]
                newLoading[index] = false
                return newLoading
            })
        } else {
            alert(result.message)
            setLoading((prevLoading) => {
                const newLoading = [...prevLoading]
                newLoading[index] = false
                return newLoading
            })
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        const newFiles = Array.from(e.target.files)
        setFiles((prevFiles) => [...prevFiles, ...newFiles])
        // setLoading((prevLoading) => [...prevLoading, ...newFiles.map(() => false)])
        setFileCount((prevCount) => prevCount + newFiles.length)
        newFiles.forEach((file, index) => {
            handleSetGeometry({ 'Angle': '120', 'IdProject': projectId, 'File': file }, fileCount + index)
        })
    }

    const Geometry = ({ geometry, loading }) => {
        const [modal, setModal] = useState(false)
        const handleDeleteClick = (e) => {
            e.stopPropagation()
            setModal(true)
        }
        return (
            <div className='w-full flex items-center justify-between rounded-md text-day-350 h-9 
            hover:bg-day-100 duration-300 ' >
                <p className='pl-2'>{geometry.name}</p>
                <div className='pr-2 flex flex-row items-center'>
                    {loading ?
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
                    <button className="pl-1" id='button' type='button'
                        onClick={(e) => handleDeleteClick(e)}>
                        <SvgSelector id='delete' className='w-5 h-5' strokeWidth={1.3} />
                    </button>
                </div>
                {modal ? <DeleteGeometry onCloseClick={() => setModal(false)} geometry={geometry} /> : ''}
            </div>
        )
    }
    const filesArray = <div className='mt-2'>
        {files?.map((file, index) => (
            <div key={index}>
                <Geometry geometry={file} loading={loading[index]} />
            </div>
        ))}
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
            : <label htmlFor='geometry_file'
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
            <form onSubmit={handleGeometrySubmit} className='flex flex-col bg-white p-3 shadow rounded-md h-fit'>
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

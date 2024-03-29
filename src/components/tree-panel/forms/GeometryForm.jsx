import { memo, useRef, useState } from "react"
import SvgSelector from "../../SvgSelector"
import addGeometry from '@/api/set_geometry'
import { useDispatch, useSelector } from 'react-redux'
import getGeometries from '@/api/get_geometries'
import { setGeometries } from '@/store/slices/projectSlice'
import { resetSetting } from '@/store/slices/settingSlice'
import Modal from '../../Modal'
import GeometryRow from '../GeometryRow'
import { setMeshes } from '@/store/slices/meshSlice'

const GeometryForm = memo(({ }) => {
    const geoms = useSelector(state => state.project.geometries) ?? []
    const projectId = useSelector(state => state.project.projectId)
    const meshes = useSelector(state => state.mesh.meshes) ?? []

    const [drag, setDrag] = useState(false)

    const [loading, setLoading] = useState(new Array(geoms.length).fill(false))
    const [files, setFiles] = useState(geoms)
    const [fileCount, setFileCount] = useState(geoms.length)


    const [modal, setModal] = useState(false)
    const newFiles = useRef(null)

    const dispatch = useDispatch()

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
        newFiles.current = Array.from(e.dataTransfer.files)
        meshes.length ? setModal(true) : handleLoadClick()
    }

    const loadGeoms = async () => {
        const result = await getGeometries(projectId)
        if (result.success && result.status === 200) {
            dispatch(setGeometries({ geometries: result.data.geometryDataList }))
        } else if (result.status !== 204 && result.status !== 200) {
            alert(result.message)
        }
    }

    const handleSetGeometry = async (geometryData, index) => {
        const result = await addGeometry(geometryData)
        if (result.success) {
            setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
        } else {
            alert(result.message)
            setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        newFiles.current = Array.from(e.target.files)
        meshes.length ? setModal(true) : handleLoadClick()
    }

    const handleLoadClick = async () => {
        setModal(false)
        setFiles((prevFiles) => [...prevFiles, ...newFiles.current])
        setLoading((prevLoading) => [...prevLoading, ...newFiles.current.map(() => true)])
        setFileCount((prevCount) => prevCount + newFiles.current.length)
        await Promise.all(newFiles.current.map(async (file, index) => {
            await handleSetGeometry({ 'Angle': '120', 'IdProject': projectId, 'File': file }, fileCount + index);
        }));
        loadGeoms()
        dispatch(setMeshes({ meshes: [] }))
    }

    const title = <>
        {<div className='flex flex-row self-end'>
            <SvgSelector id='warning' />
            <p className='ml-2 font-semibold'>Warning</p>
        </div>}
    </>

    const filesArray =
        <div className='mt-2'>
            {files?.map((file, index) => {
                return <div key={index}>
                    <GeometryRow geometry={file} loading={loading[index]} />
                </div>
            })}
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
                    <p className='font-medium text-day-350'>Geomerty</p>
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
            {modal ? <Modal onCloseClick={() => setModal(false)} onActionClick={handleLoadClick}
                title={title} message='Mesh will be deleted.' btnTitle='OK' /> : ''}
        </>
    )
})
export default GeometryForm;
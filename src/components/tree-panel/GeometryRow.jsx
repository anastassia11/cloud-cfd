import { deleteGeometries } from '@/store/slices/projectSlice'
import { Oval } from 'react-loader-spinner'
import SvgSelector from '../SvgSelector'
import Modal from '../Modal'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setMeshes } from '@/store/slices/meshSlice'

export default function GeometryRow({ geometry, loading }) {
    const meshes = useSelector(state => state.mesh.meshes) ?? []
    const projectId = useSelector(state => state.project.projectId)
    const [deleteModal, setDeleteModal] = useState(false)

    const dispatch = useDispatch()

    function handleDeleteClick(e) {
        e.stopPropagation()
        setDeleteModal(true)
    }

    function deleteGeometry() {
        dispatch(deleteGeometries({ projectId: projectId, deletedGeometry: geometry }))
        dispatch(setMeshes({ meshes: [] }))
        setDeleteModal(false)
    }

    const message = <>
        <p>
            {`'${geometry.name}' will be deleted forever.`}
        </p>
        {meshes.length ? <div className='flex flex-row self-end mt-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className='ml-2 font-semibold'>Mesh will be deleted.</p>
        </div> : ''}
    </>

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
            {deleteModal ? <Modal onCloseClick={() => setDeleteModal(false)} onActionClick={deleteGeometry}
                title='Delete geometry' message={message} btnTitle='Delete' /> : ''}
        </div>
    )
}
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
        {meshes.length ? <div className='flex flex-row items-center p-1.5 self-end mt-2 rounded-md bg-yellow-50 border border-yellow-300'>
            <SvgSelector id='warning-empty' />
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
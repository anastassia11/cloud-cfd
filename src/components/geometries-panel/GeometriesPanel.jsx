import React, { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'
import Geometry from './Geometry'
import { useDispatch, useSelector } from 'react-redux'
import { setSceneMode } from '@/store/slices/projectSlice'
import getMeshDataJson from '@/api/get_meshData'
import { setCurrentMesh, setMeshes } from '@/store/slices/meshSlice'
import deleteClip from '@/api/delete_clip'
import deleteMesh from '@/api/delete_mesh'
import Modal from '../Modal'

export default function GeometriesPanel({ onHidePartObject }) {
    const dispatch = useDispatch()
    const geoms = useSelector(state => state.project.geometries) ?? []
    const meshes = useSelector(state => state.mesh.meshes) ?? []
    const currentMesh = useSelector(state => state.mesh.currentMesh)
    const projectId = useSelector(state => state.project.projectId)
    const sceneMode = useSelector(state => state.project.sceneMode)

    const [modalMesh, setModalMesh] = useState(false);

    useEffect(() => {
        fetchMeshes()
    }, [])

    useEffect(() => {
        !meshes.length && dispatch(setSceneMode('geom'))
    }, [meshes])

    const fetchMeshes = async () => {
        const result = await getMeshDataJson(projectId)
        if (result.success) {
            dispatch(setMeshes({ meshes: result.data.meshes }))
            dispatch(setCurrentMesh({
                uid: result.data.meshes[0].uid,
                path: result.data.meshes[0].path
            }))
        } else {
            // alert(result.message)
        }
    }

    const handleDeleteClick = (e) => {
        e.stopPropagation()
        setModalMesh(true)
    }

    const deleteMeshes = async () => {
        const result = await deleteMesh(projectId)
        if (result.success) {
            dispatch(setMeshes({ meshes: [] }))
        } else {
            alert(result.message)
        }
        setModalMesh(false)
    }

    const handleDeleteClip = async (uidClip) => {
        const result = await deleteClip(projectId, uidClip)
        if (result.success) {
            let newMeshes = meshes.map(mesh => {
                return {
                    ...mesh,
                    clipMeshes: mesh.clipMeshes.filter(clipMesh => clipMesh.uid !== uidClip)
                };
            });
            dispatch(setMeshes({ meshes: newMeshes }));
            dispatch(setCurrentMesh({
                uid: meshes[0].uid,
                path: meshes[0].path
            }))
        } else {
            alert(result.message)
        }
    }

    const handleMeshClick = () => {
        meshes.length && dispatch(setSceneMode('mesh'))
    }

    const Clip = ({ clip }) => {
        // const [modalClip, setModalClip] = useState(false);
        const { name, uid, path } = clip;
        return (
            <>
                <div className={`cursor-pointer w-full flex items-center justify-between rounded-md text-day-350 h-9 
                                    hover:bg-day-150 active:bg-day-200 overflow-hidden group
                                    ${currentMesh.uid === uid ? 'bg-day-150' : ''}`}
                    onClick={() => dispatch(setCurrentMesh({ uid, path, isClip: true }))}>
                    <p className='pl-[9px] text-ellipsis whitespace-nowrap overflow-hidden'>{name}</p>
                    <div className='pr-2 flex flex-row items-center'>
                        <button className='invisible group-hover:visible'
                            onClick={() => handleDeleteClip(uid)}>
                            <SvgSelector id='delete' className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                {/* {modalClip ? <Modal onCloseClick={() => setModalClip(false)} onActionClick={() => handleDeleteClip(uid)}
                    title='Delete clip' message={`${name} will be deleted forever.`} btnTitle='Delete' /> : ''} */}
            </>

        )
    }

    const Mesh = ({ mesh }) => {
        const { name, uid, path, clipMeshes } = mesh;
        return (
            <div>
                <div className={`cursor-pointer w-full flex items-center justify-between rounded-md text-day-350 h-9 
                        hover:bg-day-150 active:bg-day-200 overflow-hidden group
                        ${currentMesh.uid === uid ? 'bg-day-150' : ''}`}
                    onClick={() => dispatch(setCurrentMesh({ uid, path, isClip: false }))}>
                    <p className='pl-[9px] text-ellipsis whitespace-nowrap overflow-hidden'>{name}</p>
                    <div className='pr-2 flex flex-row items-center'>
                        <button className='invisible group-hover:visible'
                            onClick={handleDeleteClick}>
                            <SvgSelector id='delete' className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <ul className='ml-4 pl-2 border-l text-base font-normal'>
                    {
                        clipMeshes.map((clip) => (
                            <li key={clip.uid}>
                                {Clip({ clip })}
                            </li>
                        ))
                    }
                </ul>
                {modalMesh ? <Modal onCloseClick={() => setModalMesh(false)} onActionClick={deleteMeshes}
                    title='Delete mesh' message='Mesh will be deleted forever.' btnTitle='Delete' /> : ''}
            </div >
        )
    }
    return (
        <div className='flex flex-col text-day-350 bg-day-00 rounded-md max-h-full shadow px-3'>
            <div className="flex flex-row items-center justify-between">
                <button className={`w-[60%] py-3 border-b-2 text-base 
                    ${sceneMode === 'geom' ? 'border-orange-600 text-orange-600 font-semibold ' : 'border-gray-300'}`}
                    onClick={() => dispatch(setSceneMode('geom'))}>
                    <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
                        GEOMETRIES {`(${geoms.length})`}
                    </p>
                </button>
                <button className={`w-[40%] py-3 border-b-2 border-gray-300
                     ${!meshes.length && 'opacity-40 cursor-default'}
                     ${sceneMode === 'mesh' ? 'border-orange-600 text-orange-600 font-semibold ' : 'border-gray-300'}`}
                    onClick={handleMeshClick}>
                    <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
                        MESH
                    </p>
                </button>
            </div>
            <div className='overflow-y-auto'>
                {sceneMode === 'geom' && geoms.length > 0 ? <ul className='my-2'>
                    {geoms.map(geom => (
                        <li key={geom.uid}>
                            <Geometry geom={geom} hidePartObject={onHidePartObject} />
                        </li>
                    ))}
                </ul> : ''}
                {sceneMode === 'mesh' && meshes.length > 0 ? <ul className='m-2'>
                    {meshes.map(mesh => (
                        <li key={mesh.uid}>
                            {Mesh({ mesh })}
                        </li>
                    ))}
                </ul> : ''}
            </div>
        </div>
    )
}

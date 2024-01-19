import React, { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'
import Geometry from './Geometry'
import { useDispatch, useSelector } from 'react-redux'
import { setSceneMode } from '@/store/slices/projectSlice'
import getMeshDataJson from '@/api/get_meshData'
import { setCurrentMesh, setMeshes } from '@/store/slices/meshSlice'

export default function GeometriesPanel({ onHidePartObject }) {
    const dispatch = useDispatch()
    const geomsState = useSelector(state => state.project.geometries)
    const meshesState = useSelector(state => state.mesh.meshes)
    const currentMesh = useSelector(state => state.mesh.currentMesh)
    const projectId = useSelector(state => state.project.projectId)
    const sceneMode = useSelector(state => state.project.sceneMode)
    const geoms = geomsState ? geomsState : []
    const meshes = meshesState ? meshesState : []

    useEffect(() => {
        fetchMeshes()
    }, [])

    async function fetchMeshes() {
        const result = await getMeshDataJson(projectId)
        if (result.success) {
            dispatch(setMeshes({ meshes: result.data.meshes }))
            dispatch(setCurrentMesh({
                uid: result.data.meshes[0].uid,
                path: result.data.meshes[0].path
            }))
        } else {
            alert(result.message)
        }
    }

    function selectMesh(uid, path) {
        dispatch(setCurrentMesh({ uid, path }))
    }

    function deleteMesh(uid) {

    }

    const Clip = ({ clip }) => {
        const { path, uid } = clip;
        return (
            <div className={`cursor-pointer w-full flex items-center justify-between rounded-md text-day-350 h-9 
                                    hover:bg-day-150 active:bg-day-200 overflow-hidden group
                                    ${currentMesh.uid === uid ? 'bg-day-150' : ''}`}
                onClick={() => selectMesh(uid, path)}>
                <p className='pl-[9px] text-ellipsis whitespace-nowrap overflow-hidden'>{`Clip_${uid}`}</p>
                <div className='pr-2 flex flex-row items-center'>
                    <button className='invisible group-hover:visible'
                        onClick={() => deleteMesh(uid)}>
                        <SvgSelector id='delete' className="h-5 w-5" />
                    </button>
                </div>
            </div>
        )
    }

    const Mesh = ({ mesh }) => {
        const { clipMeshes, path, uid } = mesh;
        return (
            <div>
                <div className={`cursor-pointer w-full flex items-center justify-between rounded-md text-day-350 h-9 
                        hover:bg-day-150 active:bg-day-200 overflow-hidden group
                        ${currentMesh.uid === uid ? 'bg-day-150' : ''}`}
                    onClick={() => selectMesh(uid, path)}>
                    <p className='pl-[9px] text-ellipsis whitespace-nowrap overflow-hidden'>{`Mesh_${uid}`}</p>
                    <div className='pr-2 flex flex-row items-center'>
                        <button className='invisible group-hover:visible'
                            onClick={() => deleteMesh(uid)}>
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
                {/* {modal ? <DeleteGeometry onCloseClick={() => setModal(false)} geometry={geometry} /> : ''} */}
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
                     ${sceneMode === 'mesh' ? 'border-orange-600 text-orange-600 font-semibold ' : 'border-gray-300'}`}
                    onClick={() => dispatch(setSceneMode('mesh'))}>
                    <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
                        MESH
                    </p>
                </button>
            </div>
            <div className='overflow-y-auto '>
                {sceneMode === 'geom' && geoms.length > 0 ? <ul className='m-2'>
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

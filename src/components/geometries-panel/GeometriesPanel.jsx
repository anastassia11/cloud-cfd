import React, { useState } from 'react'
import SvgSelector from '../SvgSelector'
import Geometry from './Geometry'
import { useDispatch, useSelector } from 'react-redux'
import { setSceneMode } from '@/store/slices/projectSlice'

export default function GeometriesPanel({ onHidePartObject }) {
    const dispatch = useDispatch()
    const geomsState = useSelector(state => state.project.geometries)
    const geoms = geomsState ? geomsState : []
    const loader = useSelector(state => state.loader.loader)
    const sceneMode = useSelector(state => state.project.sceneMode)

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
                    {geoms.map((geom) => (
                        <li className="" key={geom.uid}>
                            <Geometry geom={geom} hidePartObject={(model) => onHidePartObject(model)} />
                        </li>
                    ))}
                </ul> : ''}
                {sceneMode === 'mesh' ? <ul className='m-2'>
                    Здесь будут Meshes и Sclices
                </ul> : ''}
            </div>
        </div>
    )
}

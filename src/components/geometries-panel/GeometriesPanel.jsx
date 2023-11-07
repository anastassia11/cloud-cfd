import React from 'react'
import SvgSelector from '../SvgSelector'
import Geometry from './Geometry'
import { useSelector } from 'react-redux'

export default function GeometriesPanel({ onHidePartObject }) {
    const geomsState = useSelector(state => state.project.geometries)
    const geoms = geomsState ? geomsState : []
    const loader = useSelector(state => state.loader.loader)

    return (
        <div className='flex flex-col z-10 bg-day-00 rounded-md max-h-full
                shadow'>
            <div className='p-3 pb-0'>
                <div className="text-day-350 flex items-center border-b pb-3">
                    <span className='min-w-[24px] mr-1'>
                        <SvgSelector id='geometry' className='' />
                    </span>
                    <span className="block text-base font-semibold pt-[2px]">
                        <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
                            GEOMETRIES {`(${geoms.length})`}
                        </p>
                    </span>
                </div>
            </div>
            <div className='overflow-y-auto '>
                {geoms.length > 0 ? <ul className='m-2'>
                    {geoms.map((geom) => (
                        <li className="" key={geom.uid}>
                            <Geometry geom={geom} hidePartObject={(model) => onHidePartObject(model)} />
                        </li>
                    ))}
                </ul> : ''}
            </div>
        </div >
    )
}

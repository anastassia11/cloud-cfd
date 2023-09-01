import React from 'react'
import SvgSelector from '../SvgSelector'
import Geometry from './Geometry'
import { useSelector } from 'react-redux'

export default function GeometriesPanel({ onHidePartObject }) {
    const geoms = useSelector(state => state.geometries.geometries)

    return (
        <div className='max-h-[calc(100vh-73px)] bg-day-00 overflow-y-auto overflow-x-hidden p-2 rounded-md 
                shadow h-fit'>
            <div className="text-day-350 w-full flex items-center gap-x-1 border-b pb-2 pl-[6px] pr-[1px]">
                <span className='min-w-[24px]'>
                    <SvgSelector id='geometry' className='' />
                </span>

                <span className="block text-base font-semibold pt-[9px] pb-1">
                    <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
                        GEOMETRIES {`(${geoms.length})`}
                    </p>
                </span>
            </div>
            <div className='mt-2'>
                {geoms.map((geom) => (
                    <div className="" key={geom.uid}>
                        <Geometry geom={geom} hidePartObject={(model) => onHidePartObject(model)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

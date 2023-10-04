import React from 'react'
import SvgSelector from '../SvgSelector'
import Geometry from './Geometry'
import { useSelector } from 'react-redux'

export default function GeometriesPanel({ onHidePartObject }) {
    const geomsState = useSelector(state => state.project.geometries)
    const geoms = geomsState ? geomsState : []
    const loader = useSelector(state => state.loader.loader)

    return (
        <div className='max-h-[calc(100vh-73px)] bg-day-00 overflow-y-auto pb-2 rounded-md opacity-95
                shadow h-fit'>
            <div className="flex flex-col h-full px-2 ">
                <div className="text-day-350 flex items-center justify-between pt-[10px]  
                    pl-[6px] pr-[1px] overflow-hidden">
                    <div className="flex items-center gap-x-1 ">
                        <span className='min-w-[24px]'>
                            <SvgSelector id='geometry' className='' />
                        </span>

                        <span className="block text-base font-semibold pt-[2px]">
                            <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
                                GEOMETRIES {`(${loader ? 0 : geoms.length})`}
                            </p>
                        </span>
                    </div>
                </div>
                {geoms.length > 0 ? <ul className='mt-2 pt-2 border-t'>
                    {!loader && geoms.map((geom) => (
                        <li className="" key={geom.uid}>
                            <Geometry geom={geom} hidePartObject={(model) => onHidePartObject(model)} />
                        </li>
                    ))}
                </ul> : ''}
            </div>

        </div>
    )
}

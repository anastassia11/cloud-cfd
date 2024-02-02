import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import SvgSelector from '../SvgSelector'
import { setSelectedParts } from '@/store/slices/projectSlice'
import { Tooltip } from 'react-tooltip'

export default function BoundaryLayer({ onParamsChange, stlGeometries }) {
    const dispatch = useDispatch()
    const selectedParts = useSelector(state => state.project.selectedParts) ?? []
    const geoms = useSelector(state => state.project.geometries) ?? []
    const [regions, setRegions] = useState({})

    useEffect(() => {
        let _params = {}
        stlGeometries.forEach(({ Regions }) => {
            Regions.forEach(({ uid, BoundaryLayer, RefinementSettings }) => {
                _params = {
                    ..._params, [uid]: {
                        NSurfaceLayers: BoundaryLayer.NSurfaceLayers,
                        Min: RefinementSettings.Min,
                        Max: RefinementSettings.Max,
                    }
                }
            })
        })
        setRegions(_params)
    }, [])

    useEffect(() => {
        Object.keys(regions).length && onParamsChange(regions)
    }, [regions])

    function handleDeleteClick(_uid) {
        const newSelectedParts = selectedParts.filter(({ uid }) => uid !== _uid)
        setRegions((prev) => ({
            ...prev, [_uid]: {
                NSurfaceLayers: Number(0),
                Min: Number(0),
                Max: Number(0),
            }
        }));
        dispatch(setSelectedParts(newSelectedParts))
    }

    function handleSelectAll() {
        let parts = []
        geoms.forEach(({ models }) => (
            models.forEach(model => (
                parts.push({ name: model.name, uid: model.uid })
            ))
        ))
        dispatch(setSelectedParts(parts))
    }

    function handleChange(e) {
        const { id, value, name } = e.target;
        setRegions((prev) => ({
            ...prev, [id]: {
                ...prev[id],
                [name]: Number(value)
            }
        }));
    }

    return (
        <div className="overflow-y-auto px-2">
            <div className='flex flex-row justify-between px-1'>
                <p className='h-8 flex items-center font-semibold'>Boundary Layer Surfaces ({selectedParts.length})</p>
                <button type='button' className='text-blue-700 hover:underline underline-offset-4 duration-300'
                    onClick={handleSelectAll}>
                    {'Select all faces'}
                </button>
            </div>
            {selectedParts.length ? <div className='my-1.5 pt-1.5 px-1.5 rounded-md bg-yellow-50 border border-yellow-300 flex flex-col items-end'>
                <div className='font-semibold pl-1.5 pb-1 flex flex-row w-[75%] items-left '>
                    <p className='w-[65px] mr-1.5 text-center'
                        data-tooltip-id="N"
                        data-tooltip-content="Number of surface layers"
                        data-tooltip-place="top"
                        data-tooltip-variant="dark">N</p>
                    <p className='w-[65px] mr-1.5 text-center'
                        data-tooltip-id="Min"
                        data-tooltip-content="Minimum refinement number"
                        data-tooltip-place="top"
                        data-tooltip-variant="dark">Min</p>
                    <p className='w-[65px] mr-1.5 text-center'
                        data-tooltip-id="Max"
                        data-tooltip-content="Maximum refinement number"
                        data-tooltip-place="top"
                        data-tooltip-variant="dark">Max</p>
                    <Tooltip id="N"
                        style={{
                            fontSize: "12px",
                            height: "20px",
                            padding: "1px 8px 1px 8px",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                        }} />
                    <Tooltip id="Min"
                        style={{
                            fontSize: "12px",
                            height: "20px",
                            padding: "1px 8px 1px 8px",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                        }} />
                    <Tooltip id="Max"
                        style={{
                            fontSize: "12px",
                            height: "20px",
                            padding: "1px 8px 1px 8px",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                        }} />
                </div>
                {
                    selectedParts.map(({ name, uid }) => (
                        <div key={uid} className='flex flex-row items-center mb-1.5 justify-between h-8'>
                            <label htmlFor={uid} className='pl-1 text-left text-ellipsis overflow-hidden whitespace-nowrap'>{name}</label>
                            <div className="flex flex-row items-center w-[75%] ">
                                <input type="number" step="any" id={uid} name='NSurfaceLayers' value={regions[uid].NSurfaceLayers} onChange={handleChange}
                                    className={`ml-1.5 h-8 w-1/3 p-2 focus:outline-[0] text-day-350 border rounded-md 
                            outline-none bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]`}>
                                </input>
                                <input type="number" step="any" id={uid} name='Min' value={regions[uid].Min} onChange={handleChange}
                                    className={`ml-1.5 h-8 w-1/3 p-2 focus:outline-[0] text-day-350 border rounded-md 
                            outline-none bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]`}>
                                </input>
                                <input type="number" step="any" id={uid} name='Max' value={regions[uid].Max} onChange={handleChange}
                                    className={`ml-1.5 h-8 w-1/3 p-2 focus:outline-[0] text-day-350 border rounded-md 
                            outline-none bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]`}>
                                </input>
                                <button className="text-day-300 w-7 h-8 flex items-center justify-end"
                                    onClick={() => handleDeleteClick(uid)}>
                                    <SvgSelector id='close' />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div> : <div className="flex items-center p-1.5 my-1.5 rounded-md bg-yellow-50 border border-yellow-300">
                <div className="flex gap-2 h-8 items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="self-center">
                        <span className="text-yellow-600">
                            Select faces
                        </span>
                    </div>
                </div>
            </div>}
        </div >
    )
}
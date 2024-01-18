import React, { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'
import createClip from '@/api/create_clip'
import { useSelector } from 'react-redux'
import { setLoader } from '@/store/slices/loaderSlice'

export default function ClipForm({ onCloseForm, onChangeClip, boundingBox }) {
    const projectId = useSelector(state => state.project.projectId);
    const { XMin, XMax, YMin, YMax, ZMin, ZMax } = boundingBox();
    const center = { centerX: (XMin + XMax) / 2, centerY: (YMin + YMax) / 2, centerZ: (ZMin + ZMax) / 2 };

    const [params, setParams] = useState({
        ...center,
        normalX: 0,
        normalY: 1,
        normalZ: 0,
    })

    useEffect(() => {
        onChangeClip(params)
    }, [params])

    const paramsChange = (e) => {
        const { name, value } = e.target;
        setParams((prev) => ({ ...prev, [name]: Number(value) }));
    }

    const fetchCreateClip = async () => {
        dispatch(setLoader(true))
        const result = await createClip(projectId, { ...params, shouldClip: false })
        if (result.success) {
            console.log(result)
            onCloseForm()
            dispatch(setLoader(false))
        } else {
            alert(result.message)
            onCloseForm()
            dispatch(setLoader(false))
        }
    }

    const Input = ({ label, name, type }) => {
        return (
            <div className='flex flex-row items-start justify-between h-8'>
                <label className=''>{label}</label>
                <div className='flex flex-col h-full mt-[10px]'>
                    <input type='range' min={`${name === 'centerX' ? XMin : name === 'centerY' ? YMin : name === 'centerZ' ? ZMin : '-1'}`}
                        max={`${name === 'centerX' ? XMax : name === 'centerY' ? YMax : name === 'centerZ' ? ZMax : '1'}`}
                        step='any' name={name} id={name}
                        value={params[name]}
                        onChange={paramsChange}
                        className='w-[140px] h-[6px] bg-gray-300 accent-orange-200 rounded-full appearance-none cursor-pointer' />
                    <p className='mt-1 w-32 self-center text-center'>
                        {params[name].toFixed(3)}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <form className='flex flex-col bg-day-00 rounded-md shadow pl-3 pt-3 text-day-350 max-h-full'>
            <div className='pr-3 flex flex-row justify-between items-center border-b pb-2'>
                <p className='self-end ml-1 font-semibold'>Mesh Clip 1</p>
                <div className='flex flex-row space-x-[6px]'>
                    <button type="button"
                        className="text-base font-medium text-white 
                            bg-orange-200 hover:bg-orange-100 active:bg-orange-150 duration-300 
                            rounded-md  w-8 h-8 border flex items-center justify-center"
                        onClick={fetchCreateClip} >
                        <SvgSelector id='check' />
                    </button>
                    <button type="button"
                        className="rounded-md text-day-300 w-8 h-8 border bg-day-50 hover:bg-day-100 
                            active:bg-day-150 flex items-center justify-center"
                        onClick={onCloseForm} >
                        <SvgSelector id='close' />
                    </button>
                </div>
            </div>
            <div className='flex flex-col p-3 pb-5 space-y-2 pl-1 text-day-350 overflow-y-auto '>
                <p className='font-semibold'>Center</p>
                {Input({ label: 'X', name: 'centerX', type: 'center' })}
                {Input({ label: 'Y', name: 'centerY', type: 'center' })}
                {Input({ label: 'Z', name: 'centerZ', type: 'center' })}
                <p className='font-semibold'>Normal</p>
                {Input({ label: 'X', name: 'normalX', type: 'normal' })}
                {Input({ label: 'Y', name: 'normalY', type: 'normal' })}
                {Input({ label: 'Z', name: 'normalZ', type: 'normal' })}
            </div>
        </form >
    )
}

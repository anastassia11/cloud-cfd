import React, { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'
import { useDispatch, useSelector } from 'react-redux'
import { setStateBar } from '@/store/slices/projectSlice'
import { PuffLoader } from 'react-spinners'

export default function StateBar() {
    const dispatch = useDispatch()
    const { visible, type, message } = useSelector(state => state.project.stateBar)

    const INFO_STYLE = {
        error: 'bg-red-50 border-red-300',
        success: 'bg-green-50 border-green-300',
    };

    const Info = () => {
        return (
            <div className={`relative pl-[14px] pr-[8px] min-w-0 w-[300px] mr-[12px] mt-[8px] rounded-md border h-[40px] shadow
            ${INFO_STYLE[type]}`}>
                <div className='flex flex-row justify-between items-center h-full'>
                    <div className="flex gap-2">
                        <SvgSelector id={type} />
                        <span className={`self-center ${type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                            {message}
                        </span>
                    </div>
                    <button className={`flex items-center justify-center duration-300 h-full w-8 
                        ${type === 'error' ? 'text-red-500 hover:text-red-700' : 'text-green-500 hover:text-green-600'}`}
                        onClick={() => dispatch(setStateBar({ visible: false }))}>
                        <SvgSelector id='close' />
                    </button>
                </div>
            </div>
        )
    }

    const JobStatus = () => {
        return (
            <div className={`text-day-350 relative pl-[14px] pr-[8px] min-w-0 w-[300px] mr-[12px] mt-[8px] rounded-md h-[40px] 
            shadow bg-day-00 `}>
                <div className='flex flex-row justify-between items-center h-full'>
                    <div className="flex gap-2 items-center">
                        <PuffLoader color="#3f3f3f" loading size={24} />
                        <div className="self-center">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`${visible ? 'flex flex-col' : 'hidden'}`}>
            {type === 'status' ? <JobStatus /> : <Info />}
        </div>

    )
}

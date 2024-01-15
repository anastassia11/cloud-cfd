import React, { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'
import { useDispatch, useSelector } from 'react-redux'
import { setStateBar } from '@/store/slices/projectSlice'
import { PuffLoader } from 'react-spinners'

export default function StateBar() {
    const dispatch = useDispatch()
    const { visible, type, message } = useSelector(state => state.project.stateBar)
    useEffect(() => {
        console.log(visible, type, message)
    }, [visible, type, message])

    const Info = () => {
        return (
            <div className="relative l-3 pr-4 min-w-0 w-[300px] mr-[12px] mt-[8px] p-[14px] rounded-md bg-red-50 border 
            border-red-300 shadow">
                <div className='flex justify-between'>
                    <div className="flex gap-2">
                        <div>
                            <SvgSelector id={type} />
                        </div>
                        <div className="self-center">
                            <span className="text-red-600 font-medium">
                                {type}
                            </span>
                            <div className="text-red-600">
                                <p className="mt-2 sm:text-sm">
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>
                    <button className="self-start text-red-500"
                        onClick={() => dispatch(setStateBar({ visible: false }))}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    }

    const JobStatus = () => {
        return (
            <div className='flex pl-3 pr-4 min-w-0 w-[300px] mr-[12px] mt-[8px] bg-day-00 rounded-md 
                         relative shadow text-day-350 flex-row items-center 
                        justify-between h-[40px]'>
                <p className='ml-2 pt-[2px] text-base text-ellipsis whitespace-nowrap'>
                    {message}
                </p><PuffLoader color="#3f3f3f" loading size={20} />
            </div>
        )
    }

    return (
        <div className={`${visible ? 'flex' : 'hidden'}`}>
            {type === 'status' ? <JobStatus /> : <Info />}
        </div>

    )
}

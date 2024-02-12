import React, { useEffect, useRef, useState } from 'react'
import SvgSelector from '../SvgSelector'
import { useSelector } from 'react-redux'

export default function Refinements({ children, onCreate }) {
    const selectedSetting = useSelector(state => state.setting.formName)
    const [settingOpen, setSettingOpen] = useState(onCreate ? true : false)
    const childRef = useRef(null)

    const handleCreateClick = (e) => {
        e.stopPropagation()
        setSettingOpen(true)
        onCreate()
    }

    return (
        <div>
            <div className='w-full flex items-center justify-between text-day-1000 px-[7px] h-9 rounded-lg 
             hover:bg-day-150 active:bg-day-200 gap-x-1.5 duration-300 overflow-hidden cursor-pointer'
                onClick={() => setSettingOpen(!settingOpen)}>
                <div className='flex flex-row items-center'>
                    {children && <span className="min-w-[20px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 duration-300 ${settingOpen ? 'rotate-180' : ''}`}>
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </span>}
                    <div className={`pl-[1px] flex items-center gap-x-2 text-ellipsis whitespace-nowrap overflow-hidden ${children ? 'ml-1' : ''}`}>
                        <p className='text-ellipsis whitespace-nowrap overflow-hidden'>Refinements</p>
                    </div>
                </div>

                <div className='flex flex-row items-center'>
                    <div ref={childRef} className=" group w-5">
                        <SvgSelector id='plus' className='w-4' />
                        <div className="invisible opacity-0 group-hover:opacity-100 group-hover:visible -translate-y-3 group-hover:translate-y-0
                                absolute max-w-[200px] w-[200px] rounded-md bg-white shadow border text-day-350 duration-100 z-10"
                            style={{
                                top: childRef.current?.getBoundingClientRect().top - 50,
                                left: childRef.current?.getBoundingClientRect().left
                            }}>
                            <div className='px-2 py-2'>
                                <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-day-350 hover:bg-day-150"
                                    onClick={handleCreateClick}>
                                    Boundary layer
                                </button>
                                <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-day-350 hover:bg-day-150"
                                    onClick={() => { }}>
                                    Surface refinement
                                </button>
                                <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-day-350 hover:bg-day-150"
                                    onClick={() => { }}>
                                    Region refinement
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {settingOpen ?
                <div className="ml-4 pl-2 border-l text-base font-normal">{children}</div> : ''}
        </div>
    )
}

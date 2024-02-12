import React, { memo, useEffect, useMemo, useState } from 'react'
import SvgSelector from '../SvgSelector'
import { useSelector } from 'react-redux'

export default function DropdownSettings({ formName, children, title, onCreate, onClick }) {
    const selectedSetting = useSelector(state => state.setting.formName)
    const [settingOpen, setSettingOpen] = useState(onCreate ? true : false)

    const handleDropdownClick = () => {
        onClick ? onClick() : setSettingOpen(!settingOpen)
    }

    const handleCreateClick = (e) => {
        e.stopPropagation()
        setSettingOpen(true)
        onCreate()
    }

    return (
        <div>
            <div className={`w-full flex items-center  text-day-1000 px-[7px] h-9 rounded-lg 
             hover:bg-day-150 active:bg-day-200 gap-x-1.5 duration-300 overflow-hidden cursor-pointer ${onClick && selectedSetting === formName ? 'bg-day-150' : ''}`}
                onClick={handleDropdownClick}>
                {children && !onClick && <span className="min-w-[20px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 duration-300 ${settingOpen ? 'rotate-180' : ''}`}>
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </span>}
                <div className="flex items-center gap-x-2 text-ellipsis whitespace-nowrap overflow-hidden">
                    <p className='text-ellipsis whitespace-nowrap overflow-hidden'>{title}</p>
                </div>
                <div className='flex flex-row items-center'>
                    {onCreate && <button className="w-5" onClick={handleCreateClick}>
                        <SvgSelector id='plus' className='w-4' />
                    </button>}

                </div>
            </div>
            {settingOpen ?
                <div className="ml-4 pl-2 border-l text-base font-normal">{children}</div> : ''}
        </div>
    )
}

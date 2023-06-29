import React, { useState } from 'react'

export default function DropdownSettings({ children, items }) {
    const [settingOpen, setSettingOpen] = useState(false)
    return (
        <div>
            <button className="w-full flex items-center justify-between text-day-350 px-2 h-9 rounded-lg  hover:bg-day-150 active:bg-day-200 duration-300"
                onClick={() => setSettingOpen(!settingOpen)}>
                <div className="flex items-center gap-x-2">
                    {children}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 duration-300 ${settingOpen ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </button>
            {
                settingOpen ? (
                    <ul className="ml-4 pl-2 border-l text-base font-normal">
                        {
                            items.map((item) => (
                                <li key={item}>
                                    <button className="w-full">
                                        {item.setting}
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                ) : ""
            }
        </div>
    )
}

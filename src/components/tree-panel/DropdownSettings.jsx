import React, { useState } from 'react'

export default function DropdownSettings({ children, items }) {
    const [settingOpen, setSettingOpen] = useState(false)
    return (
        <div>
            <button className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg  hover:bg-gray-100 active:bg-gray-200 duration-150"
                onClick={() => setSettingOpen(!settingOpen)}>
                <div className="flex items-center gap-x-2">
                    {children}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 duration-150 ${settingOpen ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </button>
            {
                settingOpen ? (
                    <ul className="mx-4 px-2 border-l text-base font-normal">
                        {
                            items.map((item) => (
                                <li key={item}>
                                    <button className="text-gray-600 text-base text-left w-full p-2 rounded-lg  hover:bg-gray-100 active:bg-gray-200 duration-150">
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

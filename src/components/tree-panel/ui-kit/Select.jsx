import React from 'react'

export default function Select({ label, name, options, value, unit, onChange }) {
    return (
        <div className='flex flex-row items-center justify-between mb-1.5 h-8'>
            <label htmlFor={name} className='w-full text-left'>{label}</label>
            <div className="flex flex-row items-center w-[190px]">
                <select value={value} onChange={onChange} name={name}
                    className="p-0 h-8 w-full focus:outline-[0] text-day-350 border rounded-md outline-none 
                        bg-day-00 shadow-sm border-day-200 focus:border-day-250">
                    {Object.keys(options).map((key) => <option value={key} key={key}
                        className=''>{options[key]}</option>)}
                </select >
                {unit && <span className={`px-2 w-1/4 text-center cursor-default ml-1 border-b py-[4px]`}>{unit}</span>}
            </div>
        </div>
    )
}

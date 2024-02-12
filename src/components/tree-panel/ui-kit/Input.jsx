import React from 'react'

export default function Input({ name, label, value, unit, onChange }) {

    return (
        <div className='flex flex-row items-center mb-1.5 justify-between h-8' >
            <label htmlFor={name} className='w-full text-left text-ellipsis overflow-hidden whitespace-nowrap'>{label}</label>
            <div className="flex flex-row items-center w-[250px] justify-end">
                <input type="number" step="any" id={name} name={name} value={value} onChange={onChange}
                    className={`h-8 ${unit ? 'w-[80px]' : 'w-[120px]'} p-2 focus:outline-[0] text-day-350 border rounded-md 
                            outline-none bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]`}>
                </input>
                {unit && <span className={`px-2 w-1/4 text-center cursor-default ml-1 border-b py-[4px]`}>{unit}</span>}
            </div>
        </div >
    )
}


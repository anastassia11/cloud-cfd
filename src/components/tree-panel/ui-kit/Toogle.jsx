import React from 'react'

export default function Toogle({ label, name, value, onChange }) {
    return (
        <div className='flex flex-row items-center mb-1.5 h-8'>
            <label htmlFor={name} className='w-full text-left'>{label}</label>
            <div className="flex flex-row items-center">
                <label htmlFor={name} className="relative h-[24px] w-9 cursor-pointer [-webkit-tap-highlight-color:_transparent] transition-all">
                    <input type="checkbox" name={name} id={name} className="peer sr-only" checked={value}
                        onChange={onChange} />
                    <span className="absolute inset-0 m-auto h-[6px] rounded-full bg-gray-300"></span>
                    <span className="absolute inset-y-0 start-0 m-auto h-[18px] w-[18px] rounded-full bg-gray-400 
                transition-all peer-checked:bg-orange-200 peer-checked:start-[18px]">
                    </span>
                </label>
            </div>
        </div>
    )
}

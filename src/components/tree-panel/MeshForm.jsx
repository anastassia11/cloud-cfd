import { useDispatch } from 'react-redux';
import SvgSelector from '../SvgSelector';
import { resetSetting } from '@/store/slices/settingSlice';
import { useState } from 'react';

export default function MeshForm() {
    const dispatch = useDispatch()
    const [advancedSettingsVisible, setAdvancedSettingsVisible] = useState(true)

    const handleFormSubmit = (e) => {
        e.preventDefault()
        //dispatch(setUserValue({ formName, updatedValue: formValues }))
        dispatch(resetSetting())
    }

    const Input = ({ label, value, unit, onChange }) => {
        return (
            <div className='flex flex-row items-end mt-2'>
                <label htmlFor={label} className='w-full text-left'>{label}</label>
                <div className="flex flex-row items-center">
                    <input type="number" id={label} value={value} onChange={onChange}
                        className='h-8 mr-[4px] w-3/4 p-2 focus:outline-[0] text-day-350 border rounded-md 
                            outline-none bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]'>
                    </input>
                    <span className={`px-2 w-1/4 text-center cursor-default ml-1 ${unit && 'border-b py-[4px]'}`}>{unit}</span>
                </div>
            </div>
        )
    }

    const Toogle = ({ label, value, onChange }) => {
        return (
            <div className='flex flex-row items-end mt-2'>
                <label htmlFor={label} className='w-full text-left'>{label}</label>
                <div className="flex flex-row items-center">
                    <label htmlFor={label} className="relative h-[24px] w-9 cursor-pointer 
                [-webkit-tap-highlight-color:_transparent]">
                        <input type="checkbox" id={label} className="peer sr-only" value={value}
                        />
                        <span className="absolute inset-0 m-auto h-[6px] rounded-full bg-gray-300"></span>
                        <span className="absolute inset-y-0 start-0 m-auto h-[18px] w-[18px] rounded-full bg-gray-400 
                transition-all peer-checked:bg-orange-200 peer-checked:start-[18px]">
                        </span>
                    </label>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleFormSubmit} className='flex flex-col bg-day-00 rounded-md shadow p-3 h-fit text-day-350'>
            <div className='flex flex-row justify-between items-center border-b pb-2'>
                <p className='self-end'>Mesh</p>
                <div className='flex flex-row space-x-[6px]'>
                    <button type="submit" className="disabled:bg-orange-disabled text-base font-medium text-white 
                        bg-orange-200 hover:bg-orange-100 active:bg-orange-150 duration-300 
                        rounded-md  w-8 h-8 border flex items-center justify-center">
                        <SvgSelector id='check' />
                    </button>
                    <button className="rounded-md text-day-300 w-8 h-8 border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center">
                        <SvgSelector id='close' />
                    </button>
                </div>
            </div>
            <Input label={'Delta'} value={0} unit='m' onChange={''} />
            <div className='mt-3'>
                <div className='flex flex-row cursor-pointer'
                    onClick={() => setAdvancedSettingsVisible(prev => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        className={`min-w-[20px] h-5 duration-300 ${advancedSettingsVisible ? 'rotate-180' : ''}`}>
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 
                        1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                    <p className='font-semibold ml-[7px] text-day-350'>Advanced settings</p>
                </div>
                {advancedSettingsVisible ? <div className='flex flex-col ml-[27px]'>
                    <Toogle label={'Castellated mesh'} value={true} onChange={''} />
                    <Toogle label={'Snap'} value={true} onChange={''} />
                    <Toogle label={'Add layers'} value={true} onChange={''} />
                </div> : ''}
            </div>
            <div className='w-full border-t mt-3 flex flex-row justify-end items-center pt-2 space-x-[6px]'>
                <button type="submit" className="rounded-md text-day-300 w-[170px] h-8 border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center">
                    <SvgSelector id='play' /><p className='ml-1'>Generate Mesh</p>
                </button>
            </div>
        </form>
    )
}

import { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'


export default function CylinderForm({ params, onParamsChange, onCreate, onCloseForm }) {
    const [cylinderParams, setCylinderParams] = useState(params)

    useEffect(() => {
        setCylinderParams(params)
    }, [params])

    useEffect(() => {
        onParamsChange(cylinderParams)
    }, [cylinderParams])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        onCreate()
    }

    const heightChange = (e) => {
        const { value } = e.target
        setCylinderParams((prevParams) => ({ ...prevParams, height: Number(value) }))
    }

    const radiusChange = (e) => {
        const { value } = e.target
        setCylinderParams((prevParams) => ({ ...prevParams, radiusTop: Number(value), radiusBottom: Number(value) }))
    }

    const Input = ({ label, value, onChange }) => {
        return (
            <div className='flex flex-row items-center justify-between'>
                <label className='mr-10'>{label}</label>
                <div className='flex flex-row items-center '>
                    <input type='number' value={value} onChange={onChange}
                        className='h-8 w-[150px] p-2 focus:outline-[0] text-day-350 border rounded-md outline-none 
                            bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]' />
                    <p className='ml-2'>m</p>
                </div>

            </div>
        )
    }

    return (
        <form onSubmit={handleFormSubmit} className='flex flex-col bg-day-00 rounded-md shadow p-3'>
            <div className='flex flex-row justify-between items-center border-b pb-2'>
                <p className='self-end'>Cylinder</p>
                <div className='flex flex-row space-x-[6px]'>
                    <button type="button"
                        className="text-base font-medium text-white 
                            bg-orange-200 hover:bg-orange-100 active:bg-orange-150 duration-300 
                            rounded-md  w-8 h-8 border flex items-center justify-center"
                        onClick={handleFormSubmit}>
                        <SvgSelector id='check' />
                    </button>
                    <button type="button"
                        className="rounded-md text-day-300 w-8 h-8 border bg-day-50 hover:bg-day-100 
                            active:bg-day-150 flex items-center justify-center"
                        onClick={onCloseForm}>
                        <SvgSelector id='close' />
                    </button>
                </div>
            </div>
            <div className='flex flex-col mt-3'>
                <div className='flex flex-col justify-between mt-2 space-y-2'>
                    <Input label='Height' value={cylinderParams.height} onChange={heightChange} />
                    <Input label='Radius' value={cylinderParams.radiusTop} onChange={radiusChange} />
                </div>
            </div>
        </form >
    )
}

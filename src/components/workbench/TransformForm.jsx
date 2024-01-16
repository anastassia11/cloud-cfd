import { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'


export default function TransformForm({ geomName, position, onPositionChange, onCloseForm }) {
    const [coordinates, setCoordinates] = useState(position)

    useEffect(() => {
        setCoordinates(position)
    }, [position])

    useEffect(() => {
        onPositionChange(coordinates)
    }, [coordinates])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        onCloseForm('transformForm')
    }

    const positionXChange = (e) => {
        const { value } = e.target
        setCoordinates((prevCoordinates) => ({ ...prevCoordinates, x: Number(value) }))
    }

    const positionYChange = (e) => {
        const { value } = e.target
        setCoordinates((prevCoordinates) => ({ ...prevCoordinates, y: Number(value) }))
    }

    const positionZChange = (e) => {
        const { value } = e.target
        setCoordinates((prevCoordinates) => ({ ...prevCoordinates, z: Number(value) }))
    }

    const Input = ({ label, value, onChange, inputType }) => {
        return (
            <div className='flex flex-row items-center '>
                <label className={`${inputType === 'position' ? 'mr-10' : 'mr-2'}`}>{label}</label>
                <input type='number' step='any' value={value} onChange={onChange}
                    className={`${inputType === 'position' ? 'w-full' : 'w-16'} h-8 p-2 focus:outline-[0] text-day-350 
                        border rounded-md outline-none bg-day-00 shadow-sm border-day-200 
                        focus:border-[#c9c9c9]`} />
                {inputType === 'position' ? <p className='ml-2'>m</p> : ''}
            </div>
        )
    }

    const AngleInput = ({ label, value, onChange }) => {
        return (
            <div className='flex flex-row items-center'>
                <label className='mr-2'>{label}</label>
                <input type='number' step='any' value={value} onChange={onChange}
                    className='h-8 w-16 p-2 focus:outline-[0] text-day-350 border rounded-md outline-none 
                            bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]' />
            </div>
        )
    }

    return (
        <form onSubmit={handleFormSubmit} className='flex flex-col bg-day-00 rounded-md shadow p-3'>
            <div className='flex flex-row justify-between items-center border-b pb-2'>
                <p className='self-end'>Transform <span className='text-day-350'>{`'${geomName}'`}</span></p>
                <div className='flex flex-row space-x-[6px]'>
                    <button type="submit" className="text-base font-medium text-white 
                            bg-orange-200 hover:bg-orange-100 active:bg-orange-150 duration-300 
                            rounded-md  w-8 h-8 border flex items-center justify-center">
                        <SvgSelector id='check' />
                    </button>
                    <button type="submit" className="rounded-md text-day-300 w-8 h-8 border bg-day-50 hover:bg-day-100 
                            active:bg-day-150 flex items-center justify-center">
                        <SvgSelector id='close' />
                    </button>
                </div>
            </div>
            <div className='flex flex-col mt-3'>
                <p className=''>Volume Position</p>
                <div className='flex flex-col justify-between mt-2 space-y-2'>
                    {Input({ label: 'X', value: coordinates.x, onChange: positionXChange })}
                    {Input({ label: 'Y', value: coordinates.y, onChange: positionYChange })}
                    {Input({ label: 'Z', value: coordinates.X, onChange: positionZChange })}
                </div>

                <span className='mt-4'>Volume Rotation Angle, °</span>
                <div className='flex flex-row justify-between mt-2'>
                    {Input({ label: 'X', value: 0, onChange: () => { } })}
                    {Input({ label: 'Y', value: 0, onChange: () => { } })}
                    {Input({ label: 'Z', value: 0, onChange: () => { } })}
                </div>
            </div>
        </form >
    )

}

import { useEffect, useRef, useState } from 'react'
import SvgSelector from '../SvgSelector'


export default function BoxForm({ params, position, onParamsChange, onPositionChange, onCreate, onCloseForm }) {
    const [boxParams, setBoxParams] = useState(params)
    const [coordinates, setCoordinates] = useState(position)
    const [paramsVisible, setParamsVisible] = useState(true)
    const [positionVisible, setPositionVisible] = useState(true)


    useEffect(() => {
        setBoxParams(params)
    }, [params])

    useEffect(() => {
        setCoordinates(position)
    }, [position])

    useEffect(() => {
        onParamsChange(boxParams)
    }, [boxParams])

    useEffect(() => {
        onPositionChange(coordinates)
    }, [coordinates])


    const handleFormSubmit = (e) => {
        e.preventDefault()
        onCreate()
    }

    const widthChange = (e) => {
        const { value } = e.target
        setBoxParams((prevParams) => ({ ...prevParams, width: Number(value) }))
    }

    const heightChange = (e) => {
        const { value } = e.target
        setBoxParams((prevParams) => ({ ...prevParams, height: Number(value) }))
    }

    const depthChange = (e) => {
        const { value } = e.target
        setBoxParams((prevParams) => ({ ...prevParams, depth: Number(value) }))
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

    const Input = ({ label, value, onChange }) => {
        return (
            <div className='flex flex-row items-center justify-between'>
                <label className=''>{label}</label>
                <div className='flex flex-row items-center mr-2 '>
                    <input type='number' value={value} onChange={onChange}
                        className='h-8 w-[140px] p-2 focus:outline-[0] text-day-350 border rounded-md outline-none 
                            bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]'/>
                    <p className='ml-2'>m</p>
                </div>
            </div>
        )
    }

    return (
        <form className='flex flex-col bg-day-00 rounded-md shadow p-3 text-day-350'>
            <div className='flex flex-row justify-between items-center border-b pb-2'>
                <p className='self-end ml-1 font-semibold'>Box</p>
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
            <div className='flex flex-col mt-3 text-day-350'>
                <div className='flex flex-col justify-between mt-2 space-y-2'>
                    <div className=''>
                        <div className='flex flex-row cursor-pointer'
                            onClick={() => setParamsVisible(prev => !prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className={`min-w-[20px] h-5 duration-300 ${paramsVisible ? 'rotate-180' : ''}`}>
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 
                        1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                            <p className='font-semibold ml-[7px]'>Parameters</p>
                        </div>
                        {paramsVisible ? <div className='flex flex-col space-y-2 ml-[27px] mt-2'>
                            <Input label='Width' value={boxParams.width} onChange={widthChange} />
                            <Input label='Height' value={boxParams.height} onChange={heightChange} />
                            <Input label='Depth' value={boxParams.depth} onChange={depthChange} />
                        </div> : ''}
                    </div>
                    <div>
                        <div className='flex flex-row cursor-pointer'
                            onClick={() => setPositionVisible(prev => !prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className={`min-w-[20px] h-5 duration-300 ${positionVisible ? 'rotate-180' : ''}`}>
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 
                        1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                            <p className='font-semibold ml-[7px]'>Position</p>
                        </div>
                        {positionVisible ? <div className='flex flex-col space-y-2 ml-[27px] mt-2'>
                            <Input label='X' value={coordinates.x} onChange={positionXChange} />
                            <Input label='Y' value={coordinates.y} onChange={positionYChange} />
                            <Input label='Z' value={coordinates.z} onChange={positionZChange} />
                        </div> : ''}
                    </div>
                </div>
            </div>
        </form >
    )
}

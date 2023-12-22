import React, { useEffect, useRef, useState } from 'react'
import SvgSelector from '../SvgSelector'
import { useSelector } from 'react-redux'

export default function ModelPart({ model, handleHideClick, updateModelPart }) {
    const [input, setInput] = useState(false)
    const [modelPart, setModelPart] = useState(model)
    const selectedModelPart = useSelector(state => state.project.selectedPart)

    useEffect(() => {
        updateModelPart(modelPart)
    }, [modelPart.visible])

    const handleVisibleClick = () => {
        const newVisible = !modelPart.visible
        setModelPart(prevModelPart => ({ ...prevModelPart, visible: newVisible }))
        handleHideClick(modelPart)
    }

    const handleNameChange = (e) => {
        e.stopPropagation()
        setModelPart(prevModelPart => ({ ...prevModelPart, name: e.target.value }))
    }

    const handleDoneClick = () => {
        updateModelPart(modelPart)
        setInput(false)
    }

    return (
        input ? <div className='flex flex-row items-center space-x-2 justify-between'>
            <input type="text" id='inputId' value={modelPart.name} onChange={e => handleNameChange(e)}
                className='h-9 w-full p-2 focus:outline-[0] text-day-350 border rounded-md outline-none bg-day-00 shadow-sm 
                border-day-200 focus:border-[#c9c9c9]' >
            </input>
            <button className='flex items-center justify-center h-8 w-10 bg-day-100 rounded hover:bg-day-150 active:bg-day-200 
            text-day-350 hover:text-black'
                onClick={handleDoneClick}>
                <SvgSelector id='check' />
            </button>
        </div> :
            <div className={`group w-full flex items-center justify-between rounded-md overflow-hidden
            ${modelPart.visible ? 'text-day-350' : 'text-day-250'} h-9 ${modelPart.visible && 'hover:bg-day-150'} 
            duration-300`}>
                <p className={`pl-2 text-ellipsis whitespace-nowrap overflow-hidden
                ${selectedModelPart.some((item) => item === modelPart.uid) ? 'font-bold' : ''}
                `}>
                    {modelPart.name}
                </p>
                <div className='pr-2 flex flex-row items-center'>
                    <button className="invisible group-hover:visible px-1" id='button'
                        onClick={() => setInput(true)}>
                        <SvgSelector id='edit' className='w-[17px] h-[17px]' />
                    </button>
                    <button onClick={handleVisibleClick}>
                        {modelPart.visible ? <SvgSelector id='visible' /> : <SvgSelector id='unvisible' />}
                    </button>
                </div>
            </div>
    )
}

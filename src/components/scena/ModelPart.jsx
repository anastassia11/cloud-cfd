import React, { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'

export default function ModelPart({ model, handleHideClick, updateModelPart }) {
    const [input, setInput] = useState(false)

    const [modelPart, setModelPart] = useState(model)

    useEffect(() => {
        const inputElement = document.getElementById("inputId");
        if (inputElement) {
            inputElement.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    handleDoneClick()
                }
            })
        }
    }, [input])

    useEffect(() => {
        updateModelPart(modelPart)
    }, [modelPart.visible])

    const handleVisibleClick = () => {
        const newVisible = !modelPart.visible
        setModelPart(prevModelPart => ({ ...prevModelPart, visible: newVisible }))
        handleHideClick(modelPart)
    }

    const handleNameChange = (e) => {
        setModelPart(prevModelPart => ({ ...prevModelPart, name: e.target.value }))
    }

    const handleDoneClick = () => {
        updateModelPart(modelPart)
        setInput(false)
    }

    return (
        input ? <div className='flex flex-row items-center space-x-2 justify-between'>
            <input type="text" id='inputId' value={modelPart.name} onChange={e => handleNameChange(e)}
                className='h-9 w-full p-2 focus:outline-[0] text-day-350 border rounded-md outline-none bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]' >
            </input>
            <button className='flex items-center justify-center h-8 w-10 bg-day-100 rounded hover:bg-day-150 active:bg-day-200 text-day-350 hover:text-black'
                onClick={handleDoneClick}>
                <SvgSelector id='check' />
            </button>
        </div> :
            <div className={`model-part w-full flex items-center justify-between rounded-md
            ${modelPart.visible ? 'text-day-350' : 'text-day-250'} h-9 ${modelPart.visible && 'hover:bg-day-150'} ${modelPart.visible && 'active:bg-day-200'} duration-300`}>
                <p className='pl-2'>{`${modelPart.name.slice(0, 20)}${modelPart.name.length < 20 ? '' : '...'}`}</p>

                <div className='pr-2 flex flex-row items-center'>
                    <button className="invisible more-button pr-2"
                        onClick={() => setInput(true)}>
                        <SvgSelector id='more' />
                    </button>
                    <button onClick={handleVisibleClick}>
                        {modelPart.visible ? <SvgSelector id='visible' /> : <SvgSelector id='unvisible' />}
                    </button>
                </div>
            </div>
    )
}

import { useEffect, useState } from 'react'
import ModelPart from './ModelPart'
import SvgSelector from '../SvgSelector'

export default function Geometry({ geom = [], hidePartObject, updateGeomArray, deleteGeomArray }) {
    const [settingOpen, setSettingOpen] = useState(false)
    const [geometry, setGeometry] = useState(geom)
    const [input, setInput] = useState(false)

    useEffect(() => {
        // console.log(geom)
        // const handleClick = (event) => {
        //     const inputElement = document.getElementById("inputId")
        //     const button = document.getElementById('button')
        //     if (button && inputElement && !button.contains(event.target) && !inputElement.contains(event.target)) {
        //         setInput(false)
        //     }
        // }
        // document.addEventListener('mousedown', handleClick)
        // const inputElement = document.getElementById("inputId")

        // if (inputElement) {
        //     inputElement.addEventListener("keydown", function (event) {
        //         if (event.key === "Enter") {
        //             handleDoneClick()
        //         }
        //     })
        // }
    }, [input])

    // useEffect(() => {
    //     updateGeomArray(geometry)
    // }, [geometry])

    const handleUpdate = (updatedModelPart) => {
        const updatedGeometry = {
            ...geometry,
            models: geometry.models.map((model) => {
                if (model.uid === updatedModelPart.uid) {
                    return updatedModelPart
                }
                return model
            })
        }
        setGeometry(updatedGeometry)
        updateGeomArray(updatedGeometry)
    }

    const handleNameChange = (e) => {
        e.stopPropagation()
        setGeometry(prevGeometry => ({ ...prevGeometry, name: e.target.value }))
    }

    const handleDoneClick = () => {
        updateGeomArray(geometry)
        setInput(false)
    }

    const handleEditClick = (e) => {
        e.stopPropagation()
        setInput(true)
    }

    const handleDeleteClick = () => {
        deleteGeomArray(geometry)
        setGeometry({})
    }

    return (

        <div key={geometry.name}>
            <div className={`w-full flex items-center justify-start text-day-350 pl-[7px] h-9 rounded-lg 
            ${!input && 'hover:bg-day-150 active:bg-day-200'} duration-300 cursor-pointer group`}
                onClick={() => !input && setSettingOpen(!settingOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className={`w-5 h-5 duration-300 ${settingOpen ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 
                        1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>

                {input ? <div className='flex flex-row items-center space-x-2 justify-between'>
                    <input type="text" id='inputId' value={geometry.name} onChange={e => handleNameChange(e)}
                        className='h-9 w-full p-2 focus:outline-[0] text-day-350 border rounded-md outline-none
                        bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]' >
                    </input>
                    <button className='flex items-center justify-center h-8 w-10 bg-day-100 rounded hover:bg-day-150 
                    active:bg-day-200 text-day-350 hover:text-black'
                        onClick={handleDoneClick}>
                        <SvgSelector id='check' />
                    </button>
                </div>
                    : <div className='model-part w-full flex items-center justify-between rounded-md text-day-350 h-9 
                        hover:bg-day-150 active:bg-day-200'>
                        <p className='pl-2'>{`${geometry.name.slice(0, 20)}${geometry.name.length < 20 ? '' : '...'}`}</p>
                        <div className='pr-2 flex flex-row items-center'>
                            <button className="invisible group-hover:visible pr-1" id='button'
                                onClick={e => handleEditClick(e)}>
                                <SvgSelector id='edit' className='w-[17px] h-[17px]' />
                            </button>
                            <button className='invisible group-hover:visible'
                                onClick={handleDeleteClick}>
                                <SvgSelector id='delete' className="h-5 w-5" />
                            </button>
                        </div>
                    </div>}
            </div>

            {
                settingOpen ? (
                    <ul className="ml-4 pl-2 border-l text-base font-normal">
                        {
                            geometry.models.map((model) => (
                                <li key={model.uid}>
                                    <ModelPart model={model} handleHideClick={(modelPart) => hidePartObject(modelPart)}
                                        updateModelPart={(updatedModelPart) => handleUpdate(updatedModelPart)} />
                                </li>
                            ))
                        }
                    </ul>
                ) : ""
            }
        </div >
    )
}

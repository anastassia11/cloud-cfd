import { useEffect, useState } from 'react'
import ModelPart from './ModelPart'
import SvgSelector from '../SvgSelector'

export default function Geometry({ geom = [], hidePartObject, updateGeomArray }) {
    const [settingOpen, setSettingOpen] = useState(false)
    const [geometry, setGeometry] = useState(geom)

    useEffect(() => {
        updateGeomArray(geometry)
    }, [geometry])

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
    }

    return (
        <div key={geom.name}>
            <div className="w-full flex items-center justify-start text-day-350 pl-[7px] h-9 rounded-lg hover:bg-day-150 
            active:bg-day-200 duration-300 cursor-pointer group"
                onClick={() => setSettingOpen(!settingOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className={`w-5 h-5 duration-300 ${settingOpen ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 
                    4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>

                <div className='model-part w-full flex items-center justify-between rounded-md text-day-350 h-9 hover:bg-day-150active:bg-day-200'>
                    <p className='pl-2'>{`${geom.name.slice(0, 20)}${geom.name.length < 20 ? '' : '...'}`}</p>
                    <div className='pr-2 flex flex-row items-center'>
                        <button className="invisible group-hover:visible pr-1">
                            <SvgSelector id='edit' className='w-[17px] h-[17px]' />
                        </button>
                        <button className='invisible group-hover:visible'>
                            <SvgSelector id='delete' className="h-5 w-5" />
                        </button>
                    </div>
                </div>



            </div>

            {
                settingOpen ? (
                    <ul className="ml-4 pl-2 border-l text-base font-normal">
                        {
                            geom.models.map((model) => (
                                <li key={model.name}>
                                    <ModelPart model={model} handleHideClick={(modelPart) => hidePartObject(modelPart)} updateModelPart={(updatedModelPart) => handleUpdate(updatedModelPart)} />
                                </li>
                            ))
                        }
                    </ul>
                ) : ""
            }
        </div >
    )
}

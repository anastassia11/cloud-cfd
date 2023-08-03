import { useEffect, useRef, useState } from 'react';
import ModelPart from './ModelPart';
import SvgSelector from '../SvgSelector';


export default function DropdownGeometry({ geom = [], hidePartObject }) {
    const [settingOpen, setSettingOpen] = useState(false)

    return (
        <div className="" key={geom.name}>
            <button className="w-full flex items-center justify-start text-day-350 pl-[7px] h-9 rounded-lg  hover:bg-day-150 active:bg-day-200 duration-300"
                onClick={() => setSettingOpen(!settingOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 duration-300 ${settingOpen ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
                <div className="flex items-center gap-x-2 pl-1">
                    {geom.name}
                </div>
            </button>

            {
                settingOpen ? (
                    <ul className="ml-4 pl-2 border-l text-base font-normal">
                        {
                            geom.models.map((model) => (
                                <li key={model.name}>
                                    <ModelPart name={model.name} handleClick={() => hidePartObject(model)} onVisible={model.visible} />
                                </li>
                            ))
                        }
                    </ul>
                ) : ""
            }
        </div>
    )
}

import { useEffect, useState } from 'react';
import SvgSelector from '../SvgSelector';
import * as THREE from "three"

export default function ControlPanel({ selectionMode, onModeChange, setPrimitiveData }) {
    const [mode, setMode] = useState(selectionMode)

    const handleBoxClick = () => {
        const boxPatternGeom = new THREE.BoxGeometry(3, 30, 30);
        const boxPatternMaterial = new THREE.MeshBasicMaterial({ color: 0x0078d3, opacity: 0.5, transparent: true });
        const box = new THREE.Mesh(boxPatternGeom, boxPatternMaterial);
        setPrimitiveData({
            visible: true, name: 'box', mesh: box,
            params: boxPatternGeom.parameters, position: box.position
        })
    }

    const handleCylinderClick = () => {
        const cylinderGeom = new THREE.CylinderGeometry(5, 5, 20)
        const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x0078d3, opacity: 0.5, transparent: true })
        const cylinder = new THREE.Mesh(cylinderGeom, cylinderMaterial)
        setPrimitiveData({
            visible: true, name: 'cylinder', mesh: cylinder,
            params: cylinderGeom.parameters, position: cylinder.position
        })
    }

    useEffect(() => {
        onModeChange(mode)
    }, [mode])

    return (
        <div className='h-[40px] items-center flex justify-end grow justify-self-end'>
            <div className='border-r border-[#a4a4a4] px-2 h-[40px] flex flex-row items-center relative'>
                <button className={`rounded-md w-8 h-8 flex items-center justify-center
                        ${mode === 'volume' ? 'border border-orange-100' : 'hover:bg-day-150 hover:shadow  active:bg-day-100'}`}
                    onClick={() => setMode('volume')}>
                    <SvgSelector id='select-volume' className='w-6' />
                </button>
            </div>
            <div className='border-r border-[#a4a4a4] px-2 h-[40px] flex flex-row items-center relative'>
                <button className={`rounded-md w-8 h-8 flex items-center justify-center
                        ${mode === 'face' ? 'border border-orange-100' : 'hover:bg-day-150 hover:shadow active:bg-day-100'}`}
                    onClick={() => setMode('face')}>
                    <SvgSelector id='select-face' className='w-6' />
                </button>
            </div>
            <div className='relative group text-day-1000 flex flex-row items-center cursor-pointer 
                            w-[100px] h-8 ml-2 pl-2 justify-start'>
                <p className='text-[13px] pt-[2px] mr-[2px] tracking-wide'>CREATE</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className='w-5 h-5 duration-300 group-hover:rotate-180'>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>

                <div className='bg-day-00 rounded-md shadow absolute 
                                    top-[25px] border border-day-200 -left-[6px] w-[95px] text-base duration-100 
                                    ease-linear transition-all group-hover:translate-y-[10px]
                                    opacity-0 group-hover:opacity-100 '>
                    <div className='flex flex-col justify-center h-fit'>

                        <button className='flex flex-col pt-2 items-center space-x-1 text-day-1000 
                                        hover:bg-day-100 rounded-md h-fit'
                            onClick={handleBoxClick}>
                            <SvgSelector id='cube' className='w-[20px] text-day-350' />
                            <p className='text-[11px] tracking-wide'>Box</p>
                        </button>
                        <button className='flex flex-col pt-2 items-center space-x-1 text-day-1000 
                                        hover:bg-day-100 rounded-md h-fit'
                            onClick={handleCylinderClick}>
                            <SvgSelector id='cylinder' className='w-[20px] text-day-350' />
                            <p className='text-[11px] tracking-wide'>Cylinder</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

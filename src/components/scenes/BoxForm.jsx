import { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'
import * as THREE from "three"
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js'
import { useSelector } from 'react-redux'

export default function BoxForm({ scene, transformControl, boxData, onBoxDataChange, onCreate }) {
    const projectId = useSelector(state => state.project.projectId)

    const [boxParams, setBoxParams] = useState(boxData)
    const [paramsVisible, setParamsVisible] = useState(true)
    const [positionVisible, setPositionVisible] = useState(true)

    useEffect(() => {
        setBoxParams(boxData)
    }, [boxData])

    useEffect(() => {
        onBoxDataChange(boxParams)
    }, [boxParams])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        handleBoxCreate()
    }

    const widthChange = (e) => {
        const { value } = e.target
        const { width, height, depth } = boxParams.params
        const newBoxPatternGeom = new THREE.BoxGeometry(Number(value), height, depth);
        setBoxParams((prev) => ({
            ...prev, params: { ...prev.params, width: Number(value) },
            boxMesh: { ...prev.boxMesh, geometry: newBoxPatternGeom }
        }))
    }

    const heightChange = (e) => {
        const { value } = e.target
        const { width, height, depth } = boxParams.params
        const newBoxPatternGeom = new THREE.BoxGeometry(width, Number(value), depth);
        setBoxParams((prev) => ({
            ...prev, params: { ...prev.params, height: Number(value) },
            boxMesh: { ...prev.boxMesh, geometry: newBoxPatternGeom }
        }))
    }

    const depthChange = (e) => {
        const { value } = e.target
        const { width, height, depth } = boxParams.params
        const newBoxPatternGeom = new THREE.BoxGeometry(width, height, Number(value));
        setBoxParams((prev) => ({
            ...prev, params: { ...prev.params, depth: Number(value) },
            boxMesh: { ...prev.boxMesh, geometry: newBoxPatternGeom }
        }))
    }

    const positionXChange = (e) => {
        const { value } = e.target
        setBoxParams((prev) => ({ ...prev, position: { ...prev.position, x: Number(value) } }))
    }

    const positionYChange = (e) => {
        const { value } = e.target
        setBoxParams((prev) => ({ ...prev, position: { ...prev.position, y: Number(value) } }))
    }

    const positionZChange = (e) => {
        const { value } = e.target
        setBoxParams((prev) => ({ ...prev, position: { ...prev.position, z: Number(value) } }))
    }

    const handleBoxCreate = () => {
        const boxMaterial = new THREE.MeshPhongMaterial({
            color: 0xa0a0a0,
            specular: 0x494949,
            shininess: 100,
            side: THREE.DoubleSide,
        });

        setBoxParams((prev) => ({ ...prev, visible: false, boxMesh: { ...prev.boxMesh, material: boxMaterial } }))

        scene.remove(transformControl)

        // + ПОЗИЦИЮ БОКСА НА СЕРВЕР 
        const stlExporter = new STLExporter()
        const stlData = stlExporter.parse(boxData.boxMesh, { binary: true })
        const stlBlob = new Blob([stlData], { type: 'application/octet-stream' })
        const file = new File([stlBlob], 'box.stl')
        onCreate({ 'Angle': '120', 'IdProject': projectId, 'File': file }, 'box')
    }

    const handleCloseForm = () => {
        setBoxParams((prev) => ({ ...prev, visible: false }))
        scene.children.forEach((object) => {
            if (object.isMesh && object.uuid === boxParams.boxMesh.uuid) {
                scene.remove(object)
                transformControl.detach()
            }
        });
        scene.remove(transformControl)
    }

    const Input = ({ label, value, onChange }) => {
        return (
            <div className='flex flex-row items-center justify-between'>
                <label htmlFor={label}>{label}</label>
                <div className='flex flex-row items-center mr-2 '>
                    <input id={label} type='number' value={value} onChange={onChange}
                        className='h-8 w-[140px] p-2 focus:outline-[0] text-day-350 border rounded-md outline-none 
                            bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]'/>
                    <p className='ml-2'>m</p>
                </div>
            </div>
        )
    }

    return (
        <form className='flex flex-col bg-day-00 rounded-md shadow pl-3 pt-3 text-day-350 max-h-full'>
            <div className='pr-3 flex flex-row justify-between items-center border-b pb-2'>
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
                        onClick={handleCloseForm}>
                        <SvgSelector id='close' />
                    </button>
                </div>
            </div>
            <div className='flex flex-col  text-day-350 overflow-y-auto '>
                <div className='flex flex-col justify-between'>
                    <div className='mt-3'>
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
                            <Input label='Width' value={boxParams.params.width} onChange={widthChange} />
                            <Input label='Height' value={boxParams.params.height} onChange={heightChange} />
                            <Input label='Depth' value={boxParams.params.depth} onChange={depthChange} />
                        </div> : ''}
                    </div>
                    <div className='my-3'>
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
                            <Input label='X' value={boxParams.position.x} onChange={positionXChange} />
                            <Input label='Y' value={boxParams.position.y} onChange={positionYChange} />
                            <Input label='Z' value={boxParams.position.z} onChange={positionZChange} />
                        </div> : ''}
                    </div>
                </div>
            </div>
        </form >
    )
}

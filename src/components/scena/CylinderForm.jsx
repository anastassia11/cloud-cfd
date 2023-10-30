import { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'
import { useSelector } from 'react-redux'
import * as THREE from "three"
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js'

export default function CylinderForm({ scene, transformControl, cylinderData, onCylinderDataChange, onCreate }) {
    const projectId = useSelector(state => state.project.projectId)

    const [cylinderParams, setCylinderParams] = useState(cylinderData)
    const [paramsVisible, setParamsVisible] = useState(true)
    const [positionVisible, setPositionVisible] = useState(true)

    useEffect(() => {
        setCylinderParams(cylinderData)
    }, [cylinderData])

    useEffect(() => {
        onCylinderDataChange(cylinderParams)
    }, [cylinderParams])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        handleCylinderCreate()
    }

    const heightChange = (e) => {
        const { value } = e.target
        const { radiusTop, radiusBottom, height } = cylinderParams.params
        const newCylinderPatternGeom = new THREE.CylinderGeometry(radiusTop, radiusBottom, value);
        setCylinderParams((prev) => ({
            ...prev, params: { ...prev.params, height: Number(value) },
            cylinderMesh: { ...prev.cylinderMesh, geometry: newCylinderPatternGeom }
        }))
    }

    const radiusChange = (e) => {
        const { value } = e.target
        const { radiusTop, radiusBottom, height } = cylinderParams.params
        const newCylinderPatternGeom = new THREE.CylinderGeometry(value, value, height);
        setCylinderParams((prev) => ({
            ...prev, params: { ...prev.params, radiusTop: Number(value), radiusBottom: Number(value) },
            cylinderMesh: { ...prev.cylinderMesh, geometry: newCylinderPatternGeom }
        }))
    }

    const positionXChange = (e) => {
        const { value } = e.target
        setCylinderParams((prev) => ({ ...prev, position: { ...prev.position, x: Number(value) } }))
    }

    const positionYChange = (e) => {
        const { value } = e.target
        setCylinderParams((prev) => ({ ...prev, position: { ...prev.position, y: Number(value) } }))
    }

    const positionZChange = (e) => {
        const { value } = e.target
        setCylinderParams((prev) => ({ ...prev, position: { ...prev.position, z: Number(value) } }))
    }

    const handleCylinderCreate = () => {
        const cylinderMaterial = new THREE.MeshPhongMaterial({
            color: 0xa0a0a0,
            specular: 0x494949,
            shininess: 100,
            side: THREE.DoubleSide,
        });

        setCylinderParams((prev) => ({
            ...prev, visible: false,
            cylinderMesh: { ...prev.cylinderMesh, material: cylinderMaterial }
        }))

        scene.remove(transformControl)

        // + ПОЗИЦИЮ БОКСА НА СЕРВЕР 
        const stlExporter = new STLExporter()
        const stlData = stlExporter.parse(cylinderData.cylinderMesh, { binary: true })
        const stlBlob = new Blob([stlData], { type: 'application/octet-stream' })
        const file = new File([stlBlob], 'cylinder.stl')
        onCreate({ 'Angle': '120', 'IdProject': projectId, 'File': file }, 'cylinder')
    }

    const handleCloseForm = () => {
        scene.remove(cylinderParams.cylinderMesh)
        setCylinderParams((prev) => ({ ...prev, visible: false }))
        scene.remove(transformControl)
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
        <form onSubmit={handleFormSubmit} className='flex flex-col bg-day-00 rounded-md shadow p-3 text-day-350'>
            <div className='flex flex-row justify-between items-center border-b pb-2'>
                <p className='self-end font-semibold'>Cylinder</p>
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
                            <Input label='Height' value={cylinderParams.params.height} onChange={heightChange} />
                            <Input label='Radius' value={cylinderParams.params.radiusTop} onChange={radiusChange} />
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
                            <Input label='X' value={cylinderParams.position.x} onChange={positionXChange} />
                            <Input label='Y' value={cylinderParams.position.y} onChange={positionYChange} />
                            <Input label='Z' value={cylinderParams.position.z} onChange={positionZChange} />
                        </div> : ''}
                    </div>
                </div>
            </div>
        </form >
    )
}

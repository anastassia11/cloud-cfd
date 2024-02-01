import { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'
import Modal from '../Modal'
import { useSelector } from 'react-redux'

export default function PrimitiveForm({ primitiveDataProp, onPrimitiveDataChange, onCloseForm, onCreate }) {
    const [primitiveData, setPrimitiveData] = useState(primitiveDataProp)
    const [paramsVisible, setParamsVisible] = useState(true)
    const [positionVisible, setPositionVisible] = useState(true)
    const [axisVisible, setAxisVisible] = useState(false)
    const [modal, setModal] = useState(false)
    const meshes = useSelector(state => state.mesh.meshes) ?? []
    const paramsKeys = Object.keys(primitiveDataProp.params)
    const positionKeys = Object.keys(primitiveDataProp.position)

    useEffect(() => {
        setPrimitiveData(primitiveDataProp)
    }, [primitiveDataProp])

    const handleParamsChange = (e) => {
        const { name, value } = e.target;
        setPrimitiveData((prev) => ({
            ...prev, params: {
                ...prev.params,
                [name]: Number(value)
            }
        }));
        onPrimitiveDataChange({
            ...primitiveData,
            params: { ...primitiveData.params, [name]: Number(value) }
        })
    }

    const handlePositionChange = (e) => {
        const { name, value } = e.target;
        setPrimitiveData((prev) => ({
            ...prev, position: {
                ...prev.position,
                [name]: Number(value)
            }
        }));
        onPrimitiveDataChange({
            ...primitiveData,
            position: { ...primitiveData.position, [name]: Number(value) }
        })
    }

    const handleAxisChange = (e) => {
        const { name, value } = e.target;
        setPrimitiveData((prev) => ({
            ...prev, axis: {
                ...prev.axis,
                [name]: Number(value)
            }
        }));
        onPrimitiveDataChange({
            ...primitiveData,
            axis: { ...primitiveData.axis, [name]: Number(value) }
        })
    }

    const handleNormalClick = (normalAxis) => {
        setPrimitiveData((prev) => ({
            ...prev, axis: normalAxis
        }));
        onPrimitiveDataChange({
            ...primitiveData,
            axis: normalAxis
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        meshes.length ? setModal(true) : onCreate()
    }

    const handleCloseForm = () => {
        onCloseForm('primitiveForm')
    }

    const Input = ({ label, name, valueProp, onChangeProp }) => {
        return (
            <div className='flex flex-row items-center justify-between '>
                <label className=''>{label}</label>
                <div className='flex flex-row items-center mr-2 '>
                    <input type='number' step='any' name={name} id={name} value={valueProp} onChange={onChangeProp}
                        className='h-8 w-[140px] p-2 focus:outline-[0] text-day-350 border rounded-md outline-none 
                            bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]'/>
                    <p className='ml-2'>m</p>
                </div>
            </div>
        )
    }

    const AxisInput = ({ label, name }) => {
        return (
            <div className='flex flex-row items-center justify-between h-8'>
                <label className=''>{label}</label>
                <input type='range' min='-1' max='1'
                    step='any' name={name} id={name}
                    value={primitiveData.axis[name]}
                    onChange={handleAxisChange}

                    className='w-[150px] h-[6px] bg-gray-300 accent-orange-200 rounded-full appearance-none cursor-pointer disabled:opacity-50' />
                <input type='number' step='any' name={name} id={name}
                    value={primitiveData.axis[name].toFixed(3)} onChange={handleAxisChange}
                    className='h-8 w-[70px] text-center focus:outline-[0] text-day-350 border rounded-md
                                outline-none bg-day-00 border-day-200 focus:border-[#c9c9c9]'/>
            </div>
        )
    }

    const title = <>
        {<div className='flex flex-row self-end'>
            <SvgSelector id='warning' />
            <p className='ml-2 font-semibold'>Warning</p>
        </div>}
    </>

    return (
        <>
            <form onSubmit={handleFormSubmit} className='flex flex-col bg-day-00 rounded-md shadow p-3 text-day-350'>
                <div className='flex flex-row justify-between items-center border-b pb-2'>
                    <p className='self-end font-semibold'>{primitiveDataProp.name.charAt(0).toUpperCase() + primitiveDataProp.name.slice(1)}</p>
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
                    <div className='flex flex-col justify-between space-y-2'>




                        <div className='flex flex-row cursor-pointer items-center'
                            onClick={() => setParamsVisible(prev => !prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className={`min-w-[20px] h-5 duration-300 ${paramsVisible ? 'rotate-180' : ''}`}>
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 
                        1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                            <p className='font-semibold ml-[7px]'>Parameters</p>
                        </div>
                        {paramsVisible ? <div className='flex flex-col space-y-2 ml-[27px] mt-2'>
                            {paramsKeys.map(key =>
                                Input({
                                    label: key.charAt(0).toUpperCase() + key.slice(1),
                                    name: key,
                                    valueProp: primitiveData.params[key],
                                    onChangeProp: handleParamsChange
                                })
                            )}
                        </div> : ''}
                        <div className='flex flex-row cursor-pointer items-center'
                            onClick={() => setPositionVisible(prev => !prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className={`min-w-[20px] h-5 duration-300 ${positionVisible ? 'rotate-180' : ''}`}>
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 
                        1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                            <p className='font-semibold ml-[7px] mr-2'>Center</p>
                        </div>
                        {positionVisible ? <div className='flex flex-col space-y-2 ml-[27px] mt-2'>
                            {positionKeys.map(key =>
                                Input({
                                    label: key.charAt(0).toUpperCase() + key.slice(1),
                                    name: key,
                                    valueProp: primitiveData.position[key],
                                    onChangeProp: handlePositionChange
                                })
                            )}
                        </div> : ''}
                        {primitiveData.name !== 'sphere' && <>
                            <div className='flex flex-row cursor-pointer items-center'
                                onClick={() => setAxisVisible(prev => !prev)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    className={`min-w-[20px] h-5 duration-300 ${axisVisible ? 'rotate-180' : ''}`}>
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 
                        1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                                <p className='font-semibold ml-[7px]'>Axis</p>
                            </div>
                            {axisVisible ? <div className='flex flex-col space-y-2 ml-[27px] mt-2'>
                                {AxisInput({ label: 'X', name: 'axisX' })}
                                {AxisInput({ label: 'Y', name: 'axisY' })}
                                {AxisInput({ label: 'Z', name: 'axisZ' })}
                                <div className='flex flex-row justify-between'>
                                    <button type='button' className="px-1 rounded-md text-day-300 h-8 border bg-day-50 hover:bg-day-100 
                            active:bg-day-150 flex items-center justify-center disabled:opacity-50"
                                        onClick={() => handleNormalClick({ axisX: 1, axisY: 0, axisZ: 0 })}>
                                        X Normal
                                    </button>
                                    <button type='button' className="px-1 rounded-md text-day-300 h-8 border bg-day-50 hover:bg-day-100 
                            active:bg-day-150 flex items-center justify-center disabled:opacity-50"
                                        onClick={() => handleNormalClick({ axisX: 0, axisY: 1, axisZ: 0 })}>
                                        Y Normal
                                    </button>
                                    <button type='button' className="px-1 rounded-md text-day-300 h-8 border bg-day-50 hover:bg-day-100 
                            active:bg-day-150 flex items-center justify-center disabled:opacity-50"
                                        onClick={() => handleNormalClick({ axisX: 0, axisY: 0, axisZ: 1 })}>
                                        Z Normal
                                    </button>
                                </div>
                            </div> : ''}
                        </>}
                    </div>
                </div>
            </form >
            {
                modal ? <Modal onCloseClick={() => setModal(false)} onActionClick={onCreate}
                    title={title} message='Mesh will be deleted.' btnTitle='OK' /> : ''
            }
        </>
    )
}

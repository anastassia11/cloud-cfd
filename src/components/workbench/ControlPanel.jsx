import { useEffect, useState } from 'react';
import SvgSelector from '../SvgSelector';
import * as THREE from "three"
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';

export default function ControlPanel({ selectModeProp, selectModeChange, renderModeProp,
    renderModeChange, setPrimitiveData, addClipPlane }) {
    const sceneMode = useSelector(state => state.project.sceneMode)
    const [selectMode, setSelectMode] = useState(selectModeProp)
    const [renderMode, setRenderMode] = useState(renderModeProp)

    useEffect(() => {
        selectModeChange(selectMode)
    }, [selectMode])

    useEffect(() => {
        renderModeChange(renderMode)
    }, [renderMode])

    const createPrimitive = (type) => {
        let geom, material, mesh, params;
        switch (type) {
            case 'box':
                params = {
                    width: 10,
                    height: 10,
                    depth: 10
                };
                geom = new THREE.BoxGeometry(params.width, params.height, params.depth);
                material = new THREE.MeshBasicMaterial({ color: 0x0078d3, opacity: 0.5, transparent: true });
                mesh = new THREE.Mesh(geom, material);
                break;
            case 'cylinder':
                params = {
                    radius: 5,
                    height: 20
                };
                geom = new THREE.CylinderGeometry(params.radius, params.radius, params.height);
                material = new THREE.MeshBasicMaterial({ color: 0x0078d3, opacity: 0.5, transparent: true });
                mesh = new THREE.Mesh(geom, material);
                break;
            case 'sphere':
                params = {
                    radius: 8
                };
                geom = new THREE.SphereGeometry(params.radius, 16 * params.radius, 8 * params.radius);
                material = new THREE.MeshBasicMaterial({ color: 0x0078d3, opacity: 0.5, transparent: true });
                mesh = new THREE.Mesh(geom, material);
                break;
            default:
                throw new Error(`Unsupported primitive type: ${type}`);
        }
        const normalVector = new THREE.Vector3(0, 0, 1);
        mesh.lookAt(new THREE.Vector3(mesh.position.x + normalVector.x, mesh.position.y + normalVector.y, mesh.position.z + normalVector.z));
        setPrimitiveData({
            visible: true,
            name: type,
            mesh: mesh,
            params: params,
            position: mesh.position,
            axis: {
                axisX: normalVector.x,
                axisY: normalVector.y,
                axisZ: normalVector.z
            }
        })
    }

    return (
        <div className='flex h-[40px] items-center justify-end grow justify-self-end'>
            <div className='border-r border-[#a4a4a4] px-2 h-[40px] flex flex-row items-center relative'>
                <div className={`rounded-md w-8 h-8 flex items-center justify-center 
                ${sceneMode === 'geom' ? 'group cursor-pointer hover:bg-day-150 hover:shadow' : 'opacity-40 cursor-default'}`}
                    data-tooltip-id="render-mode"
                    data-tooltip-content="Render Mode"
                    data-tooltip-place="bottom"
                    data-tooltip-variant="light">
                    {renderMode === 'surfaces' && <SvgSelector id='surfaces-render-mode' className='w-6' />}
                    {renderMode === 'translucent' && <SvgSelector id='translucent-render-mode' className='w-6' />}
                    <div className='absolute top-[25px]'>
                        <div className='mt-[3px] bg-day-00 rounded-md shadow border border-day-200 text-base duration-100 
                                    ease-linear transition-all group-hover:translate-y-[10px]
                                    invisible group-hover:visible h-0 group-hover:h-auto
                                    opacity-0 group-hover:opacity-100 '>
                            <div className='flex flex-col justify-center h-fit'>
                                <button className='rounded-md w-8 h-8 flex items-center justify-center hover:bg-day-100'
                                    onClick={() => setRenderMode('surfaces')}>
                                    <SvgSelector id='surfaces-render-mode' className='w-6' />
                                </button>
                                <button className='rounded-md w-8 h-8 flex items-center justify-center hover:bg-day-100'
                                    onClick={() => setRenderMode('translucent')}
                                    data-tooltip-id="translucent-render-mode"
                                    data-tooltip-content="Translucent"
                                    data-tooltip-place="right"
                                    data-tooltip-variant="light">
                                    <SvgSelector id='translucent-render-mode' className='w-6' />
                                </button>
                                <Tooltip id="translucent-render-mode"
                                    style={{
                                        fontSize: "11px",
                                        height: "20px",
                                        padding: "1px 8px 1px 8px",
                                        whiteSpace: "nowrap",
                                        display: "flex",
                                        alignItems: "center",
                                    }} />
                            </div>
                        </div>
                    </div>
                </div>
                {sceneMode === 'mesh' && <Tooltip id="render-mode"
                    style={{
                        fontSize: "11px",
                        height: "20px",
                        padding: "1px 8px 1px 8px",
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                    }} />}
            </div>
            <div className='border-r border-[#a4a4a4] px-2 h-[40px] flex flex-row items-center relative'>
                <button disabled={sceneMode === 'mesh'} className={`rounded-md w-8 h-8 flex items-center justify-center disabled:opacity-40
                        ${selectMode === 'volume' ? 'border border-orange-100 disabled:border-none' :
                        'hover:bg-day-150 disabled:bg-transparent hover:shadow disabled:shadow-none active:bg-day-100 active:shadow-inner'}`}
                    onClick={() => setSelectMode('volume')}
                    data-tooltip-id="volume-mode"
                    data-tooltip-content="Select Volume"
                    data-tooltip-place="bottom"
                    data-tooltip-variant="light"
                >
                    <SvgSelector id='select-volume' className='w-6' />
                </button>
                <Tooltip id="volume-mode"
                    style={{
                        fontSize: "11px",
                        height: "20px",
                        padding: "1px 8px 1px 8px",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                    }} />
            </div>
            <div className='border-r border-[#a4a4a4] px-2 h-[40px] flex flex-row items-center relative'>
                <button disabled={sceneMode === 'mesh'} className={`rounded-md w-8 h-8 flex items-center justify-center disabled:opacity-40
                        ${selectMode === 'face' ? 'border border-orange-100 disabled:border-none' :
                        'hover:bg-day-150 disabled:bg-transparent hover:shadow disabled:shadow-none active:bg-day-100 active:shadow-inner'}`}
                    onClick={() => setSelectMode('face')}
                    data-tooltip-id="face-mode"
                    data-tooltip-content="Select Face"
                    data-tooltip-place="bottom"
                    data-tooltip-variant="light">
                    <SvgSelector id='select-face' className='w-6' />
                </button>
                <Tooltip id="face-mode"
                    style={{
                        fontSize: "11px",
                        height: "20px",
                        padding: "1px 8px 1px 8px",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                    }} />
            </div>
            <div className='border-r border-[#a4a4a4] px-2 h-[40px] flex flex-row items-center relative'>
                <button disabled={sceneMode === 'geom'} className={`rounded-md w-8 h-8 flex items-center justify-center 
                     hover:bg-day-150 hover:shadow active:bg-day-100 active:shadow-inner 
                        disabled:bg-transparent disabled:shadow-none disabled:opacity-40`}
                    onClick={addClipPlane}
                    data-tooltip-id="clip"
                    data-tooltip-content="Mesh Clip"
                    data-tooltip-place="bottom"
                    data-tooltip-variant="light">
                    <SvgSelector id='clip' className='w-6' />
                </button>
                <Tooltip id="clip"
                    style={{
                        fontSize: "11px",
                        height: "20px",
                        padding: "1px 8px 1px 8px",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                    }} />
            </div>
            <div className={`relative  text-day-1000 flex flex-row items-center 
                            mr-2 h-8 pl-2 justify-start
                ${sceneMode === 'geom' ? 'group cursor-pointer' : 'opacity-40 cursor-default'}`}>
                <p className='text-[13px] pt-[2px] mr-[2px] tracking-wide'>CREATE</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className='w-5 h-5 duration-300 group-hover:rotate-180'>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>

                <div className='bg-day-00 rounded-md shadow absolute 
                                    top-[25px] border border-day-200 left-[5px] w-[65px] text-base duration-100 
                                    ease-linear transition-all group-hover:translate-y-[10px]
                                    invisible group-hover:visible h-0 group-hover:h-auto
                                    opacity-0 group-hover:opacity-100 '>
                    <div className='flex flex-col justify-center h-fit'>
                        <button className='flex flex-col pt-2 items-center space-x-1 text-day-1000 
                                        hover:bg-day-100 rounded-md h-fit'
                            onClick={() => createPrimitive('box')}>
                            <SvgSelector id='cube' className='w-[20px] text-day-350' />
                            <p className='text-[11px] tracking-wide'>Box</p>
                        </button>
                        <button className='flex flex-col pt-2 items-center space-x-1 text-day-1000 
                                        hover:bg-day-100 rounded-md h-fit'
                            onClick={() => createPrimitive('cylinder')}>
                            <SvgSelector id='cylinder' className='w-[20px] text-day-350' />
                            <p className='text-[11px] tracking-wide'>Cylinder</p>
                        </button>
                        <button className='flex flex-col pt-2 items-center space-x-1 text-day-1000 
                                        hover:bg-day-100 rounded-md h-fit'
                            onClick={() => createPrimitive('sphere')}>
                            <SvgSelector id='sphere' className='w-[20px] text-day-350' />
                            <p className='text-[11px] tracking-wide'>Sphere</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

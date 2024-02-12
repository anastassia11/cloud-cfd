import React, { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'
import createClip from '@/api/create_clip'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '@/store/slices/loaderSlice'
import { setCurrentMesh, setMeshes } from '@/store/slices/meshSlice'
import getMeshDataJson from '@/api/get_meshData'

export default function ClipForm({ onCloseForm, onChangeClip, boundingBox }) {
    const dispatch = useDispatch()
    const projectId = useSelector(state => state.project.projectId);
    const currentMesh = useSelector(state => state.mesh.currentMesh);
    const meshes = useSelector(state => state.mesh.meshes) || [];
    const loader = useSelector(state => state.loader.loader);

    const { XMin, XMax, YMin, YMax, ZMin, ZMax } = boundingBox();
    const center = { centerX: (XMin + XMax) / 2, centerY: (YMin + YMax) / 2, centerZ: (ZMin + ZMax) / 2 };

    const [params, setParams] = useState({
        ...center,
        normalX: 0,
        normalY: 1,
        normalZ: 0,
        shouldClip: false
    });

    useEffect(() => {
        onChangeClip(params)
    }, [params])

    const paramsChange = (e) => {
        const { name, value } = e.target;
        setParams((prev) => ({ ...prev, [name]: Number(value) }));
    }

    const findClipMeshByUid = (meshes, clipUid) => {
        for (const mesh of meshes) {
            for (const clipMesh of mesh.clipMeshes) {
                if (clipMesh.uid === clipUid) {
                    return {
                        idProject: projectId,
                        uid: mesh.uid,
                        points: [...clipMesh.clipPoints, params]
                    };
                }
            }
        }
        return null;
    }

    const fetchMeshes = async () => {
        const result = await getMeshDataJson(projectId)
        if (result.success) {
            dispatch(setMeshes({ meshes: result.data.meshes }))
        } else {
            // alert(result.message)
        }
    }
    const fetchCreateClip = async () => {
        dispatch(setLoader(true));

        const { uid, path, isClip } = currentMesh;
        const requestBody = isClip ? findClipMeshByUid(meshes, uid) :
            { idProject: projectId, uid, points: [params] }
        const result = await createClip(requestBody);
        if (result.success) {
            const { uid, path } = result.data;
            onCloseForm();
            fetchMeshes();
            dispatch(setCurrentMesh({ uid, path, isClip: true }));
            dispatch(setLoader(false));
        } else {
            alert(result.message);
            onCloseForm();
            dispatch(setLoader(false));
        }
    }

    const Input = ({ label, name }) => {
        return (
            <div className='flex flex-row items-center justify-between h-8'>
                <label className=''>{label}</label>
                <input type='range' min={`${name === 'centerX' ? XMin : name === 'centerY' ? YMin : name === 'centerZ' ? ZMin : '-1'}`}
                    max={`${name === 'centerX' ? XMax : name === 'centerY' ? YMax : name === 'centerZ' ? ZMax : '1'}`}
                    step='any' name={name} id={name}
                    value={params[name]}
                    onChange={paramsChange}
                    disabled={loader}
                    className='w-[150px] h-[6px] bg-gray-300 accent-orange-200 rounded-full appearance-none cursor-pointer 
                    disabled:opacity-50 disabled:cursor-default disabled:accent-gray-300'/>
                <input type='number' step='any' name={name} id={name}
                    value={params[name].toFixed(3)} onChange={paramsChange} disabled={loader}
                    className='h-8 w-[70px] text-center focus:outline-[0] text-day-350 border-b 
                                outline-none bg-day-00 border-day-200 focus:border-[#c9c9c9]'/>
            </div>
        )
    }

    return (
        <form className='flex flex-col bg-day-00 rounded-md shadow pl-3 pt-3 text-day-350 max-h-full'>
            <div className='pr-3 flex flex-row justify-between items-center border-b pb-2'>
                <p className='self-end ml-1 font-semibold'>Mesh Clip 1</p>
                <div className='flex flex-row space-x-[6px]'>
                    <button disabled={loader} type="button"
                        className="text-base font-medium text-white 
                            bg-orange-200 hover:bg-orange-100 active:bg-orange-150 duration-300 disabled:bg-orange-200
                            rounded-md  w-8 h-8 border flex items-center justify-center disabled:opacity-50"
                        onClick={fetchCreateClip} >
                        <SvgSelector id='check' />
                    </button>
                    <button disabled={loader} type="button"
                        className="rounded-md text-day-300 w-8 h-8 border bg-day-50 hover:bg-day-100 
                            active:bg-day-150 flex items-center justify-center disabled:opacity-50 disabled:bg-day-50"
                        onClick={onCloseForm} >
                        <SvgSelector id='close' />
                    </button>
                </div>
            </div>
            <div className='flex flex-col p-3 space-y-2 pl-1 text-day-350 overflow-y-auto '>
                <p className='font-semibold'>Origin</p>
                {Input({ label: 'X', name: 'centerX' })}
                {Input({ label: 'Y', name: 'centerY' })}
                {Input({ label: 'Z', name: 'centerZ' })}
                <p className='font-semibold'>Normal</p>
                {Input({ label: 'X', name: 'normalX' })}
                {Input({ label: 'Y', name: 'normalY' })}
                {Input({ label: 'Z', name: 'normalZ' })}

                <div className='flex flex-row justify-between'>
                    <button disabled={loader} type='button' className="px-2 rounded-md text-day-300 h-8 border bg-day-50 hover:bg-day-100 
                            active:bg-day-150 flex items-center justify-center disabled:opacity-50 disabled:bg-day-50"
                        onClick={() => setParams((prev) => ({ ...prev, normalX: 1, normalY: 0, normalZ: 0 }))}>
                        X Normal
                    </button>
                    <button disabled={loader} type='button' className="px-2 rounded-md text-day-300 h-8 border bg-day-50 hover:bg-day-100 
                            active:bg-day-150 flex items-center justify-center disabled:opacity-50 disabled:bg-day-50"
                        onClick={() => setParams((prev) => ({ ...prev, normalX: 0, normalY: 1, normalZ: 0 }))}>
                        Y Normal
                    </button>
                    <button disabled={loader} type='button' className="px-2 rounded-md text-day-300 h-8 border bg-day-50 hover:bg-day-100 
                            active:bg-day-150 flex items-center justify-center disabled:opacity-50 disabled:bg-day-50"
                        onClick={() => setParams((prev) => ({ ...prev, normalX: 0, normalY: 0, normalZ: 1 }))}>
                        Z Normal
                    </button>
                </div>
                <button disabled={loader} type='button' className="px-2 rounded-md text-day-300 h-8 border bg-day-50 hover:bg-day-100 
                            active:bg-day-150 items-center justify-center disabled:opacity-50 disabled:bg-day-50
                            flex flex-row space-x-2 w-full"
                    onClick={() => setParams((prev) => (
                        { ...prev, normalX: -params.normalX, normalY: -params.normalY, normalZ: -params.normalZ }
                    ))}>
                    <SvgSelector id='switch' />
                    <p>Switch Normal</p>
                </button>
            </div>
        </form >
    )
}

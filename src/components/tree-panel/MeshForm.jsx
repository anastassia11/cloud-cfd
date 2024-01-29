import { useDispatch, useSelector } from 'react-redux';
import SvgSelector from '../SvgSelector';
import { resetSetting, setSetting } from '@/store/slices/settingSlice';
import { useEffect, useState } from 'react';
import createMesh from '@/api/create_mesh';
import getSettingsMesh from '@/api/get_settings_mesh';
import { setSceneMode, setSelectedParts, setStateBar } from '@/store/slices/projectSlice';
import { setCurrentMesh, setMeshes, setPoint } from '@/store/slices/meshSlice';
import setMeshData from '@/api/set_mesh_data';
import cancelCreateMesh from '@/api/cancel_create_mesh';
import getMeshDataJson from '@/api/get_meshData';
import downloadCase from '@/api/download_case';
import { BASE_SERVER_URL } from '@/utils/constants';
import { BarLoader } from 'react-spinners';
import BoundaryLayer from './BoundaryLayer';

export default function MeshForm({ computeBoundingBox }) {
    const dispatch = useDispatch()
    const projectId = useSelector(state => state.project.projectId)
    const geoms = useSelector(state => state.project.geometries) ?? []
    const meshes = useSelector(state => state.mesh.meshes) ?? []
    const point = useSelector(state => state.mesh.point)
    const currentForm = useSelector(state => state.setting.formName)

    const [formData, setFormData] = useState({})
    const [advancedSettingsVisible, setAdvancedSettingsVisible] = useState(false)
    const [meshState, setMeshState] = useState('not_generated')
    const [downloadDisabled, setDownloadDisabled] = useState(false)

    useEffect(() => {
        let _selectedParts = []
        if (currentForm === 'mesh') {
            const _geoms = formData.StlGeomertrys
            _geoms?.forEach(({ Regions }) => {
                Regions.forEach(({ BoundaryLayer, uid, MeshPathName }) => {
                    if (BoundaryLayer.NSurfaceLayers !== 0) {
                        _selectedParts = [..._selectedParts, { name: MeshPathName, uid }]
                    }
                })
            });
            dispatch(setSelectedParts(_selectedParts))
        }
    }, [currentForm])

    useEffect(() => {
        getMeshData()
    }, [geoms.length])

    useEffect(() => {
        !meshes.length ? setMeshState('not_generated') : setMeshState('successfully_generated')
    }, [meshes])

    useEffect(() => {
        dispatch(setPoint({ visible: !formData.AddLayers }))
    }, [formData.AddLayers])

    useEffect(() => {
        Object.keys(formData).length && point && setFormData((prev) => ({
            ...prev, InsidePoint: {
                X: point.position.x,
                Y: point.position.y,
                Z: point.position.z,
            }
        }));
    }, [point.position])

    async function getMeshData() {
        const result = await getSettingsMesh(projectId)
        if (result.success) {
            if (result.status === 200) {
                setFormData(result.data);
                dispatch(setPoint({
                    position: {
                        x: result.data.InsidePoint?.X,
                        y: result.data.InsidePoint?.Y,
                        z: result.data.InsidePoint?.Z,
                    }
                }));
            } else if (result.status === 204) {
                setFormData({});
            }
        } else {
            alert(result.message)
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        saveMeshData()
        dispatch(resetSetting())
    }

    function handleLayerChange(surfaceLayers) {
        const _geoms = formData.StlGeomertrys
        _geoms.forEach(({ Regions }) => {
            Regions.forEach(({ BoundaryLayer, uid }) => {
                BoundaryLayer.NSurfaceLayers = surfaceLayers[uid];
            })
        });
        setFormData((prev) => ({ ...prev, StlGeomertrys: _geoms }));
    }

    function inputDataChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    }

    function pointInputDataChange(e) {
        const { name, value } = e.target;
        const _name = name.toLowerCase();
        setFormData((prev) => ({ ...prev, InsidePoint: { ...prev.InsidePoint, [name]: Number(value) } }));
        dispatch(setPoint({ position: { ...point.position, [_name]: Number(value) } }));
    }

    function toogleDataChange(e) {
        const { name, checked } = e.target
        setFormData((prev) => ({ ...prev, [name]: checked }))
    }

    function selectDataChange(e) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    async function saveMeshData() {
        Object.keys(formData).length && await setMeshData(projectId, formData)
    }

    async function fetchMeshes() {
        const result = await getMeshDataJson(projectId)
        if (result.success) {
            dispatch(setMeshes({ meshes: result.data.meshes }))
            dispatch(setCurrentMesh({
                uid: result.data.meshes[0].uid,
                path: result.data.meshes[0].path
            }))
            dispatch(setSceneMode('mesh'))
            dispatch(setSetting({ formName: '' }))
        } else {
            // alert(result.message)
        }
    }

    async function fetchGenerateMesh(formData) {
        setMeshState('in_progress')
        dispatch(setStateBar({ type: "status", visible: true, message: 'Mesh' }))
        const result = await createMesh(projectId, formData)
        if (result.success) {
            setMeshState('successfully_generated')
            dispatch(setStateBar({ type: 'success', visible: true, message: 'Mesh' }))
            fetchMeshes()
        } else {
            setMeshState('successfully_generated')
            dispatch(setStateBar({ type: 'error', visible: true, message: 'Mesh' }))
        }
    }

    function generateMesh() {
        const boundingBox = computeBoundingBox()
        const updatedFormData = { ...formData }
        for (let item in boundingBox) {
            updatedFormData[item] = boundingBox[item]
        }
        setFormData(updatedFormData)
        fetchGenerateMesh(updatedFormData)
    }

    async function handleDownload() {
        setDownloadDisabled(true)
        const result = await downloadCase(projectId)
        if (result.success) {
            const fileUrl = `${BASE_SERVER_URL}${result.data}`
            const link = document.createElement('a')
            link.href = fileUrl
            link.setAttribute('download', 'mesh.zip')
            document.body.appendChild(link)
            link.click()
            setDownloadDisabled(false)
            document.body.removeChild(link)
        }
    }

    async function stopCreateMesh() {
        const result = await cancelCreateMesh(projectId)
        if (result.success) {
            setMeshState('not_generated')
            dispatch(setStateBar({ visible: false, type: '', message: '' }))
        }
    }

    const Input = ({ label, name, unit }) => {
        return (
            <div className='flex flex-row items-center mb-1.5 justify-between h-8'>
                <label htmlFor={name} className='w-full text-left text-ellipsis overflow-hidden whitespace-nowrap'>{label}</label>
                <div className="flex flex-row items-center w-[250px]">
                    <input type="number" step="any" id={name} name={name} value={formData[name]} onChange={inputDataChange}
                        className={`h-8 ${unit ? 'w-3/4' : 'w-full'} p-2 focus:outline-[0] text-day-350 border rounded-md 
                            outline-none bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]`}>
                    </input>
                    {unit && <span className={`px-2 w-1/4 text-center cursor-default ml-1 border-b py-[4px]`}>{unit}</span>}
                </div>
            </div>
        )
    }

    const PointInput = ({ label, name, unit }) => {
        return (
            <div className='flex flex-col'>
                <div className='flex flex-row justify-between items-center h-8 '>
                    <p>
                        {label}, {unit}
                    </p>
                    <button type='button' className='text-blue-700 hover:underline underline-offset-4 duration-300'
                        onClick={() => dispatch(setPoint({ visible: !point.visible }))}>
                        {!point.visible ? 'Show' : 'Hide'}
                    </button>
                </div>
                <div className='flex flex-col space-y-2 my-1.5'>
                    <div className='flex flex-row items-center justify-between h-8'>
                        <label htmlFor='X' className='w-full text-left text-ellipsis overflow-hidden whitespace-nowrap'>X</label>
                        <div className="flex flex-row items-center w-[250px]">
                            <input type="number" id='X' name='X' step='any' value={formData[name] && formData[name]["X"]} onChange={pointInputDataChange}
                                className='h-8 w-full p-2 focus:outline-[0] text-day-350 border rounded-md 
                                outline-none bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]'>
                            </input>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between h-8'>
                        <label htmlFor='Y' className='w-full text-left text-ellipsis overflow-hidden whitespace-nowrap'>Y</label>
                        <div className="flex flex-row items-center w-[250px]">
                            <input type="number" id='Y' name='Y' step='any' value={formData[name] && formData[name]["Y"]} onChange={pointInputDataChange}
                                className='h-8 w-full p-2 focus:outline-[0] text-day-350 border rounded-md 
                                outline-none bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]'>
                            </input>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between h-8'>
                        <label htmlFor='Z' className='w-full text-left text-ellipsis overflow-hidden whitespace-nowrap'>Z</label>
                        <div className="flex flex-row items-center w-[250px]">
                            <input type="number" id='Z' name='Z' step='any' value={formData[name] && formData[name]["Z"]} onChange={pointInputDataChange}
                                className='h-8 w-full p-2 focus:outline-[0] text-day-350 border rounded-md 
                                outline-none bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]'>
                            </input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const Toogle = ({ label, name }) => {
        return (
            <div className='flex flex-row items-center mb-1.5 h-8'>
                <label htmlFor={name} className='w-full text-left'>{label}</label>
                <div className="flex flex-row items-center">
                    <label htmlFor={name} className="relative h-[24px] w-9 cursor-pointer [-webkit-tap-highlight-color:_transparent] transition-all">
                        <input type="checkbox" name={name} id={name} className="peer sr-only" checked={formData[name]}
                            onChange={toogleDataChange} />
                        <span className="absolute inset-0 m-auto h-[6px] rounded-full bg-gray-300"></span>
                        <span className="absolute inset-y-0 start-0 m-auto h-[18px] w-[18px] rounded-full bg-gray-400 
                transition-all peer-checked:bg-orange-200 peer-checked:start-[18px]">
                        </span>
                    </label>
                </div>
            </div>
        )
    }

    const Select = ({ label, name, options, unit }) => {
        return (
            <div className='flex flex-row items-center justify-between mb-1.5 h-8'>
                <label htmlFor={name} className='w-full text-left'>{label}</label>
                <div className="flex flex-row items-center w-[250px]">
                    <select value={formData[name]} onChange={selectDataChange} name={name}
                        className="p-0 h-8 w-full focus:outline-[0] text-day-350 border rounded-md outline-none 
                        bg-day-00 shadow-sm border-day-200 focus:border-day-250">
                        {Object.keys(options).map((key) => <option value={key} key={key}
                            className=''>{options[key]}</option>)}
                    </select >
                    {unit && <span className={`px-2 w-1/4 text-center cursor-default ml-1 border-b py-[4px]`}>{unit}</span>}
                </div>
            </div>
        )
    }

    const StateBar = ({ }) => {
        switch (meshState) {
            case 'not_generated':
                return (
                    <button type="button" className="rounded-md text-gray-500 p-[5px] h-8 border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center"
                        onClick={generateMesh}>
                        <SvgSelector id='play' /><p className='ml-1'>Generate Mesh</p>
                    </button>
                );
            case 'in_progress':
                return (
                    <>
                        <BarLoader width='100%' color="#d1d5db" height={10} speedMultiplier={0.3} cssOverride={{
                            borderRadius: '5px'
                        }} loading />
                        <button type="button" className="w-8 h-8 rounded-md text-gray-500 p-[5px] border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center"
                            onClick={stopCreateMesh}>
                            <SvgSelector id='stop' />
                        </button>
                    </>
                );
            case 'successfully_generated':
                return (
                    <>
                        <button type="button" disabled={downloadDisabled} className="w-8 h-8 rounded-md text-gray-500 p-[5px] border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center mr-1
                        disabled:opacity-40"
                            onClick={handleDownload}>
                            <SvgSelector id='download' />
                        </button>
                        <div className="w-full flex flex-col text-xs ">
                            <p className='text-green-800'>Finished</p>
                            <p>Overall mesh quality: 00</p>
                        </div>

                        <button type="button" className="h-8 rounded-md text-gray-500 p-[5px] border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center space-x-1"
                            onClick={generateMesh}>
                            <SvgSelector id='update' />
                            <p>Regenerate</p>
                        </button>
                    </>
                );
        }
    }

    const thickness = {
        FirstLayerThickness: "First layer thickness",
        FinalLayerThickness: "Final layer thickness",
        Thickness: "Thickness",
    }

    return (
        <form onSubmit={handleFormSubmit} className='max-h-[calc(100vh-73px)] flex flex-col bg-day-00 rounded-md 
        shadow h-fit text-day-350'>
            <div className='flex flex-row justify-between items-center border-b pb-2 p-3'>
                <p className='self-end'>Mesh</p>
                <div className='flex flex-row space-x-[6px]'>
                    <button type="submit" className="disabled:bg-orange-disabled text-base font-medium text-white 
                        bg-orange-200 hover:bg-orange-100 active:bg-orange-150 duration-300 
                        rounded-md  w-8 h-8 border flex items-center justify-center">
                        <SvgSelector id='check' />
                    </button>
                    <button className="rounded-md text-day-300 w-8 h-8 border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center">
                        <SvgSelector id='close' />
                    </button>
                </div>
            </div>
            {!geoms.length ?
                <div className="flex m-2 items-center gap-2 rounded-md px-2 h-9 text-base text-red-700 bg-red-50">
                    Add geometry to generate mesh
                </div> :
                <div className='overflow-y-auto py-3'>
                    <div className='px-3'>
                        <p className='h-8 flex items-center font-semibold mb-1.5'>Block mesh settings</p>
                        {Input({ label: 'Delta', name: 'Delta' })}
                        {PointInput({ label: 'Inside point', name: 'InsidePoint', unit: 'm' })}

                        <p className='h-8 flex items-center font-semibold mb-1.5'>Castellated mesh controls</p>
                        {Input({ label: 'Cells between levels', name: 'NCellsBetweenLevels' })}
                        {Input({ label: 'Resolve feature angle', name: 'ResolveFeatureAngle', unit: '\u00B0' })}


                        <p className='h-8 flex items-center font-semibold mb-1.5'>Add layers controls</p>
                        {Toogle({ label: 'Add layers', name: 'AddLayers' })}
                    </div>
                    {formData.AddLayers && <>
                        <div className='px-3'>
                            {Toogle({ label: 'Relative sizes', name: 'RelativeSizes' })}
                            {Input({ label: 'Expansion ratio', name: 'ExpansionRatio' })}
                            {Select({ label: 'Layers thickness type', name: 'LayersThicknessType', options: thickness })}
                            {formData.LayersThicknessType === "FirstLayerThickness" &&
                                Input({ label: 'First layer thickness', name: 'FirstLayerThickness' })}
                            {formData.LayersThicknessType === "FinalLayerThickness" &&
                                Input({ label: 'Final layer thickness', name: 'FinalLayerThickness' })}
                            {formData.LayersThicknessType === "Thickness" &&
                                Input({ label: 'Thickness', name: 'Thickness' })}
                        </div>
                        <BoundaryLayer onLayerChange={handleLayerChange} stlGeometries={formData.StlGeomertrys} />
                    </>}
                    <div className='mt-1 px-2'>
                        <div className='flex flex-row cursor-pointer'
                            onClick={() => setAdvancedSettingsVisible(prev => !prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className={`min-w-[20px] h-5 duration-300 ${advancedSettingsVisible ? 'rotate-180' : ''}`}>
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 
                        1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                            <p className='font-semibold ml-[7px] text-day-350 mb-1.5'>Advanced settings</p>
                        </div>
                        {advancedSettingsVisible ? <div className='flex flex-col ml-[27px]'>
                            {Input({ label: 'Merge tolerance', name: 'MergeTolerance' })}

                            <p className='h-8 flex items-center font-semibold mb-1.5'>Castellated mesh controls</p>
                            {Input({ label: 'Max global cells', name: 'MaxGlobalCells' })}
                            {Input({ label: 'Resolve feature angle', name: 'ResolveFeatureAngle' })}
                            {Toogle({ label: 'Allow free standing zone faces', name: 'AllowFreeStandingZoneFaces' })}
                            <p className='h-8 flex items-center font-semibold mb-1.5'>Snap controls</p>
                            {Toogle({ label: 'Snap', name: 'Snap' })}
                            {formData.Snap && <>
                                {Input({ label: 'Smooth patch', name: 'NSmoothPatch' })}
                                {Input({ label: 'Tolerance', name: 'Tolerance' })}
                                {Input({ label: 'Solve iterations', name: 'NSolveIter' })}
                                {Input({ label: 'Relax iterations', name: 'NRelaxIter' })}
                                {Input({ label: 'Feature snap iter', name: 'NFeatureSnapIter' })}

                                {formData.AddLayers && <>
                                    <p className='h-8 flex items-center font-semibold'>Add layers controls</p>
                                    {Input({ label: 'Min thickness', name: 'MinThickness' })}
                                    {Input({ label: 'Grow', name: 'NGrow' })}
                                    {Input({ label: 'Feature angle', name: 'FeatureAngle' })}
                                    {Input({ label: 'Relax iterations layer', name: 'NRelaxIterLayer' })}
                                    {Input({ label: 'Smooth surface normals', name: 'NSmoothSurfaceNormals' })}
                                    {Input({ label: 'Smooth thickness', name: 'NSmoothThickness' })}
                                    {Input({ label: 'Max face thickness ratio', name: 'MaxFaceThicknessRatio' })}
                                    {Input({ label: 'Max thickness to medial ratio', name: 'MaxThicknessToMedialRatio' })}
                                    {Input({ label: 'Min median axis angle', name: 'MinMedianAxisAngle' })}
                                    {Input({ label: 'Buffer cells no extrude', name: 'NBufferCellsNoExtrude' })}
                                    {Input({ label: 'Layer iterations', name: 'NLayerIter' })}
                                    {Input({ label: 'Relaxed iterations', name: 'NRelaxedIter' })}
                                </>}
                            </>}
                        </div> : ''}
                    </div>
                </div>}
            {
                geoms.length ? <div className='w-full border-t flex flex-row justify-end items-center p-3 space-x-[6px]'>
                    <StateBar />
                </div> : ''
            }
        </form >
    )
}

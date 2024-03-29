import { useDispatch, useSelector } from 'react-redux'
import SettingForm from '../tree-panel/SettingForm'
import TreePanel from '../tree-panel/TreePanel'
import ControlPanel from './ControlPanel'
import GeometriesPanel from '../geometries-panel/GeometriesPanel'
import TransformForm from './TransformForm'
import { useEffect, useRef, useState } from 'react'
import * as THREE from "three"
import GeometryScene from './GeometryScene'
import MeshScene from './MeshScene'
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js'
import MeshForm from '../tree-panel/forms/MeshForm'
import StateBar from './StateBar'
import ClipForm from './ClipForm'
import { setLayerGroups, setMeshes, setPoint, setSettings, setSettingsMesh } from '@/store/slices/meshSlice'
import PrimitiveForm from './PrimitiveForm'
import getSettingsMesh from '@/api/get_settings_mesh'

export default function Workbench() {
    const dispatch = useDispatch()
    const transformRef = useRef(null)
    const primitiveRef = useRef(null)
    const geomRef = useRef(null)

    const geometryScene = useRef(null)
    const meshScene = useRef(null)

    const geometrySceneRef = useRef(null)
    const meshSceneRef = useRef(null)

    const camera = useRef(null)

    const meshes = useSelector(state => state.mesh.meshes) ?? []
    const geoms = useSelector(state => state.project.geometries) ?? []

    const projectId = useSelector(state => state.project.projectId)
    const selectedSetting = useSelector(state => state.setting.formName)
    const sceneMode = useSelector(state => state.project.sceneMode)
    // const formName = useSelector(state => state.setting.formName)

    const [selectMode, setSelectMode] = useState('face')
    const [renderMode, setRenderMode] = useState('surfaces')

    const [transformFormData, setTransformFormData] = useState({
        visible: false,
        name: '',
        position: {},
        angle: {}
    })

    const [primitiveData, setPrimitiveData] = useState({
        visible: false,
        name: '',
        mesh: {},
        params: {},
        position: {},
        axis: {}
    })

    const [clipPlane, setClipPlane] = useState({
        visible: false,
    })

    useEffect(() => {
        geometrySceneRef.current.changePrimitiveData(primitiveData)
    }, [primitiveData])

    useEffect(() => {
        getMeshData()
    }, [geoms.length])

        ; (function init() {
            geometryScene.current = new THREE.Scene()
            meshScene.current = new THREE.Scene()
            camera.current = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.current.position.x = 0;
            camera.current.position.y = 0
            camera.current.position.z = 50;
            camera.current.lookAt(new THREE.Vector3(0, 0, 0));
        })()

    const callHidePartObject = (model) => {
        geometrySceneRef.current.hidePartObject(model)
    }

    const callPositionChange = (newPosition) => {
        geometrySceneRef.current.handlePositionChange(newPosition)
    }

    const callCloseForm = (formName) => {
        geometrySceneRef.current.handleCloseForm(formName)
    }

    const callComputeBoundingBox = () => {
        const boundingBox = geometrySceneRef.current.computeBoundingBox()
        return boundingBox
    }

    const addClipPlane = () => {
        meshSceneRef.current.addClipPlane()
        setClipPlane(prev => ({ ...prev, visible: true }))
    }

    const closeClipPlane = () => {
        meshSceneRef.current.deleteClipPlane()
        setClipPlane(prev => ({ ...prev, visible: false }))
    }

    const changeClipPlane = (params) => {
        meshSceneRef.current.changeClipPlane(params)
    }

    const addPrimitivePattern = (newData) => {
        geometrySceneRef.current.removeFromGeomScene(primitiveData.mesh)
        geometrySceneRef.current.addToGeomScene(newData.mesh)
        geometrySceneRef.current.addTransformControl(newData.mesh)
        setPrimitiveData(newData)
    }

    const addPrimitive = () => {
        const material = new THREE.MeshPhongMaterial({
            color: 0xa0a0a0,
            specular: 0x494949,
            shininess: 100,
            side: THREE.DoubleSide,
        })
        setPrimitiveData((prev) => ({
            ...prev, visible: false, mesh: { ...prev.mesh, material: material }
        }))

        const stlExporter = new STLExporter()
        const stlData = stlExporter.parse(primitiveData.mesh, { binary: true })
        const stlBlob = new Blob([stlData], { type: 'application/octet-stream' })
        const file = new File([stlBlob], `${primitiveData.name}.stl`)
        geometrySceneRef.current.addPrimitive({ 'Angle': '120', 'IdProject': projectId, 'File': file })
        dispatch(setMeshes({ meshes: [] }))
    }

    const changeTransformData = (newData) => {
        setTransformFormData((prevData) => {
            return { ...prevData, ...newData }
        })
    }

    const changePrimitiveData = (newData) => {
        setPrimitiveData((prevData) => {
            return { ...prevData, ...newData }
        })
    }

    const copyParams = (params) => {

    }

    const setLayers = (data) => {
        const result = data.StlGeomertrys.reduce((acc, cur) => {
            cur.Regions.forEach(region => {
                if (region.GroupName !== "") {
                    let groupIndex = acc.findIndex(item => item.GroupName === region.GroupName);
                    if (groupIndex > -1) {
                        acc[groupIndex].faces.push({ uid: region.uid, name: region.MeshPathName });
                    } else {
                        acc.push({
                            GroupName: region.GroupName,
                            NSurfaceLayers: region.BoundaryLayer.NSurfaceLayers,
                            ExpansionRatio: region.BoundaryLayer.ExpansionRatio,
                            FirstLayerThickness: region.BoundaryLayer.FirstLayerThickness,
                            Min: region.RefinementSettings.Min,
                            Max: region.RefinementSettings.Max,
                            faces: [{ uid: region.uid, name: region.MeshPathName }]
                        });
                    }
                }
            });
            return acc;
        }, []);
        dispatch(setLayerGroups(result))
    }

    const getMeshData = async () => {
        const result = await getSettingsMesh(projectId)
        if (result.success) {
            if (result.status === 200) {
                dispatch(setSettingsMesh(result.data))
                dispatch(setPoint({
                    position: {
                        x: result.data.InsidePoint?.X,
                        y: result.data.InsidePoint?.Y,
                        z: result.data.InsidePoint?.Z,
                    }
                }));
                setLayers(result.data)
            } else if (result.status === 204) {
                dispatch(setSettingsMesh({}))
            }
        } else {
            alert(result.message)
        }
    }

    return (
        <div className='min-h-[calc(100vh-56px)] flex w-full' id='for-canvas'>
            <div className={`${sceneMode === "geom" || !meshes.length || !geoms.length ? 'block' : 'hidden'}`}>
                <GeometryScene ref={geometrySceneRef}
                    selectMode={selectMode} setTransformFormData={changeTransformData}
                    renderMode={renderMode}
                    setPrimitiveData={changePrimitiveData}
                    sendParameters={() => { }}
                    acceptParameters={() => { }} />
            </div>
            <div className={`${meshes.length && geoms.length && sceneMode === 'mesh' ? 'block' : 'hidden'}`}>
                <MeshScene ref={meshSceneRef} boundingBox={callComputeBoundingBox}
                    sendParameters={() => { }}
                    acceptParameters={() => { }} />
            </div>

            <div className='flex flex-row justify-between w-full m-2 '>
                <div className='flex flex-row'>
                    <div className='flex flex-col '>
                        <div className='min-w-0 w-[300px] mr-[12px] h-fit relative'>
                            <TreePanel />
                        </div>
                        <StateBar />
                    </div>

                    <div className={`w-[350px] mr-[10px] h-fit relative`}>
                        <div className={`${selectedSetting !== '' && selectedSetting !== 'mesh' ? '' : 'hidden'}`}>
                            <SettingForm />
                        </div>
                        <div className={`${selectedSetting !== '' && selectedSetting === 'mesh' ? '' : 'hidden'}`}>
                            <MeshForm computeBoundingBox={callComputeBoundingBox} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-row'>
                    <ControlPanel selectModeProp={selectMode} selectModeChange={(mode) => setSelectMode(mode)}
                        renderModeProp={renderMode} renderModeChange={(mode) => setRenderMode(mode)}
                        setPrimitiveData={addPrimitivePattern}
                        addClipPlane={addClipPlane} />

                    <div className='right-0 flex flex-col max-h-[calc(100vh-73px)] overflow-hidden'>
                        <div ref={geomRef} className={`min-w-0 w-[300px] ml-[12px] relative 
                        max-h-[calc(100vh-73px-${(primitiveRef.current ? primitiveRef.current.offsetHeight : 0)}px-
                        ${transformRef.current ? transformRef.current.offsetHeight : 0}px-
                    ]
                        min-h-[50px] overflow-clip`}>
                            <GeometriesPanel onHidePartObject={callHidePartObject} />
                        </div>

                        {transformFormData.visible ? <div ref={transformRef} className={`min-w-0 w-[300px] self-end 
                            mt-[10px] relative`}>
                            <TransformForm geomName={transformFormData.name} position={transformFormData.position}
                                onPositionChange={callPositionChange} onCloseForm={callCloseForm} />
                        </div> : ''}

                        {primitiveData.visible ?
                            <div ref={primitiveRef} className={`min-w-0 w-[300px] self-end mt-[10px] 
                            relative`}>
                                <PrimitiveForm name='cylinder'
                                    primitiveDataProp={primitiveData}
                                    onPrimitiveDataChange={(newData) => setPrimitiveData(newData)}
                                    onCloseForm={callCloseForm}
                                    onCreate={addPrimitive} />
                            </div> : ''}

                        {clipPlane.visible ?
                            <div className={`min-w-0 w-[300px] self-end mt-[10px] 
                            relative`}>
                                <ClipForm onCloseForm={closeClipPlane}
                                    onChangeClip={changeClipPlane} boundingBox={callComputeBoundingBox} />
                            </div> : ''}
                    </div>
                </div>
            </div>
        </div >
    )
}

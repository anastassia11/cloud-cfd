import { useSelector } from 'react-redux'
import SettingForm from '../tree-panel/SettingForm'
import TreePanel from '../tree-panel/TreePanel'
import BoxForm from './BoxForm'
import ControlPanel from './ControlPanel'
import CylinderForm from './CylinderForm'
import GeometriesPanel from './GeometriesPanel'
import TransformForm from './TransformForm'
import { useEffect, useRef, useState } from 'react'
import * as THREE from "three"
import GeometryScene from './GeometryScene'
import MeshScene from './MeshScene'
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js'

export default function Workbench() {
    const transformRef = useRef(null)
    const boxRef = useRef(null)
    const cylinderRef = useRef(null)
    const geomRef = useRef(null)

    const geometryScene = useRef(null)
    const meshScene = useRef(null)

    const geometrySceneRef = useRef(null)
    const camera = useRef(null)
    const rendererMesh = useRef(null)

    const projectId = useSelector(state => state.project.projectId)
    const selectedSetting = useSelector(state => state.setting.setting)
    const formName = useSelector(state => state.setting.formName)
    const [selectionMode, setSelectionMode] = useState("face")

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
        position: {}
    })

    useEffect(() => {
        if (primitiveData.name === 'box') {
            geometrySceneRef.current.changeBoxData(primitiveData)
        } else if (primitiveData.name === 'cylinder') {
            geometrySceneRef.current.changeCylinderData(primitiveData)
        }
    }, [primitiveData])

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

            rendererMesh.current = new THREE.WebGLRenderer({
                antialias: true,
                preserveDrawingBuffer: true
            });

            rendererMesh.current.setClearColor("#f0f0f0");
            rendererMesh.current.setSize(window.innerWidth, window.innerHeight - 56);
        })()

    function callHidePartObject(model) {
        geometrySceneRef.current.hidePartObject(model)
    }

    function callPositionChange(newPosition) {
        geometrySceneRef.current.handlePositionChange(newPosition)
    }

    function callCloseForm(formName) {
        geometrySceneRef.current.handleCloseForm(formName)
    }

    function addPrimitivePattern(newData) {
        setPrimitiveData(newData)
        geometrySceneRef.current.addToGeomScene(newData.mesh)
        geometrySceneRef.current.addTransformControl(newData.mesh)
    }

    function addPrimitive() {
        const material = new THREE.MeshPhongMaterial({
            color: 0xa0a0a0,
            specular: 0x494949,
            shininess: 100,
            side: THREE.DoubleSide,
        })
        setPrimitiveData((prev) => ({
            ...prev, visible: false, mesh: { ...prev.mesh, material: material }
        }))

        // + ПОЗИЦИЮ БОКСА НА СЕРВЕР 
        const stlExporter = new STLExporter()
        const stlData = stlExporter.parse(primitiveData.mesh, { binary: true })
        const stlBlob = new Blob([stlData], { type: 'application/octet-stream' })
        const file = new File([stlBlob], `${primitiveData.name}.stl`)
        geometrySceneRef.current.addPrimitive({ 'Angle': '120', 'IdProject': projectId, 'File': file })
    }

    return (
        <div className='min-h-[calc(100vh-56px)] flex w-full' id='for-canvas'>
            <div className={`${selectedSetting === "mesh" && 'hidden'}`}>
                <GeometryScene ref={geometrySceneRef} scene={geometryScene.current} camera={camera.current}
                    selectionMode={selectionMode} setTransformFormData={(newData) => setTransformFormData(newData)}
                    setPrimitiveData={(newData) => setPrimitiveData(newData)} />
            </div>
            <div className={`${selectedSetting !== "mesh" && 'hidden'}`}>
                <MeshScene scene={meshScene.current} camera={camera.current} renderer={rendererMesh} />
            </div>

            <div className='flex flex-row justify-between w-full m-2 '>
                <div className='flex flex-row w-full'>
                    <div className='min-w-0 w-[300px] mr-[12px] h-fit relative'>
                        <TreePanel />
                    </div>

                    <div className={`w-[350px] mr-[10px] h-fit relative
                    ${selectedSetting !== null && selectedSetting === (formName) ? '' : 'hidden'}`}>
                        <SettingForm />
                    </div>

                    <ControlPanel selectionMode={selectionMode}
                        onModeChange={(mode) => setSelectionMode(mode)}
                        setPrimitiveData={addPrimitivePattern} />

                    <div className='flex flex-col max-h-[calc(100vh-73px)] overflow-hidden'>
                        <div ref={geomRef} className={`min-w-0 w-[300px] ml-[12px] relative 
                        max-h-[calc(100vh-73px-${(boxRef.current ? boxRef.current.offsetHeight : 0)}px-
                        ${transformRef.current ? transformRef.current.offsetHeight : 0}px - 
                        ${cylinderRef.current ? cylinderRef.current.offsetHeight : 0}px)]
                        min-h-[50px] overflow-clip`}>
                            <GeometriesPanel onHidePartObject={callHidePartObject} />
                        </div>

                        {transformFormData.visible ? <div ref={transformRef} className={`min-w-0 w-[300px] self-end 
                            mt-[10px] relative`}>
                            <TransformForm geomName={transformFormData.name} position={transformFormData.position}
                                onPositionChange={callPositionChange} onCloseForm={callCloseForm} />
                        </div> : ''}

                        {primitiveData.visible && primitiveData.name === 'box' ?
                            <div ref={boxRef} className={`min-w-0 w-[300px] self-end mt-[10px] 
                        relative`}>
                                <BoxForm
                                    boxParams={primitiveData.params}
                                    boxPosition={primitiveData.position}
                                    onBoxDataChange={(newData) => setPrimitiveData(prev => ({
                                        ...prev, params: newData.params, position: newData.position
                                    }))}
                                    onCloseForm={callCloseForm}
                                    onCreate={addPrimitive}
                                />
                            </div> : ''}

                        {primitiveData.visible && primitiveData.name === 'cylinder' ?
                            <div ref={cylinderRef} className={`min-w-0 w-[300px] self-end mt-[10px] 
                            relative`}>
                                <CylinderForm
                                    cylinderParams={primitiveData.params}
                                    cylinderPosition={primitiveData.position}
                                    onCylinderDataChange={(newData) => setPrimitiveData(prev => ({
                                        ...prev, params: newData.params, position: newData.position
                                    }))}
                                    onCloseForm={callCloseForm}
                                    onCreate={addPrimitive} />
                            </div> : ''}
                    </div>
                </div>
            </div>
        </div >
    )
}

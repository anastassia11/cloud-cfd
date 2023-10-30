import * as THREE from "three"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import React, { useRef, useEffect, useState } from "react"
import TreePanel from '../tree-panel/TreePanel'
import { BASE_SERVER_URL } from '@/utils/constants'
import getGeometries from '@/pages/api/get_geometries'
import { useDispatch, useSelector } from 'react-redux'
import { addSelectedPart, deleteSelectedPart, setGeometries } from '@/store/slices/projectSlice'
import GeometriesPanel from './GeometriesPanel'
import SettingForm from '../tree-panel/SettingForm'
import { setLoader } from '@/store/slices/loaderSlice'
import { Resizable } from 're-resizable'
import { TransformControls } from "three/examples/jsm/controls/TransformControls"
import TransformForm from './TransformForm'
import CylinderForm from './CylinderForm'
import BoxForm from './BoxForm'
import addGeometry from '@/pages/api/set_geometry'
import ControlPanel from './ControlPanel'

export default function Scene({ }) {
    const containerRef = useRef(null)
    const didLogRef = useRef(false)

    const settingSize = 335
    const [treeSize, setTreeSize] = useState(300)
    const [geomSize, setGeomSize] = useState(300)

    const transformRef = useRef(null)
    const boxRef = useRef(null)
    const cylinderRef = useRef(null)
    const geomRef = useRef(null)


    const projectId = useSelector(state => state.project.projectId)
    const selectedSetting = useSelector(state => state.setting.setting)
    const formName = useSelector(state => state.setting.formName)

    const [meshes, setMeshes] = useState([])
    const [groups, setGroups] = useState([])
    const [selectedFaces, setSelectedFaces] = useState([])

    const [selectionMode, setSelectionMode] = useState("face")

    const transformControl = useRef(null)

    const [transformFormData, setTransformFormData] = useState({
        visible: false,
        name: '',
        position: {},
        angle: {}
    })
    const [cylinderData, setCylinderData] = useState({
        visible: false,
        name: '',
        cylinderMesh: {},
        params: {},
        position: {}
    })
    const [boxData, setBoxData] = useState({
        visible: false,
        name: '',
        boxMesh: {},
        params: {},
        position: {}
    })

    const dispatch = useDispatch()

    const orbitControls = useRef(null)
    const stlLoader = useRef(null)
    const renderer = useRef(null)
    const camera = useRef(null)
    const composer = useRef(null)
    const outlinePass = useRef(null)

    const sceneRef = useRef(null)
    const geomsState = useSelector(state => state.project.geometries)
    const dataUrl = useRef(null)

    useEffect(() => {
        sceneRef.current = new THREE.Scene()
        if (didLogRef.current === false) {
            didLogRef.current = true;
            loadGeoms()
        }
        init()
        animate()
        addTransformListeners()
        //takeSnapshot()
        return () => {
            removeTransformListeners()
            //takeSnapshot()
        }
    }, [])

    useEffect(() => {
        addListeners()
        takeSnapshot()
        return () => removeListeners()
    }, [meshes, groups, selectionMode])

    useEffect(() => {
        const geomsToRemove = sceneRef.current.children
            .filter(child => child.isGroup && !geomsState.some(geom => geom.uid === child.uid))
            .map(group => {
                sceneRef.current.remove(group)
                return group.uid
            });
        setGroups((prevGroups) => prevGroups.filter(prevGroup => !geomsToRemove.includes(prevGroup.uid)))
    }, [geomsState])

    useEffect(() => {
        const allChildren = groups.flatMap(group => group.children)
        setMeshes(allChildren)
        //takeSnapshot()
    }, [groups])

    const loadGeoms = async () => {
        dispatch(setLoader(true))
        const result = await getGeometries(projectId)
        if (result.success) {
            dispatch(setGeometries({ geometries: result.data.geometryDataList }))
            loadSTL(result.data.geometryDataList)
            dispatch(setLoader(false))
        } else {
            alert(result.message)
            dispatch(setLoader(false))
        }
    }

    function loadSTL(geoms) {
        geoms?.forEach((geom) => {
            if (!groups.some(group => group.uid === geom.uid)) {
                const group = new THREE.Group()
                group.name = geom.name
                group.uid = geom.uid
                let center = new THREE.Vector3()
                geom.models.forEach((model) => {
                    stlLoader.current.load(
                        BASE_SERVER_URL + model.link,
                        (geometry) => {
                            geometry.computeBoundingSphere()
                            center.add(geometry.boundingSphere.center)
                            const meshMaterial = new THREE.MeshPhongMaterial({
                                color: 0xa0a0a0,
                                specular: 0x494949,
                                shininess: 100,
                                side: THREE.DoubleSide,
                            });
                            const mesh = new THREE.Mesh(geometry, meshMaterial)

                            mesh.scale.set(1, 1, 1)
                            mesh.castShadow = true
                            mesh.receiveShadow = true
                            mesh.uid = model.uid
                            mesh.visible = model.visible
                            mesh.category = geom.name
                            group.add(mesh)
                            setMeshes((prevMeshes) => {
                                if (!prevMeshes.some(meshItem => meshItem.uid === mesh.uid)) {
                                    return [...prevMeshes, mesh]
                                }
                                return prevMeshes
                            })
                        }
                    )
                })
                sceneRef.current.add(group)
                setGroups((prevGroups) => {
                    if (!prevGroups.some(groupItem => groupItem.uid === group.uid)) {
                        return [...prevGroups, group]
                    }
                    return prevGroups
                })
            }
        })
    }

    function onWindowResize() {
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight - 56);
    }

    function init() {
        window.addEventListener('resize', onWindowResize)
        stlLoader.current = new STLLoader();
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
        sceneRef.current.background = new THREE.Color(0xf0f0f0);
        sceneRef.current.add(new THREE.AmbientLight(0xf0f0f0));

        const light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 1500, 200);
        light.angle = Math.PI * 0.2;
        light.castShadow = true;
        light.shadow.camera.near = 200;
        light.shadow.camera.far = 2000;
        light.shadow.bias = -0.000222;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        sceneRef.current.add(light);

        const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
        planeGeometry.rotateX(-Math.PI / 2);
        const planeMaterial = new THREE.ShadowMaterial({
            color: 0x000000,
            opacity: 0.2,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.y = -200;
        plane.receiveShadow = true;
        sceneRef.current.add(plane);

        const helper = new THREE.GridHelper(2000, 100);
        helper.position.y = -199;
        helper.material.opacity = 0.25;
        helper.material.transparent = true;
        sceneRef.current.add(helper);

        renderer.current = new THREE.WebGLRenderer({
            canvas: containerRef.current,
            antialias: true,
            preserveDrawingBuffer: true
        });
        renderer.current.setClearColor("#f0f0f0");
        renderer.current.setSize(window.innerWidth, window.innerHeight - 56);

        orbitControls.current = new OrbitControls(
            camera.current,
            renderer.current.domElement
        );

        composer.current = new EffectComposer(renderer.current);

        const renderPass = new RenderPass(sceneRef.current, camera.current);
        composer.current.addPass(renderPass);

        outlinePass.current = new OutlinePass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            sceneRef.current,
            camera.current
        );
        composer.current.addPass(outlinePass.current);

        transformControl.current = new TransformControls(camera.current, renderer.current.domElement);

    }

    function animate() {
        requestAnimationFrame(animate)
        renderer.current.render(sceneRef.current, camera.current)
        orbitControls.current.update()
        composer.current.render()
        //takeSnapshot()
    }

    // Создаем снимок сцены
    function takeSnapshot() {
        dataUrl.current = renderer.current.domElement.toDataURL('image/png')
        //console.log(snapshot); // Здесь можно использовать снимок для отображения или сохранения

        // Отключаем анимацию
        //cancelAnimationFrame(requestAnimationFrame(animate));
    }

    function addListeners() {
        renderer.current.domElement.addEventListener("click", handleClick)
        renderer.current.domElement.addEventListener("pointermove", handleHover)
    }

    function removeListeners() {
        renderer.current.domElement.removeEventListener("click", handleClick)
        renderer.current.domElement.removeEventListener("pointermove", handleHover)
    }

    function addTransformListeners() {
        transformControl.current.addEventListener('dragging-changed', handleTransformMove)
        transformControl.current.addEventListener('change', handleTransformChange)
    }
    function removeTransformListeners() {
        transformControl.current.removeEventListener('dragging-changed', handleTransformMove)
        transformControl.current.removeEventListener('change', handleTransformMove)
    }

    function handleTransformChange() {
        setTransformFormData((prevData) => ({ ...prevData, position: transformControl.current?.object?.position }))
    }

    const handleClick = (event) => {
        event.stopPropagation()
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera.current);

        const selected_material = new THREE.MeshPhongMaterial({
            color: 0x404080,
            specular: 0x494949,
            shininess: 100,
            side: THREE.DoubleSide,
        })

        const base_material = new THREE.MeshPhongMaterial({
            color: 0xa0a0a0,
            specular: 0x494949,
            shininess: 100,
            side: THREE.DoubleSide,
        });

        if (selectionMode === 'volume') {
            groups.forEach((group) => {

                const intersects = raycaster.intersectObjects(group.children, true);
                if (intersects.length > 0) {
                    group.traverse((object) => {
                        if (object.isMesh) {
                            setSelectedFaces((prevGeoms) => {
                                if (prevGeoms?.length > 0 && prevGeoms.some((prevGeom) => prevGeom.uid === object.uid)) {
                                    object.material = base_material
                                    dispatch(deleteSelectedPart({ deletedPart: object.uid }))
                                    sceneRef.current.remove(transformControl.current)
                                    setTransformFormData((prevData) => ({ ...prevData, visible: false }))
                                    return prevGeoms.filter((prevGeom) => prevGeom.uid !== object.uid)
                                } else {
                                    object.material = selected_material
                                    dispatch(addSelectedPart({ addedPart: object.uid }))
                                    transformControl.current.attach(group)
                                    transformControl.current.uid = group.uid
                                    sceneRef.current.add(transformControl.current)
                                    setTransformFormData({ visible: true, name: group.name, position: group.position })
                                    return [...prevGeoms, object]
                                }
                            })
                        }
                    })


                }
            })

        } else if (selectionMode === 'face') {
            const intersects = raycaster.intersectObjects(meshes, true)
            if (intersects.length > 0) {
                const object = intersects[0].object
                setSelectedFaces((prevGeoms) => {
                    if (prevGeoms?.length > 0 && prevGeoms.some((prevGeom) => prevGeom.uid === object.uid)) {
                        object.material = base_material
                        dispatch(deleteSelectedPart({ deletedPart: object.uid }))
                        return prevGeoms.filter((prevGeom) => prevGeom.uid !== object.uid)
                    } else {
                        object.material = selected_material
                        dispatch(addSelectedPart({ addedPart: object.uid }))
                        return [...prevGeoms, object]
                    }
                })
            }
        }
    }

    const handleHover = (event) => {
        outlinePass.current.selectedObjects = []
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera.current);

        if (selectionMode === 'volume') {
            groups.forEach((group) => {
                const intersects = raycaster.intersectObjects(group.children, true);
                if (intersects.length > 0) {
                    outlinePass.current.selectedObjects = group.children;
                    outlinePass.current.enabled = true;
                }
            })

        } else if (selectionMode === 'face') {
            const intersects = raycaster.intersectObjects(meshes, true);
            if (intersects.length > 0) {
                const object = intersects[0].object;
                outlinePass.current.selectedObjects = [object];
                outlinePass.current.enabled = true;
            }
        }
    }

    const handleTransformMove = (event) => {
        orbitControls.current.enabled = !event.value;
    }

    const handlePositionChange = (uid, newPosition) => {
        const { x, y, z } = newPosition
        groups.forEach((group) => {
            group.uid === uid && group.position.set(x, y, z)
        })
        setTransformFormData((prevData) => ({ ...prevData, position: newPosition }))
    }

    const addPrimitive = async (geometryData, primitiveType) => {
        dispatch(setLoader(true))
        const result = await addGeometry(geometryData)
        if (result.success) {
            loadGeoms().then(() => {
                setTimeout(() => {
                    switch (primitiveType) {
                        case 'box': {
                            sceneRef.current.remove(boxData.boxMesh)
                            break
                        }
                        case 'cylinder': {
                            sceneRef.current.remove(cylinderData.cylinderMesh)
                            break
                        }
                    }
                }, 1000)
            })
        } else {
            alert(result.message)
        }
    }

    function hidePartObject(model) {
        meshes.forEach((d) => {
            if (d.uid === model.uid) {
                d.visible = !d.visible;
                d.material.visible = d.visible
            }
        })
    }

    const HandleLeft = () => {
        return (
            <div className='relative h-full w-[12px] left-[5px] cursor-ew-resize'>
                <div className='relative top-1/2'>
                    <div className='absolute left-[35%] w-[0.8px] h-[20px] bg-day-300 transform -translate-x-1/2 -translate-y-1/2' />
                    <div className='absolute left-[65%] w-[0.8px] h-[20px] bg-day-300 transform -translate-x-1/2 -translate-y-1/2' />
                </div>
            </div>
        )
    }
    const HandleRight = () => {
        return (
            <div className='relative h-full w-[12px] right-[6px] cursor-ew-resize'>
                <div className='relative top-1/2'>
                    <div className='absolute left-[28%] w-[0.8px] h-[20px] bg-day-300 transform -translate-x-1/2 -translate-y-1/2' />
                    <div className='absolute left-[58%] w-[0.8px] h-[20px] bg-day-300 transform -translate-x-1/2 -translate-y-1/2' />
                </div>
            </div>
        )
    };

    const boxDataChange = (newData) => {
        sceneRef.current.children.forEach((object) => {
            if (object.isMesh && object.uuid === newData.boxMesh.uuid) {
                object.geometry.dispose()
                object.geometry = newData.boxMesh.geometry
            }
        })
        const { x, y, z } = newData.position
        boxData.boxMesh.position.set(x, y, z)
        boxData.boxMesh.material = newData.boxMesh.material
        setBoxData(newData)
    }

    const cylinderDataChange = (newData) => {
        sceneRef.current.children.forEach((object) => {
            if (object.isMesh && object.uuid === newData.cylinderMesh.uuid) {
                object.geometry.dispose()
                object.geometry = newData.cylinderMesh.geometry
            }
        })
        const { x, y, z } = newData.position
        cylinderData.cylinderMesh.position.set(x, y, z)
        cylinderData.cylinderMesh.material = newData.cylinderMesh.material
        setCylinderData(newData)
    }

    return (
        <div className='min-h-[calc(100vh-56px)] flex w-full' id='for-canvas'>
            <canvas tabIndex='1' ref={containerRef} className='absolute outline-none overflow-hidden -z-0' />
            <div className='flex flex-row justify-between w-full m-2 '>
                <div className='flex flex-row w-full'>
                    <div className={`min-w-0 w-[${treeSize}px] mr-[12px] h-fit relative`}>
                        {/* <Resizable
                            enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                            minWidth={0}
                            maxWidth={window.innerWidth - geomSize - settingSize - 118}
                            size={{ width: treeSize }}
                            onResizeStop={(e, direction, ref, d) => {
                                setTreeSize(treeSize + d.width)
                            }}
                            handleStyles={{
                                right: { cursor: 'ew-resize' }
                            }}
                            handleComponent={{ right: <HandleLeft /> }}>
                            <TreePanel />
                        </Resizable> */}
                        <TreePanel />
                    </div>

                    <div className={` w-[390px] mr-[10px] h-fit relative
                    ${selectedSetting !== null && selectedSetting === (formName) ? '' : 'hidden'}`}>
                        <SettingForm />
                    </div>

                    <ControlPanel scene={sceneRef.current}
                        transformControl={transformControl.current}
                        selectionMode={selectionMode}
                        onModeChange={(mode) => setSelectionMode(mode)}
                        onBoxDataChange={(newData) => setBoxData(newData)}
                        onCylinderDataChange={(newData) => setCylinderData(newData)} />

                    <div className='flex flex-col max-h-[calc(100vh-73px)] overflow-hidden'>
                        <div ref={geomRef} className={`min-w-0 w-[${geomSize}px] ml-[12px] relative 
                        max-h-[calc(100vh-73px-${(boxRef.current ? boxRef.current.offsetHeight : 0)}px-
                        ${transformRef.current ? transformRef.current.offsetHeight : 0}px - 
                        ${cylinderRef.current ? cylinderRef.current.offsetHeight : 0}px)]
                        min-h-[50px] overflow-clip`}>

                            {/* <Resizable
                                enable={{ top: false, right: false, bottom: false, left: true, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                                minWidth={0}
                                maxWidth={window.innerWidth - treeSize - settingSize - 118}
                                size={{ width: geomSize }}
                                onResizeStop={(e, direction, ref, d) => {
                                    setGeomSize(geomSize + d.width)
                                }}
                                handleStyles={{
                                    left: { cursor: 'ew-resize' }
                                }}
                                handleComponent={{ left: <HandleRight /> }}>
                                {<GeometriesPanel onHidePartObject={(model) => hidePartObject(model)} />}
                            </Resizable> */}
                            <GeometriesPanel onHidePartObject={(model) => hidePartObject(model)} />
                        </div>

                        {transformFormData.visible ? <div ref={transformRef} className={`min-w-0 w-[300px] self-end 
                            mt-[10px] relative`}>
                            <TransformForm geomName={transformFormData.name} position={transformFormData.position}
                                onPositionChange={(newPosition) => handlePositionChange(transformControl.current.uid, newPosition)}
                                onCloseForm={() => {
                                    setTransformFormData((prevData) => ({ ...prevData, visible: false }))
                                    sceneRef.current.remove(transformControl.current)
                                }} />
                        </div> : ''}

                        {boxData.visible ? <div ref={boxRef} className={`min-w-0 w-[300px] self-end mt-[10px] 
                        relative`}>
                            <BoxForm scene={sceneRef.current}
                                transformControl={transformControl.current}
                                boxData={boxData}
                                onBoxDataChange={boxDataChange}
                                onCreate={addPrimitive}
                            />
                        </div> : ''}

                        {cylinderData.visible ? <div ref={cylinderRef} className={`min-w-0 w-[300px] self-end mt-[10px] 
                            relative`}>
                            <CylinderForm
                                scene={sceneRef.current}
                                transformControl={transformControl.current}
                                cylinderData={cylinderData}
                                onCylinderDataChange={cylinderDataChange}
                                onCreate={addPrimitive} />
                        </div> : ''}
                    </div>
                </div>
            </div>
        </div >
    )
}
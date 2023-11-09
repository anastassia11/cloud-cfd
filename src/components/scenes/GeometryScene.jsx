import * as THREE from "three"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react"
import { BASE_SERVER_URL } from '@/utils/constants'
import getGeometries from '@/pages/api/get_geometries'
import { useDispatch, useSelector } from 'react-redux'
import { addSelectedPart, deleteSelectedPart, setGeometries, setMeshParams } from '@/store/slices/projectSlice'
import { setLoader } from '@/store/slices/loaderSlice'
import { TransformControls } from "three/examples/jsm/controls/TransformControls"
import addGeometry from '@/pages/api/set_geometry'

function GeometryScene({ scene, camera, selectionMode, setTransformFormData, setPrimitiveData }, ref) {
    const dispatch = useDispatch()
    const containerRef = useRef(null)
    const sceneRef = useRef(null)
    const renderer = useRef(null)
    const outlinePass = useRef(null)
    const transformControl = useRef(null)
    const dataUrl = useRef(null)
    const didLogRef = useRef(false)

    let orbitControls, composer

    const projectId = useSelector(state => state.project.projectId)
    const geomsState = useSelector(state => state.project.geometries)
    const [meshes, setMeshes] = useState([])
    const [groups, setGroups] = useState([])
    const [selectedFaces, setSelectedFaces] = useState([])

    useEffect(() => {
        if (didLogRef.current === false) {
            didLogRef.current = true
            loadGeoms()
            init()
            animate()
        }
        addTransformListeners()
        return () => {
            removeTransformListeners()
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
    }, [groups])

    useEffect(() => {
        const boundingBox = computeBoundingBox()
        console.log(boundingBox)
        dispatch(setMeshParams({ params: boundingBox }))
    }, [meshes])

    useImperativeHandle(ref, () => ({
        hidePartObject, handlePositionChange, handleCloseForm, addTransformControl,
        changeBoxData, changeCylinderData, addToGeomScene, addPrimitive, computeBoundingBox
    }))

    async function loadGeoms() {
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

    function loadSTL(geometryDataList) {
        const stlLoader = new STLLoader()
        geometryDataList?.forEach((geom) => {
            if (!groups.some(group => group.uid === geom.uid)) {
                const group = new THREE.Group()
                group.name = geom.name
                group.uid = geom.uid
                //let center = new THREE.Vector3()
                geom.models.forEach((model) => {
                    stlLoader.load(
                        BASE_SERVER_URL + model.link,
                        (geometry) => {

                            //geometry.computeBoundingSphere()
                            //center.add(geometry.boundingSphere.center)
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
                            //mesh.category = geom.name
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
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight - 56);
    }

    function init() {
        sceneRef.current = scene
        window.addEventListener('resize', onWindowResize)

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
        orbitControls = new OrbitControls(
            camera,
            renderer.current.domElement
        );
        composer = new EffectComposer(renderer.current);
        const renderPass = new RenderPass(sceneRef.current, camera);
        composer.addPass(renderPass);
        outlinePass.current = new OutlinePass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            sceneRef.current,
            camera
        );
        composer.addPass(outlinePass.current);
        transformControl.current = new TransformControls(camera, renderer.current.domElement);
    }

    function animate() {
        requestAnimationFrame(animate)
        renderer.current.render(sceneRef.current, camera)
        orbitControls.update()
        composer.render()
    }

    function takeSnapshot() {
        dataUrl.current = renderer.current.domElement.toDataURL('image/png')
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
        if (transformControl.current?.object?.type === 'Mesh') {
            setPrimitiveData((prevData) => ({ ...prevData, position: transformControl.current?.object?.position }))
        } else if ((transformControl.current?.object?.type === 'Group')) {
            setTransformFormData((prevData) => ({ ...prevData, position: transformControl.current?.object?.position }))
        }
    }

    function addTransformControl(object) {
        transformControl.current.attach(object)
        transformControl.current.uid = object.uid
        sceneRef.current.add(transformControl.current)
    }

    const handleClick = (event) => {
        event.stopPropagation()
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

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
                                    handleCloseForm('transformForm')
                                    return prevGeoms.filter((prevGeom) => prevGeom.uid !== object.uid)
                                } else {
                                    object.material = selected_material
                                    dispatch(addSelectedPart({ addedPart: object.uid }))
                                    addTransformControl(group)
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
        raycaster.setFromCamera(mouse, camera);

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

    function handleTransformMove(event) {
        orbitControls.enabled = !event.value;
    }

    const handlePositionChange = (newPosition) => {
        const uid = transformControl.current.uid
        const { x, y, z } = newPosition
        groups.forEach((group) => {
            group.uid === uid && group.position.set(x, y, z)
        })
        setTransformFormData((prevData) => ({ ...prevData, position: newPosition }))
    }

    const handleCloseForm = (name) => {
        switch (name) {
            case 'transformForm': {
                setTransformFormData((prevData) => ({ ...prevData, visible: false }))
                break
            };
            case 'primitiveForm': {
                setPrimitiveData((prevData) => ({ ...prevData, visible: false }))
                sceneRef.current.remove(transformControl.current.object)
                break
            };
        }
        transformControl.current.detach()
        sceneRef.current.remove(transformControl.current)
    }

    function hidePartObject(model) {
        meshes.forEach((d) => {
            if (d.uid === model.uid) {
                d.visible = !d.visible;
                d.material.visible = d.visible
            }
        })
    }

    const changeBoxData = (newData) => {
        const { x, y, z } = newData.position
        const { width, height, depth } = newData.params
        const newBoxPatternGeom = new THREE.BoxGeometry(width, height, depth);
        sceneRef.current.children.forEach((object) => {
            if (object.isMesh && object.uuid === newData.mesh.uuid) {
                object.geometry.dispose()
                object.geometry = newBoxPatternGeom
                object.position.set(x, y, z)
                object.material = newData.mesh.material
            }
        })
    }

    const changeCylinderData = (newData) => {
        const { x, y, z } = newData.position
        const { radiusTop, radiusBottom, height } = newData.params
        const newCylinderPatternGeom = new THREE.CylinderGeometry(radiusTop, radiusBottom, height);
        sceneRef.current.children.forEach((object) => {
            if (object.isMesh && object.uuid === newData.mesh.uuid) {
                object.geometry.dispose()
                object.geometry = newCylinderPatternGeom
                object.position.set(x, y, z)
                object.material = newData.mesh.material
            }
        })
    }

    const addToGeomScene = (object) => {
        sceneRef.current.add(object)
    }

    const addPrimitive = async (geometryData) => {
        dispatch(setLoader(true))
        const uid = transformControl.current.object.uuid
        sceneRef.current.remove(transformControl.current)
        const result = await addGeometry(geometryData)
        if (result.success) {
            loadGeoms().then(() => {
                setTimeout(() => {
                    sceneRef.current.children.forEach((object) => {
                        if (object.isMesh && object.uuid === uid) {
                            sceneRef.current.remove(object)
                        }
                    })
                }, 1000)
            })
            dispatch(setLoader(false))
        } else {
            alert(result.message)
            dispatch(setLoader(false))
        }
    }

    const computeBoundingBox = () => {
        const group = new THREE.Group()
        for (let mesh of meshes) {
            group.add(mesh.clone())
        }
        const box = new THREE.Box3().setFromObject(group);
        const boundingBox = {
            XMin: box.min.x * 1.5,
            XMax: box.max.x * 1.5,
            YMin: box.min.y * 1.5,
            YMax: box.max.y * 1.5,
            ZMin: box.min.z * 1.5,
            ZMax: box.max.z * 1.5
        }
        return boundingBox
    }

    return (
        <canvas tabIndex='1' ref={containerRef} className='absolute outline-none overflow-hidden' />
    )
}
export default forwardRef(GeometryScene)
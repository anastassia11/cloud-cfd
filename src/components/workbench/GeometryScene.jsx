import * as THREE from "three"
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react"
import { BASE_SERVER_URL } from '@/utils/constants'
import getGeometries from '@/api/get_geometries'
import { useDispatch, useSelector } from 'react-redux'
import { setGeometries, setSceneMode, setSelectedParts, setSimulations } from '@/store/slices/projectSlice'
import { setLoader } from '@/store/slices/loaderSlice'
import { TransformControls } from "three/examples/jsm/controls/TransformControls"
import addGeometry from '@/api/set_geometry'
import { setPointPosition } from '@/store/slices/meshSlice'
import setPreview from '@/api/set_preview'
import { setSetting } from '@/store/slices/settingSlice'

function GeometryScene({ camera, selectMode, renderMode, setTransformFormData, setPrimitiveData, }, ref) {
    const dispatch = useDispatch()
    const containerRef = useRef(null)
    const sceneRef = useRef(null)
    const renderer = useRef(null)
    const outlinePass = useRef(null)
    const transformControl = useRef(null)
    const didLogRef = useRef(false)
    let orbitControls, composer

    const projectId = useSelector(state => state.project.projectId)
    const geomsState = useSelector(state => state.project.geometries)
    const formName = useSelector(state => state.setting.formName)
    const pointPosition = useSelector(state => state.mesh.pointPosition)
    const pointVisible = useSelector(state => state.mesh.pointVisible)

    const [meshes, setMeshes] = useState([])
    const [groups, setGroups] = useState([])
    const [selectedFaces, setSelectedFaces] = useState([])

    const baseMaterial = new THREE.MeshPhongMaterial({
        color: 0xa0a0a0,
        specular: 0x494949,
        shininess: 100,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
    });

    const opacityMaterial = new THREE.MeshPhongMaterial({
        color: 0xa0a0a0,
        specular: 0x494949,
        shininess: 100,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
    });

    const selectedMaterial = new THREE.MeshPhongMaterial({
        color: 0x404080,
        specular: 0x494949,
        shininess: 100,
        side: THREE.DoubleSide,
        transparent: true,
    })

    const selectedOpacityMaterial = new THREE.MeshPhongMaterial({
        color: 0x404080,
        specular: 0x494949,
        shininess: 100,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
    })

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
            dispatch(setGeometries({ geometries: [] }))
            dispatch(setSetting({ formName: null }))
            dispatch(setSimulations({ simulations: [] }))
            dispatch(setSceneMode('geom'))
        }
    }, [])

    useEffect(() => {
        if (formName !== 'mesh' || !pointVisible) {
            addListeners()
        }
        return () => removeListeners()
    }, [meshes, groups, selectMode, renderMode, pointVisible, formName])

    useEffect(() => {
        changeMaterials(renderMode)
    }, [renderMode, selectedFaces])

    useEffect(() => {
        dispatch(setSelectedParts(selectedFaces.map((face) => face.uid)))
    }, [selectedFaces])

    useEffect(() => {
        changePointVisible()
    }, [formName, pointVisible])

    useEffect(() => {
        changePointPosition(pointPosition)
    }, [pointPosition])

    useEffect(() => {
        loadSTL(geomsState)
        const geomsToRemove = sceneRef.current.children
            .filter(child => child.isGroup && !geomsState?.some(geom => geom.uid === child.uid))
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

    useImperativeHandle(ref, () => ({
        hidePartObject, handlePositionChange, handleCloseForm, addTransformControl,
        changeBoxData, changeCylinderData, addToGeomScene, removeFromGeomScene, addPrimitive, computeBoundingBox
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

    async function sendPreview(preview) {
        const result = await setPreview(projectId, preview)
        if (result.success) {

        } else {
            alert(result.message)
        }
    }

    async function loadSTL(geometryDataList) {
        const stlLoader = new STLLoader();
        geometryDataList?.forEach((geom) => {
            if (!groups.some(group => group.uid === geom.uid)) {
                const group = new THREE.Group();
                group.name = geom.name;
                group.uid = geom.uid;
                geom.models.forEach((model) => {
                    stlLoader.load(
                        BASE_SERVER_URL + model.link,
                        (geometry) => {
                            const material = baseMaterial.clone();
                            const mesh = new THREE.Mesh(geometry, material);
                            mesh.scale.set(1, 1, 1);
                            mesh.castShadow = true;
                            mesh.receiveShadow = true;
                            mesh.uid = model.uid;
                            mesh.visible = model.visible;
                            group.add(mesh);
                            setMeshes((prevMeshes) => {
                                if (!prevMeshes.some(meshItem => meshItem.uid === mesh.uid)) {
                                    return [...prevMeshes, mesh];
                                }
                                return prevMeshes;
                            })
                        }
                    )
                })
                setGroups((prevGroups) => {
                    if (!prevGroups.some(groupItem => groupItem.uid === group.uid)) {
                        sceneRef.current.add(group);
                        return [...prevGroups, group];
                    }
                    return prevGroups;
                })
            }
        })
        if (geometryDataList?.length > 0) {
            await new Promise(resolve => setTimeout(resolve, 5000))
            takeSnapshot()
        }
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight - 56);
    }

    function init() {
        sceneRef.current = new THREE.Scene()
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
        const dataUrl = renderer.current.domElement.toDataURL('image/jpeg');
        const byteCharacters = atob(dataUrl.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        sendPreview(blob);
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
        const objectTypes = {
            'Mesh': () => setPrimitiveData({ position: transformControl.current?.object?.position }),
            'Group': () => setTransformFormData({ position: transformControl.current?.object?.position }),
            'insidePoint': () => dispatch(setPointPosition({
                position: {
                    x: transformControl.current?.object?.position.x,
                    y: transformControl.current?.object?.position.y,
                    z: transformControl.current?.object?.position.z,
                }
            })),
        };
        const objectType = transformControl.current?.object?.type;
        if (objectTypes[objectType]) {
            objectTypes[objectType]();
        }
    }

    function handleTransformMove(event) {
        orbitControls.enabled = !event.value;
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

        if (selectMode === 'volume') {
            groups.forEach((group) => {
                const intersects = raycaster.intersectObjects(group.children, true);
                const intersectedFace = intersects.length > 0 ? intersects[0].object : null;
                // Логика добавления выбранных граней в стейт selectedFaces (массив) 
                setSelectedFaces((prevFaces) => {
                    const selectedUids = prevFaces.map((prevFace) => prevFace.uid);
                    if (selectedUids.includes(intersectedFace?.uid)) {
                        // Если выбранная грань уже есть в массиве, 
                        // проверяем, все ли грани из группы есть в массиве
                        const allGroupFacesSelected = group.children.every((child) => child.isMesh && selectedUids.includes(child.uid));
                        if (allGroupFacesSelected) {
                            // Если все грани из группы есть, удаляем все грани
                            return [];
                        } else {
                            // Если не все грани из группы выбраны, добавляем 
                            // в массив недостающие грани
                            const newFaces = group.children.filter((child) => child.isMesh && !selectedUids.includes(child.uid));
                            return [...prevFaces, ...newFaces];
                        }
                    } else {
                        // Если выбранной грани нет в массиве, добавить все грани группы, которых еще нет
                        const newFaces = group.children.filter((child) => child.isMesh && !selectedUids.includes(child.uid));
                        return [...prevFaces, ...newFaces];
                    }
                });
            });

        } else if (selectMode === 'face') {
            const intersects = raycaster.intersectObjects(meshes, true)
            const intersectedFace = intersects.length > 0 ? intersects[0].object : null;
            setSelectedFaces((prevFaces) => {
                const selectedUids = prevFaces.map((prevFace) => prevFace.uid);
                if (selectedUids.includes(intersectedFace?.uid)) {
                    // Если выбранная грань уже есть в массиве, удалить ее из массива
                    return prevFaces.filter((prevFace) => prevFace.uid !== intersectedFace.uid);
                } else {
                    // Если выбранной грани нет в массиве, добавить ее в массив
                    return intersectedFace ? [...prevFaces, intersectedFace] : prevFaces;
                }
            });
        }
    }

    const handleHover = (event) => {
        event.stopPropagation();
        outlinePass.current.selectedObjects = [];
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        if (selectMode === 'volume') {
            groups.forEach((group) => {
                const intersects = raycaster.intersectObjects(group.children, true);
                if (intersects.length > 0) {
                    outlinePass.current.selectedObjects = group.children;
                    outlinePass.current.enabled = true;
                }
            })
        } else if (selectMode === 'face') {
            const intersects = raycaster.intersectObjects(meshes, true);
            if (intersects.length > 0) {
                const object = intersects[0].object;
                outlinePass.current.selectedObjects = [object];
                outlinePass.current.enabled = true;
            }
        }
    }

    const changeMaterials = (renderMode) => {
        let _material, _selectedmaterial;
        switch (renderMode) {
            case 'surfaces':
                _material = baseMaterial;
                _selectedmaterial = selectedMaterial;
                break;
            case 'translucent':
                _material = opacityMaterial;
                _selectedmaterial = selectedOpacityMaterial;
                break;
        }
        sceneRef.current.children.forEach(child => {
            if (child.isGroup) {
                child.children.forEach(item => {
                    if (selectedFaces.includes(item)) {
                        item.material = _selectedmaterial.clone();
                    } else {
                        item.material = _material.clone();
                    }
                })
            }
        })
    }

    const changePointVisible = () => {
        if (geomsState && formName === 'mesh' && pointVisible) {
            const pointGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const pointMaterial = selectedMaterial.clone();
            const point3D = new THREE.Mesh(pointGeometry, pointMaterial);
            point3D.type = 'insidePoint';
            sceneRef.current.add(point3D);
            addTransformControl(point3D);
            changeMaterials('translucent');
        } else {
            sceneRef.current.children.forEach(child => {
                if (child.type === 'insidePoint') {
                    sceneRef.current.remove(child);
                    transformControl.current.detach();
                    sceneRef.current.remove(transformControl.current);
                    changeMaterials(renderMode);
                }
            })
        }
    }

    const changePointPosition = (newPosition) => {
        const { x, y, z } = newPosition;
        sceneRef.current.children.forEach((child) => {
            if (child.type === 'insidePoint') {
                child.position.set(x, y, z);
            }
        })
    }

    const handlePositionChange = (newPosition) => {
        const uid = transformControl.current.uid
        const { x, y, z } = newPosition
        groups.forEach((group) => {
            group.uid === uid && group.position.set(x, y, z)
        })
        setTransformFormData({ position: newPosition })
    }

    const handleCloseForm = (name) => {
        switch (name) {
            case 'transformForm': {
                setTransformFormData({ visible: false })
                break
            };
            case 'primitiveForm': {
                setPrimitiveData({ visible: false })
                sceneRef.current.remove(transformControl.current.object)
                break
            };
        }
        transformControl.current.detach()
        sceneRef.current.remove(transformControl.current)
    }

    function hidePartObject(model) {
        meshes.forEach((mesh) => {
            if (mesh.uid === model.uid) {
                mesh.visible = !mesh.visible
                mesh.material.visible = mesh.visible
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
        const { radius, height } = newData.params
        const newCylinderPatternGeom = new THREE.CylinderGeometry(radius, radius, height);
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

    const removeFromGeomScene = (object) => {
        sceneRef.current.remove(object)
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
            XMin: box.min.x,
            XMax: box.max.x,
            YMin: box.min.y,
            YMax: box.max.y,
            ZMin: box.min.z,
            ZMax: box.max.z,
        }
        for (let item in boundingBox) {
            boundingBox[item] = Number(boundingBox[item] * 1.5)
        }
        return boundingBox
    }

    return (
        <canvas tabIndex='1' ref={containerRef} className='absolute outline-none overflow-hidden' />
    )
}
export default forwardRef(GeometryScene)
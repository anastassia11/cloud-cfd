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
import { setGeometries, setProject } from '@/store/slices/projectSlice'
import GeometriesPanel from './GeometriesPanel'
import SettingForm from '../tree-panel/SettingForm'
import { setLoader } from '@/store/slices/loaderSlice'
import { Resizable } from 're-resizable'

export default function Scena({ idProject }) {
    const [treeSize, setTreeSize] = useState(335)
    const [geomSize, setGeomSize] = useState(300)
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const settingSize = 335

    const [inspectObjectGeometry, setInspectObjectGeometry] = useState([])
    const [selectedGeometry, setSelectedGeometry] = useState([])
    const selectedItem = useSelector(state => state.setting.setting)
    const formName = useSelector(state => state.setting.formName)
    const geoms = useSelector(state => state.project.geometries)
    const loader = useSelector(state => state.loader.loader)

    const dispatch = useDispatch()

    const containerRef = useRef(null)
    const controls = useRef(null)
    const stlLoader = useRef(null)
    const renderer = useRef(null)
    const camera = useRef(null)
    const composer = useRef(null)
    const outlinePass = useRef(null)

    const scene = new THREE.Scene()

    useEffect(() => {
        setWindowSize(window.innerWidth)
    }, [window.innerWidth])

    useEffect(() => {
        //Метод для загрузки json с массивом разбитых stl-объектов(ссылка + настройки) с сервера
        //Внутри этот метод вызывает LoadStl() - который загружает по ссылке stl-объект на сцену
        //Когда будешь делать загрузку новых геометрий на сервер, после успешной отправки запроса, 
        //Можно вызвать loadGeoms() и данные на сцене будут обновлены 
        loadGeoms()

        //Инициализация настроек сцены - свет, камера..
        init()

        //Рекурсивная функция, для обновления данных на сцене
        animate()
    }, []);

    useEffect(() => {
        //Подключает методы HandleMove и HandleClick - для изменения цвета stl-объекта
        //И для выделения stl-объекта при наведении
        addListeners()
    }, [inspectObjectGeometry])

    // useEffect(() => {
    //     loadSTL(geoms)
    // }, [geoms?.length])

    const loadGeoms = async () => {
        dispatch(setLoader(true))
        const result = await getGeometries(idProject)
        if (result.success) {
            dispatch(setGeometries({ geometries: result.data.geometryDataList }))
            loadSTL(result.data.geometryDataList)
            dispatch(setLoader(false))
        } else {
            alert(result.message)
            dispatch(setLoader(false))
        }
    }

    function loadSTL(geometries) {
        geometries?.forEach((geom) => {
            geom.models.forEach((model) => {
                stlLoader.current.load(
                    BASE_SERVER_URL + model.link,
                    (geometry) => {
                        const material = new THREE.MeshPhongMaterial({
                            color: 0x808080,
                            specular: 0x494949,
                            shininess: 100,
                        });
                        material.side = THREE.DoubleSide;
                        const mesh = new THREE.Mesh(geometry, material);

                        //ОБНУЛИТЬ ПОТОМ 
                        mesh.position.set(-30, 0, 0);
                        mesh.scale.set(1, 1, 1);
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;
                        mesh.uid = model.uid;
                        mesh.category = geom.name;
                        scene.add(mesh);
                        setInspectObjectGeometry((prevGeoms) => [...prevGeoms, mesh]);
                    }
                )
            })
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

        //цвет фона
        scene.background = new THREE.Color(0xf0f0f0);
        //немного света
        scene.add(new THREE.AmbientLight(0xf0f0f0));

        const light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 1500, 200);
        light.angle = Math.PI * 0.2;
        light.castShadow = true;
        light.shadow.camera.near = 200;
        light.shadow.camera.far = 2000;
        light.shadow.bias = -0.000222;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        scene.add(light);

        const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
        planeGeometry.rotateX(-Math.PI / 2);
        const planeMaterial = new THREE.ShadowMaterial({
            color: 0x000000,
            opacity: 0.2,
        });

        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.y = -200;
        plane.receiveShadow = true;
        scene.add(plane);

        const helper = new THREE.GridHelper(2000, 100);
        helper.position.y = -199;
        helper.material.opacity = 0.25;
        helper.material.transparent = true;
        scene.add(helper);

        renderer.current = new THREE.WebGLRenderer({
            canvas: containerRef.current,
        });

        renderer.current.setClearColor("#f0f0f0");

        renderer.current.setSize(window.innerWidth, window.innerHeight - 56);
        const component = document.getElementById("for-canvas")
        component.appendChild(renderer.current.domElement);

        controls.current = new OrbitControls(
            camera.current,
            renderer.current.domElement
        );

        composer.current = new EffectComposer(renderer.current);

        const renderPass = new RenderPass(scene, camera.current);
        outlinePass.current = new OutlinePass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            scene,
            camera.current
        );
        composer.current.addPass(renderPass);
        composer.current.addPass(outlinePass.current);
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.current.render(scene, camera.current);
        controls.current.update();

        composer.current.render();
    }

    function addListeners() {
        renderer.current.domElement.addEventListener("click", handleClick);
        renderer.current.domElement.addEventListener("pointermove", handleMove);
        renderer.current.domElement.addEventListener("contextmenu", handleRightClick);
    }

    function handleClick(event) {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera.current);
        const intersects = raycaster.intersectObjects(inspectObjectGeometry, true);
        if (intersects.length > 0) {
            const object = intersects[0].object;
            const material = new THREE.MeshPhongMaterial({
                color: 0x404080,
                specular: 0x494949,
                shininess: 100,
            });
            object.material = material;

            setSelectedGeometry((prevGeoms) => [...prevGeoms, object]);
        }
    }
    function handleRightClick(event) {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera.current);
        const intersects = raycaster.intersectObjects(inspectObjectGeometry, true);
        if (intersects.length > 0) {
            const object = intersects[0].object;
            const material = new THREE.MeshPhongMaterial({
                color: 0x808080,
                specular: 0x494949,
                shininess: 100,
            });
            object.material = material;
        }
    }

    function handleMove(event) {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera.current);
        const intersects = raycaster.intersectObjects(inspectObjectGeometry, true);
        if (intersects.length > 0) {
            const object = intersects[0].object;

            outlinePass.current.selectedObjects = [object];
            outlinePass.current.enabled = true;
        }
    }

    function hidePartObject(model) {
        inspectObjectGeometry.forEach((d) => {
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
    }

    return (
        <div className='absolute top-14 left-0 flex w-full' id='for-canvas'>
            <canvas tabIndex='1' ref={containerRef} className='absolute outline-none overflow-hidden' />
            <div className={`z-10 grid w-full m-2`} style={{ gridTemplateColumns: `auto ${settingSize}px 1fr auto` }}>
                <div className='col-start-1 mr-[12px]'>
                    <Resizable
                        enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                        minWidth={0}
                        maxWidth={windowSize - geomSize - settingSize - 40}
                        size={{ width: treeSize }}
                        onResizeStop={(e, direction, ref, d) => {
                            setTreeSize(treeSize + d.width)
                        }}
                        handleStyles={{
                            right: { cursor: 'ew-resize' }
                        }}
                        handleComponent={{ right: <HandleLeft /> }}>
                        <TreePanel />
                    </Resizable>
                </div>

                <div className={`w-${settingSize}px 
                    ${selectedItem !== null && selectedItem === (formName) ? '' : 'hidden'}`}>
                    <SettingForm />
                </div>
                <div className='col-start-3' />
                <div className='col-start-4 justify-self-end ml-[12px]'>
                    <Resizable
                        enable={{ top: false, right: false, bottom: false, left: true, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                        minWidth={0}
                        maxWidth={windowSize - treeSize - settingSize - 40}
                        size={{ width: geomSize }}
                        onResizeStop={(e, direction, ref, d) => {
                            setGeomSize(geomSize + d.width)
                        }}
                        handleStyles={{
                            left: { cursor: 'ew-resize' }
                        }}
                        handleComponent={{ left: <HandleRight /> }}>
                        {<GeometriesPanel onHidePartObject={(model) => hidePartObject(model)} />}
                    </Resizable>
                </div>
            </div>
        </div >
    )
}
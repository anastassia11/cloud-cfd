import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import React, { useRef, useEffect, useState } from "react";
import ModelPart from "./ModelPart";
import TreePanel from '../tree-panel/TreePanel';
import { BASE_SERVER_URL } from '@/utils/constants';

export default function Scena() {
    const containerRef = useRef(null);
    const controls = useRef(null);
    const stlLoader = useRef(null);
    const renderer = useRef(null);
    const camera = useRef(null);
    const [inspectObjectGeometry, setInspectObjectGeometry] = useState([]);
    const [selectedGeometry, setSelectedGeometry] = useState([]);
    const [settingOpen, setSettingOpen] = useState(false);
    const [geoms, setGeoms] = useState([]);
    const composer = useRef(null);
    const outlinePass = useRef(null);
    const scene = new THREE.Scene();

    useEffect(() => {
        //Метод для загрузки json с массивом разбитых stl-объектов(ссылка + настройки) с сервера
        //Внутри этот метод вызывает LoadStl() - который загружает по ссылке stl-объект на сцену
        //Когда будешь делать загрузку новых геометрий на сервер, после успешной отправки запроса, 
        //Можно вызвать loadGeoms() и данные на сцене будут обновлены 
        loadGeoms();

        //Инициализация настроек сцены - свет, камера..
        init();

        //Рекурсивная функция, для обновления данных на сцене
        animate();
    }, []);

    useEffect(() => {

        //Подключает методы HandleMove и HandleClick - для изменения цвета stl-объекта
        //И для выделения stl-объекта при наведении
        addListeners();
    }, [inspectObjectGeometry]);

    async function loadGeoms() {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
            };

            const idProject = 2005;
            const response = await fetch(
                `https://localhost:44333/api/Project/Get_Geometries/` + idProject,
                requestOptions
            );
            const data = await response.json();
            loadSTL(data.geometryDataList);
        } catch (error) {
            console.log("error", error);
        }
    }

    function loadSTL(arr) {
        setGeoms(arr);
        arr.forEach((el) => {
            console.log(el);
            el.models.forEach((model) => {
                console.log(model);
                stlLoader.current.load(
                    "https://localhost:44333/" + model.link,
                    (geometry) => {
                        const material = new THREE.MeshPhongMaterial({
                            color: 0x808080,
                            specular: 0x494949,
                            shininess: 100,
                        });

                        material.side = THREE.DoubleSide;
                        const mesh = new THREE.Mesh(geometry, material);
                        mesh.position.set(0, 0, 0);
                        mesh.scale.set(1, 1, 1);
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;

                        mesh.uid = model.uid;
                        mesh.category = el.name;
                        scene.add(mesh);

                        setInspectObjectGeometry((prevGeoms) => [...prevGeoms, mesh]);
                    }
                );
            });
        });
    }

    function init() {
        stlLoader.current = new STLLoader();
        camera.current = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.current.position.z = 10;
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

        renderer.current.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.current.domElement);

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
        console.log(inspectObjectGeometry);
        const intersects = raycaster.intersectObjects(inspectObjectGeometry, true);
        console.log(intersects.length);
        if (intersects.length > 0) {
            const object = intersects[0].object;
            console.log(object);

            const material = new THREE.MeshPhongMaterial({
                color: 0x404080,
                specular: 0x494949,
                shininess: 100,
            });
            object.material = material;

            setSelectedGeometry((prevGeoms) => [...prevGeoms, object]);
            console.log(selectedGeometry)
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
            console.log(object);

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

    function HidePartObject(model) {
        model.visible = !model.visible;
        console.log(model.visible);
        inspectObjectGeometry.forEach((d) => {
            if (d.uid === model.uid) {
                console.log("YEP");
                d.visible = !d.visible;
                d.material.visible = d.visible; // Add this line to update the visibility of the mesh
            }
        });
    }


    return (
        <div className='absolute top-14 left-0 flex justify-between w-full'>
            <canvas tabIndex='1' ref={containerRef} className='absolute outline-none overflow-hidden' />
            <div className='z-10'><TreePanel /></div>
            <div className='z-10 max-h-[calc(100vh-73px)] bg-day-00 w-[335px] overflow-y-auto p-2 m-2 rounded-md shadow h-fit'>
                {geoms.map((geom) => (
                    <div className="" key={geom.name}>
                        <button className="w-full flex items-center justify-between text-day-350 px-2 h-9 rounded-lg  hover:bg-day-150 active:bg-day-200 duration-300"
                            onClick={() => setSettingOpen(!settingOpen)}>
                            <div className="flex items-center gap-x-2">
                                {geom.name}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 duration-300 ${settingOpen ? 'rotate-180' : ''}`}>
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {
                            settingOpen ? (
                                <ul className="ml-4 pl-2 border-l text-base font-normal">
                                    {
                                        geom.models.map((model) => (
                                            <li key={model.name}>
                                                <ModelPart name={model.name} handleClick={() => HidePartObject(model)} onVisible={model.visible} />
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : ""
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
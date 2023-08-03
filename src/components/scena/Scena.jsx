import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import React, { useRef, useEffect, useState } from "react";
import TreePanel from '../tree-panel/TreePanel';
import { BASE_SERVER_URL } from '@/utils/constants';
import getGeometries from '@/pages/api/get_geometries';
import DropdownGeometry from './DropdownGeometry';
import SvgSelector from '../SvgSelector';

export default function Scena() {
    const containerRef = useRef(null);
    const controls = useRef(null);
    const stlLoader = useRef(null);
    const renderer = useRef(null);
    const camera = useRef(null);
    const [inspectObjectGeometry, setInspectObjectGeometry] = useState([]);
    const [selectedGeometry, setSelectedGeometry] = useState([]);

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

    const loadGeoms = async () => {
        const idProject = 1
        const result = await getGeometries(idProject)
        if (result.success) {
            loadSTL(result.data.geometryDataList)
        } else {
            alert(result.message)
        }
    }

    function loadSTL(arr) {
        setGeoms(arr)
        arr.forEach((el) => {
            el.models.forEach((model) => {
                model.visible = true
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

        renderer.current.setSize(window.innerWidth, window.innerHeight - 56);
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
        const intersects = raycaster.intersectObjects(inspectObjectGeometry, true);
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

    function hidePartObject(model) {
        model.visible = !model.visible
        inspectObjectGeometry.forEach((d) => {
            if (d.uid === model.uid) {
                d.visible = !d.visible;
                d.material.visible = d.visible // обновить видимость сетки
            }
        });
    }

    return (
        <div className='absolute top-14 left-0 flex justify-between w-full'>
            {/* <canvas tabIndex='1' ref={containerRef} className='absolute outline-none overflow-hidden' /> */}
            <div className='z-10'><TreePanel /></div>
            {geoms ? <div className='z-10 max-h-[calc(100vh-73px)] bg-day-00 w-[300px] overflow-y-auto p-2 m-2 rounded-md shadow h-fit'>
                <div className="text-day-350 w-full flex items-center gap-x-1 border-b pb-2 pl-[6px] pr-[1px]">
                    <SvgSelector id='geometry' />
                    <span className="block text-base font-semibold pt-[9px] pb-1">GEOMETRY {`(${geoms.length})`}</span>
                </div>
                <div className='mt-2'>
                    {geoms.map((geom) => (
                        <div className="" key={geom.name}>
                            <DropdownGeometry geom={geom} hidePartObject={(model) => hidePartObject(model)} />
                        </div>
                    ))}
                </div>

            </div> : ''}
        </div>
    );
}
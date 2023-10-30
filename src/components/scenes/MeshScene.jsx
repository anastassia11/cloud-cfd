import { useEffect, useRef } from 'react'
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { TransformControls } from "three/examples/jsm/controls/TransformControls"
import { Lut } from 'three/addons/math/Lut.js'

export default function MeshScene() {
    const containerRef = useRef(null)

    const orbitControls = useRef(null)
    const renderer = useRef(null)
    const camera = useRef(null)
    const composer = useRef(null)
    const outlinePass = useRef(null)

    const sceneRef = useRef(null)

    let surfaseMesh, lineMesh;
    let meshGeometryData;
    let meshValuesData = {};
    let lut;
    let meshFolderUrl;

    useEffect(() => {
        sceneRef.current = new THREE.Scene()
        init()
        init_mesh_components()
        reloadMeshGeometry("../VTKFOAMmesh2/")
        animate()
    }, [])

    function onWindowResize() {
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight - 56);
    }

    function init() {
        window.addEventListener('resize', onWindowResize)
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

        const renderPass = new RenderPass(sceneRef.current, camera.current)
        composer.current.addPass(renderPass);

        outlinePass.current = new OutlinePass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            sceneRef.current,
            camera.current
        );
        composer.current.addPass(outlinePass.current)
    }

    function animate() {
        requestAnimationFrame(animate)
        renderer.current.render(sceneRef.current, camera.current)
        orbitControls.current.update()
        composer.current.render()
    }


    function createSurfaseGeometry(_meshGeometryData) {
        //Создаем новую геометрию
        const geometry = new THREE.BufferGeometry();
        //Формируем набор координат вершин
        const vertices = new Float32Array(_meshGeometryData.points);
        //Формируем индексы ячеек
        const indices = _meshGeometryData.faces;
        //Устанавливаем индексы в геометрию
        geometry.setIndex(indices);
        //Устанавливаем позиции в геометрию
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        //Устанавливаем начальные цвета
        const colors = [];
        for (let i = 0, n = geometry.attributes.position.count; i < n; ++i) {
            colors.push(1, 1, 1);
        }
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        //Создаем новый материал
        //const material = new THREE.MeshPhongMaterial({
        const material = new THREE.MeshPhysicalMaterial({
            side: THREE.DoubleSide,
            //color: 0x55aaff,
            flatShading: true,
            vertexColors: true
        });
        //Создаем обьект сетки (это сетка поверхностная для визуализации - не путать с расчетной сеткой)
        const mesh = new THREE.Mesh(geometry, material);
        //Пересчитываем нормали
        mesh.geometry.computeVertexNormals();
        //Включаем тени (опционально)
        mesh.castShadow = true;
        //Возвращаем обьект сетки
        return mesh;
    }

    /// Создает обьект линий сетки
    /// Принимет _meshGeometryData - обьект из JSON файла (данные о геометрии сетки (файл surfaseData))
    function createLinesGeometry(_meshGeometryData) {
        //Создаем обьект геометрии
        const lineGeometry = new THREE.BufferGeometry();
        //Формируем набор координат сегменов
        const lineVertices = new Float32Array(_meshGeometryData.points);
        //Формируем индексы сегментов
        const lineIndices = _meshGeometryData.edges;
        //Устанавливаем индексы
        lineGeometry.setIndex(lineIndices);
        //Устанавливаем позиции
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(lineVertices, 3));
        lineGeometry.computeBoundingSphere();
        //Создаем материал (можно установить цвет)
        const lineMaterial = new THREE.LineBasicMaterial();
        //Создаем обьект с сегментами
        const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
        return lineSegments;
    }

    //Изменяет цвет отображаемой сетки
    //meshToUpdate - сетка на которой необходимо пересчитать цвет
    //colorMap - название цветовой схемы для окраски
    //_meshValuesData - значения параметров в узлах сетки (Данные со значениями параметров в вершинах грани (как пример файл pointLevel_Data))
    //useMaxMinVisibleValue - использовать максимальные значения в видемом диапазоне или на всей сетки
    //colorCount - Число цветов для отображения шкалы
    function updateMeshColor(meshToUpdate, colorMap, _meshValuesData, useMaxMinVisibleValue = false, colorCount = 32) {
        //устанавливаем карту цветов
        lut.setColorMap(colorMap, colorCount);
        //Если установлен сплошной цвет
        if (colorMap === "solidColor") {
            lut.setMax(1);
            lut.setMin(0);
            const colors = meshToUpdate.geometry.attributes.color;
            const color = new THREE.Color();
            //Вычисляем цвета каждой точки
            for (let i = 0; i < colors.array.length; i++) {
                color.copy(lut.getColor(0)).convertSRGBToLinear();
                colors.setXYZ(i, color.r, color.g, color.b);
            }
            //Обновляем цвета
            colors.needsUpdate = true;
            return;
        }

        //Проверяем какую шкалу отображаем - по видимым значениям или по максимальным и минимальным на всей сетке
        if (useMaxMinVisibleValue) {
            lut.setMax(_meshValuesData.maxVizibleValue);
            lut.setMin(_meshValuesData.minVizibleValue);
        } else {
            lut.setMax(_meshValuesData.maxValue);
            lut.setMin(_meshValuesData.minValue);
        }

        const geometry = meshToUpdate.geometry;
        const values = _meshValuesData.pointsValues;
        const colors = geometry.attributes.color;
        const color = new THREE.Color();
        //Вычисляем цвета каждой точки
        for (let i = 0; i < values.length; i++) {
            const colorValue = values[i];
            color.copy(lut.getColor(colorValue)).convertSRGBToLinear();
            colors.setXYZ(i, color.r, color.g, color.b);
        }
        //Обновляем цвета
        colors.needsUpdate = true;
        //const map = sprite.material.map;
        //lut.updateCanvas(map.image);
        //map.needsUpdate = true;
    }

    //Перезагружает данные сетки
    //Предполагаеться что функция выполняеться когда пользователь перестроил сетку
    //Или добавил или убрал плоскость сечения
    //meshFolderUrl - путь к папке с данными о сетке
    function reloadMeshGeometry(_meshFolderUrl) {
        //Какимто образом получаем данные с сеткой
        let fetchRes = fetch(_meshFolderUrl + "surfaseData.json");
        fetchRes.then(res => res.json()).then(surfaseJsonData => {
            //Сохраняем путь к папке
            meshFolderUrl = _meshFolderUrl;
            //удаляем старые обьекты со сцены
            if (surfaseMesh != null) sceneRef.current.remove(surfaseMesh);
            if (lineMesh != null) sceneRef.current.remove(lineMesh);
            meshValuesData = {};

            //Сохраняем загруженные данные
            meshGeometryData = surfaseJsonData;
            //Генерируем поверхностную сетку
            surfaseMesh = createSurfaseGeometry(meshGeometryData);
            surfaseMesh.visible = true;
            sceneRef.current.add(surfaseMesh);
            //Генерируем грани ячеек для визуализации
            lineMesh = createLinesGeometry(meshGeometryData);
            lineMesh.visible = true;
            sceneRef.current.add(lineMesh);
            updateVizualizationValues();
        })
    }

    //Функция обновляет выбранное значение параметра для визуализации
    //Первым этапом загружает значения параметров в узлах с сервера
    //Затем обновляет цвета путем вызова функции updateMeshColor
    //Чтобы каждый раз при обновлении цвета не загружать данные заново
    //Они хранияться в словаре meshValuesData
    //Такой же подход можно реализовать и для геометрии с сечением
    //в таком случае можно собрать хеш из массива с координатами центров и ориентации плоскостей сечения
    function updateVizualizationValues() {
        // Получаем настройки отображения цветов (откудато из интерфейса)
        const colorMap = "solidColor";
        const selectValue = "non";
        const useMaxMinVisibleValue = true;
        const colorCount = 32;
        //Если выбрано равномерное окрашивание сетки - то сразу красим
        if (colorMap === "solidColor") {
            updateMeshColor(surfaseMesh, colorMap, null, useMaxMinVisibleValue, colorCount);
        }
        //Если мы уже загружали значения параметров - то красим
        else if (meshValuesData[selectValue] !== undefined) {
            updateMeshColor(surfaseMesh, colorMap, meshValuesData[selectValue], useMaxMinVisibleValue, colorCount);
        }
        //Если не загружали - загружаем и красим
        else {
            let fetchRes = fetch(meshFolderUrl + selectValue + "_Data.json");
            fetchRes.then(res => res.json()).then(jsonData => {
                meshValuesData[selectValue] = jsonData;
                updateMeshColor(surfaseMesh, colorMap, meshValuesData[selectValue], useMaxMinVisibleValue, colorCount);
            })
        }

    }

    //Поскольку этот пример точно ктото будет переписывать под наш визуализатор
    //чтобы не искать то что отличает эту сцену от стандартной сцены ThreeJS
    // я выделил все нестандартные настройки инициализации этой сцены в отдельную функцию init_mesh_components()
    //стандартные настройки сцены, освещения и т.д оставил в init_base()
    function init_mesh_components() {
        //Создаем хелпер подбора значений цветов
        lut = new Lut();
        //Добавляем в него новую карту цветов для заливки одним цветом
        //сюда также можно добавить любые другие карты цветов
        lut.addColorMap("solidColor", [[0.0, 0x55aaff], [1.0, 0x55aaff]])
    }

    return (
        <canvas tabIndex='1' ref={containerRef} className='absolute outline-none overflow-hidden -z-0' />
    )
}

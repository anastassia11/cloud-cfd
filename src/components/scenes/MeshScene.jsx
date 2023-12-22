import { useEffect, useRef } from 'react'
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { Lut } from 'three/addons/math/Lut.js'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '@/store/slices/loaderSlice'
import getMeshData from '@/api/get_mesh_data'
import { BASE_SERVER_URL } from '@/utils/constants'
import { setJobStatus, setMesh } from '@/store/slices/projectSlice'

export default function MeshScene({ camera }) {
    const dispatch = useDispatch()
    const projectId = useSelector(state => state.project.projectId)
    const geomsState = useSelector(state => state.project.geometries)
    const jobStatus = useSelector(state => state.project.jobStatus)
    const containerRef = useRef(null)
    const sceneRef = useRef(null)
    const didLogRef = useRef(false)
    const lut = useRef(null)

    let renderer, orbitControls, composer, outlinePass
    let surfaseMesh, lineMesh, meshGeometryData, meshFolderUrl
    let meshValuesData = {}

    useEffect(() => {
        dispatch(setLoader(false))
        if (didLogRef.current === false) {
            didLogRef.current = true
            init()
            init_mesh_components()
            getFolderPath()
            animate()
        }
    }, [])

    useEffect(() => {
        getFolderPath()
    }, [jobStatus])

    const getFolderPath = async () => {
        const result = await getMeshData(projectId)
        if (result.success) {
            const path = `${BASE_SERVER_URL}` + result.data
            reloadMeshGeometry(path)
        } else {
            dispatch(setMesh(false))
            // alert(result.message)
        }
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight - 56);
    }

    function init() {
        window.addEventListener('resize', onWindowResize);
        sceneRef.current = new THREE.Scene();
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

        renderer = new THREE.WebGLRenderer({
            canvas: containerRef.current,
            antialias: true,
            preserveDrawingBuffer: true
        });
        renderer.setClearColor("#f0f0f0");
        renderer.setSize(window.innerWidth, window.innerHeight - 56);
        orbitControls = new OrbitControls(
            camera,
            renderer.domElement
        );
        composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(sceneRef.current, camera);
        composer.addPass(renderPass);
        // outlinePass = new OutlinePass(
        //     new THREE.Vector2(window.innerWidth, window.innerHeight),
        //     sceneRef.current,
        //     camera
        // );
        // composer.addPass(outlinePass)
    }

    function animate() {
        requestAnimationFrame(animate)
        renderer.render(sceneRef.current, camera)
        orbitControls.update()
        composer.render()
    }

    function createSurfaseGeometry(_meshGeometryData) {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array(_meshGeometryData.points);
        const indices = _meshGeometryData.faces;
        geometry.setIndex(indices);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const colors = [];
        for (let i = 0, n = geometry.attributes.position.count; i < n; ++i) {
            colors.push(1, 1, 1);
        }
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        const material = new THREE.MeshPhysicalMaterial({
            side: THREE.DoubleSide,
            flatShading: true,
            vertexColors: true
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.geometry.computeVertexNormals();
        mesh.castShadow = true;
        return mesh;
    }

    function createLinesGeometry(_meshGeometryData) {
        const lineGeometry = new THREE.BufferGeometry();
        const lineVertices = new Float32Array(_meshGeometryData.points);
        const lineIndices = _meshGeometryData.edges;
        lineGeometry.setIndex(lineIndices);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(lineVertices, 3));
        lineGeometry.computeBoundingSphere();
        const lineMaterial = new THREE.LineBasicMaterial();
        const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
        return lineSegments;
    }

    function updateMeshColor(meshToUpdate, colorMap, _meshValuesData, useMaxMinVisibleValue = false, colorCount = 32) {
        console.log('lut', lut.current)
        lut.current.setColorMap(colorMap, colorCount);
        if (colorMap === "solidColor") {
            lut.current.setMax(1);
            lut.current.setMin(0);
            const colors = meshToUpdate.geometry.attributes.color;
            const color = new THREE.Color();
            for (let i = 0; i < colors.array.length; i++) {
                color.copy(lut.current.getColor(0)).convertSRGBToLinear();
                colors.setXYZ(i, color.r, color.g, color.b);
            }
            colors.needsUpdate = true;
            return;
        }
        if (useMaxMinVisibleValue) {
            lut.current.setMax(_meshValuesData.maxVizibleValue);
            lut.current.setMin(_meshValuesData.minVizibleValue);
        } else {
            lut.current.setMax(_meshValuesData.maxValue);
            lut.current.setMin(_meshValuesData.minValue);
        }

        const geometry = meshToUpdate.geometry;
        const values = _meshValuesData.pointsValues;
        const colors = geometry.attributes.color;
        const color = new THREE.Color();
        for (let i = 0; i < values.length; i++) {
            const colorValue = values[i];
            color.copy(lut.current.getColor(colorValue)).convertSRGBToLinear();
            colors.setXYZ(i, color.r, color.g, color.b);
        }
        colors.needsUpdate = true;
    }

    function reloadMeshGeometry(_meshFolderUrl) {
        dispatch(setLoader(true))
        let fetchRes = fetch(_meshFolderUrl + "surfaseData.json");
        fetchRes.then(res => res.json()).then(surfaseJsonData => {
            meshFolderUrl = _meshFolderUrl;
            if (surfaseMesh != null) sceneRef.current.remove(surfaseMesh);
            if (lineMesh != null) sceneRef.current.remove(lineMesh);
            meshValuesData = {};
            meshGeometryData = surfaseJsonData;
            surfaseMesh = createSurfaseGeometry(meshGeometryData);
            surfaseMesh.visible = true;
            sceneRef.current.add(surfaseMesh);
            lineMesh = createLinesGeometry(meshGeometryData);
            lineMesh.visible = true;
            sceneRef.current.add(lineMesh);
            updateVizualizationValues();
        }).then(() => {
            dispatch(setLoader(false))
            dispatch(setMesh(true));
        })
    }

    function updateVizualizationValues() {
        const colorMap = "solidColor";
        const selectValue = "non";
        const useMaxMinVisibleValue = true;
        const colorCount = 32;
        if (colorMap === "solidColor") {
            updateMeshColor(surfaseMesh, colorMap, null, useMaxMinVisibleValue, colorCount);
        }
        else if (meshValuesData[selectValue] !== undefined) {
            updateMeshColor(surfaseMesh, colorMap, meshValuesData[selectValue], useMaxMinVisibleValue, colorCount);
        }
        else {
            let fetchRes = fetch(meshFolderUrl + selectValue + "_Data.json");
            fetchRes.then(res => res.json()).then(jsonData => {
                meshValuesData[selectValue] = jsonData;
                updateMeshColor(surfaseMesh, colorMap, meshValuesData[selectValue], useMaxMinVisibleValue, colorCount);
            })
        }
    }

    function init_mesh_components() {
        lut.current = new Lut();
        lut.current.addColorMap("solidColor", [[0.0, 0x55aaff], [1.0, 0x55aaff]])
    }

    return (
        <canvas tabIndex='1' ref={containerRef} className='absolute outline-none overflow-hidden' />
    )
}

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
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
import { setMesh, setStateBar } from '@/store/slices/projectSlice'
import axios from 'axios'
import { setCurrentMesh, setMeshes } from '@/store/slices/meshSlice'

function MeshScene({ boundingBox, sendParameters, cameraProp, orbitControlProp }, ref) {
    const dispatch = useDispatch()

    const currentMesh = useSelector(state => state.mesh.currentMesh)
    const containerRef = useRef(null)
    const sceneRef = useRef(null)
    const didLogRef = useRef(false)
    const lut = useRef(null)

    let renderer, camera, orbitControls, composer, outlinePass

    const [meshFolderUrl, setMeshFolderUrl] = useState(null)
    const [meshValuesData, setMeshValuesData] = useState({})

    const arrowRef = useRef(null)
    const planeRef = useRef(null)

    const surfaseMeshRef = useRef(null)
    const lineMeshRef = useRef(null)

    useEffect(() => {
        dispatch(setLoader(false))
        if (didLogRef.current === false) {
            didLogRef.current = true
            init()
            init_mesh_components()
            animate()
        }
        return () => {
            dispatch(setMeshes({ meshes: {} }))
            dispatch(setCurrentMesh({
                uid: null,
                path: null,
                isClip: null
            }));
            dispatch(setStateBar({ type: '', visible: false, message: '' }))
        }
    }, [])

    // useEffect(() => {
    //     if (sceneMode === 'geom') {
    //         sendParameters(camera, orbitControls)
    //     } else {
    //         camera = cameraProp;
    //         orbitControls = orbitControlProp
    //     }
    // }, [sceneMode])

    useEffect(() => {
        reloadMeshGeometry(currentMesh.path)
    }, [currentMesh])


    useImperativeHandle(ref, () => ({
        addClipPlane, deleteClipPlane, changeClipPlane
    }))

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

        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.x = 0;
        camera.position.y = 0
        camera.position.z = 50;
        camera.lookAt(new THREE.Vector3(0, 0, 0));

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

    function addClipPlane() {
        const { XMin, XMax, YMin, YMax, ZMin, ZMax } = boundingBox();
        const delta = 1.5 * Math.max(XMax - XMin, YMax - YMin, ZMax - ZMin);
        const center = [(XMin + XMax) / 2, (YMin + YMax) / 2, (ZMin + ZMax) / 2];
        deleteClipPlane();

        arrowRef.current = new THREE.ArrowHelper(
            new THREE.Vector3(0, 1, 0).normalize(),
            new THREE.Vector3(...center),
            delta,
            0x0078d3
        );
        sceneRef.current.add(arrowRef.current);

        const geometry = new THREE.PlaneGeometry(delta, delta);
        const material = new THREE.MeshBasicMaterial({ color: 0x0078d3, opacity: 0.5, transparent: true, side: THREE.DoubleSide });
        planeRef.current = new THREE.Mesh(geometry, material);
        planeRef.current.lookAt(new THREE.Vector3(0, 1, 0).normalize());
        planeRef.current.position.set(...center);
        sceneRef.current.add(planeRef.current);
    }

    function deleteClipPlane() {
        sceneRef.current.remove(arrowRef.current);
        sceneRef.current.remove(planeRef.current);
    }

    function changeClipPlane(params) {
        const { normalX, normalY, normalZ, centerX, centerY, centerZ } = params;
        const normalVector = new THREE.Vector3(normalX, normalY, normalZ).normalize();

        arrowRef.current.position.set(centerX, centerY, centerZ);
        planeRef.current.position.set(centerX, centerY, centerZ);

        arrowRef.current.setDirection(normalVector);
        planeRef.current.lookAt(new THREE.Vector3(centerX + normalVector.x, centerY + normalVector.y, centerZ + normalVector.z));
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

    async function reloadMeshGeometry(_meshFolderUrl) {
        setMeshFolderUrl(_meshFolderUrl);
        dispatch(setLoader(true));
        try {
            const response = await axios.get(`${BASE_SERVER_URL}${_meshFolderUrl}surfaseData.json`);
            if (response.status === 200) {
                if (surfaseMeshRef.current) sceneRef.current.remove(surfaseMeshRef.current);
                if (lineMeshRef.current) sceneRef.current.remove(lineMeshRef.current);
                setMeshValuesData({});
                surfaseMeshRef.current = createSurfaseGeometry(response.data);
                sceneRef.current.add(surfaseMeshRef.current);
                lineMeshRef.current = createLinesGeometry(response.data);
                sceneRef.current.add(lineMeshRef.current);
                updateVizualizationValues();
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setLoader(false));
        }
    }

    function updateVizualizationValues() {
        const colorMap = "solidColor";
        const selectValue = "non";
        const useMaxMinVisibleValue = true;
        const colorCount = 32;
        if (colorMap === "solidColor") {
            updateMeshColor(surfaseMeshRef.current, colorMap, null, useMaxMinVisibleValue, colorCount);
        } else if (meshValuesData[selectValue] !== undefined) {
            updateMeshColor(surfaseMeshRef.current, colorMap, meshValuesData[selectValue], useMaxMinVisibleValue, colorCount);
        } else {
            let fetchRes = fetch(meshFolderUrl + selectValue + "_Data.json");
            fetchRes.then(res => res.json()).then(jsonData => {
                meshValuesData[selectValue] = jsonData;
                updateMeshColor(surfaseMeshRef.current, colorMap, meshValuesData[selectValue], useMaxMinVisibleValue, colorCount);
            })
        }
    }

    function init_mesh_components() {
        lut.current = new Lut();
        lut.current.addColorMap("solidColor", [[0.0, 0x4488CC], [1.0, 0x4488CC]])
    }

    return (
        <canvas tabIndex='1' ref={containerRef} className='absolute outline-none overflow-hidden' />
    )
}
export default forwardRef(MeshScene)

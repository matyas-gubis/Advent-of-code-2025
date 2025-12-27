import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Day08Solver } from './day-08';

async function init() {
    const solver = new Day08Solver();
    const nodes = await solver.processFile('./input.txt');
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container')!.appendChild(renderer.domElement);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    const minX = Math.min(...nodes.map(n => n.x));
    const maxX = Math.max(...nodes.map(n => n.x));
    const minY = Math.min(...nodes.map(n => n.y));
    const maxY = Math.max(...nodes.map(n => n.y));
    const minZ = Math.min(...nodes.map(n => n.z));
    const maxZ = Math.max(...nodes.map(n => n.z));
    
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const centerZ = (minZ + maxZ) / 2;
    
    const rangeX = maxX - minX;
    const rangeY = maxY - minY;
    const rangeZ = maxZ - minZ;
    const maxRange = Math.max(rangeX, rangeY, rangeZ);
    
    const scale = maxRange > 0 ? 10 / maxRange : 1;
    
    const sphereGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ff88,
        emissive: 0x003322,
        shininess: 100
    });
    
    nodes.forEach(node => {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        const scaledX = (node.x - centerX) * scale;
        const scaledY = (node.y - centerY) * scale;
        const scaledZ = (node.z - centerZ) * scale;
        sphere.position.set(scaledX, scaledY, scaledZ);
        scene.add(sphere);
    });
    
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);
    
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    scene.add(gridHelper);
    
    const axesHelper = new THREE.AxesHelper(15);
    scene.add(axesHelper);
    
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);
    
    document.getElementById('node-count')!.textContent = nodes.length.toString();
    
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
}

init();

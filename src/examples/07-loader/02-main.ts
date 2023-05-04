import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { BASE_URL } from '../../consts';
import './style.css'

/**
 * 目标：加载Blender Model
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(15, 15, 15);

// 加载gltf模型
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(`${BASE_URL}draco/gltf`);
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load(`${BASE_URL}models/cube.glb`, (gltf) => {
  const mesh = gltf.scene;
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
})

const objLoader = new OBJLoader();

const mtlLoader = new MTLLoader();
mtlLoader.load(`${BASE_URL}models/lego.mtl`, (mtl) => {
  mtl.preload();
  objLoader.setMaterials(mtl);
  objLoader.load(`${BASE_URL}models/lego.obj`, (object) => {
    object.position.set(5, 0, 0)
    
    scene.add(object);
  })
})

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// 创建环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 创建坐标轴辅助器
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(100, 10);
scene.add(gridHelper);

// 创建OrbitControls对象
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.autoRotate = true;


function animate() { 
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { clock as CanvasClock } from '../../utils/clock';
import './style.css'

/**
 * 目标：Material贴图-CanvasTexture
 */ 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5, 1000);
camera.position.set(0, 0, 10);

const clock = CanvasClock();
const canvasTexture = new THREE.CanvasTexture(clock);

const geometry = new THREE.BoxGeometry(5, 5, 5, 50, 50);

const material = new THREE.MeshPhongMaterial({
  map: canvasTexture,
}); 
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// 创建环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
scene.add(ambientLight);
// 直射光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight)

// 创建坐标轴辅助器
// const axesHelper = new THREE.AxesHelper(1000);
// scene.add(axesHelper);
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
  canvasTexture.needsUpdate = true
}  

animate()

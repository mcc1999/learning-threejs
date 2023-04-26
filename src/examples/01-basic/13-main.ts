import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'

/**
 * 目标：几何体的不同面/三角形填上不同颜色
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const geometry = new THREE.BufferGeometry();
const vertices = [
  -1, -1, -1, // vertex 0
  -1, -1,  1, // vertex 1
  -1,  1,  1, // vertex 2
   1,  1, -1, // vertex 3
   1, -1, -1, // vertex 4
   1,  1,  1, // vertex 5
];

const normals = [
  -1, 0, 0, // normal 0
  -1, 0, 0, // normal 1
  -1, 0, 0, // normal 2
   1, 0, 0, // normal 3
   1, 0, 0, // normal 4
   1, 0, 0, // normal 5
];

const colors = [
  1, 0, 0, // color 0
  1, 0, 0, // color 1
  1, 0, 0, // color 2
  1, 1, 0, // color 3
  1, 0, 1, // color 4
  0, 1, 1, // color 5
];

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material = new THREE.MeshBasicMaterial({vertexColors: true, side: THREE.DoubleSide});
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

// 创建坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 创建OrbitControls对象
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() { 
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()
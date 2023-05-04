import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'
import { GUI } from 'dat.gui';

/**
 * 目标：相机跟随物体
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const cameraOffset = new THREE.Vector3(5, 10, 0);
camera.position.set(0, 0, 0);
camera.position.add(cameraOffset)

const geometry = new THREE.BoxGeometry(1, 1, 1);
const referenceGeometry = new THREE.BoxGeometry(1, 1, 5)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(geometry, material);
const referenceMesh = new THREE.Mesh(referenceGeometry, material);
scene.add(mesh);
scene.add(referenceMesh);
referenceMesh.position.x = -2

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

let moving = false

const guiParams = {
  moving,
}
const gui = new GUI();
gui.add(guiParams, 'moving').onChange((v) => {
  moving = v
  
})

function animate() {   
  if(moving){
    if (mesh.position.x >= 10) {
      mesh.position.x = 0
      
    } else {
      mesh.position.x += 0.05
    }
    camera.position.set(mesh.position.x + cameraOffset.x, mesh.position.y + cameraOffset.y, mesh.position.z + cameraOffset.z)
  }
  camera.lookAt(mesh.position)
  
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()
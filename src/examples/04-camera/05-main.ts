import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'

/**
 * 目标：透视相机围绕物体旋转
 */ 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5, 1000);
const radius = 7
camera.position.set(radius, 0, 0);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.lookAt(mesh.position);

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

const clock = new THREE.Clock(true);
const speed = Math.PI / 9;
function animate() {     
  /**
   * - 根据部分圆弧长度，可以计算出该圆弧所对应的圆心角度数: `angle = (arcLength / radius) * (180 / Math.PI)`
   * - 圆心角度数转换为弧度数: radians = angle * (Math.PI / 180)
   * - 计算坐标：`x = radius * Math.cos(radians); y = radius * Math.sin(radians)`
   */
  camera.position.x = Math.cos(clock.getElapsedTime() * speed / radius) * radius;
  camera.position.z = Math.sin(clock.getElapsedTime() * speed / radius) * radius;
  camera.updateProjectionMatrix()
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()
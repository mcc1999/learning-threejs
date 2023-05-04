import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';
import './style.css'

/**
 * 目标：几何体应用矩阵变换
 * - 创建变换所需的matrix4矩阵
 *  - 自己创建matrix4矩阵
 *  ```typescript
 *     // for example 缩放变换矩阵
 *     const scaleMatrix4 = new THREE.Matrix4([
 *        x, 0, 0, 0,
 *        0, y, 0, 0, 
 *        0, 0, z, 0, 
 *        0, 0, 0, 1
 *     ]);
 *  ```
 *  - 使用makeRotationX()、makeRotationAxis(axis, angle)、makeScale(x, y ,z)生成变换matrix4
 * - 将matrix4应用到Mesh或Geometry上
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const doScale = (x: number, y: number, z: number) => {
  const scaleMatrix4 = new THREE.Matrix4()
  scaleMatrix4.set(
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1
  )
  const fnGenerateMatrix4 = new THREE.Matrix4()
  fnGenerateMatrix4.makeScale(x, y, z)
  geometry.applyMatrix4(scaleMatrix4)
  // geometry.applyMatrix4(fnGenerateMatrix4)
}
const guiParams = {
  doScale: () => {
    doScale(2, 2, 2)
  },
}
const gui = new GUI()
gui.add(guiParams, 'doScale').name('放大两倍');

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
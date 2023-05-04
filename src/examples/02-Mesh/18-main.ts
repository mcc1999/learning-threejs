import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';
import { BASE_URL } from '../../consts';
import './style.css'

/**
 * 目标：Sprite && SpriteMaterial
 * - Sprite是一种用于呈现平面精灵图像的对象，它可以在三维场景中渲染2D图像。Sprite可以用于实现许多不同的效果，例如在场景中添加粒子、标记位置、绘制2D图标等。
 * - Sprite没有体积或深度，它只是一个平面矩形，总是朝向相机并始终保持垂直于视线。
 * - Sprite使用的是SpriteMaterial材质，它可以使用图像或纹理贴图作为其材质。
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5, 1000);
camera.position.set(0, 0, 7);

// 加载纹理贴图
const texture = new THREE.TextureLoader().load(`${BASE_URL}images/door.jpeg`);

// 创建精灵对象
const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(2, 2, 1); // 设置精灵大小

// 将精灵添加到场景中
scene.add(sprite);

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

const guiParams = {
  fov: camera.fov,
  near: camera.near,
  far: camera.far,
  aspect: camera.aspect
}
const gui = new GUI();
gui.add(guiParams, 'fov', 0, 180, 5).onChange((v) => {
  camera.fov = v
  camera.updateProjectionMatrix()
})
gui.add(guiParams, 'near', 0.1, 10, 1).onChange((v) => {
  camera.near = v
  camera.updateProjectionMatrix()
})
gui.add(guiParams, 'far', 5, 100, 5).onChange((v) => {
  camera.far = v
  camera.updateProjectionMatrix()
})

function animate() {     
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()
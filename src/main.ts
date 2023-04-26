import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'
import { GUI } from 'dat.gui';

/**
 * 目标：几何体朝向其他几何体
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);

const geometry1 = new THREE.BoxGeometry(3, 3, 3);
const geometry2 = new THREE.RingGeometry(2, 3, 50);
const geometry3 = new THREE.ConeGeometry(2, 2, 32);
const geometry4 = new THREE.SphereGeometry(2, 50, 50);

const material1 = new THREE.MeshBasicMaterial({ color: new THREE.Color(Math.random(), Math.random(), Math.random()) })
const material2 = new THREE.MeshBasicMaterial({ color: new THREE.Color(Math.random(), Math.random(), Math.random()) })
const material3 = new THREE.MeshBasicMaterial({ color: new THREE.Color(Math.random(), Math.random(), Math.random()) })
const material4 = new THREE.MeshBasicMaterial({ color: new THREE.Color(Math.random(), Math.random(), Math.random()) })

const mesh1 = new THREE.Mesh(geometry1, material1);
const mesh2 = new THREE.Mesh(geometry2, material2);
const mesh3 = new THREE.Mesh(geometry3, material3);
const mesh4 = new THREE.Mesh(geometry4, material4);

mesh2.position.set(5, 5, 5);
mesh3.position.set(5, -5, 5);
mesh4.position.set(5, 5, -5);

scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);

const control	=	{
  lookAtRing: function()	{
      mesh1.lookAt(mesh2.position);
  },
  lookAtCone: function()	{
    mesh1.lookAt(mesh3.position);
  },
  lookAtSphere: function()	{
    mesh1.lookAt(mesh4.position);
  }
};

const gui = new GUI()
gui.add(control, 'lookAtRing')
gui.add(control, 'lookAtCone')
gui.add(control, 'lookAtSphere')

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
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// 创建OrbitControls对象
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() { 
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BASE_URL } from '../../consts';
import './style.css'

/**
 * 目标：物体围绕一个点旋转
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 20);


const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial();
const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial()
const earthTexture = new THREE.TextureLoader().load(`${BASE_URL}images/earth.jpg`)
const moonTexture = new THREE.TextureLoader().load(`${BASE_URL}images/moon.png`)
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
earthMaterial.map = earthTexture;
moonMaterial.map = moonTexture
scene.add(earth);
moon.position.set(7, 0, 7);
const pivotPoint = new THREE.Object3D();
earth.add(pivotPoint);
pivotPoint.add(moon);
earth.rotateZ(Math.PI / 6)

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

// 创建OrbitControls对象
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() { 
  pivotPoint.rotation.y += 0.01
  earth.rotation.y += 0.003
  moon.rotation.y += 0.0001
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()
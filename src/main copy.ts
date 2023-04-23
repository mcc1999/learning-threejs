import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { GUI } from 'dat.gui';

import './style.css'
/**
 * 目标：CSS2DRenderer,将三维物体和基于HTML的标签相结合
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 30, 50)

// 创建半径为5的球形几何体
const sphere = new THREE.SphereGeometry(2, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
})
const sphereMesh = new THREE.Mesh(sphere, sphereMaterial);

const label = document.createElement('div');
label.innerHTML = 'Hello Three.js';
label.style.color = '#ffffff';
const object = new CSS2DObject(label);

sphereMesh.add(object);
scene.add(sphereMesh);
sphereMesh.position.set(20, 20, 0);
sphereMesh.castShadow = true;
object.position.set(5 * 1.5, 0, 0);

// 创建一个方块并能生成阴影
const cubeGeometry = new THREE.BoxGeometry(20, 10, 20);
const cubeMaterial = new THREE.MeshStandardMaterial({
	metalness: 0.6,
	roughness: 0.1,
})
const planeGeometry = new THREE.PlaneGeometry(50, 50) 
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xe0e0e0
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(cube);
scene.add(plane);
cube.castShadow = true;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
cube.position.set(0, 5, 0);

// 创建环境光
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);
// 创建点光源
const pointLight = new THREE.PointLight(0xffff00, 0.5);
pointLight.castShadow = true;
pointLight.decay = 0
pointLight.position.set(10, 30, 20);
pointLight.shadow.mapSize.width = 512;
pointLight.shadow.mapSize.height = 512;
pointLight.shadow.camera.near = 0.5;
pointLight.shadow.camera.far = 500;
scene.add(pointLight);

const gui = new GUI();
// @ts-ignore
gui.add(pointLight, 'distance', 0, 50, 0.1).name('distance')

// 3. 创建网格辅助器
const axesHelper = new THREE.AxesHelper(30);
const  gridHelper = new THREE.GridHelper(50, 10);
scene.add( axesHelper );
scene.add( gridHelper );

// 4. 创建渲染器renderer并设置尺寸
// const labelRenderer = new CSS2DRenderer();
// labelRenderer.domElement.style.position = 'absolute';
// labelRenderer.domElement.style.top = '0px';
// document.body.appendChild( labelRenderer.domElement );
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 渲染阴影
renderer.physicallyCorrectLights = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 5. 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

window.addEventListener('resize', () => {
 camera.aspect = window.innerWidth / window.innerHeight
 camera.updateProjectionMatrix()

 renderer.setSize(window.innerWidth, window.innerHeight)
//  labelRenderer.setSize(window.innerWidth, window.innerHeight)
})

const clock = new THREE.Clock(true);

function animate() {
  // 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update() 
  sphereMesh.position.set(10 * Math.cos(clock.getElapsedTime()), 20, 20 * Math.sin(clock.getElapsedTime()));
  pointLight.position.set(10 * Math.cos(clock.getElapsedTime()), 20, 20 * Math.sin(clock.getElapsedTime()));
  renderer.render( scene, camera );
  // labelRenderer.render( scene, camera );
  requestAnimationFrame( animate );
}
animate();

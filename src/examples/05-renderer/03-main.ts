import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import './style.css'
import { GUI } from 'dat.gui';
/**
 * 目标：CSS2DRenderer,将三维物体和基于HTML的标签相结合
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 30, 50)

// 创建半径为1的球形几何体
const sphere = new THREE.SphereGeometry(0.5, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
})
const sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
scene.add(sphereMesh);

// 创建label div标筬
const label = document.createElement('div');
label.innerHTML = 'Hello Three.js';
label.style.color = '#fff';
label.style.backgroundColor = 'transparent';
const object = new CSS2DObject(label);

object.position.set(0, 3, 0);
sphereMesh.add(object);

// 创建一个方块并能生成阴影
const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
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
plane.lookAt(new THREE.Vector3(0, 1, 0));
cube.position.set(0, 5, 0);

// 创建环境光
const ambientLight = new THREE.AmbientLight(0x404040, 0.75);
scene.add(ambientLight);
// 创建点光源
const pointLight = new THREE.PointLight(0x00ff00);
pointLight.castShadow = true;
pointLight.decay = 0
const pointLightGroup = new THREE.Group()
pointLightGroup.add(pointLight)
pointLightGroup.add(sphereMesh)
pointLightGroup.position.set(20, 20, 10);
scene.add(pointLightGroup);

const gui = new GUI()
// @ts-ignore
gui.add(pointLight, 'intensity', 0, 5, 0.1)
// @ts-ignore
gui.add(pointLight, 'decay', 0, 2, 0.01)

// 创建网格辅助器
const axesHelper = new THREE.AxesHelper(30);
const  gridHelper = new THREE.GridHelper(50, 10);
scene.add( axesHelper );
scene.add( gridHelper );

// 创建渲染器renderer并设置尺寸
const css2Renderer = new CSS2DRenderer();
document.body.appendChild( css2Renderer.domElement );
css2Renderer.setSize( window.innerWidth, window.innerHeight );

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

window.addEventListener('resize', () => {
 camera.aspect = window.innerWidth / window.innerHeight
 camera.updateProjectionMatrix()

 renderer.setSize(window.innerWidth, window.innerHeight)
 css2Renderer.setSize(window.innerWidth, window.innerHeight)
})

const clock = new THREE.Clock(true);

function animate() {
  // 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update() 
  pointLightGroup.position.set(20 * Math.cos(clock.getElapsedTime()), 20, 20 * Math.sin(clock.getElapsedTime()));
  renderer.render( scene, camera );
  css2Renderer.render( scene, camera );
  requestAnimationFrame( animate );
}
animate();

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BASE_URL } from '../../consts';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import './style.css'

/**
 * 目标：创建点云-老牛扛Cube
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(12, 7, -2)

const cowMaterial = new THREE.PointsMaterial({ 
	color: 0x5555ff,
	transparent: true,
	size: 0.05,
	sizeAttenuation: true,
})

// 加载cow模型
const objLoader = new OBJLoader();
objLoader.load(`${BASE_URL}models/cow/cow.obj`, (obj) => {
	// @ts-ignore
	const cowGeometry = obj.children[1].geometry;
	const pointCloudCow = new THREE.Points(cowGeometry, cowMaterial)
	scene.add(pointCloudCow)	
})

const cubeGeometry = new THREE.BoxGeometry(5, 5, 5, 10, 10 , 10)
const cube = new THREE.Points(cubeGeometry, cowMaterial)
cube.position.set(0, 5, 0)
scene.add(cube)

// 环境光
const ambientLight = new THREE.AmbientLight(0x404040, 0.75)
scene.add(ambientLight)


// 4. 创建渲染器renderer并设置尺寸
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 5. 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.autoRotate = true

// 创建网格辅助器
// const gridHelper = new THREE.GridHelper( 10, 10 );
// const axesHelper = new THREE.AxesHelper(5);
// scene.add( gridHelper );
// scene.add( axesHelper );

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
})

function animate() {
	// 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update() 
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}
animate();

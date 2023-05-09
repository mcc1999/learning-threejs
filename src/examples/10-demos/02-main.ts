import * as THREE from 'three'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

/**
 * 目标：Drag Demo
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xf0f0f0 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(10, 10, 10)

const cubeGroup = new THREE.Group()
scene.add(cubeGroup)

for (let i = 0; i < 500; i++ ) {
	const cube = new THREE.Mesh(
		new THREE.BoxGeometry(1, 1, 1, 10, 10, 10),
		new THREE.MeshBasicMaterial({color: new THREE.Color(Math.random(), Math.random(), Math.random())})
	)
	cube.position.set(Math.random() * 20, Math.random() * 20, Math.random() * 20)
	cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
	cubeGroup.add(cube)
}

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.75)
scene.add(ambientLight)


// 4. 创建渲染器renderer并设置尺寸
const renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 5. 创建轨道控制器
const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true

const controls = new DragControls([cubeGroup], camera, renderer.domElement)
controls.addEventListener('drag', render)
controls.addEventListener('dragstart', () => orbitControls.enabled = false)
controls.addEventListener('dragend',  () => orbitControls.enabled = true)

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

function render() {
	renderer.render( scene, camera );
}
function animate() {
	render()
	requestAnimationFrame( animate );
}
animate();

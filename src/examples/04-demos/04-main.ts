import { GUI } from 'dat.gui';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createTextGeometry } from '../../utils';
import './style.css'

/**
 * 目标：拖拽控制器
 * - 当拖拽group时，需要把transformGroup属性设为true，才能使得group内物体一起拖拽
 */
const gui = new GUI()

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.set(3, 2, 5);
camera.lookAt(new THREE.Vector3())

// 3.创建物体
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh( geometry, material );
const cube2 = new THREE.Mesh( geometry, material );
scene.add( cube2 );
cube2.position.set(3, 0, 0)
const guiParams = {
	x: cube2.position.x,
	y: cube2.position.y,
	z: cube2.position.z,
}
gui.add(guiParams, 'x', 0, 10, 0.1).name("x").onChange((v) => {cube2.position.x = v})
gui.add(guiParams, 'y', 0, 10, 0.1).name("y").onChange((v) => {cube2.position.y = v})
gui.add(guiParams, 'z', 0, 10, 0.1).name("z").onChange((v) => {cube2.position.z = v})

const group = new THREE.Group()
group.add(cube)
cube.position.set(0, 0, 0)
scene.add(group)

const dragText = await createTextGeometry({
	text: 'Drag',
	textGeometryParameter: {
		size: 0.25,
		height: 0.1,
	},
	textMaterialParameter: {
		color: 0xffffff
	}
})
dragText.position.set(0, 0, 0.5)
group.add(dragText)

const guiText = await createTextGeometry({
	text: 'USE GUI',
	textGeometryParameter: {
		size: 0.15,
		height: 0.1,
	},
	textMaterialParameter: {
		color: 0xffffff
	}
})
guiText.position.set(0, 0, 0.5)
cube2.add(guiText)

// LIGHTS
const dirLight = new THREE.DirectionalLight( 0xffffff );
dirLight.position.set( 0, 0, 100 ).normalize();
scene.add( dirLight );

const light = new THREE.AmbientLight( 0xffffff, 0.5 );
light.position.set( 0, 0, 100 ).normalize();
scene.add( light );

// 5. 创建坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add( axesHelper );

// 2. 创建渲染器renderer并设置尺寸
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild( renderer.domElement );

// 4. 创建拖拽控制器
const controls = new DragControls([group], camera, renderer.domElement)
controls.transformGroup = true
controls.addEventListener('drag', render)

// const orbitControls = new OrbitControls(camera, renderer.domElement)
// orbitControls.enableDamping = true

function render() {
	renderer.render( scene, camera );
}

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)

	render()
})

function animate() {
	render()
	requestAnimationFrame(animate)
}
animate()
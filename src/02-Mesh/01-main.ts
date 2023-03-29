import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import './style.css'
import * as dat from 'dat.gui'

/**
 * 目标：使用BufferGeometry创建基础几何体
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(8, 4, 8)

// 2.使用BufferGeometry创建几何体
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
	-1, -1,  1,
	 1, -1,  1,
	 1,  1,  1,
	
	 1,  1,  1,
	-1,  1,  1,
	-1, -1,  1,
])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
console.log('cube', cube);


// 3. 创建网格辅助器
const gridHelper = new THREE.GridHelper( 10, 10 );
const axesHelper = new THREE.AxesHelper(5);
scene.add( gridHelper );
scene.add( axesHelper );

// 4. 创建渲染器renderer并设置尺寸
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 5. 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// 6. GUI初始化
const gui = new dat.GUI()
// @ts-ignore
gui.add(cube.position, 'x', 0, 5, 0.1)
	.name('X轴坐标')
	.onChange((v) => {
		console.log('change to', v);
	})

const params = {
	color: '#00ff00',
	fn: () => {
		gsap.to(cube.position, {x: 5, duration: 2, repeat: -1, yoyo: true})
	}
}
gui.addColor(params, 'color')
	.name('Cube Color')
	.onChange((v) => {
		cube.material.color.set(v)
	})

// 运行函数
gui.add(params, 'fn').name('运行')

// 添加折叠文件夹
const folder = gui.addFolder('Folder')
// @ts-ignore
folder.add(cube.material, 'wireframe').name('线框')

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

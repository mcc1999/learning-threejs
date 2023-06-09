import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap'
import './style.css'

/**
 * 目标：轨道控制器阻尼效果 && 画面随网页大小自适应
 * - OrbitControls.enableDamping = true
 * 
 * - camera.aspect = w / h
 * - camera.updateProjectMatrix()
 * - renderer.setSize(w, h) 
 * - renderer.setPixelRadio(window.devicePixelRadio)
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(8, 4, 8)

// 2.创建物体
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(0, 0, 0)
scene.add( cube );

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

// 6. 设置动画
const animateMove = gsap.to(cube.position, {x: 5, duration: 5, repeat: -1, yoyo: true})
gsap.to(cube.rotation, {x: 2 * Math.PI, duration: 5, repeat: -1, yoyo: true})
gsap.to(cube.scale, {x: 2, y: 2, z: 2, duration: 5, repeat: -1, yoyo: true})

window.addEventListener('dblclick', () => {	
	if (animateMove.isActive()) {
		animateMove.pause()
	} else {
		animateMove.resume()
	}
})

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

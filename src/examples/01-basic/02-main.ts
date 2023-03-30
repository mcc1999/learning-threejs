import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'

/**
 * 目标：添加轨道控制器OrbitControls查看物体
 * - new OrbitControls(camera, renderer.domElement)
 */

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// 2. 创建渲染器renderer并设置尺寸
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 3.创建物体
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// 4. 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 根据显示器刷新率渲染物体
function animate() {
	requestAnimationFrame( animate );
	// 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update()
	renderer.render( scene, camera );
}
animate();

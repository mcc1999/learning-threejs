import * as THREE from 'three';
import './style.css'

/**
 * 目标：创建物体步骤
 * - 创建场景scene和摄像头camera
 * - 创建渲染器renderer
 * - 创建物体
 * - requestAnimationFrame渲染
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

// 根据显示器刷新率渲染物体
function animate() {
	requestAnimationFrame( animate );
  // 让物体的位置改变
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();

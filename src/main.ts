import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'

/**
 * 目标1：物体移动
 * - Mesh.position.set(x, y, z) 或 Mesh.position.x = 1
 * 
 * 目标2：物体缩放
 * - Mesh.scale.set(x, y, z) 或 Mesh.scale.x = 1
 * 
 * 目标3：物体旋转
 * 
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = 5;

// 3.创建物体
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(0, 0, 0)
scene.add( cube );

const cube2 = new THREE.Mesh( geometry, material );
cube2.position.set(0, 0, 0)
scene.add( cube2 );

// 5. 创建网格辅助器
const gridHelper = new THREE.GridHelper( 10, 10 );
const axesHelper = new THREE.AxesHelper(5);
scene.add( gridHelper );
scene.add( axesHelper );

// 2. 创建渲染器renderer并设置尺寸
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 4. 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 根据显示器刷新率渲染物体
function animate() {
	requestAnimationFrame( animate );
	if (cube.position.z >= 5) {
		cube.position.z = 0
	} else {
		cube.position.z += 0.01
	}
	if (cube.scale.x >= 0.1 && cube.scale.x <= 1) {
		cube.scale.x -= 0.1
		cube.scale.y -= 0.1
		cube.scale.z -= 0.1
	} else {
		cube.scale.set(1, 1, 1)
	}
	cube.rotation.x += Math.PI / 100
	cube2.rotation.x += Math.PI / 40
  controls.update()
	renderer.render( scene, camera );
}
animate();

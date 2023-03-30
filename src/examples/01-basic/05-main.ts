import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'

/**
 * 目标：物体匀速移动
 * - requestAnimationFrame时间参数
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = 5;

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

/**
 * 根据显示器刷新率渲染物体时，平均（1 / 刷新率）ms render一次，但是不一定是这个时间
 * 所以根据s = vt, 算出position
 */

function animate(time: number) {
	
	requestAnimationFrame( animate );
	const t = time / 1000 % 5
	// 速度 v = 1
	cube.position.x = t
	// 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update()
	renderer.render( scene, camera );
}
animate(0);

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BASE_URL } from '../../consts'
import * as TWEEN from '@tweenjs/tween.js'
import { GUI } from 'dat.gui'
import './style.css'

/**
 * 目标：全景小行星进场
 * 原理：
 *  - 透视相机的fov设置一个很大的值(接近180度)，使得能在俯视视角下能看到全景图的绝大部分
 *  - 相机初始视角设为球形几何体的(0, radius, 0)
 *  - 全景图贴图在球形几何体上，并设为BaskSide渲染
 *  - 设置动画：改变相机fov至较正常视角(90度) / 球形几何体旋转
 *  - 设置动画-转向目标建筑：改变相机fov至较正常视角(75度) ，更新相机位置至(0, 0, 0) / 相机朝向(0, 0, 0)
*/
const gui = new GUI()

// 1.创建场景和相机
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 170, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set(0, 500, 0);

// 2.创建球形几何体，并加载全景纹理
const geometry = new THREE.SphereGeometry( 500, 500, 500 );
// 使得材质渲染从FrontSide变成BackSide
geometry.scale(-1, 1, 1) 
const texture = new THREE.TextureLoader().load(`${BASE_URL}images/textures/camera/dongman.png`)
const material = new THREE.MeshBasicMaterial({
		map: texture,
});

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
})

const controls = new OrbitControls(camera, renderer.domElement);          
	
function animate() {
		render();
		requestAnimationFrame(animate);
}
function render() {
		//更新控制器
		controls.update();
		TWEEN.update()
		renderer.render(scene, camera);
}
animate()

function enterScene() {
	let tween = new TWEEN.Tween({ fov: camera.fov, z: 0, cy: camera.position.y, mx: 0, my: 0})
		.to({
				fov: 70,
				z: -500,
				cy: 0,
				mx: -Math.PI / 8,
				my: Math.PI
		},2000)
		.easing(TWEEN.Easing.Linear.None)
		.onComplete(function() {
				TWEEN.remove(tween);
		})
		.onUpdate(function(t) {						
			// 更新相机位置和视角大小			
			camera.position.y = t.cy;
			camera.fov = t.fov;
			camera.updateProjectionMatrix();
			// 旋转效果
			mesh.rotation.y += 0.01;
			mesh.rotation.x = t.mx;
			// 更新看向位置
			const target = new THREE.Vector3(0, 0, t.z);
			camera.lookAt(target);
		})
		.start();
}
const tween = new TWEEN.Tween( { fov : 170, rotation: 0 } )
	.to( { fov : 100, rotation: Math.PI * 1.1  }, 2500 )
	.delay(1000)
	.easing(TWEEN.Easing.Cubic.InOut)
	.onComplete(function() {
		TWEEN.remove(tween);
		setTimeout(function(){
				// 旋转入场动画
				enterScene()
		}, 500)
	})
	.onUpdate(function({ fov, rotation, }) {	
		// 视角由大到小
    camera.fov = fov;
    camera.updateProjectionMatrix()
    // 旋转
    mesh.rotation.y = rotation;
	})

const guiParams = {
	start: () => { 
		console.log(mesh.rotation);
		
		tween.start() 
	},
	reset: () => {
		mesh.rotation.set(0, 0 ,0)
		camera.position.set(0, 500, 0)
		camera.lookAt(0, 500, 0)
		camera.fov = 170
		camera.updateProjectionMatrix()

	},
	position: camera.position
}
gui.add(guiParams, 'start').name('run')
gui.add(guiParams, 'reset').name('reset')
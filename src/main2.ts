import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BASE_URL } from './consts'
import * as TWEEN from '@tweenjs/tween.js'
import { GUI } from 'dat.gui'
import './style.css'

/**
 * 目标：全景小行星进场
*/
const gui = new GUI()

// 1.创建场景和相机
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set(0, 1200, 0);

// 2.创建坐标系
const axesHelper = new THREE.AxesHelper( 5000 );
scene.add( axesHelper );

// 2.创建球形几何体，并加载全景纹理
const geometry = new THREE.SphereGeometry( 500, 500, 500 );
// 使得材质FrontSide变成BackSide
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
	// 获取相机坐标
	let cameraLook = new THREE.Vector3();
	camera.getWorldDirection(cameraLook);

	let tween = new TWEEN.Tween({ fov: camera.fov, z: 0, cy: camera.position.y})
		.to({
				fov: 70,
				z: -1200,
				cy: 0,
		}, 2000)
		.easing(TWEEN.Easing.Linear.None)
		.onComplete(function() {
				TWEEN.remove(tween);
		})
		.onUpdate(function(t) {
			// 更新相机位置和视角大小
			console.log(t.fov, t.z, t.cy);
			
			camera.position.y = t.cy;
			camera.fov = t.fov;
			camera.updateProjectionMatrix();
			// 旋转效果
			mesh.rotation.y += 0.01;
			// 更新看向位置
			const target = new THREE.Vector3(0, 0, t.z);
			camera.lookAt(target);
		})
		.start();
}
const tween = new TWEEN.Tween( { fov : 170, ars: 40, rot: 0 } )
	.to( { fov : 100, ars: 0, rot: Math.PI * 1.1  }, 2500 )
	.delay(1000)
	.easing(TWEEN.Easing.Cubic.InOut)
	.onComplete(function() {
		TWEEN.remove(tween);
		setTimeout(function(){
				// 旋转入场动画
				enterScene()
		}, 1000)
	})
	.onUpdate(function({ rot, fov}) {	
		// 视角由大到小
    camera.fov = fov;
    camera.updateProjectionMatrix()
    // 旋转
    mesh.rotation.y = rot;
	})

const guiParams = {
	start: () => { camera.lookAt(0, 600, 0); tween.start() },
	position: camera.position
}
gui.add(guiParams, 'start').name('run')
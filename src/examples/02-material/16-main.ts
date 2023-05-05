import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { GUI } from 'dat.gui';
import './style.css'

/**
 * 目标：材质混合，Material的的blending屬性
*/

const gui = new GUI()
// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(2, 2, 2)

const geometry = new THREE.BoxGeometry(1, 1, 1);

const normalMaterial = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	opacity: 0.5,
	transparent: true,
	blending: THREE.NormalBlending
});
const normalMesh = new THREE.Mesh(geometry, normalMaterial);
scene.add(normalMesh);

// 创建一个使用AdditiveBlending混合模式的材质
const additiveMaterial = new THREE.MeshBasicMaterial({
	color: 0xff0000,
	opacity: 0.5,
	transparent: true,
	blending: THREE.AdditiveBlending
});
const mesh = new THREE.Mesh(geometry, additiveMaterial);
scene.add(mesh);

const blending = {
	NoBlending: THREE.NoBlending, 
	NormalBlending: THREE.NormalBlending, 
	AdditiveBlending: THREE.AdditiveBlending, 
	SubtractiveBlending: THREE.SubtractiveBlending,
	MultiplyBlending: THREE.MultiplyBlending
}
const blendingArr = [THREE.NoBlending, THREE.NormalBlending, THREE.AdditiveBlending, THREE.SubtractiveBlending, THREE.MultiplyBlending]

// 2. 创廽数据控制面框
// 通过gui来控制mesh的blending属性值
// @ts-ignore
gui.add(mesh.material, 'blending',  blending).onChange(v=> mesh.material.blending = blendingArr[v])

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
const controls = new TrackballControls(camera, renderer.domElement)

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
})

window.document.addEventListener('dblclick', function() {
	if (mesh.material.blending === THREE.NormalBlending) {
		mesh.material.blending = THREE.AdditiveBlending;
	} else {
		mesh.material.blending = THREE.NormalBlending;
	}
}, false);

function animate() {
	// 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update() 
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}
animate();

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BASE_URL } from '../../consts';
import { GUI } from 'dat.gui';
import './style.css'

/**
 * 目标：点云-向内塌陷/向外爆炸
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(12, 7, -2)

const material = new THREE.PointsMaterial({ 
	color: 0x0ffff,
	transparent: true,
	size: 0.1,
	sizeAttenuation: true,
	map: new THREE.TextureLoader().load(`${BASE_URL}images/textures/ps_smoke.png`)
})

const geometry = new THREE.SphereGeometry(5, 100, 100)
const pointCloud = new THREE.Points(geometry, material)
scene.add(pointCloud)

// 环境光
const ambientLight = new THREE.AmbientLight(0x404040, 0.75)
scene.add(ambientLight)


// 4. 创建渲染器renderer并设置尺寸
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 5. 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.autoRotate = true

// 创建网格辅助器
// const gridHelper = new THREE.GridHelper( 10, 10 );
// const axesHelper = new THREE.AxesHelper(5);
// scene.add( gridHelper );
// scene.add( axesHelper );

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
})
const guiParams = {
	scale: 1,
	implode: false,
	explode,
}
const gui = new GUI()
gui.add(guiParams, 'implode')
gui.add(guiParams, 'scale', 1, 10).onChange(val => {
	console.log(guiParams.scale, val);
})
gui.add(guiParams, 'explode')

function	explode()	{
	const	dir	= !guiParams.implode ?	1	:	-1;
	const positionAttr = geometry.attributes.position;
	const normalAttr = geometry.attributes.normal;
	for (let i = 0; i < positionAttr.count; i++) {
		// @ts-ignore
		positionAttr.setXYZ(
			i, 
			// @ts-ignore
			positionAttr.getX(i) + normalAttr.getX(i) * Math.random() * guiParams.scale * dir,
			// @ts-ignore
			positionAttr.getY(i) + normalAttr.getY(i) * Math.random() * guiParams.scale * dir,
			// @ts-ignore
			positionAttr.getZ(i) + normalAttr.getZ(i) * Math.random() * guiParams.scale * dir,
		);
		// ts:enable
	}
	geometry.attributes.position.needsUpdate = true;
}

explode()

function animate() {
	// 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update() 
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}
animate();
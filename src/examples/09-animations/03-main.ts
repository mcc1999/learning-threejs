import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

/**
 * 目标：简单的规则物体碰撞检测Box3/Sphere/Plane
 * - containsPoint： 检测碰撞体的每个顶点
 * - intersectsBox、intersectsSphere 、intersectsPlane
 * -其他方法：rayCaster-碰撞体中心点到碰撞体每个顶点的射线是否有与另一个碰撞体相交
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xf0f0f0 );
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 30, 0)

// 创建5个2 * 2 * 2的cube，使得四个cube围绕在一个cube四周
function createCube(x: number, y: number, z: number, color: THREE.ColorRepresentation) {
	const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
	const cubeMaterial = new THREE.MeshLambertMaterial({ color, transparent: true, opacity: 1 })
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
	cube.position.set(x, y, z)
	scene.add(cube)

	return cube
}
const cubes = [createCube(4, 0, 0, 0xff0000), createCube(-4, 0, 0, 0x00ff00), createCube(0, 0, 4, 0x0000ff), createCube(0, 0, -4, 0xffff00)]
const centerCube = createCube(0, 0, 0, 0xffffff)

function detectCollision() {
	const boxBoundingBoxes = cubes.map(cube => {
		const boundBox = new THREE.Box3()
		boundBox.setFromObject(cube)
		return boundBox
	})

	const centerCubeBoundingBox = new THREE.Box3()
	centerCubeBoundingBox.setFromObject(centerCube)

	boxBoundingBoxes.forEach((boundBox, index) => {
		if(boundBox.intersectsBox(centerCubeBoundingBox)) {
			console.log('collision detect!');
			
			cubes[index].material.opacity = 0.5
		}else{
			cubes[index].material.opacity = 1
		}
	})
}

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.75)
scene.add(ambientLight)

// 4. 创建渲染器renderer并设置尺寸
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

// 5. 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
// controls.autoRotate = true

// 创建网格辅助器
const gridHelper = new THREE.GridHelper( 20, 10 );
// const axesHelper = new THREE.AxesHelper(5);
scene.add( gridHelper );
// scene.add( axesHelper );

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
})

document.addEventListener('keydown', (e) => {
	if(e.key === 'ArrowUp') {
		centerCube.position.z -= 0.5
	}else if(e.key === 'ArrowDown'){
		centerCube.position.z += 0.5
	}else if(e.key === 'ArrowLeft'){
		centerCube.position.x -= 0.5
	}else if(e.key === 'ArrowRight'){
		centerCube.position.x += 0.5
	}
})

function animate() {
	detectCollision()
	// 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update() 
  renderer.render(scene, camera);
	requestAnimationFrame( animate );
}
animate();

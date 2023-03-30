import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

/**
 * 目标：平行光阴影属性
 * - radius：模糊阴影的边缘
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(3, 2, 4)

// 创建loader管理器
const loaderManager = new THREE.LoadingManager();
loaderManager.onStart = () => {
	console.log( 'Started loading files.' );
}
loaderManager.onProgress = (url, itemsLoaded, itemsTotal) => {
	console.log(`Url：${url}`);
	console.log(`Progress：${itemsLoaded} / ${itemsTotal}.`);
	
}
loaderManager.onLoad = () => {
	console.log('ALL Loaded');
}
loaderManager.onError = (url) => {
	console.log( 'There was an error loading ' + url );
}

// 2.创建几何体
const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100)
const planeGeometry = new THREE.PlaneGeometry(8, 8) 
const sphereGeometry = new THREE.SphereGeometry(0.5, 100, 100)

const material = new THREE.MeshStandardMaterial({
	metalness: 0.6,
	roughness: 0.1,
})
const planeMaterial = new THREE.MeshStandardMaterial({
	color: 0xe0e0e0
})

const cube = new THREE.Mesh(boxGeometry, material)
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
const sphere = new THREE.Mesh(sphereGeometry, material)
cube.position.set(0, 0.5, 0)
sphere.position.set(3, 0.5, 0)
plane.position.set(0, 0, 0)
plane.lookAt(new THREE.Vector3(0, 1, 0))
// 阴影
cube.castShadow = true
sphere.castShadow = true
plane.receiveShadow = true

scene.add(cube)
scene.add(plane)
scene.add(sphere)

// PBR没有灯光，就没有反射都是黑色，所以需要添加灯光
// 环境光
const ambientLight = new THREE.AmbientLight(0x404040, 0.75)
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff)
directionalLight.position.set(5, 5, 5)
directionalLight.castShadow = true
directionalLight.shadow.radius = 10
directionalLight.shadow.mapSize = new THREE.Vector2(2048, 1024)
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 500
directionalLight.shadow.camera.top = 5
directionalLight.shadow.camera.right = 5.0
directionalLight.shadow.camera.bottom = -5
directionalLight.shadow.camera.left = -5

scene.add( directionalLight )
scene.add(ambientLight)

// 3. 创建网格辅助器
const gridHelper = new THREE.GridHelper( 10, 10 );
const axesHelper = new THREE.AxesHelper(5);
scene.add( gridHelper );
scene.add( axesHelper );

// 4. 创建渲染器renderer并设置尺寸
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// 开启renderer shadowMap
renderer.shadowMap.enabled = true
document.body.appendChild( renderer.domElement );

// 5. 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

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

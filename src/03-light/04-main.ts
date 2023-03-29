import { GUI } from 'dat.gui';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

/**
 * 目标：光源-电光源
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
const planeGeometry = new THREE.PlaneGeometry(50, 50) 
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
// 聚光灯
const pointLight = new THREE.PointLight(0x00ff00)
pointLight.castShadow = true
pointLight.decay = 0

// 把点光源和小球绑定在一起
const ball = new THREE.Mesh(
	new THREE.SphereGeometry(0.05, 100, 100),
	new THREE.MeshBasicMaterial({color: 0x00ff00})
)
const pointLightGroup = new THREE.Group()
pointLightGroup.add(pointLight)
pointLightGroup.add(ball)
pointLightGroup.position.set(1,2,1)

scene.add(pointLightGroup)
scene.add(ambientLight)
const gui = new GUI()
// @ts-ignore
gui.add(cube.position, 'x', -5, 5, 0.1).name('cube-x')
// @ts-ignore
gui.add(pointLight, 'distance', 0, 50, 0.1).name('distance')
// @ts-ignore
gui.add(pointLight, 'decay', 0, 2, 0.01).name('decay')

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
renderer.physicallyCorrectLights = true
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

const clock = new THREE.Clock()

function animate() {
	const time = clock.getElapsedTime()
	pointLightGroup.position.x = Math.sin(time) * 2
	pointLightGroup.position.z = Math.cos(time) * 2
	// 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update() 
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}
animate();

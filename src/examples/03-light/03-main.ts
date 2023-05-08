import { GUI } from 'dat.gui';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

/**
 * 目标：光源-聚光灯
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
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(5, 5, 5)
spotLight.castShadow = true
spotLight.shadow.radius = 10
spotLight.shadow.mapSize = new THREE.Vector2(2048, 4096)
// 聚光灯照亮区域跟随cube移动
// 若想照亮任意坐标区域：创建THREE.Object3D对象，将其位置设定为想要照亮区域，target设为改对象即可
spotLight.target = cube
spotLight.angle = Math.PI / 6
spotLight.distance = 0
spotLight.penumbra = 0
// 需要将renderer.physicallyCorrectLights 设为true
spotLight.decay = 0

scene.add(spotLight)
scene.add(ambientLight)
const gui = new GUI()
// @ts-ignore
gui.add(cube.position, 'x', -5, 5, 0.1).name('cube-x')
// @ts-ignore
gui.add(spotLight, 'angle', 0, Math.PI / 2, 0.01).name('angle')
// @ts-ignore
gui.add(spotLight, 'distance', 0, 50, 0.1).name('distance')
// @ts-ignore
gui.add(spotLight, 'penumbra', 0, 1, 0.1).name('penumbra')
// @ts-ignore
gui.add(spotLight, 'decay', 0, 2, 0.01).name('decay')

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

function animate() {
	// 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update() 
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}
animate();

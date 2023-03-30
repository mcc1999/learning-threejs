import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

/**
 * 目标：纹理加载进度
 * LoadingManager-onStart、onProgress、onLoad、onError
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 1, 2)

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
const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 200, 200, 200)
const texture = new THREE.TextureLoader(loaderManager).load(`${BASE_URL}images/textures/door/door.jpg`);
const alphaTexture = new THREE.TextureLoader(loaderManager).load(`${BASE_URL}images/textures/door/alpha.jpg`);
const aoTexture = new THREE.TextureLoader(loaderManager).load(`${BASE_URL}images/textures/door/ambientOcclusion.jpg`)
const displacementTexture = new THREE.TextureLoader(loaderManager).load(`${BASE_URL}images/textures/door/height.jpg`)
const roughnessTexture = new THREE.TextureLoader(loaderManager).load(`${BASE_URL}images/textures/door/roughness.jpg`)
const metalnessTexture = new THREE.TextureLoader(loaderManager).load(`${BASE_URL}images/textures/door/metalness.jpg`)
const normalTexture = new THREE.TextureLoader(loaderManager).load(`${BASE_URL}images/textures/door/normal.jpg`)

const material = new THREE.MeshStandardMaterial({ 
	map: texture,
	alphaMap: alphaTexture,
	transparent: true,
	aoMap: aoTexture,
	aoMapIntensity: 0.8,
	displacementMap: displacementTexture,
	displacementScale: 0.05,
	roughness: 1, // 0.0表示平滑的镜面反射，1.0表示完全漫反射。默认值为1.0。应用于整个几何体
	roughnessMap: roughnessTexture,
	metalness: 1,
	metalnessMap: metalnessTexture,
	normalMap: normalTexture,
	side: THREE.DoubleSide
})
// aoMap需要第二组uv
// @ts-ignore
boxGeometry.setAttribute('uv2', new THREE.BufferAttribute(boxGeometry.attributes.uv.array, 2))
const mesh = new THREE.Mesh(boxGeometry, material)
scene.add(mesh)

// PBR没有灯光，就没有反射都是黑色，所以需要添加灯光
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 )
scene.add( ambientLight )

const directionalLight = new THREE.DirectionalLight(0xffffff)
directionalLight.position.set(5, 5, 5)
scene.add( directionalLight )

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

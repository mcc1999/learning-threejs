import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

/**
 * 目标：环境贴图
 * - 环境贴图是一种特殊的纹理，用于模拟一个物体周围的环境光照。
 * 	 环境贴图通常是一个立方体贴图（CubeMap），由六个面组成，
 *   分别是前（positive Z）、后（negative Z）、上（positive Y）、下（negative Y）、左（negative X）、右（positive X）。
 * - cubeTextureLoader
 * - envMap
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(2, 1, 2)

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
// 纹理
const cubeTexture = new THREE.CubeTextureLoader(loaderManager).load([
	'./public/images/textures/environmentMaps/2/px.jpg',
	'./public/images/textures/environmentMaps/2/nx.jpg',
	'./public/images/textures/environmentMaps/2/py.jpg',
	'./public/images/textures/environmentMaps/2/ny.jpg',
	'./public/images/textures/environmentMaps/2/pz.jpg',
	'./public/images/textures/environmentMaps/2/nz.jpg',
])
const material = new THREE.MeshStandardMaterial({
	envMap: cubeTexture,
	metalness: 0.7,
	roughness: 0.05,
	side: THREE.FrontSide,
})
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

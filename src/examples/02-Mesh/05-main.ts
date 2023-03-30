import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

/**
 * 目标：几何体材质/纹理基本属性：offset、rotation、repeat
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(8, 4, 8)

// 2.创建几何体
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const texture = new THREE.TextureLoader().load(`${BASE_URL}images/door.jpeg`);
// 纹理位移offset
texture.offset.set(0.5, 0)
// 纹理旋转
texture.rotation = Math.PI / 2
texture.center.set(0.5, 0.5)
// 纹理重复
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(2, 2)
const material = new THREE.MeshBasicMaterial({ map: texture })
const mesh = new THREE.Mesh(boxGeometry, material)
scene.add(mesh)

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

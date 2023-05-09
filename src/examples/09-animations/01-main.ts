import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { BASE_URL } from '../../consts'
import './style.css'

/**
 * 目标：3D动画模型-加载/播放
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xf0f0f0 );
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(300, 300, 300)

let mixer: THREE.AnimationMixer
const gltfLoader = new GLTFLoader()
gltfLoader.load(`${BASE_URL}models/Horse.glb`, (gltf) => {
	const mesh = gltf.scene.children[ 0 ];
	scene.add(mesh)
	console.log(gltf);
	

	const clips = gltf.animations
	mixer = new THREE.AnimationMixer(mesh)
	const action = mixer.clipAction(clips[0])
	action.setDuration(1).play()
})

const light1 = new THREE.DirectionalLight( 0xefefff, 5 );
light1.position.set( 1, 1, 1 ).normalize();
scene.add( light1 );

const light2 = new THREE.DirectionalLight( 0xffefef, 5 );
light2.position.set( - 1, - 1, - 1 ).normalize();
scene.add( light2 );


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
const gridHelper = new THREE.GridHelper( 1000, 10 );
// const axesHelper = new THREE.AxesHelper(5);
scene.add( gridHelper );
// scene.add( axesHelper );

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
})

const radius = 600;
let theta = 0;
const clock = new THREE.Clock(true);
function animate() {
	theta += 0.1;
	camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
	camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );

	camera.lookAt( 0, 150, 0 );
	if ( mixer ) {
		const dt = clock.getDelta();
		mixer.update(dt);
	}
	// 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update() 
  renderer.render(scene, camera);
	requestAnimationFrame( animate );
}
animate();

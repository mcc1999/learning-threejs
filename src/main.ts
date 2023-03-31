import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BASE_URL } from './consts'
import * as TWEEN from '@tweenjs/tween.js'
import './style.css'
import { GUI } from 'dat.gui'
/**
 * 目标：利用透视相机的filmGauge、filmOffset属性创建鱼眼镜头
*/
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 1100 );
camera.position.set(0, 600, 0);
camera.lookAt(new THREE.Vector3( 0, 600, 0 ))

const geometry = new THREE.SphereGeometry( 500, 60, 40 );
geometry.scale( -1, 1, 1 );
geometry.rotateY(-Math.PI / 2)

const texture = new THREE.TextureLoader().load(`${BASE_URL}images/textures/camera/dongman.png`)
const material = new THREE.MeshBasicMaterial({
		map: texture
});

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.sortObjects = false;
renderer.autoClear = false;
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);          
	
function animate() {
		render();
		requestAnimationFrame( ()=>{animate()});
}
function render() {
		//更新控制器
		controls.update();
		TWEEN.update()
		renderer.render(scene, camera);
}
animate()

const tween = new TWEEN.Tween( { lat : 0, y : camera.position.y, fov : camera.fov } )
.to( { lat: 90, y : 0, fov : 100 }, 2500 )
.delay(1000)
.easing(TWEEN.Easing.Cubic.InOut)
.onUpdate(function({lat, y ,fov}) {	
	let phi = Math.PI / 180 * lat;
	camera.lookAt(0, -500 * Math.cos( phi ), -500 * Math.sin( phi ));
	camera.position.y = y;
	camera.fov = fov;
	camera.updateProjectionMatrix();
})

const gui = new GUI()
const guiParams = {
	start: () => { camera.lookAt(0, 600, 0); tween.start() },
	position: camera.position
}
gui
gui.add(camera.position, 'y', 440, 1000, 10).name('cameraY').onChange(() => { camera.updateProjectionMatrix() })
gui.add(guiParams, 'start').name('run')
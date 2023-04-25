import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import './style.css'

/**
 * 目标：CSS3DRenderer,将层级的3D变换应用到DOM元素上
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(500, 500, 500)

// create html element like this'<div>' +
// '<h1>This is an H1 Element.</h1>' +
// '<span class="large">Hello Three.js cookbook</span>' +
// '<textarea> And this is a textarea</textarea>' +
// '</div>'
const element = document.createElement('div');
element.style.backgroundColor = new THREE.Color(Math.random()* 0xffffff).getStyle();
element.style.width = '640px';
element.style.height = '480px';
element.innerHTML = `<h1>This is an H1 Element.</h1>
<span>Hello Three.js cookbook</span>
<textarea> And this is a textarea</textarea>`

// 3. 创建网格辅助器
const gridHelper = new THREE.GridHelper( 10, 10 );
const axesHelper = new THREE.AxesHelper(5);
scene.add( gridHelper );
scene.add( axesHelper );

// 4. 创建渲染器renderer并设置尺寸
const renderer = new CSS3DRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const object = new CSS3DObject(element);

scene.add(object);

// 5. 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

window.addEventListener('resize', () => {
 camera.aspect = window.innerWidth / window.innerHeight
 camera.updateProjectionMatrix()

 renderer.setSize(window.innerWidth, window.innerHeight)
})

function animate() {
 // 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update() 
 renderer.render( scene, camera );
 requestAnimationFrame( animate );
}
animate();

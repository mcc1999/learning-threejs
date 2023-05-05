import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';
import './style.css'

/**
 * 目标：将物体的3D坐标position转化为屏幕上的2D坐标 && RayCaster可视化
 */ 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5, 1000);
camera.position.set(5, 10, 5);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

const guiParams = {
  'x': mesh.position.x,
  'y': mesh.position.y,
  'z': mesh.position.z,
  calculateScreenCoordinate: () => {
    const screenPosition = new THREE.Vector2();
    const worldPosition = new THREE.Vector3();

    // 获取场景中的对象的世界坐标
    mesh.getWorldPosition(worldPosition);

    // 将世界坐标转换为屏幕坐标
    /**
     * worldPosition.project(camera) 方法将一个 3D 坐标点投影到屏幕上时，得到的结果是一个 THREE.Vector3 对象，其 x 和 y 属性的值都在范围 [-1, 1] 之间。
     * 为了将投影结果转换为屏幕上的实际坐标值，我们需要对其进行一些调整和转换。具体而言，我们需要执行以下步骤：
     * 将 x 和 y 坐标值分别加 1，使其范围变为 [0, 2]。
     * 将 x 坐标值乘以窗口的宽度（window.innerWidth），y 坐标值乘以窗口的高度（window.innerHeight），以将其映射到屏幕上的实际位置。
     * 将 y 坐标值取反，以使其坐标轴方向与屏幕的坐标系相匹配。在 three.js 中，y 轴的正方向是向上的，而在屏幕上，y 轴的正方向是向下的。
     * 将 x 和 y 坐标值除以 2，使其范围变为 [0, 1]。这是因为在 three.js 中，坐标系范围通常是 [0, 1]，而不是实际的像素值。
     */
    worldPosition.project(camera);
    screenPosition.x = ((worldPosition.x + 1) / 2) * window.innerWidth;
    screenPosition.y = ((-worldPosition.y + 1) / 2) * window.innerHeight;
    console.log(screenPosition.x, screenPosition.y);
    console.log(worldPosition.x, worldPosition.y);
  }
}

const gui = new dat.GUI();
gui.add(guiParams, 'x', -10, 10, 1).onChange((v) => mesh.position.x = v);
gui.add(guiParams, 'y', -10, 10, 1).onChange((v) => mesh.position.y = v);
gui.add(guiParams, 'z', -10, 10, 1).onChange((v) => mesh.position.z = v);
gui.add(guiParams, 'calculateScreenCoordinate');

const raycaster = new THREE.Raycaster();
const raycasterTubeGeometry: THREE.Mesh[] = []
function onMouseClick( event: MouseEvent ) {  
  // 计算鼠标点击位置
  const mouse = new THREE.Vector2();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  // 射线投射到场景中的所有对象
  raycaster.setFromCamera( mouse, camera );
  const intersects = raycaster.intersectObjects( scene.children, true );  
  
  // 检查是否有对象与射线相交
  if ( intersects.length > 0) {        
    // 把RayCaster射线显示出来
    const	points	=	[];
    points.push(new	THREE.Vector3(camera.position.x,	camera.position.y	- 0,	camera.position.z));
    points.push(intersects[0].point);
    
    const	mat	=	new	THREE.MeshBasicMaterial({
        color:	0xff0000,
        // transparent:	true,
        // opacity:	0.6
    });
    const	tubeGeometry	=	new	THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 60,	0.01);
    const	tube	=	new	THREE.Mesh(tubeGeometry,	mat);
    raycasterTubeGeometry.push(tube)
    scene.add(tube);
  }
}
window.addEventListener( 'mousedown', onMouseClick, false );
window.addEventListener( 'mouseup', () => {
  raycasterTubeGeometry.forEach(item => scene.remove(item))
}, false );

// 创建环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 创建坐标轴辅助器
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(100, 10);
scene.add(gridHelper);

// 创建OrbitControls对象
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.autoRotate = true;

function animate() {     
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()

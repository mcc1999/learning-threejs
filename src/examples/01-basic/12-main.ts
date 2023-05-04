import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'

/**
 * 目标：keyboard控制
 * - keypress事件只触发字符键，不触发功能键，且大小写敏感
 * - keydown按下不松会一直触发
 * - keyup无法阻止默认行为, 在press时已完成文字输入但屏幕未显示
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({wireframe: true})
);
scene.add(cube);

// 创建坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建轨道控制器并开启阻尼
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}  

animate()

function setupKeyControls() {
  document.onkeydown	=	function(e)	{
  	switch	(e.keyCode)	{
      case	37:
        cube.rotation.x	+=	0.1;
        break;
      case	38:
        cube.rotation.z	-=	0.1;
        break;
      case	39:
        cube.rotation.x	-=	0.1;
        break;
      case	40:
        cube.rotation.z	+=	0.1;
        break;
      default:
        break;
    }
  }
}

setupKeyControls()
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';
import { BASE_URL } from '../../consts';
import './style.css'

/**
 * 目标：Material贴图bumpMap和DisplacementMap的区别
 * - 同：两者都需要较大的Segments才有明显的效果
 * - 异：bumpMap只改变光照的反射情况以产生表面凹凸效果，所以需要直射光，环境光效果不明显
 *      displacementMap会改变物体定点位置，使得物体变形
 * 
 * - normalMap以彩色RGB图来影响曲面法线，并改变光线照亮方式
 * - bumpMap以灰度图来影响对光照的感知深度
 */ 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5, 1000);
camera.position.set(0, 0, 10);

const geometry = new THREE.PlaneGeometry(5, 5, 50, 50);
const geometryBump = new THREE.PlaneGeometry(5, 5, 50, 50);

const materialMap = new THREE.TextureLoader().load(`${BASE_URL}images/textures/brickWall/Brick.jpg`)
const materialBumpMap = new THREE.TextureLoader().load(`${BASE_URL}images/textures/brickWall/Brick-bump-map.jpg`)
const materialDisplacementMap = new THREE.TextureLoader().load(`${BASE_URL}images/textures/brickWall/Brick-bump-map.jpg`)
const material = new THREE.MeshPhongMaterial({ 
  map: materialMap,
}); 
const materialBump = new THREE.MeshPhongMaterial({ 
  map: materialMap,
  displacementMap:  materialBumpMap,
  bumpScale: 0.1
}); 
const meshBump = new THREE.Mesh(geometryBump, materialBump);
meshBump.position.set(6, 0, 0);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
scene.add(meshBump);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

const guiParams = {
  bumpMap: () => {
    console.log('bumpMap');
    mesh.material.bumpMap = materialBumpMap;
    mesh.material.displacementMap = null;
    mesh.material.needsUpdate = true;
  },
  displacementMap: () => {
    console.log('displacementMap');
    mesh.material.displacementMap = materialDisplacementMap;
    mesh.material.bumpMap = null;
    mesh.material.needsUpdate = true;
  },
}

const gui = new dat.GUI();
gui.add(guiParams, 'bumpMap');
gui.add(guiParams, 'displacementMap');
// @ts-ignore
gui.add(mesh.material, 'bumpScale', 0, 1).onChange(()=>mesh.material.needsUpdate = true)
// @ts-ignore
gui.add(mesh.material, 'displacementScale', 0, 1).onChange(()=>mesh.material.needsUpdate = true)

// 创建环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
scene.add(ambientLight);
// 直射光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight)

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

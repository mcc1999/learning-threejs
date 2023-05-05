import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'

/**
 * 目标：Material贴图-每个面不一样的颜色
 */ 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5, 10000);
camera.position.set(0, 0, 1500);

const geometry1 = new THREE.IcosahedronGeometry( 500, 0 );
const materials = []
const colors = []
// 每个三角形面渐变色
// for(let i = 0; i < geometry1.attributes.position.count; i++) {
//   const color = new THREE.Color(Math.random(),  Math.random(), Math.random());
//   const material = new THREE.MeshBasicMaterial({color: new THREE.Color(Math.random(),  Math.random(), Math.random()), transparent: true, opacity: Math.random()}); 
//   materials.push(material);
//   colors.push(...color);
// }
// 三个顶点颜色一样，三角形面颜色就不是渐变，而是单独一个色
for(let i = 0; i < geometry1.attributes.position.count / 3; i++) {
  const color = new THREE.Color(Math.random(),  Math.random(), Math.random());
  const material = new THREE.MeshBasicMaterial({color: new THREE.Color(Math.random(),  Math.random(), Math.random()), transparent: true, opacity: Math.random()}); 
  materials.push(material);
  colors.push(...color);
  colors.push(...color);
  colors.push(...color);
}
const basicMaterial = new THREE.MeshBasicMaterial({vertexColors: true});
const mesh = new THREE.Mesh(geometry1, basicMaterial);
scene.add(mesh);

geometry1.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// 创建环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
scene.add(ambientLight);
// 直射光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1000, 0);
scene.add(directionalLight)

// 创建坐标轴辅助器
// const axesHelper = new THREE.AxesHelper(1000);
// scene.add(axesHelper);
// const gridHelper = new THREE.GridHelper(2000, 20);
// scene.add(gridHelper);

// 创建OrbitControls对象
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;

function animate() {     
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BASE_URL } from '../../consts';
import './style.css'

/**
 * 目标：Material贴图-cubemap for skybox && dynamic cubemap
 */ 

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5, 10000);
camera.position.set(0, 0, 500);
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { minFilter: THREE.LinearMipmapLinearFilter, generateMipmaps: true } );
const cubeCamera = new THREE.CubeCamera(5, 10000, cubeRenderTarget);
scene.add(cubeCamera)

const geometry = new THREE.BoxGeometry( 100, 100, 100, 100, 100, 100 );
const sphereGeometry = new THREE.SphereGeometry( 100, 100, 100 );
const envTexture = new THREE.CubeTextureLoader().setPath(`${BASE_URL}images/textures/environmentMaps/car/`).load([
  `px.png`,
  `nx.png`,
  `py.png`,
  `ny.png`,
  `pz.png`,
  `nz.png`,
])

const standardMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.05,
  metalness: 0.9,
});
const cubeCameraMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.05,
  metalness: 0.9,
  envMap: cubeCamera.renderTarget.texture,
});
const box1 = new THREE.Mesh(sphereGeometry, cubeCameraMaterial);
const box2 = new THREE.Mesh(geometry, standardMaterial);
box2.position.x = 300
scene.add(box1);
scene.add(box2);
scene.background = envTexture
scene.environment = envTexture

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
// 点光源
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(200, 200, 200);
scene.add(pointLight);

// 创建坐标轴辅助器
// const axesHelper = new THREE.AxesHelper(1000);
// scene.add(axesHelper);
// const gridHelper = new THREE.GridHelper(2000, 20);
// scene.add(gridHelper);

// 创建OrbitControls对象
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {     
  cubeCamera.position.copy( box1.position)
  cubeCamera.update( renderer, scene );

  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()

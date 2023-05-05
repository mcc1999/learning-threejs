import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BASE_URL } from '../../consts';
import { createTextGeometry } from '../../utils';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils.js';
import './style.css'

/**
 * 目标：Material贴图-VideoTexture && 同时使用多种材质
 */ 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5, 10000);
camera.position.set(0, 0, 1500);

const video = document.createElement('video');
video.loop = true;
video.width = 750;
video.height = 750;
video.src =  `${BASE_URL}medias/video/LoveStory.mp4`;
// document.body.appendChild(video);
let videoLoaded = false
video.onloadeddata = () => {
  videoLoaded = true;
}

const groupTV = new THREE.Group();
scene.add(groupTV);
const geometry1 = new THREE.CylinderGeometry(300, 500, 500, 4, 5);
const material = new THREE.MeshBasicMaterial({color: 0xa9a9a9}); 
const material2 = new THREE.MeshBasicMaterial({wireframe: true}); 
// const part1 = new THREE.Mesh(geometry1, [material, material2]);
const part1 = createMultiMaterialObject(geometry1, [material, material2]);
const geometry2 = new THREE.BoxGeometry(1000, 750, 50);
const part2 = new THREE.Mesh(geometry2, material);
const geometry3 = new THREE.PlaneGeometry(960, 540, 50);
const videoTexture = new THREE.VideoTexture(video)
const videoMaterial = new THREE.MeshStandardMaterial({map: videoTexture})
const part3 = new THREE.Mesh(geometry3, videoMaterial);
part1.position.set(0, 0, -250)
part2.position.set(0, 0, 25)
part3.position.set(0, 0, 51)
part1.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI * 3 / 2)
part1.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 4)
groupTV.add(part1);
groupTV.add(part2);
groupTV.add(part3);

createTextGeometry({
  text: 'Play',
  textMaterialParameter: {
    color: 0xff0000,
  },
  textGeometryParameter: {
    size: 64,
  }
}).then(playBtn => {
  playBtn.name = 'play'
  playBtn.position.set(-380, 320, 51)
  groupTV.add(playBtn);
})
const raycaster = new THREE.Raycaster();
document.addEventListener('click', (event) => {
  const mouse = new THREE.Vector2();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  
  raycaster.setFromCamera( mouse, camera );
  const intersects = raycaster.intersectObjects( groupTV.children, true );  
  
  if (intersects.length && videoLoaded && intersects.some(i => i.object.name === 'play')) {
    video.play();
  }
})

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
scene.add(directionalLight)

// 创建坐标轴辅助器
// const axesHelper = new THREE.AxesHelper(1000);
// scene.add(axesHelper);
// const gridHelper = new THREE.GridHelper(2000, 2000);
// scene.add(gridHelper);

// 创建OrbitControls对象
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;

function animate() {     
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
  if(videoLoaded){
    videoTexture.needsUpdate	=	true;
  }
}  

animate()

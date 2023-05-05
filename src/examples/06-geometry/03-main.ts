import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BASE_URL } from '../../consts';
import './style.css'

/**
 * 目标：根据高度图（灰度位图）生成几何体Geometry（待优化）
 * - 高度图实际上就是一个2维数组，地形实际上就是一系列高度不同的网格
 * - 这样数组中每个元素的索引值刚好可以用来定位不用的网格（x,y），而所储存的值就是网格的高度（z）。
 * - 因此对于高度（z），地形中最低点将用0表示，而最高点使用255表示
 * - 使用2维数组的另一个好处就是我们高度图刚好可以用一张灰度位图（gray-scale bitmap）来表示
 * - 对于位图中的每个像素来说，同样使用0~~255之间的值来表示一个灰度。
 * - 这样，我们又能把不同的灰度映射为高度，并且用像素索引表示不同网格。
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(300, 300, 300);

const	width = 100;
const	height = 100;
const	canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;
const	img = new	Image();
img.src = `${BASE_URL}images/grandcanyon_small.png`

img.onload = () => {
  console.log('img loaded');
  const data = new Uint8Array(width * height * 4)
  canvas.width = width;
  canvas.height = height;
  
  const context = canvas.getContext('2d');
  context!.drawImage(img, 0, 0, width, height);
  const imgData = context!.getImageData(0, 0, width, height);
  console.log('imgData.data', imgData.data);
  data.set(imgData.data);
  let pixelSeq = 0;
  
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  
  console.log(data.length);
  const group = new THREE.Group();
  
  for (let j = 0, l = data.length; j < l; j += 4) {
    const height = (data[pixelSeq * 4] / 255) * 255; // 最大高度限制为100
    const geometry = new THREE.BoxGeometry(1, height, 1);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(pixelSeq % width, height, Math.floor(pixelSeq / width));    
    group.add(mesh);
    pixelSeq++;
  }
  scene.add(group)
}


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

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

function animate() { 
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()
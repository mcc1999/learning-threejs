import * as THREE from 'three';
import { BASE_URL } from './consts';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'
import { createTextGeometry } from './utils';

/**
 * 目标：音频AudioLoader
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
const backgroundLoader = new THREE.TextureLoader();
backgroundLoader.load(`${BASE_URL}images/sunnyDay.jpeg`, texture => {
  scene.background = texture
})

const startGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 3)
const material = new THREE.MeshBasicMaterial({ color: 0xff9900 });
const pauseGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 4)
const loadingGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 4)
const ringGeometry = new THREE.TorusGeometry(2.5, 0.5, 50);
const ringMesh = new THREE.Mesh(ringGeometry, material);
const pauseMesh = new THREE.Mesh(pauseGeometry, material);
const startMesh  = new THREE.Mesh(startGeometry, material);
const loadingMesh = new THREE.Mesh(loadingGeometry, material);
startMesh.lookAt(0, 1, 0)
startMesh.rotateY(Math.PI / 2)
pauseMesh.lookAt(0, 1, 0)
pauseMesh.rotateY(Math.PI / 4)
loadingMesh.rotateY(Math.PI / 4)
loadingMesh.position.x = -1
const btnGroup = new THREE.Group();
btnGroup.add(loadingMesh);
btnGroup.add(ringMesh);
scene.add(btnGroup)

const tips = await createTextGeometry({
	text: 'Click to Play/Pause Music',
	textGeometryParameter: {
		size: 1.5,
		height: 0.5,
	},
	textMaterialParameter: {
		color: 0xff9900
	}
})
const songName = await createTextGeometry({
	text: '《晴天》',
  isChinese: true,
	textGeometryParameter: {
		size: 1.5,
		height: 0.5,
	},
	textMaterialParameter: {
		color: 0xff9900
	}
})
tips.position.y = -5
songName.position.y = 5
scene.add(tips)
scene.add(songName)

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const loader = new THREE.AudioLoader();
let audioLoaded = false;
const audioListener = new THREE.AudioListener();
camera.add(audioListener);
const audioSound = new THREE.Audio( audioListener );
loader.load(`${BASE_URL}medias/audio/sunnyDay.mp3`, (buffer) => {
  audioSound.setBuffer(buffer);
  audioSound.setLoop(true);
  audioSound.setVolume(0.5);
  audioLoaded = true;
  btnGroup.remove(loadingMesh);
  btnGroup.add(startMesh);
})

const raycaster = new THREE.Raycaster();
function onMouseClick( event: MouseEvent ) {
  // 计算鼠标点击位置
  var mouse = new THREE.Vector2();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  // 射线投射到场景中的所有对象
  raycaster.setFromCamera( mouse, camera );
  const intersects = raycaster.intersectObjects( btnGroup.children, true );  
  
  // 检查是否有对象与射线相交
  if ( intersects.length > 0 && audioLoaded && btnGroup.children.includes(intersects[0].object)) {    
    // 处理点击事件, intersects[0].object 是被点击的 Mesh 对象
    if(audioSound.isPlaying){
      console.log('pause');      
      audioSound.pause();
      btnGroup.add(startMesh);
      btnGroup.remove(pauseMesh);
    } else{
        console.log('play');
        audioSound.play();
        btnGroup.remove(startMesh);
        btnGroup.add(pauseMesh);      
    }
  }
}
window.addEventListener( 'click', onMouseClick, false );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// 创建OrbitControls对象
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();
let time = 0;
function animate() {
  // loadingMesh position
  if(!audioLoaded){
    const deltaTime = clock.getDelta();
    // 更新时间总量
    time += deltaTime;

    // 每0.5秒更新一次位置
    if (time > 0.15) {      
      // 计算新的position.x值
      loadingMesh.position.x = loadingMesh.position.x >= 1 ? -1 : loadingMesh.position.x + 1 ;
      // 重置时间总量
      time = 0;
    }
  }

  // tips rotation
  tips.rotateY(0.01) 
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()
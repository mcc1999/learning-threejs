import * as THREE from 'three'
import dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BASE_URL } from '../../consts';
import './style.css'

/**
 * 目标：音乐可视化
 * - 参考链接：[Web Audio API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API)
*/

// Variables
const ffSize = 256

// Audio
const audioListener = new THREE.AudioListener()
const audio = new THREE.Audio(audioListener)
const audioLoader = new THREE.AudioLoader()
audioLoader.load(`${BASE_URL}medias/audio/sunnyDay.mp3`, audioBuffer => {
  audio.setBuffer(audioBuffer)
  audio.setLoop(true)
  audio.setVolume(0.5)
})
const audioAnalyser = new THREE.AudioAnalyser(audio, ffSize)
const bufferLength = audioAnalyser.analyser.frequencyBinCount

// Scene && Camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f0f0f)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.set(0, 200, 2000)

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;

// Helpers
// const gridHelper = new THREE.GridHelper( 10, 10 );
// const axesHelper = new THREE.AxesHelper(1000);
// scene.add( gridHelper );
// scene.add( axesHelper );

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
// controls.autoRotate = true

// Objects
// geometry
const geometry = new THREE.BoxGeometry(10, 40, 40, 10, 40, 40)

// material
const material = new THREE.MeshBasicMaterial({
  color: 'yellowgreen'
})

// audioGroup
const audioBarGroup = new THREE.Group()
scene.add(audioBarGroup)
let posX = - bufferLength * 40 / 3
for (let i = 0; i < bufferLength; i++) {
  const cube = new THREE.Mesh(geometry, material)
  cube.castShadow = true
  cube.position.x = posX
  posX += 30
  audioBarGroup.add(cube)
}

// floor
const floorGeometry = new THREE.PlaneGeometry(3500, 2000)
const floorMaterial = new THREE.MeshStandardMaterial({
  color: '#ffffff', 
  side: THREE.DoubleSide,
})
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.receiveShadow = true
floor.lookAt(0, 1, 0)
floor.position.y = -500
scene.add(floor)

// Light
const spotLight = new THREE.SpotLight(0xffffff, 1)
spotLight.position.set(-2000, 2000, 1000)
spotLight.distance = 10000
spotLight.castShadow = true
scene.add(spotLight)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.25)
scene.add(ambientLight)

// Window ReSize
window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
})

// GUI
const gui = new dat.GUI()
const guiParams = {
  color: '#9ACD32',
  audio : {
    volume: 0.5,
    loop: false,
    play: () => {
      if (audio.isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
    },
  }
}
gui.addColor(guiParams, 'color').onChange(color => material.color = new THREE.Color(color))
const audioFolder = gui.addFolder('audio')
audioFolder.add(guiParams.audio, 'volume', 0, 1, 0.1).name('Volume').onChange(volume => audio.setVolume(volume))
audioFolder.add(guiParams.audio, 'loop').name('Loop').onChange(loop => audio.setLoop(loop))
audioFolder.add(guiParams.audio, 'play').name('Play/Pause')
audioFolder.open()

// Animations
const animate = () => {
  const dataArray = audioAnalyser.getFrequencyData()
  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i] / 10
    audioBarGroup.children[i].scale.y = barHeight
  }
	controls.update()
	renderer.render(scene, camera)
	requestAnimationFrame(animate)
}
animate();

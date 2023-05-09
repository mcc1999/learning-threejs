import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CannonDebugger from 'cannon-es-debugger';
import './style.css'

/**
 * 目标：物理引擎cannon-es
*/

// Scene && Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(10, 10, 10)

//GUI
const gui = new dat.GUI()
const guiParams = {
  drop: () => {
    sphereBody.position = new CANNON.Vec3(0, 10, 0)
  },
  CannonDebugger: false,
}
gui.add(guiParams, 'drop')

// Shadow

// Light
const directionLight = new THREE.DirectionalLight()
directionLight.castShadow = true
directionLight.position.set(5, 5, 6)
const ambientLight = new THREE.AmbientLight(new THREE.Color('#ffffff'), 0.3)
scene.add(ambientLight, directionLight)

// Renderer
// 4. 创建渲染器renderer并设置尺寸
const renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;

// Helpers
// const gridHelper = new THREE.GridHelper( 10, 10 );
// const axesHelper = new THREE.AxesHelper(5);
// world.addBody( gridHelper );
// world.addBody( axesHelper );

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// Objects
// material
const material = new THREE.MeshStandardMaterial()

// sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), material)
sphere.position.setY(1)
sphere.castShadow = true
scene.add(sphere)

// plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(15, 15), material)
plane.rotateX(-Math.PI / 2)
plane.receiveShadow = true
scene.add(plane)

// Physics
const world = new CANNON.World({
	gravity: new CANNON.Vec3(0, -9.82, 0),
});

const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
  friction: 0.8,
  restitution: 0.7,
})
world.addContactMaterial(defaultContactMaterial)

const sphereShape = new CANNON.Sphere(1)
const sphereBody = new CANNON.Body({
  mass: 1,
  position: new CANNON.Vec3(0, 4, 0),
  shape: sphereShape,
  material: defaultMaterial,
})
world.addBody(sphereBody)

// Ground
const groundShape = new CANNON.Plane()
const groundBody = new CANNON.Body({
	type: CANNON.Body.STATIC,
	shape: groundShape,
	material: defaultMaterial,
})
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
world.addBody(groundBody)


// CannonDebugger
const cannonMeshes: THREE.Mesh[] = []
const cannonDebugger = CannonDebugger(scene, world, {
  onInit(body, mesh) {
    mesh.visible = false
    cannonMeshes.push(mesh)
  },
})
gui.add(guiParams, 'CannonDebugger').name('CannonDebugger mesh visible').onChange((value: boolean) => {
  if (value) {
    cannonMeshes.forEach((item) => {
      item.visible = true
    })
  } else {
    cannonMeshes.forEach((item) => {
      item.visible = false
    })
  }
})


window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
})

// Animations
const animate = () => {
	controls.update()
	world.fixedStep()
	cannonDebugger.update()

	// @ts-ignore
	sphere.position.copy(sphereBody.position)
	// @ts-ignore
	sphere.quaternion.copy(sphereBody.quaternion)

	// Render
	renderer.render(scene, camera)
	requestAnimationFrame(animate)
}
animate();

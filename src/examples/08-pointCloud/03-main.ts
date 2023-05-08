import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

/**
 * 目标：点云-自定义点云vertex shader && fragment shader
*/

// 自定义顶点着色器代码
const vertexShader = `
  attribute float customSize;
  attribute vec3 customColor;
  attribute float customOpacity;

  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
    gl_PointSize = customSize * (300.0 / length(mvPosition.xyz));
    gl_Position = projectionMatrix * mvPosition;
    vColor = customColor;
    vOpacity = customOpacity;
  }
`;

// 自定义片元着色器代码
const fragmentShader = `
  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    gl_FragColor = vec4(vColor, vOpacity);
  }
`;

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(12, 7, -2)

const	x	=	100, y	=	100, pSize: number[] = [], pOpacity: number[] = []
const	geometry	=	new	THREE.BufferGeometry();
const vertices = [], colors = []
for	(let	i	=	0	;	i	<	x	;	i++)	{
	for	(let	j	=	0	;	j	<	y	;	j++)	{
		vertices.push(...[
			i	/	10, Math.sin(i/100	*	Math.PI*2)	+	Math.cos(j/100	*	Math.PI)	*	2, j	/	10
		]);
		colors.push(...[Math.random(), Math.random(), Math.random()])
		pSize.push(Math.random()*0.2)
		pOpacity.push(Math.random()/4+0.5)
	}
}
geometry.setAttribute('position',	new	THREE.Float32BufferAttribute(vertices, 3));
geometry.setAttribute('customColor',	new	THREE.Float32BufferAttribute(colors, 3));
geometry.setAttribute('customOpacity', new THREE.Float32BufferAttribute(pOpacity, 1));
geometry.setAttribute('customSize', new THREE.Float32BufferAttribute(pSize, 1)); 

const	material	=	new	THREE.ShaderMaterial({
	vertexShader,
	fragmentShader,
	transparent: true,
	vertexColors: true,
})

const pointCloud = new THREE.Points(geometry, material)
scene.add(pointCloud)

// 环境光
const ambientLight = new THREE.AmbientLight(0x404040, 0.75)
scene.add(ambientLight)


// 4. 创建渲染器renderer并设置尺寸
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 5. 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.autoRotate = true

// 创建网格辅助器
// const gridHelper = new THREE.GridHelper( 10, 10 );
// const axesHelper = new THREE.AxesHelper(5);
// scene.add( gridHelper );
// scene.add( axesHelper );

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
})

function animate() {
	// 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update() 
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}
animate();

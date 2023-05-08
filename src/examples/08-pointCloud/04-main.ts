import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BASE_URL } from '../../consts';
import './style.css'

/**
 * 目标：点云-单独改变某个点的位置
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(12, 7, -2)

const material = new THREE.PointsMaterial({ 
	vertexColors: true,
	transparent: true,
	size: 0.1,
	sizeAttenuation: true,
	map: new THREE.TextureLoader().load(`${BASE_URL}images/textures/ps_smoke.png`)
})

const	x	=	100;
const	y	=	100;
const	geometry	=	new	THREE.BufferGeometry();
const vertices = [], colors = []
for	(let	i	=	0	;	i	<	x	;	i++)	{
	for	(let	j	=	0	;	j	<	y	;	j++)	{
		vertices.push(...[
			i	/	10, Math.sin(i/100	*	Math.PI*2)	+	Math.cos(j/100	*	Math.PI)	*	2, j	/	10
		]);
		colors.push(...[Math.random(), Math.random(), Math.random()])
	}
}
geometry.setAttribute('position',	new	THREE.Float32BufferAttribute(vertices, 3));
geometry.setAttribute('color',	new	THREE.Float32BufferAttribute(colors, 3));

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

let cnt = 0
const colorArr = [[1, 0, 0], [1, 0.5, 0], [1, 1, 0], [0, 1, 0], [0, 1, 1], [0, 0, 1], [0.5, 0, 1]]
function animate() {
	if(cnt >= 2){
		// 获取属性数组
		const attribute = geometry.getAttribute('color');
		const [x, y, z] = colorArr[Math.floor(Math.random() * 7)]
		// 修改属性值
		for(let i = 0; i < attribute.count; i++) {
			// @ts-ignore
			attribute.setXYZ(i, x, y, z);  // index 为要修改的顶点索引，x、y、z 为新的位置值
		}
		// 标记属性已被修改
		attribute.needsUpdate = true;
		
		const attributePos = geometry.getAttribute('position')
		for(let i = 0; i < attributePos.count; i++) {
			const random = Math.random() > 0.5 ? Math.random() : - Math.random()
			// @ts-ignore
			attributePos.setXYZ(i, attributePos.getX(i) + random, attributePos.getY(i) + random, attributePos.getZ(i) + random); // index 为要修改的顶点索引，x、y、z 为新的位置值
		}
		attributePos.needsUpdate = true;

		cnt = 0
	}else{
		cnt += 0.01
	}
	// 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update() 
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}
animate();

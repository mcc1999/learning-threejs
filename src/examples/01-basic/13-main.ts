import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BASE_URL } from '../../consts';
import { GUI } from 'dat.gui';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import record from '../../utils/screenRecorder';
import './style.css'

/**
 * 目标：下载WebGL输出为图片/视频
 * - 创建WebGlRenderer时设置preserveDrawingBuffer为true，否则从canvas获取的图像是黑屏
*/

// 1.创建场景scene和摄像头camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(12, 7, -2)

const material = new THREE.PointsMaterial({ 
	color: 0x0ffff,
	transparent: true,
	size: 0.1,
	sizeAttenuation: true,
	map: new THREE.TextureLoader().load(`${BASE_URL}images/textures/ps_smoke.png`)
})

const geometry = new THREE.SphereGeometry(5, 100, 100)
const pointCloud = new THREE.Points(geometry, material)
scene.add(pointCloud)

// 环境光
const ambientLight = new THREE.AmbientLight(0x404040, 0.75)
scene.add(ambientLight)


// 4. 创建渲染器renderer并设置尺寸
const renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
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
const guiParams = {
	scale: 1,
	implode: false,
	explode,
	downLoadPic,
	recordTime: 5,
	downLoadVideo,
}
const gui = new GUI()
gui.add(guiParams, 'implode')
gui.add(guiParams, 'scale', 1, 10).onChange(val => {
	console.log(guiParams.scale, val);
})
gui.add(guiParams, 'explode')
gui.add(guiParams, 'downLoadPic')
gui.add(guiParams, 'recordTime', 1, 100, 1)
gui.add(guiParams, 'downLoadVideo')

function	explode()	{
	const	dir	= !guiParams.implode ?	1	:	-1;
	const positionAttr = geometry.attributes.position;
	const normalAttr = geometry.attributes.normal;
	for (let i = 0; i < positionAttr.count; i++) {
		// @ts-ignore
		positionAttr.setXYZ(
			i, 
			// @ts-ignore
			positionAttr.getX(i) + normalAttr.getX(i) * Math.random() * guiParams.scale * dir,
			// @ts-ignore
			positionAttr.getY(i) + normalAttr.getY(i) * Math.random() * guiParams.scale * dir,
			// @ts-ignore
			positionAttr.getZ(i) + normalAttr.getZ(i) * Math.random() * guiParams.scale * dir,
		);
		// ts:enable
	}
	geometry.attributes.position.needsUpdate = true;
}
function downLoadPic() {
	const imgData	=	renderer.domElement.toDataURL();
	const a = document.createElement('a');
	a.href = imgData;
	a.download = 'WebGl.png';
	a.click()

}
function downLoadVideo() {
	record({
		resolution: {
			width: renderer.domElement.width,
			height: renderer.domElement.height,
		},
		recordTime: guiParams.recordTime + 1
	})
}

explode()

// 创建一个5 * 5 * 5的cube
const cubeGeometry = new THREE.SphereGeometry(2, 2, 2)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

// 实例化效果合成器
const effectComposer = new EffectComposer(renderer);

// RenderPass通常位于过程链的开始，以便将渲染好的场景作为输入来提供给下一个后期处理步骤。
const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);

const vertexShader = `
	varying	vec2	texCoord;
	void	main()	{
		texCoord	=	uv;
		gl_Position	=	projectionMatrix	*	modelViewMatrix	*	vec4(	position,	1.0 );
	}
`
// sampler2D	tDiffuse是上一步effect的render输出
const fragmentShader = `
  uniform	sampler2D	tDiffuse;
	uniform	vec2	center;
	uniform	float	scale;
	uniform	vec2	texSize;
	varying	vec2	texCoord;
	void	main()	{
		vec2	tex	=	(texCoord	*	texSize	-	center)	/	scale;
		tex.y	/=	0.866025404;
		tex.x	-=	tex.y	*	0.5;
		vec2	a;
		if	(tex.x	+	tex.y	-	floor(tex.x)	-	floor(tex.y)	<	1.0)
		a	=	vec2(floor(tex.x),	floor(tex.y));
		else	a	=	vec2(ceil(tex.x),	ceil(tex.y));
		vec2	b	=	vec2(ceil(tex.x),	floor(tex.y));
		vec2	c	=	vec2(floor(tex.x),	ceil(tex.y));
		vec3	TEX	=	vec3(tex.x,	tex.y,	1.0	-	tex.x	-	tex.y);
		vec3	A	=	vec3(a.x,	a.y,	1.0	-	a.x	-	a.y);
		vec3	B	=	vec3(b.x,	b.y,	1.0	-	b.x	-	b.y);
		vec3	C	=	vec3(c.x,	c.y,	1.0	-	c.x	-	c.y);
		float	alen	=	length(TEX	-	A);
		float	blen	=	length(TEX	-	B);
		float	clen	=	length(TEX	-	C);
		vec2	choice;
		if	(alen	<	blen)	{
			if	(alen	<	clen)	choice	=	a;
			else	choice	=	c;
		}	else	{
			if	(blen	<	clen)	choice	=	b;
			else	choice	=	c;
		}
		choice.x	+=	choice.y	*	0.5;
		choice.y	*=	0.866025404;
		choice	*=	scale	/	texSize;
		gl_FragColor	=	texture2D(tDiffuse,	choice
				+	center	/	texSize);
	}
`

const	customShader	=	{
	uniforms:	{
			"tDiffuse":	{	type:	"t",	value:	null},
			"scale":				{	type:	"f",	value:	1.0	},
			"texSize":		{	type:	"v2",	value:	new	THREE.Vector2(	50,	50	)	},
			"center":		{	type:	"v2",	value:	new	THREE.Vector2(	0.5,	0.5	)	},
	},
	vertexShader,
	fragmentShader,
}

const customEffect = new ShaderPass(customShader)
effectComposer.addPass(customEffect)

function animate() {
	// 设置了autoRotate / enableDamping = true， 需要在render函数中update()
  controls.update() 
	effectComposer.render()
	requestAnimationFrame( animate );
}
animate();

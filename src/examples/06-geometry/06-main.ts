import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI, GUIController } from 'dat.gui';
import './style.css'

/**
 * 目标：创建样条曲线spline curve && 管道缓冲几何体TubeGeometry
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(15, 15, 15);
// 二维样条曲线
const curve0 = new THREE.SplineCurve( [
	new THREE.Vector2( -10, 0 ),
	new THREE.Vector2( -5, 5 ),
	new THREE.Vector2( 0, 0 ),
	new THREE.Vector2( 5, -5 ),
	new THREE.Vector2( 10, 0 )
] );
// 三维样条曲线
const curve1 = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -10, 0, 10 ),
	new THREE.Vector3( -5, 5, 5 ),
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 5, -5, 5 ),
	new THREE.Vector3( 10, 0, 10 )
] );
// 平滑的二维 三次贝塞尔曲线， 由起点、终点和两个控制点所定义
const curve2 = new THREE.CubicBezierCurve(
	new THREE.Vector2( -10, 0 ),
	new THREE.Vector2( -5, 15 ),
	new THREE.Vector2( 20, 15 ),
	new THREE.Vector2( 10, 0 )
);
// 平滑的三维 三次贝塞尔曲线， 由起点、终点和两个控制点所定义
const curve3 = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -10, 0, 10 ),
	new THREE.Vector3( -5, 15, 0 ),
	new THREE.Vector3( 20, 15, 0 ),
	new THREE.Vector3( 10, 0, -10 )
);
// 直线
const curve4 = new THREE.LineCurve(
  new THREE.Vector2( 10, 0 ),
  new THREE.Vector2( 0, 10 ),
)
// 三维直线
const curve5 = new THREE.LineCurve3(
  new THREE.Vector3( 10, 10, 10 ),
  new THREE.Vector3( -10, -10, -10 ),
)
// 二维二次贝塞尔曲线， 由起点、终点和一个控制点所定义
const curve6 = new THREE.QuadraticBezierCurve(
    new THREE.Vector2( -10, 0 ),
    new THREE.Vector2( 10, 6 ),
    new THREE.Vector2( 5, 0 ),
)
// 三维二次贝塞尔曲线， 由起点、终点和一个控制点所定义
const curve7 = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3( -10, 0, -10),
    new THREE.Vector3( 10, 6, 10),
    new THREE.Vector3( 5, 0, 5),
)
// 椭圆的曲线
const curve8 = new THREE.EllipseCurve(
  0,  0,            // ax, aY
	20, 10,           // xRadius, yRadius
	Math.PI / 4,  2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	Math.PI / 4                 // aRotation
)

const generate2dCurve = (curve: THREE.Curve<any>) => {
  clearGroup();
  const points = curve.getPoints( 50 );
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
  const curveObject = new THREE.Line( geometry, material );
  group.add( curveObject );
}

const generate3DTube = (curve: THREE.Curve<any>) => {
  clearGroup();
  const tubeGeometry = new THREE.TubeGeometry(curve, 50, 1, 8, false);
  const tubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  })
  const tubeObject = new THREE.Mesh(tubeGeometry, tubeMaterial);
  group.add(tubeObject)
}

const group = new THREE.Group();
scene.add(group);
const clearGroup = () => {
  group.remove(...group.children);
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
controls.autoRotate = true;

let curve2D = ['0_二维样条曲线', '2_二维三次贝塞尔曲线', '4_二维直线', '6_二维二次贝塞尔曲线', '8_椭圆曲线'],
  curve3D = ['1_三维样条曲线', '3_三维三次贝塞尔曲线', '5_三维直线', '7_三维二次贝塞尔曲线'], 
  curveType = '3d',
  curveMap: Record<string, string[]> = {
    "2d": curve2D,
    "3d": curve3D,
  },
  curCurve: THREE.Curve<any> = curve1;
const curves = [curve0, curve1, curve2, curve3, curve4, curve5, curve6, curve7, curve8]

// 默认add 三维样条曲线 tube
generate3DTube(curCurve);

const guiParams = {
  "onlyCurve": false, 
  "curve": curveMap[curveType],
}

const generateOptions = (curves: typeof curve2D | typeof curve3D) => {
  const options: Record<string, string> = {}
  curves.forEach((curve) => {
    options[curve] = curve
  })
  options.SelectOption = Object.values(options)[0]
  return options
}

const gui = new GUI()
gui.width = 275
const sceneFolder = gui.addFolder('Scene')
// @ts-ignore
sceneFolder.add(controls, 'autoRotate').name('autoRotate')
sceneFolder.open()

const curveFolder = gui.addFolder('Curve')
curveFolder.open()

// @ts-ignore
let selectCOntroller: GUIController;
curveFolder.add(guiParams, 'onlyCurve').name('onlyCurve').onChange((v) => {
  if(v){
    curveType = '2d'
    curCurve = curves[Number(curve2D[0][0])]
    generate2dCurve(curCurve)
  } else {
    curveType = '3d'
    curCurve = curves[Number(curve3D[0][0])]
    generate3DTube(curCurve)
  }
  curveFolder.remove(selectCOntroller)
  selectCOntroller = curveFolder.add(generateOptions(curveMap[curveType]), 'SelectOption', curveMap[curveType]).name('curve Type').onChange((curve) => {
    curCurve = curves[Number(curve[0])]  
    
    if(curveType === '2d'){
      generate2dCurve(curCurve)
    }else{
      generate3DTube(curCurve)
    }
  })
})
selectCOntroller = curveFolder.add(generateOptions(curveMap[curveType]), 'SelectOption', curveMap[curveType]).name('curve Type').onChange((curve) => {
  curCurve = curves[Number(curve[0])]  
  
  if(curveType === '2d'){
    generate2dCurve(curCurve)
  }else{
    generate3DTube(curCurve)
  }
})


function animate() { 
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()
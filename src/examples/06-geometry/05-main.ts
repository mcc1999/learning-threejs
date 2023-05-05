import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';
import './style.css'

/**
 * 目标：根据数学公式创建几何体
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);

/**
 * - u 值映射到球体表面的纬度角度, 
 * - v 值映射到球体表面的经度角度
 * - 根据纬度和经度角度，使用球坐标系公式计算出对应点的三维坐标 (x, y, z)
 * - 该函数生成的球型几何体半径为1，可给x、y、z乘以一个半径参数r
*/
const radius = 5;
const sphereFunction = function(u: number, v: number, target: THREE.Vector3) {
  const phi = u * Math.PI;
  const theta = v * 2 * Math.PI;
  const x = Math.sin(phi) * Math.cos(theta) * radius;
  const y = Math.cos(phi) * radius;
  const z = Math.sin(phi) * Math.sin(theta) * radius;
  target.set(x, y, z);
}

const KleinBottleFn = function(u: number, v: number, target: THREE.Vector3) {
    const	a	=	3;
    const	n	=	3;
    const	m	=	1;
    const	uu	=	u	*	4	*	Math.PI;
    const	vv	=	v	*	2	*	Math.PI;
    const	x	=	(a	+	Math.cos(n	*	uu	/	2.0)	*	Math.sin(vv)	-	Math.sin(n	*	uu	/	2.0)	* Math.sin(2	*	vv))	*	Math.cos(m	*	uu	/	2.0);
    const	y	=	(a	+	Math.cos(n	*	uu	/	2.0)	*	Math.sin(vv)	-	Math.sin(n	*	uu	/	2.0)	* Math.sin(2	*	vv))	*	Math.sin(m	*	uu	/	2.0);
    const	z	=	Math.sin(n	*	uu	/	2.0)	*	Math.sin(vv)	+	Math.cos(n	*	uu	/	2.0)	* Math.sin(2	*	vv);
    target.set(x,	y,	z);
}

const createGeometry = (type: 'sphere' | 'kleinBottle') => {
  const fn = (parameterFn: (u: number, v: number, target: THREE.Vector3) => void) => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];

    const widthSegments = 32, heightSegments = 16;
    for (let i = 0; i <= widthSegments; i++) {
      const v = i / widthSegments;
      for (let j = 0; j <= heightSegments; j++) {
        const u = j / heightSegments;
        const tempVector = new THREE.Vector3();
        parameterFn(u, v, tempVector);
        vertices.push(tempVector.x, tempVector.y, tempVector.z);
        const index = (heightSegments + 1) * i + j;


        if (i < widthSegments && j < heightSegments) {
          const a = index;
          const b = index + heightSegments + 1;
          const c = index + heightSegments + 2;
          const d = index + 1;

          indices.push(a, b, c);
          indices.push(c, d, a);
        }
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);

    return geometry;
  }

  switch (type) {
    case 'sphere':
      return fn(sphereFunction);
    case 'kleinBottle':
      return fn(KleinBottleFn);
  }

}


const sphereMaterial = new	THREE.MeshPhongMaterial({
  color:	0x049ef4,
  side: THREE.DoubleSide,
  flatShading: true,
});
const sphereGeometry = createGeometry('sphere');
const kleinBottleGeometry = createGeometry('kleinBottle');

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
const kleinBottle = new THREE.Mesh(kleinBottleGeometry, sphereMaterial);
scene.add(kleinBottle);

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

const guiParams = {
  kleinBottle: () => {
    if(scene.children.map(c => c.id).includes(sphere.id)) {
      console.log('remove sphere');  
      scene.remove(sphere)
      scene.add(kleinBottle);
    }
  },
  sphere: () => {
    if(scene.children.map(c => c.id).includes(kleinBottle.id)) { 
      console.log('remove kleinBottle');  
      scene.remove(kleinBottle)
      scene.add(sphere);
    }
  }
}

const gui = new GUI()
gui.add(guiParams, 'kleinBottle').name('kleinBottle')
gui.add(guiParams, 'sphere').name('sphere')

function animate() { 
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}  

animate()
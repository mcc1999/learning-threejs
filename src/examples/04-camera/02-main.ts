import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BASE_URL } from '../../consts'
import type { Mesh, WebGLRenderer, Scene, PerspectiveCamera, OrthographicCamera, AxesHelper, DirectionalLight } from 'three'
import './style.css'
import { GUI } from 'dat.gui'

/**
 * 目标：透视相机和正交相机
*/
enum CameraType {
	'PerspectiveCamera' = 'PerspectiveCamera',
	'OrthographicCamera' = 'OrthographicCamera'
}
const gui = new GUI()
class CameraEXample {
	scene: Scene;
	camera?: PerspectiveCamera | OrthographicCamera;
	mesh?: Mesh;
	renderer?: WebGLRenderer;
	controls?: OrbitControls;
	axesHelper?: AxesHelper;
	light?: DirectionalLight;

	constructor(cameraType: CameraType) {
		this.scene = new THREE.Scene()
		this.initCamera(cameraType)
		this.initHelper()
		this.createRender()
		this.createMesh()
		this.createControl()
		this.animate()
	}

	initCamera(cameraType: CameraType) {
		if (cameraType === CameraType.PerspectiveCamera){
			this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
		} else if (cameraType === CameraType.OrthographicCamera) {
			this.camera = new THREE.OrthographicCamera( - window.innerWidth / 2,  window.innerWidth / 2,  window.innerHeight / 2, - window.innerHeight / 2, 1, 10000 );
		}
		this.camera?.position.set(0, 0, 100)
		this.camera?.lookAt(new THREE.Vector3());
		this.camera?.updateProjectionMatrix()
		gui.add(this.camera?.position, 'z', 100, 500, 50).name(`${cameraType}-Z`)
	}

	initHelper() {
		this.axesHelper = new THREE.AxesHelper(100)
		this.scene.add(this.axesHelper)
	}

	createMesh() {
		const geometry = new THREE.SphereGeometry( 50, 50, 50 );
		const texture = new THREE.TextureLoader().load(`${BASE_URL}images/textures/camera/shanghaiTower.png`)
		const material = new THREE.MeshBasicMaterial({
			map: texture
		});
		this.mesh = new THREE.Mesh( geometry, material );	
		this.mesh.position.set(0, 0, 0)
		this.scene.add( this.mesh );
	}

	createRender() {
		this.renderer = new THREE.WebGLRenderer();

		this.renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );
		document.body.appendChild( this.renderer.domElement );
		
		window.addEventListener('resize', () => {
			// @ts-ignore
			if(this.camera && this.camera.isPerspectiveCamera){
				// @ts-ignore
				this.camera.aspect = window.innerWidth / window.innerHeight
				this.camera.updateProjectionMatrix()
			}
		
			this.renderer?.setSize(window.innerWidth / 2, window.innerHeight / 2)
			this.renderer?.setPixelRatio(window.devicePixelRatio)
		})
	}

	createControl() {
		if(this.camera && this.renderer)
			this.controls = new OrbitControls(this.camera, this.renderer.domElement);          
	}
	
	animate() {
		this.render();
		requestAnimationFrame(() => this.animate());
	}

	render() {
		//更新控制器
		this.controls?.update();		
		this.renderer?.render(this.scene!, this.camera!);
	}
}

const perspectiveCameraExample = new CameraEXample(CameraType.PerspectiveCamera)
const orthographicCameraExample = new CameraEXample(CameraType.OrthographicCamera)



	

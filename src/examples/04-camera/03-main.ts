import * as THREE from 'three'
import { BASE_URL } from '../../consts'
import { StereoEffect } from 'three/examples/jsm/effects/StereoEffect';
import type { Mesh } from 'three';
import './style.css'

/**
 * 目标：立体相机StereoCamera--stereoEffect
*/

const spheres: Mesh[] = []
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let mouseX = 0, mouseY = 0;

function onDocumentMouseMove( event: MouseEvent ) {
	mouseX = ( event.clientX - windowHalfX ) * 10;
	mouseY = ( event.clientY - windowHalfY ) * 10;

}
document.addEventListener( 'mousemove', onDocumentMouseMove );

const scene = new THREE.Scene()
const envTexture = new THREE.CubeTextureLoader().setPath(`${BASE_URL}images/textures/environmentMaps/0/`).load([
	'px.jpg', 'nx.jpg',
	'py.jpg', 'ny.jpg',
	'pz.jpg', 'nz.jpg',
])
envTexture.mapping = THREE.CubeRefractionMapping
scene.background = envTexture
scene.environment = envTexture

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / 2 / window.innerHeight, 0.1, 100000);
camera.position.z = 3200;
scene.add(camera);

const geometry = new THREE.SphereGeometry( 50, 50, 50 );
const material = new THREE.MeshBasicMaterial({
	envMap: envTexture,
	refractionRatio: 0.95,
	color: 0xffffff
});
for ( let i = 0; i < 500; i ++ ) {

	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.x = Math.random() * 10000 - 5000;
	mesh.position.y = Math.random() * 10000 - 5000;
	mesh.position.z = Math.random() * 10000 - 5000;
	mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
	scene.add( mesh );

	spheres.push( mesh );

}

const	renderer = new THREE.WebGLRenderer();
const stereoEffect = new StereoEffect(renderer)

renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	stereoEffect.setSize( window.innerWidth, window.innerHeight );
})
	

function animate() {
	render();
	requestAnimationFrame(() => animate());
}

function render() {
	const timer = 0.0001 * Date.now();

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	camera.lookAt( scene.position );
	for ( let i = 0, il = spheres.length; i < il; i ++ ) {

		const sphere = spheres[ i ];

		sphere.position.x = 5000 * Math.cos( timer + i );
		sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );

	}
	stereoEffect.render(scene, camera)
}

animate()



	

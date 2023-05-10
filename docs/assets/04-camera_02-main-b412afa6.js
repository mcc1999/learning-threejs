var d=Object.defineProperty;var c=(t,e,i)=>e in t?d(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var r=(t,e,i)=>(c(t,typeof e!="symbol"?e+"":e,i),i);import"./modulepreload-polyfill-3cfb730f.js";import{S as w,P as p,Z as l,t as g,A as C,c as H,T as u,M as x,a as P,W as f}from"./three.module-26828fde.js";import{O as M}from"./OrbitControls-2d8a967e.js";import{B as W}from"./index-969f7968.js";/* empty css              */import{G as z}from"./dat.gui.module-dd30c9f2.js";const v=new z;class h{constructor(e){r(this,"scene");r(this,"camera");r(this,"mesh");r(this,"renderer");r(this,"controls");r(this,"axesHelper");r(this,"light");this.scene=new w,this.initCamera(e),this.initHelper(),this.createRender(),this.createMesh(),this.createControl(),this.animate()}initCamera(e){var a,n,s,o;e==="PerspectiveCamera"?this.camera=new p(75,window.innerWidth/window.innerHeight,1,1e4):e==="OrthographicCamera"&&(this.camera=new l(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,1,1e4)),(a=this.camera)==null||a.position.set(0,0,100),(n=this.camera)==null||n.lookAt(new g),(s=this.camera)==null||s.updateProjectionMatrix();const i={z:(o=this.camera)==null?void 0:o.position.z};v.add(i,"z",100,500,50).name(`${e}-Z`).onChange(m=>this.camera.position.z=m)}initHelper(){this.axesHelper=new C(100),this.scene.add(this.axesHelper)}createMesh(){const e=new H(50,50,50),i=new u().load(`${W}images/textures/camera/shanghaiTower.png`),a=new x({map:i});this.mesh=new P(e,a),this.mesh.position.set(0,0,0),this.scene.add(this.mesh)}createRender(){this.renderer=new f,this.renderer.setSize(window.innerWidth/2,window.innerHeight/2),document.body.appendChild(this.renderer.domElement),window.addEventListener("resize",()=>{var e,i;this.camera&&this.camera.isPerspectiveCamera&&(this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix()),(e=this.renderer)==null||e.setSize(window.innerWidth/2,window.innerHeight/2),(i=this.renderer)==null||i.setPixelRatio(window.devicePixelRatio)})}createControl(){this.camera&&this.renderer&&(this.controls=new M(this.camera,this.renderer.domElement))}animate(){this.render(),requestAnimationFrame(()=>this.animate())}render(){var e,i;(e=this.controls)==null||e.update(),(i=this.renderer)==null||i.render(this.scene,this.camera)}}new h("PerspectiveCamera");new h("OrthographicCamera");
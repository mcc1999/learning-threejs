import"./modulepreload-polyfill-3cfb730f.js";import{Y as f,v as M,S,n as x,Z as y,P as z,c as W,M as v,a as H,W as j}from"./three.module-054190ed.js";import{B as E}from"./index-969f7968.js";/* empty css              */class C{constructor(e){const s=new f;s.aspect=.5;const t=new M;this.setEyeSeparation=function(o){s.eyeSep=o},this.setSize=function(o,a){e.setSize(o,a)},this.render=function(o,a){o.matrixWorldAutoUpdate===!0&&o.updateMatrixWorld(),a.parent===null&&a.matrixWorldAutoUpdate===!0&&a.updateMatrixWorld(),s.update(a),e.getSize(t),e.autoClear&&e.clear(),e.setScissorTest(!0),e.setScissor(0,0,t.width/2,t.height),e.setViewport(0,0,t.width/2,t.height),e.render(o,s.cameraL),e.setScissor(t.width/2,0,t.width/2,t.height),e.setViewport(t.width/2,0,t.width/2,t.height),e.render(o,s.cameraR),e.setScissorTest(!1)}}}const p=[];let c=window.innerWidth/2,h=window.innerHeight/2,m=0,u=0;function L(n){m=(n.clientX-c)*10,u=(n.clientY-h)*10}document.addEventListener("mousemove",L);const r=new S,d=new x().setPath(`${E}images/textures/environmentMaps/0/`).load(["px.jpg","nx.jpg","py.jpg","ny.jpg","pz.jpg","nz.jpg"]);d.mapping=y;r.background=d;r.environment=d;const i=new z(45,window.innerWidth/2/window.innerHeight,.1,1e5);i.position.z=3200;r.add(i);const b=new W(50,50,50),A=new v({envMap:d,refractionRatio:.95,color:16777215});for(let n=0;n<500;n++){const e=new H(b,A);e.position.x=Math.random()*1e4-5e3,e.position.y=Math.random()*1e4-5e3,e.position.z=Math.random()*1e4-5e3,e.scale.x=e.scale.y=e.scale.z=Math.random()*3+1,r.add(e),p.push(e)}const w=new j,l=new C(w);w.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(w.domElement);window.addEventListener("resize",()=>{c=window.innerWidth/2,h=window.innerHeight/2,i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),l.setSize(window.innerWidth,window.innerHeight)});function g(){R(),requestAnimationFrame(()=>g())}function R(){const n=1e-4*Date.now();i.position.x+=(m-i.position.x)*.05,i.position.y+=(-u-i.position.y)*.05,i.lookAt(r.position);for(let e=0,s=p.length;e<s;e++){const t=p[e];t.position.x=5e3*Math.cos(n+e),t.position.y=5e3*Math.sin(n+e*1.1)}l.render(r,i)}g();

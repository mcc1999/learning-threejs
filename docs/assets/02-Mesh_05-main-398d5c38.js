import{S as s,P as d,B as w,T as m,R as r,M as p,a as c,G as l,A as h,W as g}from"./three.module-f499bf07.js";import{O as x}from"./OrbitControls-608f2de0.js";import{B as u}from"./index-969f7968.js";/* empty css              */const i=new s,t=new d(75,window.innerWidth/window.innerHeight,.1,1e3);t.position.set(8,4,8);const H=new w(1,1,1),e=new m().load(`${u}images/door.jpeg`);e.offset.set(.5,0);e.rotation=Math.PI/2;e.center.set(.5,.5);e.wrapS=r;e.wrapT=r;e.repeat.set(2,2);const W=new p({map:e}),f=new c(H,W);i.add(f);const M=new l(10,10),P=new h(5);i.add(M);i.add(P);const n=new g;n.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(n.domElement);const o=new x(t,n.domElement);o.enableDamping=!0;window.addEventListener("resize",()=>{t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)});function a(){o.update(),n.render(i,t),requestAnimationFrame(a)}a();

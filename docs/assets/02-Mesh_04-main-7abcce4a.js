import"./modulepreload-polyfill-3cfb730f.js";import{S as r,P as a,B as s,T as d,M as w,a as m,G as c,A as p,W as l}from"./three.module-054190ed.js";import{O as h}from"./OrbitControls-43e7473f.js";import{B as x}from"./index-969f7968.js";/* empty css              */const i=new r,n=new a(75,window.innerWidth/window.innerHeight,.1,1e3);n.position.set(8,4,8);const g=new s(1,1,1),u=new d().load(`${x}images/door.jpeg`),H=new w({map:u}),W=new m(g,H);i.add(W);const b=new c(10,10),B=new p(5);i.add(b);i.add(B);const e=new l;e.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(e.domElement);const t=new h(n,e.domElement);t.enableDamping=!0;window.addEventListener("resize",()=>{n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio)});function o(){t.update(),e.render(i,n),requestAnimationFrame(o)}o();

import"./modulepreload-polyfill-3cfb730f.js";import{S as d,P as w,B as m,T as a,M as p,D as c,c as l,a as u,G as h,A as x,W as g}from"./three.module-e5c57ca2.js";import{O as b}from"./OrbitControls-12b317f5.js";import{B as o}from"./index-969f7968.js";/* empty css              */const n=new d,t=new w(75,window.innerWidth/window.innerHeight,.1,1e3);t.position.set(8,4,8);const i=new m(1,1,1),H=new a().load(`${o}images/textures/door/door.jpg`),M=new a().load(`${o}images/textures/door/alpha.jpg`),f=new a().load(`${o}images/textures/door/ambientOcclusion.jpg`),A=new p({map:H,alphaMap:M,aoMap:f,aoMapIntensity:.8,transparent:!0,side:c});i.setAttribute("uv2",new l(i.attributes.uv.array,2));const B=new u(i,A);n.add(B);const S=new h(10,10),W=new x(5);n.add(S);n.add(W);const e=new g;e.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(e.domElement);const r=new b(t,e.domElement);r.enableDamping=!0;window.addEventListener("resize",()=>{t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio)});function s(){r.update(),e.render(n,t),requestAnimationFrame(s)}s();
import"./modulepreload-polyfill-3cfb730f.js";import{S as l,P as h,V as g,B as r,M as f,a,W as x,g as u,A as H,G}from"./three.module-e6666b2c.js";import{O as b}from"./OrbitControls-e1d92454.js";/* empty css              */import{G as y}from"./dat.gui.module-dd30c9f2.js";const i=new l,n=new h(75,window.innerWidth/window.innerHeight,.1,1e3),t=new g(5,10,0);n.position.set(0,0,0);n.position.add(t);const M=new r(1,1,1),W=new r(1,1,5),d=new f({color:65280}),e=new a(M,d),w=new a(W,d);i.add(e);i.add(w);w.position.x=-2;const o=new x;o.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(o.domElement);window.addEventListener("resize",()=>{n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),o.setSize(window.innerWidth,window.innerHeight)});const z=new u(16777215,.5);i.add(z);const A=new H(1e3);i.add(A);const v=new G(100,10);i.add(v);const c=new b(n,o.domElement);c.enableDamping=!0;let s=!1;const C={moving:s},L=new y;L.add(C,"moving").onChange(p=>{s=p});function m(){s&&(e.position.x>=10?e.position.x=0:e.position.x+=.05,n.position.set(e.position.x+t.x,e.position.y+t.y,e.position.z+t.z)),n.lookAt(e.position),requestAnimationFrame(m),c.update(),o.render(i,n)}m();
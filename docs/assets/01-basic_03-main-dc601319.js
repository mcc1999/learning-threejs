import"./modulepreload-polyfill-3cfb730f.js";import{S as t,P as i,B as s,M as a,a as d,G as c,A as m,W as w}from"./three.module-e6666b2c.js";import{O as p}from"./OrbitControls-e1d92454.js";/* empty css              */const e=new t,o=new i(75,window.innerWidth/window.innerHeight,.1,1e3);o.position.z=5;const l=new s(1,1,1),h=new a({color:65280}),H=new d(l,h);e.add(H);const u=new c(10,10),b=new m(5);e.add(u);e.add(b);const n=new w;n.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(n.domElement);const g=new p(o,n.domElement);function r(){requestAnimationFrame(r),g.update(),n.render(e,o)}r();
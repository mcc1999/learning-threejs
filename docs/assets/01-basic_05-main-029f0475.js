import"./modulepreload-polyfill-3cfb730f.js";import{S as a,P as d,B as c,M as m,a as w,G as p,A as l,W as h}from"./three.module-054190ed.js";import{O as H}from"./OrbitControls-43e7473f.js";/* empty css              */const e=new a,o=new d(75,window.innerWidth/window.innerHeight,.1,1e3);o.position.x=5;const u=new c(1,1,1),x=new m({color:65280}),t=new w(u,x);t.position.set(0,0,0);e.add(t);const b=new p(10,10),g=new l(5);e.add(b);e.add(g);const n=new h;n.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(n.domElement);const G=new H(o,n.domElement);function r(i){requestAnimationFrame(r);const s=i/1e3%5;t.position.x=s,G.update(),n.render(e,o)}r(0);

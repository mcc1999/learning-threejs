import{S as d,P as l,B as m,M as w,a as i,G as p,A as h,W as x}from"./three.module-f499bf07.js";import{O as u}from"./OrbitControls-608f2de0.js";/* empty css              */const n=new d,t=new l(75,window.innerWidth/window.innerHeight,.1,1e3);t.position.x=5;const a=new m(1,1,1),r=new w({color:65280}),e=new i(a,r);e.position.set(0,0,0);n.add(e);const s=new i(a,r);s.position.set(0,0,0);n.add(s);const H=new p(10,10),M=new h(5);n.add(H);n.add(M);const o=new x;o.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(o.domElement);const b=new u(t,o.domElement);function c(){requestAnimationFrame(c),e.position.z>=5?e.position.z=0:e.position.z+=.01,e.scale.x>=.1&&e.scale.x<=1?(e.scale.x-=.1,e.scale.y-=.1,e.scale.z-=.1):e.scale.set(1,1,1),e.rotation.x+=Math.PI/100,s.rotation.x+=Math.PI/40,b.update(),o.render(n,t)}c();
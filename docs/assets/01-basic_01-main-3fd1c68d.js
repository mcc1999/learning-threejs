import{S as r,P as a,W as s,B as d,M as c,a as m}from"./three.module-f499bf07.js";/* empty css              */const o=new r,t=new a(75,window.innerWidth/window.innerHeight,.1,1e3);t.position.z=5;const n=new s;n.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(n.domElement);const w=new d(1,1,1),h=new c({color:65280}),e=new m(w,h);o.add(e);function i(){requestAnimationFrame(i),e.rotation.x+=.01,e.rotation.y+=.01,n.render(o,t)}i();

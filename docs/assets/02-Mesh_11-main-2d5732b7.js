import{S as w,P as c,B as p,T as a,f as m,D as l,c as u,a as g,g as h,h as x,G as b,A as M,W as H}from"./three.module-f499bf07.js";import{O as L}from"./OrbitControls-608f2de0.js";/* empty css              */const i="/learning-threejs/",t=new w,n=new c(75,window.innerWidth/window.innerHeight,.1,1e3);n.position.set(0,1,2);const o=new p(1,1,1,200,200,200),S=new a().load(`${i}images/textures/door/door.jpg`),j=new a().load(`${i}images/textures/door/alpha.jpg`),A=new a().load(`${i}images/textures/door/ambientOcclusion.jpg`),f=new a().load(`${i}images/textures/door/height.jpg`),T=new a().load(`${i}images/textures/door/roughness.jpg`),W=new m({map:S,alphaMap:j,transparent:!0,aoMap:A,aoMapIntensity:.8,displacementMap:f,displacementScale:.05,roughness:1,roughnessMap:T,side:l});o.setAttribute("uv2",new u(o.attributes.uv.array,2));const v=new g(o,W);t.add(v);const y=new h(16777215,.5);t.add(y);const r=new x(16777215);r.position.set(5,5,5);t.add(r);const G=new b(10,10),P=new M(5);t.add(G);t.add(P);const e=new H;e.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(e.domElement);const s=new L(n,e.domElement);s.enableDamping=!0;window.addEventListener("resize",()=>{n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio)});function d(){s.update(),e.render(t,n),requestAnimationFrame(d)}d();

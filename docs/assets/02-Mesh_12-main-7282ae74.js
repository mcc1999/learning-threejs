import{S as m,P as w,B as p,T as t,f as c,D as l,c as u,a as g,g as h,h as x,G as b,A as M,W as H}from"./three.module-f499bf07.js";import{O as L}from"./OrbitControls-608f2de0.js";import{B as n}from"./index-969f7968.js";/* empty css              */const a=new m,s=new w(75,window.innerWidth/window.innerHeight,.1,1e3);s.position.set(0,1,2);const o=new p(1,1,1,200,200,200),S=new t().load(`${n}images/textures/door/door.jpg`),f=new t().load(`${n}images/textures/door/alpha.jpg`),j=new t().load(`${n}images/textures/door/ambientOcclusion.jpg`),A=new t().load(`${n}images/textures/door/height.jpg`),T=new t().load(`${n}images/textures/door/roughness.jpg`),W=new t().load(`${n}images/textures/door/metalness.jpg`),$=new c({map:S,alphaMap:f,transparent:!0,aoMap:j,aoMapIntensity:.8,displacementMap:A,displacementScale:.05,roughness:1,roughnessMap:T,metalness:1,metalnessMap:W,side:l});o.setAttribute("uv2",new u(o.attributes.uv.array,2));const v=new g(o,$);a.add(v);const y=new h(16777215,.5);a.add(y);const i=new x(16777215);i.position.set(5,5,5);a.add(i);const B=new b(10,10),G=new M(5);a.add(B);a.add(G);const e=new H;e.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(e.domElement);const r=new L(s,e.domElement);r.enableDamping=!0;window.addEventListener("resize",()=>{s.aspect=window.innerWidth/window.innerHeight,s.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio)});function d(){r.update(),e.render(a,s),requestAnimationFrame(d)}d();

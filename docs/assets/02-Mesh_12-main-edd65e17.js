import{S as d,P as c,B as p,T as t,f as l,D as u,c as w,a as m,g,h,G as x,A as b,W as M}from"./three.module-f499bf07.js";import{O as H}from"./OrbitControls-608f2de0.js";/* empty css              */const n=new d,a=new c(75,window.innerWidth/window.innerHeight,.1,1e3);a.position.set(0,1,2);const i=new p(1,1,1,200,200,200),j=new t().load("./public/images/textures/door/door.jpg"),L=new t().load("./public/images/textures/door/alpha.jpg"),S=new t().load("./public/images/textures/door/ambientOcclusion.jpg"),T=new t().load("./public/images/textures/door/height.jpg"),f=new t().load("./public/images/textures/door/roughness.jpg"),A=new t().load("./public/images/textures/door/metalness.jpg"),W=new l({map:j,alphaMap:L,transparent:!0,aoMap:S,aoMapIntensity:.8,displacementMap:T,displacementScale:.05,roughness:1,roughnessMap:f,metalness:1,metalnessMap:A,side:u});i.setAttribute("uv2",new w(i.attributes.uv.array,2));const v=new m(i,W);n.add(v);const y=new g(16777215,.5);n.add(y);const s=new h(16777215);s.position.set(5,5,5);n.add(s);const G=new x(10,10),P=new b(5);n.add(G);n.add(P);const e=new M;e.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(e.domElement);const o=new H(a,e.domElement);o.enableDamping=!0;window.addEventListener("resize",()=>{a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio)});function r(){o.update(),e.render(n,a),requestAnimationFrame(r)}r();

import{S as l,P as w,B as c,i as p,f as h,F as u,a as x,g as L,h as M,G as v,A as b,W as S,L as $}from"./three.module-f499bf07.js";import{O as j}from"./OrbitControls-608f2de0.js";/* empty css              */const e="/learning-threejs/",t=new l,o=new w(75,window.innerWidth/window.innerHeight,.1,1e3);o.position.set(2,1,2);const i=new $;i.onStart=()=>{console.log("Started loading files.")};i.onProgress=(s,g,m)=>{console.log(`Url：${s}`),console.log(`Progress：${g} / ${m}.`)};i.onLoad=()=>{console.log("ALL Loaded")};i.onError=s=>{console.log("There was an error loading "+s)};const H=new c(1,1,1,200,200,200),P=new p(i).load([`${e}images/textures/environmentMaps/2/px.jpg`,`${e}images/textures/environmentMaps/2/nx.jpg`,`${e}images/textures/environmentMaps/2/py.jpg`,`${e}images/textures/environmentMaps/2/ny.jpg`,`${e}images/textures/environmentMaps/2/pz.jpg`,`${e}images/textures/environmentMaps/2/nz.jpg`]),A=new h({envMap:P,metalness:.7,roughness:.05,side:u}),W=new x(H,A);t.add(W);const f=new L(16777215,.5);t.add(f);const r=new M(16777215);r.position.set(5,5,5);t.add(r);const y=new v(10,10),z=new b(5);t.add(y);t.add(z);const n=new S;n.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(n.domElement);const a=new j(o,n.domElement);a.enableDamping=!0;window.addEventListener("resize",()=>{o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)});function d(){a.update(),n.render(t,o),requestAnimationFrame(d)}d();

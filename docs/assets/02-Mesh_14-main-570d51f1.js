import"./modulepreload-polyfill-3cfb730f.js";import{S as p,P as w,B as l,i as c,f as h,F as u,a as x,g as L,h as M,G as v,A as b,W as S,L as $}from"./three.module-3817f4fc.js";import{O as H}from"./OrbitControls-876cbc0b.js";import{B as e}from"./index-969f7968.js";/* empty css              */const o=new p,t=new w(75,window.innerWidth/window.innerHeight,.1,1e3);t.position.set(2,1,2);const i=new $;i.onStart=()=>{console.log("Started loading files.")};i.onProgress=(r,m,g)=>{console.log(`Url：${r}`),console.log(`Progress：${m} / ${g}.`)};i.onLoad=()=>{console.log("ALL Loaded")};i.onError=r=>{console.log("There was an error loading "+r)};const j=new l(1,1,1,200,200,200),P=new c(i).load([`${e}images/textures/environmentMaps/2/px.jpg`,`${e}images/textures/environmentMaps/2/nx.jpg`,`${e}images/textures/environmentMaps/2/py.jpg`,`${e}images/textures/environmentMaps/2/ny.jpg`,`${e}images/textures/environmentMaps/2/pz.jpg`,`${e}images/textures/environmentMaps/2/nz.jpg`]),f=new h({envMap:P,metalness:.7,roughness:.05,side:u}),A=new x(j,f);o.add(A);const W=new L(16777215,.5);o.add(W);const s=new M(16777215);s.position.set(5,5,5);o.add(s);const y=new v(10,10),z=new b(5);o.add(y);o.add(z);const n=new S;n.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(n.domElement);const a=new H(t,n.domElement);a.enableDamping=!0;window.addEventListener("resize",()=>{t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)});function d(){a.update(),n.render(o,t),requestAnimationFrame(d)}d();
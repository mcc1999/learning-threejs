import"./modulepreload-polyfill-3cfb730f.js";import{S as w,P as p,B as u,T as n,j as h,D as x,g as L,a as M,e as b,k as S,G as $,A as j,W as T,L as A}from"./three.module-26828fde.js";import{O as H}from"./OrbitControls-2d8a967e.js";import{B as o}from"./index-969f7968.js";/* empty css              */const a=new w,r=new p(75,window.innerWidth/window.innerHeight,.1,1e3);r.position.set(0,1,2);const e=new A;e.onStart=()=>{console.log("Started loading files.")};e.onProgress=(s,c,g)=>{console.log(`Url：${s}`),console.log(`Progress：${c} / ${g}.`)};e.onLoad=()=>{console.log("ALL Loaded")};e.onError=s=>{console.log("There was an error loading "+s)};const i=new u(1,1,1,200,200,200),f=new n(e).load(`${o}images/textures/door/door.jpg`),P=new n(e).load(`${o}images/textures/door/alpha.jpg`),W=new n(e).load(`${o}images/textures/door/ambientOcclusion.jpg`),v=new n(e).load(`${o}images/textures/door/height.jpg`),y=new n(e).load(`${o}images/textures/door/roughness.jpg`),B=new n(e).load(`${o}images/textures/door/metalness.jpg`),E=new n(e).load(`${o}images/textures/door/normal.jpg`),G=new h({map:f,alphaMap:P,transparent:!0,aoMap:W,aoMapIntensity:.8,displacementMap:v,displacementScale:.05,roughness:1,roughnessMap:y,metalness:1,metalnessMap:B,normalMap:E,side:x});i.setAttribute("uv2",new L(i.attributes.uv.array,2));const D=new M(i,G);a.add(D);const R=new b(16777215,.5);a.add(R);const d=new S(16777215);d.position.set(5,5,5);a.add(d);const z=new $(10,10),C=new j(5);a.add(z);a.add(C);const t=new T;t.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(t.domElement);const l=new H(r,t.domElement);l.enableDamping=!0;window.addEventListener("resize",()=>{r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(window.devicePixelRatio)});function m(){l.update(),t.render(a,r),requestAnimationFrame(m)}m();
import{S as g,P as u,B as L,o as S,p as b,f as G,a as i,V as H,g as P,h as x,G as y,A as M,W as A,L as W}from"./three.module-f499bf07.js";import{O as f}from"./OrbitControls-608f2de0.js";/* empty css              */const e=new g,o=new u(75,window.innerWidth/window.innerHeight,.1,1e3);o.position.set(2,1,2);const t=new W;t.onStart=()=>{console.log("Started loading files.")};t.onProgress=(r,m,p)=>{console.log(`Url：${r}`),console.log(`Progress：${m} / ${p}.`)};t.onLoad=()=>{console.log("ALL Loaded")};t.onError=r=>{console.log("There was an error loading "+r)};const v=new L(1,1,1),E=new S(8,8),z=new b(.5),s=new G({metalness:.6,roughness:.1}),c=new i(v,s),a=new i(E,s),d=new i(z,s);d.position.set(3,0,0);a.position.set(0,-1,0);a.lookAt(new H(0,1,0));c.castShadow=!0;d.castShadow=!0;a.receiveShadow=!0;e.add(c);e.add(a);e.add(d);const C=new P(4210752,.75),w=new x(16777215);w.position.set(5,5,5);w.castShadow=!0;e.add(w);e.add(C);const R=new y(10,10),$=new M(5);e.add(R);e.add($);const n=new A;n.setSize(window.innerWidth,window.innerHeight);n.shadowMap.enabled=!0;document.body.appendChild(n.domElement);const l=new f(o,n.domElement);l.enableDamping=!0;window.addEventListener("resize",()=>{o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)});function h(){l.update(),n.render(e,o),requestAnimationFrame(h)}h();

import"./modulepreload-polyfill-3cfb730f.js";import{G as M}from"./dat.gui.module-798d8523.js";import{S as y,P as S,B as b,e as x,c as p,d as m,a as i,V as P,f as H,g as f,M as A,h as C,G as W,A as E,W as v,L as z,C as $}from"./three.module-054190ed.js";import{O as k}from"./OrbitControls-43e7473f.js";/* empty css              */const n=new y,a=new S(75,window.innerWidth/window.innerHeight,.1,1e3);a.position.set(3,2,4);const r=new z;r.onStart=()=>{console.log("Started loading files.")};r.onProgress=(o,L,G)=>{console.log(`Url：${o}`),console.log(`Progress：${L} / ${G}.`)};r.onLoad=()=>{console.log("ALL Loaded")};r.onError=o=>{console.log("There was an error loading "+o)};const B=new b(1,1,1,100,100,100),R=new x(50,50),O=new p(.5,100,100),h=new m({metalness:.6,roughness:.1}),T=new m({color:14737632}),d=new i(B,h),c=new i(R,T),w=new i(O,h);d.position.set(0,.5,0);w.position.set(3,.5,0);c.position.set(0,0,0);c.lookAt(new P(0,1,0));d.castShadow=!0;w.castShadow=!0;c.receiveShadow=!0;n.add(d);n.add(c);n.add(w);const U=new H(4210752,.75),s=new f(65280);s.castShadow=!0;s.decay=0;const V=new i(new p(.05,100,100),new A({color:65280})),t=new C;t.add(s);t.add(V);t.position.set(1,2,1);n.add(t);n.add(U);const l=new M;l.add(d.position,"x",-5,5,.1).name("cube-x");l.add(s,"distance",0,50,.1).name("distance");l.add(s,"decay",0,2,.01).name("decay");const j=new W(10,10),q=new E(5);n.add(j);n.add(q);const e=new v;e.setSize(window.innerWidth,window.innerHeight);e.shadowMap.enabled=!0;e.physicallyCorrectLights=!0;document.body.appendChild(e.domElement);const g=new k(a,e.domElement);g.enableDamping=!0;window.addEventListener("resize",()=>{a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio)});const D=new $;function u(){const o=D.getElapsedTime();t.position.x=Math.sin(o)*2,t.position.z=Math.cos(o)*2,g.update(),e.render(n,a),requestAnimationFrame(u)}u();

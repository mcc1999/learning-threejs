import"./modulepreload-polyfill-3cfb730f.js";import{G as S}from"./dat.gui.module-798d8523.js";import{S as b,P as L,B as y,e as G,c as M,d as l,a as c,V as P,f as x,J as H,v as f,G as A,A as W,W as v,L as z}from"./three.module-054190ed.js";import{O as C}from"./OrbitControls-43e7473f.js";/* empty css              */const o=new b,a=new L(75,window.innerWidth/window.innerHeight,.1,1e3);a.position.set(3,2,4);const r=new z;r.onStart=()=>{console.log("Started loading files.")};r.onProgress=(d,g,u)=>{console.log(`Url：${d}`),console.log(`Progress：${g} / ${u}.`)};r.onLoad=()=>{console.log("ALL Loaded")};r.onError=d=>{console.log("There was an error loading "+d)};const E=new y(1,1,1,100,100,100),$=new G(50,50),I=new M(.5,100,100),m=new l({metalness:.6,roughness:.1}),R=new l({color:14737632}),t=new c(E,m),i=new c($,R),w=new c(I,m);t.position.set(0,.5,0);w.position.set(3,.5,0);i.position.set(0,0,0);i.lookAt(new P(0,1,0));t.castShadow=!0;w.castShadow=!0;i.receiveShadow=!0;o.add(t);o.add(i);o.add(w);const V=new x(4210752,.75),e=new H(16777215);e.position.set(5,5,5);e.castShadow=!0;e.shadow.radius=10;e.shadow.mapSize=new f(2048,4096);e.target=t;e.angle=Math.PI/6;e.distance=0;e.penumbra=0;e.decay=0;o.add(e);o.add(V);const s=new S;s.add(t.position,"x",-5,5,.1).name("cube-x");s.add(e,"angle",0,Math.PI/2,.01).name("angle");s.add(e,"distance",0,50,.1).name("distance");s.add(e,"penumbra",0,1,.1).name("penumbra");s.add(e,"decay",0,2,.01).name("decay");const B=new A(10,10),O=new W(5);o.add(B);o.add(O);const n=new v;n.setSize(window.innerWidth,window.innerHeight);n.shadowMap.enabled=!0;n.physicallyCorrectLights=!0;document.body.appendChild(n.domElement);const p=new C(a,n.domElement);p.enableDamping=!0;window.addEventListener("resize",()=>{a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)});function h(){p.update(),n.render(o,a),requestAnimationFrame(h)}h();

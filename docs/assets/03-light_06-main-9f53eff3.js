import"./modulepreload-polyfill-3cfb730f.js";import{G as S}from"./dat.gui.module-dd30c9f2.js";import{S as M,P as H,B as L,K as C,c as p,j as h,a,t as e,ai as v,aj as W,M as u,e as f,ad as A,a1 as R,G as z,A as j,W as B}from"./three.module-5d2049df.js";import{O as E}from"./OrbitControls-b9148b7a.js";/* empty css              */const n=new M,o=new H(75,window.innerWidth/window.innerHeight,.1,1e3);o.position.set(5,10,5);const O=new L(1,1,1,100,100,100),k=new C(50,50),q=new p(.5,100,100),g=new h({metalness:.6,roughness:.1}),D=new h({color:14737632}),r=new a(O,g),d=new a(k,D),m=new a(q,g);r.position.set(0,.5,0);m.position.set(3,.5,0);d.position.set(0,0,0);d.lookAt(new e(0,1,0));r.castShadow=!0;m.castShadow=!0;d.receiveShadow=!0;n.add(r);n.add(d);n.add(m);const c=new v([new e(-1,2,1),new e(-4,2,2),new e(0,2,-1),new e(2,2,-1),new e(4,2,1),new e(7,2,1),new e(1,2,3),new e(-1,2,1)]),F=new W(c,100,.005,8),I=new a(F,new u({color:65280}));n.add(I);const K=new f(4210752,.75),w=new A(65280,3,60);w.castShadow=!0;const T=new a(new p(.05,100,100),new u({color:65280})),i=new R;i.add(w);i.add(T);i.position.set(1,2,1);n.add(i);n.add(K);const l=new S;l.add(r.position,"x",-5,5,.1).name("cube-x");l.add(w,"distance",0,50,.1).name("distance");l.add(w,"decay",0,2,.01).name("decay");const U=new z(10,10),V=new j(5);n.add(U);n.add(V);const t=new B;t.setSize(window.innerWidth,window.innerHeight);t.shadowMap.enabled=!0;t.physicallyCorrectLights=!0;document.body.appendChild(t.domElement);const G=new E(o,t.domElement);G.enableDamping=!0;window.addEventListener("resize",()=>{o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(window.devicePixelRatio)});let s=0;const $=()=>s<1?(s+=.001,c.getPoint(s)):(s=0,c.getPoint(1));function b(){const{x:y,y:x,z:P}=$();i.position.set(y,x,P),G.update(),t.render(n,o),requestAnimationFrame(b)}b();

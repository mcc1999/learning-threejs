import"./modulepreload-polyfill-3cfb730f.js";import{S as I,P as W,a7 as F,D as L,a as v,W as C,g as D,A as E,G as V,b as j,V as O,w as q}from"./three.module-3817f4fc.js";import{O as K}from"./OrbitControls-876cbc0b.js";import{G as R}from"./dat.gui.module-798d8523.js";/* empty css              */const n=new I,l=new W(75,window.innerWidth/window.innerHeight,.1,1e3);l.position.set(5,5,5);const g=5,U=function(s,r,h){const o=s*Math.PI,c=r*2*Math.PI,d=Math.sin(o)*Math.cos(c)*g,t=Math.cos(o)*g,e=Math.sin(o)*Math.sin(c)*g;h.set(d,t,e)},$=function(s,r,h){const t=s*4*Math.PI,e=r*2*Math.PI,i=(3+Math.cos(3*t/2)*Math.sin(e)-Math.sin(3*t/2)*Math.sin(2*e))*Math.cos(1*t/2),M=(3+Math.cos(3*t/2)*Math.sin(e)-Math.sin(3*t/2)*Math.sin(2*e))*Math.sin(1*t/2),a=Math.sin(3*t/2)*Math.sin(e)+Math.cos(3*t/2)*Math.sin(2*e);h.set(i,M,a)},y=s=>{const r=h=>{const o=new j,c=[],d=[],t=32,e=16;for(let i=0;i<=t;i++){const M=i/t;for(let a=0;a<=e;a++){const S=a/e,p=new O;h(S,M,p),c.push(p.x,p.y,p.z);const w=(e+1)*i+a;if(i<t&&a<e){const b=w,z=w+e+1,B=w+e+2,A=w+1;d.push(b,z,B),d.push(B,A,b)}}}return o.setAttribute("position",new q(c,3)),o.setIndex(d),o};switch(s){case"sphere":return r(U);case"kleinBottle":return r($)}},G=new F({color:302836,side:L,flatShading:!0}),J=y("sphere"),N=y("kleinBottle"),f=new v(J,G),u=new v(N,G);n.add(u);const m=new C;m.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(m.domElement);window.addEventListener("resize",()=>{l.aspect=window.innerWidth/window.innerHeight,l.updateProjectionMatrix(),m.setSize(window.innerWidth,window.innerHeight)});const Q=new D(16777215,.5);n.add(Q);const T=new E(1e3);n.add(T);const X=new V(100,10);n.add(X);const P=new K(l,m.domElement);P.enableDamping=!0;const k={kleinBottle:()=>{n.children.map(s=>s.id).includes(f.id)&&(console.log("remove sphere"),n.remove(f),n.add(u))},sphere:()=>{n.children.map(s=>s.id).includes(u.id)&&(console.log("remove kleinBottle"),n.remove(u),n.add(f))}},x=new R;x.add(k,"kleinBottle").name("kleinBottle");x.add(k,"sphere").name("sphere");function H(){requestAnimationFrame(H),P.update(),m.render(n,l)}H();

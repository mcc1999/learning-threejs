import"./modulepreload-polyfill-3cfb730f.js";import{S as P,P as b,T as G,O as u,M as C,ao as k,a as m,K as A,g as W,ap as v,aq as S,ar as j,X as z,W as B,q as E,C as H}from"./three.module-e6666b2c.js";import{B as g}from"./index-969f7968.js";import{O}from"./OrbitControls-e1d92454.js";/* empty css              */import{c as M}from"./index-87efe648.js";const o=new P,a=new b(75,window.innerWidth/window.innerHeight,.1,1e3);a.position.set(0,0,10);const T=new G;T.load(`${g}images/sunnyDay.jpeg`,e=>{o.background=e});const Y=new u(1,1,.5,3),l=new C({color:16750848}),D=new u(1,1,.5,4),q=new u(.5,.5,.5,4),I=new k(2.5,.5,50),R=new m(I,l),c=new m(D,l),s=new m(Y,l),n=new m(q,l);s.lookAt(0,1,0);s.rotateY(Math.PI/2);c.lookAt(0,1,0);c.rotateY(Math.PI/4);n.rotateY(Math.PI/4);n.position.x=-1;const t=new A;t.add(n);t.add(R);o.add(t);M({text:"Click to Play/Pause Music",textGeometryParameter:{size:1.5,height:.5},textMaterialParameter:{color:16750848}}).then(e=>{e.position.y=-5,o.add(e),e.name="tips"});M({text:"《晴天》",isChinese:!0,textGeometryParameter:{size:1.5,height:.5},textMaterialParameter:{color:16750848}}).then(e=>{e.position.y=5,o.add(e)});const F=new W(16777215,.5);o.add(F);const V=new v;let h=!1;const f=new S;a.add(f);const i=new j(f);V.load(`${g}medias/audio/sunnyDay.mp3`,e=>{i.setBuffer(e),i.setLoop(!0),i.setVolume(.5),h=!0,t.remove(n),t.add(s)});const y=new z;function X(e){var r=new E;r.x=e.clientX/window.innerWidth*2-1,r.y=-(e.clientY/window.innerHeight)*2+1,y.setFromCamera(r,a);const p=y.intersectObjects(t.children,!0);p.length>0&&h&&t.children.includes(p[0].object)&&(i.isPlaying?(console.log("pause"),i.pause(),t.add(s),t.remove(c)):(console.log("play"),i.play(),t.remove(s),t.add(c)))}window.addEventListener("click",X,!1);const d=new B;d.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(d.domElement);window.addEventListener("resize",()=>{a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),d.setSize(window.innerWidth,window.innerHeight)});const x=new O(a,d.domElement);x.enableDamping=!0;const $=new H;let w=0;function L(){var e;if(!h){const r=$.getDelta();w+=r,w>.15&&(n.position.x=n.position.x>=1?-1:n.position.x+1,w=0)}(e=o.getObjectByName("tips"))==null||e.rotateY(.01),requestAnimationFrame(L),x.update(),d.render(o,a)}L();

import"./modulepreload-polyfill-3cfb730f.js";import{S as p,P as u,aH as g,T as h,a6 as b,aN as f,g as P,W as x}from"./three.module-a61639f5.js";import{O as A}from"./OrbitControls-d4484c5c.js";import{B as L}from"./index-969f7968.js";import{G as S}from"./dat.gui.module-dd30c9f2.js";/* empty css              */const d=new p,a=new u(75,window.innerWidth/window.innerHeight,.1,1e3);a.position.set(12,7,-2);const W=new g({color:65535,transparent:!0,size:.1,sizeAttenuation:!0,map:new h().load(`${L}images/textures/ps_smoke.png`)}),r=new b(5,100,100),z=new f(r,W);d.add(z);const C=new P(4210752,.75);d.add(C);const n=new x;n.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(n.domElement);const m=new A(a,n.domElement);m.enableDamping=!0;m.autoRotate=!0;window.addEventListener("resize",()=>{a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)});const t={scale:1,implode:!1,explode:l},c=new S;c.add(t,"implode");c.add(t,"scale",1,10).onChange(o=>{console.log(t.scale,o)});c.add(t,"explode");function l(){const o=t.implode?-1:1,i=r.attributes.position,s=r.attributes.normal;for(let e=0;e<i.count;e++)i.setXYZ(e,i.getX(e)+s.getX(e)*Math.random()*t.scale*o,i.getY(e)+s.getY(e)*Math.random()*t.scale*o,i.getZ(e)+s.getZ(e)*Math.random()*t.scale*o);r.attributes.position.needsUpdate=!0}l();function w(){m.update(),n.render(d,a),requestAnimationFrame(w)}w();
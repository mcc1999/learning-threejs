import"./modulepreload-polyfill-3cfb730f.js";import{O as I,V as p,b as _,S as U,P as V,c as j,M as $,a as C,B as J,d as P,e as K,f as Q,g as X,h as Y,A as Z,G as ee,W as te,C as ne}from"./three.module-054190ed.js";import{O as re}from"./OrbitControls-43e7473f.js";/* empty css              */import{G as ie}from"./dat.gui.module-798d8523.js";class oe extends I{constructor(d=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=d,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(i){i.element instanceof Element&&i.element.parentNode!==null&&i.element.parentNode.removeChild(i.element)})})}copy(d,i){return super.copy(d,i),this.element=d.element.cloneNode(!0),this}}const c=new p,E=new _,z=new _,G=new p,A=new p;class se{constructor(d={}){const i=this;let y,S,x,M;const v={objects:new WeakMap},l=d.element!==void 0?d.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:y,height:S}},this.render=function(e,t){e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),E.copy(t.matrixWorldInverse),z.multiplyMatrices(t.projectionMatrix,E),O(e,e,t),R(e)},this.setSize=function(e,t){y=e,S=t,x=y/2,M=S/2,l.style.width=e+"px",l.style.height=t+"px"};function O(e,t,r){if(e.isCSS2DObject){c.setFromMatrixPosition(e.matrixWorld),c.applyMatrix4(z);const n=e.visible===!0&&c.z>=-1&&c.z<=1&&e.layers.test(r.layers)===!0;if(e.element.style.display=n===!0?"":"none",n===!0){e.onBeforeRender(i,t,r);const u=e.element;u.style.transform="translate(-50%,-50%) translate("+(c.x*x+x)+"px,"+(-c.y*M+M)+"px)",u.parentNode!==l&&l.appendChild(u),e.onAfterRender(i,t,r)}const o={distanceToCameraSquared:B(r,e)};v.objects.set(e,o)}for(let n=0,o=e.children.length;n<o;n++)O(e.children[n],t,r)}function B(e,t){return G.setFromMatrixPosition(e.matrixWorld),A.setFromMatrixPosition(t.matrixWorld),G.distanceToSquared(A)}function F(e){const t=[];return e.traverse(function(r){r.isCSS2DObject&&t.push(r)}),t}function R(e){const t=F(e).sort(function(n,o){if(n.renderOrder!==o.renderOrder)return o.renderOrder-n.renderOrder;const u=v.objects.get(n).distanceToCameraSquared,N=v.objects.get(o).distanceToCameraSquared;return u-N}),r=t.length;for(let n=0,o=t.length;n<o;n++)t[n].element.style.zIndex=r-n}}}const s=new U,h=new V(75,window.innerWidth/window.innerHeight,.1,1e3);h.position.set(0,30,50);const de=new j(.5,50,50),ae=new $({color:65280}),W=new C(de,ae);s.add(W);const f=document.createElement("div");f.innerHTML="Hello Three.js";f.style.color="#fff";f.style.backgroundColor="transparent";const T=new oe(f);T.position.set(0,3,0);W.add(T);const le=new J(10,10,10),ce=new P({metalness:.6,roughness:.1}),he=new K(50,50),ue=new P({color:14737632}),b=new C(le,ce),H=new C(he,ue);s.add(b);s.add(H);b.castShadow=!0;H.receiveShadow=!0;H.lookAt(new p(0,1,0));b.position.set(0,5,0);const we=new Q(4210752,.75);s.add(we);const w=new X(65280);w.castShadow=!0;w.decay=0;const m=new Y;m.add(w);m.add(W);m.position.set(20,20,10);s.add(m);const D=new ie;D.add(w,"intensity",0,5,.1);D.add(w,"decay",0,2,.01);const me=new Z(30),pe=new ee(50,10);s.add(me);s.add(pe);const g=new se;document.body.appendChild(g.domElement);g.setSize(window.innerWidth,window.innerHeight);const a=new te;a.shadowMap.enabled=!0;a.physicallyCorrectLights=!0;a.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(a.domElement);const fe=new re(h,a.domElement);window.addEventListener("resize",()=>{h.aspect=window.innerWidth/window.innerHeight,h.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight),g.setSize(window.innerWidth,window.innerHeight)});const L=new ne(!0);function q(){fe.update(),m.position.set(20*Math.cos(L.getElapsedTime()),20,20*Math.sin(L.getElapsedTime())),a.render(s,h),g.render(s,h),requestAnimationFrame(q)}q();

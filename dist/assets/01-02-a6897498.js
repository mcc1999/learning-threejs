import{E as ke,V as d,b as L,T as D,Q as ue,c as pe,d as u,S as Ie,P as Ye,W as Ce,B as _e,M as He,a as Ke}from"./style-a8c62f4d.js";const me={type:"change"},Z={type:"start"},he={type:"end"};class ze extends ke{constructor(X,be){super(),this.object=X,this.domElement=be,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new d,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:L.ROTATE,MIDDLE:L.DOLLY,RIGHT:L.PAN},this.touches={ONE:D.ROTATE,TWO:D.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return s.phi},this.getAzimuthalAngle=function(){return s.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(t){t.addEventListener("keydown",z),this._domElementKeyEvents=t},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",z),this._domElementKeyEvents=null},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(me),e.update(),i=a.NONE},this.update=function(){const t=new d,n=new ue().setFromUnitVectors(X.up,new d(0,1,0)),r=n.clone().invert(),c=new d,l=new ue,A=2*Math.PI;return function(){const le=e.object.position;t.copy(le).sub(e.target),t.applyQuaternion(n),s.setFromVector3(t),e.autoRotate&&i===a.NONE&&N(ye()),e.enableDamping?(s.theta+=p.theta*e.dampingFactor,s.phi+=p.phi*e.dampingFactor):(s.theta+=p.theta,s.phi+=p.phi);let m=e.minAzimuthAngle,h=e.maxAzimuthAngle;return isFinite(m)&&isFinite(h)&&(m<-Math.PI?m+=A:m>Math.PI&&(m-=A),h<-Math.PI?h+=A:h>Math.PI&&(h-=A),m<=h?s.theta=Math.max(m,Math.min(h,s.theta)):s.theta=s.theta>(m+h)/2?Math.max(m,s.theta):Math.min(h,s.theta)),s.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,s.phi)),s.makeSafe(),s.radius*=R,s.radius=Math.max(e.minDistance,Math.min(e.maxDistance,s.radius)),e.enableDamping===!0?e.target.addScaledVector(g,e.dampingFactor):e.target.add(g),t.setFromSpherical(s),t.applyQuaternion(r),le.copy(e.target).add(t),e.object.lookAt(e.target),e.enableDamping===!0?(p.theta*=1-e.dampingFactor,p.phi*=1-e.dampingFactor,g.multiplyScalar(1-e.dampingFactor)):(p.set(0,0,0),g.set(0,0,0)),R=1,j||c.distanceToSquared(e.object.position)>v||8*(1-l.dot(e.object.quaternion))>v?(e.dispatchEvent(me),c.copy(e.object.position),l.copy(e.object.quaternion),j=!1,!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",se),e.domElement.removeEventListener("pointerdown",oe),e.domElement.removeEventListener("pointercancel",ae),e.domElement.removeEventListener("wheel",ie),e.domElement.removeEventListener("pointermove",H),e.domElement.removeEventListener("pointerup",K),e._domElementKeyEvents!==null&&(e._domElementKeyEvents.removeEventListener("keydown",z),e._domElementKeyEvents=null)};const e=this,a={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let i=a.NONE;const v=1e-6,s=new pe,p=new pe;let R=1;const g=new d;let j=!1;const f=new u,b=new u,P=new u,y=new u,E=new u,T=new u,w=new u,O=new u,S=new u,o=[],x={};function ye(){return 2*Math.PI/60/60*e.autoRotateSpeed}function k(){return Math.pow(.95,e.zoomSpeed)}function N(t){p.theta-=t}function I(t){p.phi-=t}const V=function(){const t=new d;return function(r,c){t.setFromMatrixColumn(c,0),t.multiplyScalar(-r),g.add(t)}}(),W=function(){const t=new d;return function(r,c){e.screenSpacePanning===!0?t.setFromMatrixColumn(c,1):(t.setFromMatrixColumn(c,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(r),g.add(t)}}(),M=function(){const t=new d;return function(r,c){const l=e.domElement;if(e.object.isPerspectiveCamera){const A=e.object.position;t.copy(A).sub(e.target);let Y=t.length();Y*=Math.tan(e.object.fov/2*Math.PI/180),V(2*r*Y/l.clientHeight,e.object.matrix),W(2*c*Y/l.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(V(r*(e.object.right-e.object.left)/e.object.zoom/l.clientWidth,e.object.matrix),W(c*(e.object.top-e.object.bottom)/e.object.zoom/l.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function _(t){e.object.isPerspectiveCamera?R/=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom*t)),e.object.updateProjectionMatrix(),j=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function B(t){e.object.isPerspectiveCamera?R*=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/t)),e.object.updateProjectionMatrix(),j=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function G(t){f.set(t.clientX,t.clientY)}function Ee(t){w.set(t.clientX,t.clientY)}function q(t){y.set(t.clientX,t.clientY)}function ge(t){b.set(t.clientX,t.clientY),P.subVectors(b,f).multiplyScalar(e.rotateSpeed);const n=e.domElement;N(2*Math.PI*P.x/n.clientHeight),I(2*Math.PI*P.y/n.clientHeight),f.copy(b),e.update()}function Pe(t){O.set(t.clientX,t.clientY),S.subVectors(O,w),S.y>0?_(k()):S.y<0&&B(k()),w.copy(O),e.update()}function Te(t){E.set(t.clientX,t.clientY),T.subVectors(E,y).multiplyScalar(e.panSpeed),M(T.x,T.y),y.copy(E),e.update()}function we(t){t.deltaY<0?B(k()):t.deltaY>0&&_(k()),e.update()}function Oe(t){let n=!1;switch(t.code){case e.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?I(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):M(0,e.keyPanSpeed),n=!0;break;case e.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?I(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):M(0,-e.keyPanSpeed),n=!0;break;case e.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?N(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):M(e.keyPanSpeed,0),n=!0;break;case e.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?N(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):M(-e.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),e.update())}function Q(){if(o.length===1)f.set(o[0].pageX,o[0].pageY);else{const t=.5*(o[0].pageX+o[1].pageX),n=.5*(o[0].pageY+o[1].pageY);f.set(t,n)}}function J(){if(o.length===1)y.set(o[0].pageX,o[0].pageY);else{const t=.5*(o[0].pageX+o[1].pageX),n=.5*(o[0].pageY+o[1].pageY);y.set(t,n)}}function $(){const t=o[0].pageX-o[1].pageX,n=o[0].pageY-o[1].pageY,r=Math.sqrt(t*t+n*n);w.set(0,r)}function Me(){e.enableZoom&&$(),e.enablePan&&J()}function Ae(){e.enableZoom&&$(),e.enableRotate&&Q()}function ee(t){if(o.length==1)b.set(t.pageX,t.pageY);else{const r=U(t),c=.5*(t.pageX+r.x),l=.5*(t.pageY+r.y);b.set(c,l)}P.subVectors(b,f).multiplyScalar(e.rotateSpeed);const n=e.domElement;N(2*Math.PI*P.x/n.clientHeight),I(2*Math.PI*P.y/n.clientHeight),f.copy(b)}function te(t){if(o.length===1)E.set(t.pageX,t.pageY);else{const n=U(t),r=.5*(t.pageX+n.x),c=.5*(t.pageY+n.y);E.set(r,c)}T.subVectors(E,y).multiplyScalar(e.panSpeed),M(T.x,T.y),y.copy(E)}function ne(t){const n=U(t),r=t.pageX-n.x,c=t.pageY-n.y,l=Math.sqrt(r*r+c*c);O.set(0,l),S.set(0,Math.pow(O.y/w.y,e.zoomSpeed)),_(S.y),w.copy(O)}function Le(t){e.enableZoom&&ne(t),e.enablePan&&te(t)}function De(t){e.enableZoom&&ne(t),e.enableRotate&&ee(t)}function oe(t){e.enabled!==!1&&(o.length===0&&(e.domElement.setPointerCapture(t.pointerId),e.domElement.addEventListener("pointermove",H),e.domElement.addEventListener("pointerup",K)),xe(t),t.pointerType==="touch"?Re(t):Se(t))}function H(t){e.enabled!==!1&&(t.pointerType==="touch"?je(t):Ne(t))}function K(t){re(t),o.length===0&&(e.domElement.releasePointerCapture(t.pointerId),e.domElement.removeEventListener("pointermove",H),e.domElement.removeEventListener("pointerup",K)),e.dispatchEvent(he),i=a.NONE}function ae(t){re(t)}function Se(t){let n;switch(t.button){case 0:n=e.mouseButtons.LEFT;break;case 1:n=e.mouseButtons.MIDDLE;break;case 2:n=e.mouseButtons.RIGHT;break;default:n=-1}switch(n){case L.DOLLY:if(e.enableZoom===!1)return;Ee(t),i=a.DOLLY;break;case L.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;q(t),i=a.PAN}else{if(e.enableRotate===!1)return;G(t),i=a.ROTATE}break;case L.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;G(t),i=a.ROTATE}else{if(e.enablePan===!1)return;q(t),i=a.PAN}break;default:i=a.NONE}i!==a.NONE&&e.dispatchEvent(Z)}function Ne(t){switch(i){case a.ROTATE:if(e.enableRotate===!1)return;ge(t);break;case a.DOLLY:if(e.enableZoom===!1)return;Pe(t);break;case a.PAN:if(e.enablePan===!1)return;Te(t);break}}function ie(t){e.enabled===!1||e.enableZoom===!1||i!==a.NONE||(t.preventDefault(),e.dispatchEvent(Z),we(t),e.dispatchEvent(he))}function z(t){e.enabled===!1||e.enablePan===!1||Oe(t)}function Re(t){switch(ce(t),o.length){case 1:switch(e.touches.ONE){case D.ROTATE:if(e.enableRotate===!1)return;Q(),i=a.TOUCH_ROTATE;break;case D.PAN:if(e.enablePan===!1)return;J(),i=a.TOUCH_PAN;break;default:i=a.NONE}break;case 2:switch(e.touches.TWO){case D.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Me(),i=a.TOUCH_DOLLY_PAN;break;case D.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Ae(),i=a.TOUCH_DOLLY_ROTATE;break;default:i=a.NONE}break;default:i=a.NONE}i!==a.NONE&&e.dispatchEvent(Z)}function je(t){switch(ce(t),i){case a.TOUCH_ROTATE:if(e.enableRotate===!1)return;ee(t),e.update();break;case a.TOUCH_PAN:if(e.enablePan===!1)return;te(t),e.update();break;case a.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Le(t),e.update();break;case a.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;De(t),e.update();break;default:i=a.NONE}}function se(t){e.enabled!==!1&&t.preventDefault()}function xe(t){o.push(t)}function re(t){delete x[t.pointerId];for(let n=0;n<o.length;n++)if(o[n].pointerId==t.pointerId){o.splice(n,1);return}}function ce(t){let n=x[t.pointerId];n===void 0&&(n=new u,x[t.pointerId]=n),n.set(t.pageX,t.pageY)}function U(t){const n=t.pointerId===o[0].pointerId?o[1]:o[0];return x[n.pointerId]}e.domElement.addEventListener("contextmenu",se),e.domElement.addEventListener("pointerdown",oe),e.domElement.addEventListener("pointercancel",ae),e.domElement.addEventListener("wheel",ie,{passive:!1}),this.update()}}const de=new Ie,F=new Ye(75,window.innerWidth/window.innerHeight,.1,1e3);F.position.z=5;const C=new Ce;C.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(C.domElement);const Ue=new _e(1,1,1),Ze=new He({color:65280}),Fe=new Ke(Ue,Ze);de.add(Fe);const Xe=new ze(F,C.domElement);function fe(){requestAnimationFrame(fe),Xe.update(),C.render(de,F)}fe();
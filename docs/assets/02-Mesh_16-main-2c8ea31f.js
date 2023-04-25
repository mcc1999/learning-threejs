import"./modulepreload-polyfill-3cfb730f.js";import{t as ge,u as Y,V as m,v as h,Q as fe,S as ye,P as be,B as we,M as $,w as A,a as J,x as S,G as Ee,A as Oe,W as je,y as ee,z as te,I as oe}from"./three.module-054190ed.js";import{G as Te}from"./dat.gui.module-798d8523.js";/* empty css              */const H={type:"change"},I={type:"start"},Z={type:"end"};class Me extends ge{constructor(ae,se){super();const e=this,n={NONE:-1,ROTATE:0,ZOOM:1,PAN:2,TOUCH_ROTATE:3,TOUCH_ZOOM_PAN:4};this.object=ae,this.domElement=se,this.domElement.style.touchAction="none",this.enabled=!0,this.screen={left:0,top:0,width:0,height:0},this.rotateSpeed=1,this.zoomSpeed=1.2,this.panSpeed=.3,this.noRotate=!1,this.noZoom=!1,this.noPan=!1,this.staticMoving=!1,this.dynamicDampingFactor=.2,this.minDistance=0,this.maxDistance=1/0,this.keys=["KeyA","KeyS","KeyD"],this.mouseButtons={LEFT:Y.ROTATE,MIDDLE:Y.DOLLY,RIGHT:Y.PAN},this.target=new m;const X=1e-6,M=new m;let D=1,r=n.NONE,u=n.NONE,_=0,v=0,x=0;const s=new m,d=new h,c=new h,U=new m,l=new h,b=new h,f=new h,w=new h,i=[],P={};this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.up0=this.object.up.clone(),this.zoom0=this.object.zoom,this.handleResize=function(){const t=e.domElement.getBoundingClientRect(),o=e.domElement.ownerDocument.documentElement;e.screen.left=t.left+window.pageXOffset-o.clientLeft,e.screen.top=t.top+window.pageYOffset-o.clientTop,e.screen.width=t.width,e.screen.height=t.height};const E=function(){const t=new h;return function(a,p){return t.set((a-e.screen.left)/e.screen.width,(p-e.screen.top)/e.screen.height),t}}(),O=function(){const t=new h;return function(a,p){return t.set((a-e.screen.width*.5-e.screen.left)/(e.screen.width*.5),(e.screen.height+2*(e.screen.top-p))/e.screen.width),t}}();this.rotateCamera=function(){const t=new m,o=new fe,a=new m,p=new m,g=new m,y=new m;return function(){y.set(c.x-d.x,c.y-d.y,0);let L=y.length();L?(s.copy(e.object.position).sub(e.target),a.copy(s).normalize(),p.copy(e.object.up).normalize(),g.crossVectors(p,a).normalize(),p.setLength(c.y-d.y),g.setLength(c.x-d.x),y.copy(p.add(g)),t.crossVectors(y,s).normalize(),L*=e.rotateSpeed,o.setFromAxisAngle(t,L),s.applyQuaternion(o),e.object.up.applyQuaternion(o),U.copy(t),x=L):!e.staticMoving&&x&&(x*=Math.sqrt(1-e.dynamicDampingFactor),s.copy(e.object.position).sub(e.target),o.setFromAxisAngle(U,x),s.applyQuaternion(o),e.object.up.applyQuaternion(o)),d.copy(c)}}(),this.zoomCamera=function(){let t;r===n.TOUCH_ZOOM_PAN?(t=_/v,_=v,e.object.isPerspectiveCamera?s.multiplyScalar(t):e.object.isOrthographicCamera?(e.object.zoom/=t,e.object.updateProjectionMatrix()):console.warn("THREE.TrackballControls: Unsupported camera type")):(t=1+(b.y-l.y)*e.zoomSpeed,t!==1&&t>0&&(e.object.isPerspectiveCamera?s.multiplyScalar(t):e.object.isOrthographicCamera?(e.object.zoom/=t,e.object.updateProjectionMatrix()):console.warn("THREE.TrackballControls: Unsupported camera type")),e.staticMoving?l.copy(b):l.y+=(b.y-l.y)*this.dynamicDampingFactor)},this.panCamera=function(){const t=new h,o=new m,a=new m;return function(){if(t.copy(w).sub(f),t.lengthSq()){if(e.object.isOrthographicCamera){const g=(e.object.right-e.object.left)/e.object.zoom/e.domElement.clientWidth,y=(e.object.top-e.object.bottom)/e.object.zoom/e.domElement.clientWidth;t.x*=g,t.y*=y}t.multiplyScalar(s.length()*e.panSpeed),a.copy(s).cross(e.object.up).setLength(t.x),a.add(o.copy(e.object.up).setLength(t.y)),e.object.position.add(a),e.target.add(a),e.staticMoving?f.copy(w):f.add(t.subVectors(w,f).multiplyScalar(e.dynamicDampingFactor))}}}(),this.checkDistances=function(){(!e.noZoom||!e.noPan)&&(s.lengthSq()>e.maxDistance*e.maxDistance&&(e.object.position.addVectors(e.target,s.setLength(e.maxDistance)),l.copy(b)),s.lengthSq()<e.minDistance*e.minDistance&&(e.object.position.addVectors(e.target,s.setLength(e.minDistance)),l.copy(b)))},this.update=function(){s.subVectors(e.object.position,e.target),e.noRotate||e.rotateCamera(),e.noZoom||e.zoomCamera(),e.noPan||e.panCamera(),e.object.position.addVectors(e.target,s),e.object.isPerspectiveCamera?(e.checkDistances(),e.object.lookAt(e.target),M.distanceToSquared(e.object.position)>X&&(e.dispatchEvent(H),M.copy(e.object.position))):e.object.isOrthographicCamera?(e.object.lookAt(e.target),(M.distanceToSquared(e.object.position)>X||D!==e.object.zoom)&&(e.dispatchEvent(H),M.copy(e.object.position),D=e.object.zoom)):console.warn("THREE.TrackballControls: Unsupported camera type")},this.reset=function(){r=n.NONE,u=n.NONE,e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.up.copy(e.up0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),s.subVectors(e.object.position,e.target),e.object.lookAt(e.target),e.dispatchEvent(H),M.copy(e.object.position),D=e.object.zoom};function V(t){e.enabled!==!1&&(i.length===0&&(e.domElement.setPointerCapture(t.pointerId),e.domElement.addEventListener("pointermove",z),e.domElement.addEventListener("pointerup",R)),ue(t),t.pointerType==="touch"?de(t):ce(t))}function z(t){e.enabled!==!1&&(t.pointerType==="touch"?le(t):re(t))}function R(t){e.enabled!==!1&&(t.pointerType==="touch"?me(t):pe(),Q(t),i.length===0&&(e.domElement.releasePointerCapture(t.pointerId),e.domElement.removeEventListener("pointermove",z),e.domElement.removeEventListener("pointerup",R)))}function q(t){Q(t)}function C(t){e.enabled!==!1&&(window.removeEventListener("keydown",C),u===n.NONE&&(t.code===e.keys[n.ROTATE]&&!e.noRotate?u=n.ROTATE:t.code===e.keys[n.ZOOM]&&!e.noZoom?u=n.ZOOM:t.code===e.keys[n.PAN]&&!e.noPan&&(u=n.PAN)))}function F(){e.enabled!==!1&&(u=n.NONE,window.addEventListener("keydown",C))}function ce(t){if(r===n.NONE)switch(t.button){case e.mouseButtons.LEFT:r=n.ROTATE;break;case e.mouseButtons.MIDDLE:r=n.ZOOM;break;case e.mouseButtons.RIGHT:r=n.PAN;break}const o=u!==n.NONE?u:r;o===n.ROTATE&&!e.noRotate?(c.copy(O(t.pageX,t.pageY)),d.copy(c)):o===n.ZOOM&&!e.noZoom?(l.copy(E(t.pageX,t.pageY)),b.copy(l)):o===n.PAN&&!e.noPan&&(f.copy(E(t.pageX,t.pageY)),w.copy(f)),e.dispatchEvent(I)}function re(t){const o=u!==n.NONE?u:r;o===n.ROTATE&&!e.noRotate?(d.copy(c),c.copy(O(t.pageX,t.pageY))):o===n.ZOOM&&!e.noZoom?b.copy(E(t.pageX,t.pageY)):o===n.PAN&&!e.noPan&&w.copy(E(t.pageX,t.pageY))}function pe(){r=n.NONE,e.dispatchEvent(Z)}function W(t){if(e.enabled!==!1&&e.noZoom!==!0){switch(t.preventDefault(),t.deltaMode){case 2:l.y-=t.deltaY*.025;break;case 1:l.y-=t.deltaY*.01;break;default:l.y-=t.deltaY*25e-5;break}e.dispatchEvent(I),e.dispatchEvent(Z)}}function de(t){switch(K(t),i.length){case 1:r=n.TOUCH_ROTATE,c.copy(O(i[0].pageX,i[0].pageY)),d.copy(c);break;default:r=n.TOUCH_ZOOM_PAN;const o=i[0].pageX-i[1].pageX,a=i[0].pageY-i[1].pageY;v=_=Math.sqrt(o*o+a*a);const p=(i[0].pageX+i[1].pageX)/2,g=(i[0].pageY+i[1].pageY)/2;f.copy(E(p,g)),w.copy(f);break}e.dispatchEvent(I)}function le(t){switch(K(t),i.length){case 1:d.copy(c),c.copy(O(t.pageX,t.pageY));break;default:const o=he(t),a=t.pageX-o.x,p=t.pageY-o.y;v=Math.sqrt(a*a+p*p);const g=(t.pageX+o.x)/2,y=(t.pageY+o.y)/2;w.copy(E(g,y));break}}function me(t){switch(i.length){case 0:r=n.NONE;break;case 1:r=n.TOUCH_ROTATE,c.copy(O(t.pageX,t.pageY)),d.copy(c);break;case 2:r=n.TOUCH_ZOOM_PAN;for(let o=0;o<i.length;o++)if(i[o].pointerId!==t.pointerId){const a=P[i[o].pointerId];c.copy(O(a.x,a.y)),d.copy(c);break}break}e.dispatchEvent(Z)}function G(t){e.enabled!==!1&&t.preventDefault()}function ue(t){i.push(t)}function Q(t){delete P[t.pointerId];for(let o=0;o<i.length;o++)if(i[o].pointerId==t.pointerId){i.splice(o,1);return}}function K(t){let o=P[t.pointerId];o===void 0&&(o=new h,P[t.pointerId]=o),o.set(t.pageX,t.pageY)}function he(t){const o=t.pointerId===i[0].pointerId?i[1]:i[0];return P[o.pointerId]}this.dispose=function(){e.domElement.removeEventListener("contextmenu",G),e.domElement.removeEventListener("pointerdown",V),e.domElement.removeEventListener("pointercancel",q),e.domElement.removeEventListener("wheel",W),e.domElement.removeEventListener("pointermove",z),e.domElement.removeEventListener("pointerup",R),window.removeEventListener("keydown",C),window.removeEventListener("keyup",F)},this.domElement.addEventListener("contextmenu",G),this.domElement.addEventListener("pointerdown",V),this.domElement.addEventListener("pointercancel",q),this.domElement.addEventListener("wheel",W,{passive:!1}),window.addEventListener("keydown",C),window.addEventListener("keyup",F),this.handleResize(),this.update()}}const Pe=new Te,k=new ye,N=new be(75,window.innerWidth/window.innerHeight,.1,1e3);N.position.set(2,2,2);const ne=new we(1,1,1),Ae=new $({color:65280,opacity:.5,transparent:!0,blending:A}),Ne=new J(ne,Ae);k.add(Ne);const ke=new $({color:16711680,opacity:.5,transparent:!0,blending:S}),j=new J(ne,ke);k.add(j);const ve={NoBlending:ee,NormalBlending:A,AdditiveBlending:S,SubtractiveBlending:te,MultiplyBlending:oe},xe=[ee,A,S,te,oe];Pe.add(j.material,"blending",ve).onChange(B=>j.material.blending=xe[B]);const Ce=new Ee(10,10),Le=new Oe(5);k.add(Ce);k.add(Le);const T=new je;T.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(T.domElement);const Se=new Me(N,T.domElement);window.addEventListener("resize",()=>{N.aspect=window.innerWidth/window.innerHeight,N.updateProjectionMatrix(),T.setSize(window.innerWidth,window.innerHeight),T.setPixelRatio(window.devicePixelRatio)});window.document.addEventListener("dblclick",function(){j.material.blending===A?j.material.blending=S:j.material.blending=A},!1);function ie(){Se.update(),T.render(k,N),requestAnimationFrame(ie)}ie();

import"./modulepreload-polyfill-3cfb730f.js";import{ae as F,b as M,w as P,a as T,b8 as m,b9 as v,q as p,ba as E,C as L,d as U,bb as A,aO as n,bc as k,bd as B,k as z,S as Q,P as W,aH as G,T as O,a6 as H,aN as I,g as X,W as V}from"./three.module-a61639f5.js";import{O as j}from"./OrbitControls-d4484c5c.js";import{B as Y}from"./index-969f7968.js";import{G as K}from"./dat.gui.module-dd30c9f2.js";/* empty css              */const Z={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;


		}`};class d{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const q=new F(-1,1,1,-1,0,1),x=new M;x.setAttribute("position",new P([-1,3,0,-1,-1,0,3,-1,0],3));x.setAttribute("uv",new P([0,2,0,0,2,0],2));class w{constructor(e){this._mesh=new T(x,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,q)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class N extends d{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof m?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=v.clone(e.uniforms),this.material=new m({defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new w(this.material)}render(e,t,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class y extends d{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,s){const a=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let r,h;this.inverse?(r=0,h=1):(r=1,h=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),i.buffers.stencil.setFunc(a.ALWAYS,r,4294967295),i.buffers.stencil.setClear(h),i.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(a.EQUAL,1,4294967295),i.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),i.buffers.stencil.setLocked(!0)}}class $ extends d{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class J{constructor(e,t){if(this.renderer=e,t===void 0){const s=e.getSize(new p);this._pixelRatio=e.getPixelRatio(),this._width=s.width,this._height=s.height,t=new E(this._width*this._pixelRatio,this._height*this._pixelRatio),t.texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new N(Z),this.clock=new L}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let s=!1;for(let a=0,i=this.passes.length;a<i;a++){const r=this.passes[a];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),r.needsSwap){if(s){const h=this.renderer.getContext(),C=this.renderer.state.buffers.stencil;C.setFunc(h.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),C.setFunc(h.EQUAL,1,4294967295)}this.swapBuffers()}y!==void 0&&(r instanceof y?s=!0:r instanceof $&&(s=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new p);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const s=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(s,a),this.renderTarget2.setSize(s,a);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(s,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ee extends d{constructor(e,t,s,a,i){super(),this.scene=e,this.camera=t,this.overrideMaterial=s,this.clearColor=a,this.clearAlpha=i!==void 0?i:0,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new U}render(e,t,s){const a=e.autoClear;e.autoClear=!1;let i,r;this.overrideMaterial!==void 0&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor&&(e.getClearColor(this._oldClearColor),i=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor&&e.setClearColor(this._oldClearColor,i),this.overrideMaterial!==void 0&&(this.scene.overrideMaterial=r),e.autoClear=a}}const te={uniforms:{tDiffuse:{value:null},tDisp:{value:null},byp:{value:0},amount:{value:.08},angle:{value:.02},seed:{value:.02},seed_x:{value:.02},seed_y:{value:.02},distortion_x:{value:.5},distortion_y:{value:.6},col_s:{value:.05}},vertexShader:`

		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		uniform int byp; //should we apply the glitch ?

		uniform sampler2D tDiffuse;
		uniform sampler2D tDisp;

		uniform float amount;
		uniform float angle;
		uniform float seed;
		uniform float seed_x;
		uniform float seed_y;
		uniform float distortion_x;
		uniform float distortion_y;
		uniform float col_s;

		varying vec2 vUv;


		float rand(vec2 co){
			return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
		}

		void main() {
			if(byp<1) {
				vec2 p = vUv;
				float xs = floor(gl_FragCoord.x / 0.5);
				float ys = floor(gl_FragCoord.y / 0.5);
				//based on staffantans glitch shader for unity https://github.com/staffantan/unityglitch
				float disp = texture2D(tDisp, p*seed*seed).r;
				if(p.y<distortion_x+col_s && p.y>distortion_x-col_s*seed) {
					if(seed_x>0.){
						p.y = 1. - (p.y + distortion_y);
					}
					else {
						p.y = distortion_y;
					}
				}
				if(p.x<distortion_y+col_s && p.x>distortion_y-col_s*seed) {
					if(seed_y>0.){
						p.x=distortion_x;
					}
					else {
						p.x = 1. - (p.x + distortion_x);
					}
				}
				p.x+=disp*seed_x*(seed/5.);
				p.y+=disp*seed_y*(seed/5.);
				//base from RGB shift shader
				vec2 offset = amount * vec2( cos(angle), sin(angle));
				vec4 cr = texture2D(tDiffuse, p + offset);
				vec4 cga = texture2D(tDiffuse, p);
				vec4 cb = texture2D(tDiffuse, p - offset);
				gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
				//add noise
				vec4 snow = 200.*amount*vec4(rand(vec2(xs * seed,ys * seed*50.))*0.2);
				gl_FragColor = gl_FragColor+ snow;
			}
			else {
				gl_FragColor=texture2D (tDiffuse, vUv);
			}
		}`};class se extends d{constructor(e=64){super();const t=te;this.uniforms=v.clone(t.uniforms),this.heightMap=this.generateHeightmap(e),this.uniforms.tDisp.value=this.heightMap,this.material=new m({uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new w(this.material),this.goWild=!1,this.curF=0,this.generateTrigger()}render(e,t,s){e.capabilities.isWebGL2===!1&&(this.uniforms.tDisp.value.format=A),this.uniforms.tDiffuse.value=s.texture,this.uniforms.seed.value=Math.random(),this.uniforms.byp.value=0,this.curF%this.randX==0||this.goWild==!0?(this.uniforms.amount.value=Math.random()/30,this.uniforms.angle.value=n.randFloat(-Math.PI,Math.PI),this.uniforms.seed_x.value=n.randFloat(-1,1),this.uniforms.seed_y.value=n.randFloat(-1,1),this.uniforms.distortion_x.value=n.randFloat(0,1),this.uniforms.distortion_y.value=n.randFloat(0,1),this.curF=0,this.generateTrigger()):this.curF%this.randX<this.randX/5?(this.uniforms.amount.value=Math.random()/90,this.uniforms.angle.value=n.randFloat(-Math.PI,Math.PI),this.uniforms.distortion_x.value=n.randFloat(0,1),this.uniforms.distortion_y.value=n.randFloat(0,1),this.uniforms.seed_x.value=n.randFloat(-.3,.3),this.uniforms.seed_y.value=n.randFloat(-.3,.3)):this.goWild==!1&&(this.uniforms.byp.value=1),this.curF++,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}generateTrigger(){this.randX=n.randInt(120,240)}generateHeightmap(e){const t=new Float32Array(e*e),s=e*e;for(let i=0;i<s;i++){const r=n.randFloat(0,1);t[i]=r}const a=new k(t,e,e,B,z);return a.needsUpdate=!0,a}dispose(){this.material.dispose(),this.heightMap.dispose(),this.fsQuad.dispose()}}const ie={uniforms:{tDiffuse:{value:null},tSize:{value:new p(256,256)},center:{value:new p(.5,.5)},angle:{value:1.57},scale:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform vec2 center;
		uniform float angle;
		uniform float scale;
		uniform vec2 tSize;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		float pattern() {

			float s = sin( angle ), c = cos( angle );

			vec2 tex = vUv * tSize - center;
			vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;

			return ( sin( point.x ) * sin( point.y ) ) * 4.0;

		}

		void main() {

			vec4 color = texture2D( tDiffuse, vUv );

			float average = ( color.r + color.g + color.b ) / 3.0;

			gl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern() ), color.a );

		}`};class ae extends d{constructor(e,t,s){super();const a=ie;this.uniforms=v.clone(a.uniforms),e!==void 0&&this.uniforms.center.value.copy(e),t!==void 0&&(this.uniforms.angle.value=t),s!==void 0&&(this.uniforms.scale.value=s),this.material=new m({uniforms:this.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.fsQuad=new w(this.material)}render(e,t,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.tSize.value.set(s.width,s.height),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const _=new Q,u=new W(75,window.innerWidth/window.innerHeight,.1,1e3);u.position.set(12,7,-2);const re=new G({color:65535,transparent:!0,size:.1,sizeAttenuation:!0,map:new O().load(`${Y}images/textures/ps_smoke.png`)}),c=new H(5,100,100),oe=new I(c,re);_.add(oe);const ne=new X(4210752,.75);_.add(ne);const f=new V;f.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(f.domElement);const S=new j(u,f.domElement);S.enableDamping=!0;S.autoRotate=!0;window.addEventListener("resize",()=>{u.aspect=window.innerWidth/window.innerHeight,u.updateProjectionMatrix(),f.setSize(window.innerWidth,window.innerHeight),f.setPixelRatio(window.devicePixelRatio)});const l={scale:1,implode:!1,explode:D},b=new K;b.add(l,"implode");b.add(l,"scale",1,10).onChange(o=>{console.log(l.scale,o)});b.add(l,"explode");function D(){const o=l.implode?-1:1,e=c.attributes.position,t=c.attributes.normal;for(let s=0;s<e.count;s++)e.setXYZ(s,e.getX(s)+t.getX(s)*Math.random()*l.scale*o,e.getY(s)+t.getY(s)*Math.random()*l.scale*o,e.getZ(s)+t.getZ(s)*Math.random()*l.scale*o);c.attributes.position.needsUpdate=!0}D();const g=new J(f),le=new ee(_,u);g.addPass(le);const he=new se;g.addPass(he);const fe=new ae;g.addPass(fe);function R(){S.update(),g.render(),requestAnimationFrame(R)}R();

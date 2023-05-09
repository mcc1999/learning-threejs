import"./modulepreload-polyfill-3cfb730f.js";import{$ as p,_ as g,bb as F,aR as i,bc as S,bd as b,n as P,V as v,S as M,P as U,b as C,T as R,c as T,d as W,e as Q,W as G}from"./three.module-5d2049df.js";import{O as L}from"./OrbitControls-b9148b7a.js";import{B as A}from"./index-969f7968.js";import{G as X}from"./dat.gui.module-dd30c9f2.js";import{P as x,F as w,E,R as H}from"./RenderPass-79eb93f1.js";/* empty css              */const I={uniforms:{tDiffuse:{value:null},tDisp:{value:null},byp:{value:0},amount:{value:.08},angle:{value:.02},seed:{value:.02},seed_x:{value:.02},seed_y:{value:.02},distortion_x:{value:.5},distortion_y:{value:.6},col_s:{value:.05}},vertexShader:`

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
		}`};class z extends x{constructor(e=64){super();const s=I;this.uniforms=p.clone(s.uniforms),this.heightMap=this.generateHeightmap(e),this.uniforms.tDisp.value=this.heightMap,this.material=new g({uniforms:this.uniforms,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader}),this.fsQuad=new w(this.material),this.goWild=!1,this.curF=0,this.generateTrigger()}render(e,s,t){e.capabilities.isWebGL2===!1&&(this.uniforms.tDisp.value.format=F),this.uniforms.tDiffuse.value=t.texture,this.uniforms.seed.value=Math.random(),this.uniforms.byp.value=0,this.curF%this.randX==0||this.goWild==!0?(this.uniforms.amount.value=Math.random()/30,this.uniforms.angle.value=i.randFloat(-Math.PI,Math.PI),this.uniforms.seed_x.value=i.randFloat(-1,1),this.uniforms.seed_y.value=i.randFloat(-1,1),this.uniforms.distortion_x.value=i.randFloat(0,1),this.uniforms.distortion_y.value=i.randFloat(0,1),this.curF=0,this.generateTrigger()):this.curF%this.randX<this.randX/5?(this.uniforms.amount.value=Math.random()/90,this.uniforms.angle.value=i.randFloat(-Math.PI,Math.PI),this.uniforms.distortion_x.value=i.randFloat(0,1),this.uniforms.distortion_y.value=i.randFloat(0,1),this.uniforms.seed_x.value=i.randFloat(-.3,.3),this.uniforms.seed_y.value=i.randFloat(-.3,.3)):this.goWild==!1&&(this.uniforms.byp.value=1),this.curF++,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.clear&&e.clear(),this.fsQuad.render(e))}generateTrigger(){this.randX=i.randInt(120,240)}generateHeightmap(e){const s=new Float32Array(e*e),t=e*e;for(let f=0;f<t;f++){const D=i.randFloat(0,1);s[f]=D}const n=new S(s,e,e,b,P);return n.needsUpdate=!0,n}dispose(){this.material.dispose(),this.heightMap.dispose(),this.fsQuad.dispose()}}const V={uniforms:{tDiffuse:{value:null},tSize:{value:new v(256,256)},center:{value:new v(.5,.5)},angle:{value:1.57},scale:{value:1}},vertexShader:`

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

		}`};class j extends x{constructor(e,s,t){super();const n=V;this.uniforms=p.clone(n.uniforms),e!==void 0&&this.uniforms.center.value.copy(e),s!==void 0&&(this.uniforms.angle.value=s),t!==void 0&&(this.uniforms.scale.value=t),this.material=new g({uniforms:this.uniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader}),this.fsQuad=new w(this.material)}render(e,s,t){this.uniforms.tDiffuse.value=t.texture,this.uniforms.tSize.value.set(t.width,t.height),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.clear&&e.clear(),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const c=new M,l=new U(75,window.innerWidth/window.innerHeight,.1,1e3);l.position.set(12,7,-2);const Y=new C({color:65535,transparent:!0,size:.1,sizeAttenuation:!0,map:new R().load(`${A}images/textures/ps_smoke.png`)}),d=new T(5,100,100),Z=new W(d,Y);c.add(Z);const $=new Q(4210752,.75);c.add($);const r=new G;r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);const m=new L(l,r.domElement);m.enableDamping=!0;m.autoRotate=!0;window.addEventListener("resize",()=>{l.aspect=window.innerWidth/window.innerHeight,l.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight),r.setPixelRatio(window.devicePixelRatio)});const a={scale:1,implode:!1,explode:y},h=new X;h.add(a,"implode");h.add(a,"scale",1,10).onChange(o=>{console.log(a.scale,o)});h.add(a,"explode");function y(){const o=a.implode?-1:1,e=d.attributes.position,s=d.attributes.normal;for(let t=0;t<e.count;t++)e.setXYZ(t,e.getX(t)+s.getX(t)*Math.random()*a.scale*o,e.getY(t)+s.getY(t)*Math.random()*a.scale*o,e.getZ(t)+s.getZ(t)*Math.random()*a.scale*o);d.attributes.position.needsUpdate=!0}y();const u=new E(r),O=new H(c,l);u.addPass(O);const k=new z;u.addPass(k);const q=new j;u.addPass(q);function _(){m.update(),u.render(),requestAnimationFrame(_)}_();

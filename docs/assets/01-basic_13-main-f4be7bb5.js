import"./modulepreload-polyfill-3cfb730f.js";import{S as E,P,b as S,T as C,c as h,d as L,e as M,W as T,M as D,a as R,V as p}from"./three.module-26828fde.js";import{O as z}from"./OrbitControls-2d8a967e.js";import{B as A}from"./index-969f7968.js";import{G as W}from"./dat.gui.module-dd30c9f2.js";import{E as B,R as G,S as X}from"./RenderPass-8d98db80.js";/* empty css              */async function U(n){const{resolution:t,recordTime:c=5,filename:o="WebGL.webm"}=n,y=await navigator.mediaDevices.getDisplayMedia({video:t,audio:!0}),s=new MediaRecorder(y),m=[];s.ondataavailable=u=>m.push(u.data),s.onstop=()=>{const u=new Blob(m,{type:m[0].type}),b=URL.createObjectURL(u),x=document.createElement("a");x.href=b,x.download=o,x.click()},s.start(),setTimeout(()=>{s.stop()},c*1e3)}const l=new E,r=new P(75,window.innerWidth/window.innerHeight,.1,1e3);r.position.set(12,7,-2);const V=new S({color:65535,transparent:!0,size:.1,sizeAttenuation:!0,map:new C().load(`${A}images/textures/ps_smoke.png`)}),d=new h(5,100,100),k=new L(d,V);l.add(k);const H=new M(4210752,.75);l.add(H);const a=new T({preserveDrawingBuffer:!0});a.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(a.domElement);const w=new z(r,a.domElement);w.enableDamping=!0;w.autoRotate=!0;window.addEventListener("resize",()=>{r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight),a.setPixelRatio(window.devicePixelRatio)});const e={scale:1,implode:!1,explode:v,downLoadPic:_,recordTime:5,downLoadVideo:j},i=new W;i.add(e,"implode");i.add(e,"scale",1,10).onChange(n=>{console.log(e.scale,n)});i.add(e,"explode");i.add(e,"downLoadPic");i.add(e,"recordTime",1,100,1);i.add(e,"downLoadVideo");function v(){const n=e.implode?-1:1,t=d.attributes.position,c=d.attributes.normal;for(let o=0;o<t.count;o++)t.setXYZ(o,t.getX(o)+c.getX(o)*Math.random()*e.scale*n,t.getY(o)+c.getY(o)*Math.random()*e.scale*n,t.getZ(o)+c.getZ(o)*Math.random()*e.scale*n);d.attributes.position.needsUpdate=!0}function _(){const n=a.domElement.toDataURL(),t=document.createElement("a");t.href=n,t.download="WebGl.png",t.click()}function j(){U({resolution:{width:a.domElement.width,height:a.domElement.height},recordTime:e.recordTime+1})}v();const O=new h(2,2,2),Y=new D({color:65280}),Z=new R(O,Y);l.add(Z);const f=new B(a),F=new G(l,r);f.addPass(F);const $=`
	varying	vec2	texCoord;
	void	main()	{
		texCoord	=	uv;
		gl_Position	=	projectionMatrix	*	modelViewMatrix	*	vec4(	position,	1.0 );
	}
`,q=`
  uniform	sampler2D	tDiffuse;
	uniform	vec2	center;
	uniform	float	scale;
	uniform	vec2	texSize;
	varying	vec2	texCoord;
	void	main()	{
		vec2	tex	=	(texCoord	*	texSize	-	center)	/	scale;
		tex.y	/=	0.866025404;
		tex.x	-=	tex.y	*	0.5;
		vec2	a;
		if	(tex.x	+	tex.y	-	floor(tex.x)	-	floor(tex.y)	<	1.0)
		a	=	vec2(floor(tex.x),	floor(tex.y));
		else	a	=	vec2(ceil(tex.x),	ceil(tex.y));
		vec2	b	=	vec2(ceil(tex.x),	floor(tex.y));
		vec2	c	=	vec2(floor(tex.x),	ceil(tex.y));
		vec3	TEX	=	vec3(tex.x,	tex.y,	1.0	-	tex.x	-	tex.y);
		vec3	A	=	vec3(a.x,	a.y,	1.0	-	a.x	-	a.y);
		vec3	B	=	vec3(b.x,	b.y,	1.0	-	b.x	-	b.y);
		vec3	C	=	vec3(c.x,	c.y,	1.0	-	c.x	-	c.y);
		float	alen	=	length(TEX	-	A);
		float	blen	=	length(TEX	-	B);
		float	clen	=	length(TEX	-	C);
		vec2	choice;
		if	(alen	<	blen)	{
			if	(alen	<	clen)	choice	=	a;
			else	choice	=	c;
		}	else	{
			if	(blen	<	clen)	choice	=	b;
			else	choice	=	c;
		}
		choice.x	+=	choice.y	*	0.5;
		choice.y	*=	0.866025404;
		choice	*=	scale	/	texSize;
		gl_FragColor	=	texture2D(tDiffuse,	choice
				+	center	/	texSize);
	}
`,I={uniforms:{tDiffuse:{type:"t",value:null},scale:{type:"f",value:1},texSize:{type:"v2",value:new p(50,50)},center:{type:"v2",value:new p(.5,.5)}},vertexShader:$,fragmentShader:q},J=new X(I);f.addPass(J);function g(){w.update(),f.render(),requestAnimationFrame(g)}g();

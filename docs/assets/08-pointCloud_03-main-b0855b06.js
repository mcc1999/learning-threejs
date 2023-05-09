import"./modulepreload-polyfill-3cfb730f.js";import{S as w,P as p,f as v,z as r,_ as h,d as g,e as y,W as f}from"./three.module-5d2049df.js";import{O as b}from"./OrbitControls-b9148b7a.js";/* empty css              */const C=`
  attribute float customSize;
  attribute vec3 customColor;
  attribute float customOpacity;

  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
    gl_PointSize = customSize * (300.0 / length(mvPosition.xyz));
    gl_Position = projectionMatrix * mvPosition;
    vColor = customColor;
    vOpacity = customOpacity;
  }
`,M=`
  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    gl_FragColor = vec4(vColor, vOpacity);
  }
`,a=new w,e=new p(75,window.innerWidth/window.innerHeight,.1,1e3);e.position.set(12,7,-2);const P=100,S=100,c=[],d=[],o=new v,m=[],u=[];for(let i=0;i<P;i++)for(let n=0;n<S;n++)m.push(i/10,Math.sin(i/100*Math.PI*2)+Math.cos(n/100*Math.PI)*2,n/10),u.push(Math.random(),Math.random(),Math.random()),c.push(Math.random()*.2),d.push(Math.random()/4+.5);o.setAttribute("position",new r(m,3));o.setAttribute("customColor",new r(u,3));o.setAttribute("customOpacity",new r(d,1));o.setAttribute("customSize",new r(c,1));const z=new h({vertexShader:C,fragmentShader:M,transparent:!0,vertexColors:!0}),O=new g(o,z);a.add(O);const x=new y(4210752,.75);a.add(x);const t=new f;t.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(t.domElement);const s=new b(e,t.domElement);s.enableDamping=!0;s.autoRotate=!0;window.addEventListener("resize",()=>{e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(window.devicePixelRatio)});function l(){s.update(),t.render(a,e),requestAnimationFrame(l)}l();

import{V as L,d as S,_ as H,$ as R,K as T,b as P,w,as as z,aI as U,aH as V,I as k,aL as D,aN as C,a as O}from"./three.module-a61639f5.js";const J=/^[og]\s*(.+)?/,q=/^mtllib /,K=/^usemtl /,W=/^usemap /,B=/\s+/,E=new L,F=new L,G=new L,N=new L,j=new L,_=new S;function $(){const I={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(s,e){if(this.object&&this.object.fromDeclaration===!1){this.object.name=s,this.object.fromDeclaration=e!==!1;return}const n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:s||"",fromDeclaration:e!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(t,i){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const d={index:this.materials.length,name:t||"",mtllib:Array.isArray(i)&&i.length>0?i[i.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(g){const r={index:typeof g=="number"?g:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return r.clone=this.clone.bind(r),r}};return this.materials.push(d),d},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(t){const i=this.currentMaterial();if(i&&i.groupEnd===-1&&(i.groupEnd=this.geometry.vertices.length/3,i.groupCount=i.groupEnd-i.groupStart,i.inherited=!1),t&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return t&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),i}},n&&n.name&&typeof n.clone=="function"){const t=n.clone(0);t.inherited=!0,this.object.materials.push(t)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(s,e){const n=parseInt(s,10);return(n>=0?n-1:n+e/3)*3},parseNormalIndex:function(s,e){const n=parseInt(s,10);return(n>=0?n-1:n+e/3)*3},parseUVIndex:function(s,e){const n=parseInt(s,10);return(n>=0?n-1:n+e/2)*2},addVertex:function(s,e,n){const t=this.vertices,i=this.object.geometry.vertices;i.push(t[s+0],t[s+1],t[s+2]),i.push(t[e+0],t[e+1],t[e+2]),i.push(t[n+0],t[n+1],t[n+2])},addVertexPoint:function(s){const e=this.vertices;this.object.geometry.vertices.push(e[s+0],e[s+1],e[s+2])},addVertexLine:function(s){const e=this.vertices;this.object.geometry.vertices.push(e[s+0],e[s+1],e[s+2])},addNormal:function(s,e,n){const t=this.normals,i=this.object.geometry.normals;i.push(t[s+0],t[s+1],t[s+2]),i.push(t[e+0],t[e+1],t[e+2]),i.push(t[n+0],t[n+1],t[n+2])},addFaceNormal:function(s,e,n){const t=this.vertices,i=this.object.geometry.normals;E.fromArray(t,s),F.fromArray(t,e),G.fromArray(t,n),j.subVectors(G,F),N.subVectors(E,F),j.cross(N),j.normalize(),i.push(j.x,j.y,j.z),i.push(j.x,j.y,j.z),i.push(j.x,j.y,j.z)},addColor:function(s,e,n){const t=this.colors,i=this.object.geometry.colors;t[s]!==void 0&&i.push(t[s+0],t[s+1],t[s+2]),t[e]!==void 0&&i.push(t[e+0],t[e+1],t[e+2]),t[n]!==void 0&&i.push(t[n+0],t[n+1],t[n+2])},addUV:function(s,e,n){const t=this.uvs,i=this.object.geometry.uvs;i.push(t[s+0],t[s+1]),i.push(t[e+0],t[e+1]),i.push(t[n+0],t[n+1])},addDefaultUV:function(){const s=this.object.geometry.uvs;s.push(0,0),s.push(0,0),s.push(0,0)},addUVLine:function(s){const e=this.uvs;this.object.geometry.uvs.push(e[s+0],e[s+1])},addFace:function(s,e,n,t,i,a,d,g,r){const h=this.vertices.length;let o=this.parseVertexIndex(s,h),l=this.parseVertexIndex(e,h),u=this.parseVertexIndex(n,h);if(this.addVertex(o,l,u),this.addColor(o,l,u),d!==void 0&&d!==""){const m=this.normals.length;o=this.parseNormalIndex(d,m),l=this.parseNormalIndex(g,m),u=this.parseNormalIndex(r,m),this.addNormal(o,l,u)}else this.addFaceNormal(o,l,u);if(t!==void 0&&t!==""){const m=this.uvs.length;o=this.parseUVIndex(t,m),l=this.parseUVIndex(i,m),u=this.parseUVIndex(a,m),this.addUV(o,l,u),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(s){this.object.geometry.type="Points";const e=this.vertices.length;for(let n=0,t=s.length;n<t;n++){const i=this.parseVertexIndex(s[n],e);this.addVertexPoint(i),this.addColor(i)}},addLineGeometry:function(s,e){this.object.geometry.type="Line";const n=this.vertices.length,t=this.uvs.length;for(let i=0,a=s.length;i<a;i++)this.addVertexLine(this.parseVertexIndex(s[i],n));for(let i=0,a=e.length;i<a;i++)this.addUVLine(this.parseUVIndex(e[i],t))}};return I.startObject("",!1),I}class X extends H{constructor(s){super(s),this.materials=null}load(s,e,n,t){const i=this,a=new R(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(s,function(d){try{e(i.parse(d))}catch(g){t?t(g):console.error(g),i.manager.itemError(s)}},n,t)}setMaterials(s){return this.materials=s,this}parse(s){const e=new $;s.indexOf(`\r
`)!==-1&&(s=s.replace(/\r\n/g,`
`)),s.indexOf(`\\
`)!==-1&&(s=s.replace(/\\\n/g,""));const n=s.split(`
`);let t=[];for(let d=0,g=n.length;d<g;d++){const r=n[d].trimStart();if(r.length===0)continue;const h=r.charAt(0);if(h!=="#")if(h==="v"){const o=r.split(B);switch(o[0]){case"v":e.vertices.push(parseFloat(o[1]),parseFloat(o[2]),parseFloat(o[3])),o.length>=7?(_.setRGB(parseFloat(o[4]),parseFloat(o[5]),parseFloat(o[6])).convertSRGBToLinear(),e.colors.push(_.r,_.g,_.b)):e.colors.push(void 0,void 0,void 0);break;case"vn":e.normals.push(parseFloat(o[1]),parseFloat(o[2]),parseFloat(o[3]));break;case"vt":e.uvs.push(parseFloat(o[1]),parseFloat(o[2]));break}}else if(h==="f"){const l=r.slice(1).trim().split(B),u=[];for(let c=0,p=l.length;c<p;c++){const b=l[c];if(b.length>0){const v=b.split("/");u.push(v)}}const m=u[0];for(let c=1,p=u.length-1;c<p;c++){const b=u[c],v=u[c+1];e.addFace(m[0],b[0],v[0],m[1],b[1],v[1],m[2],b[2],v[2])}}else if(h==="l"){const o=r.substring(1).trim().split(" ");let l=[];const u=[];if(r.indexOf("/")===-1)l=o;else for(let m=0,c=o.length;m<c;m++){const p=o[m].split("/");p[0]!==""&&l.push(p[0]),p[1]!==""&&u.push(p[1])}e.addLineGeometry(l,u)}else if(h==="p"){const l=r.slice(1).trim().split(" ");e.addPointGeometry(l)}else if((t=J.exec(r))!==null){const o=(" "+t[0].slice(1).trim()).slice(1);e.startObject(o)}else if(K.test(r))e.object.startMaterial(r.substring(7).trim(),e.materialLibraries);else if(q.test(r))e.materialLibraries.push(r.substring(7).trim());else if(W.test(r))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(h==="s"){if(t=r.split(" "),t.length>1){const l=t[1].trim().toLowerCase();e.object.smooth=l!=="0"&&l!=="off"}else e.object.smooth=!0;const o=e.object.currentMaterial();o&&(o.smooth=e.object.smooth)}else{if(r==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+r+'"')}}e.finalize();const i=new T;if(i.materialLibraries=[].concat(e.materialLibraries),!(e.objects.length===1&&e.objects[0].geometry.vertices.length===0)===!0)for(let d=0,g=e.objects.length;d<g;d++){const r=e.objects[d],h=r.geometry,o=r.materials,l=h.type==="Line",u=h.type==="Points";let m=!1;if(h.vertices.length===0)continue;const c=new P;c.setAttribute("position",new w(h.vertices,3)),h.normals.length>0&&c.setAttribute("normal",new w(h.normals,3)),h.colors.length>0&&(m=!0,c.setAttribute("color",new w(h.colors,3))),h.hasUVIndices===!0&&c.setAttribute("uv",new w(h.uvs,2));const p=[];for(let v=0,M=o.length;v<M;v++){const y=o[v],A=y.name+"_"+y.smooth+"_"+m;let f=e.materials[A];if(this.materials!==null){if(f=this.materials.create(y.name),l&&f&&!(f instanceof z)){const x=new z;U.prototype.copy.call(x,f),x.color.copy(f.color),f=x}else if(u&&f&&!(f instanceof V)){const x=new V({size:10,sizeAttenuation:!1});U.prototype.copy.call(x,f),x.color.copy(f.color),x.map=f.map,f=x}}f===void 0&&(l?f=new z:u?f=new V({size:1,sizeAttenuation:!1}):f=new k,f.name=y.name,f.flatShading=!y.smooth,f.vertexColors=m,e.materials[A]=f),p.push(f)}let b;if(p.length>1){for(let v=0,M=o.length;v<M;v++){const y=o[v];c.addGroup(y.groupStart,y.groupCount,v)}l?b=new D(c,p):u?b=new C(c,p):b=new O(c,p)}else l?b=new D(c,p[0]):u?b=new C(c,p[0]):b=new O(c,p[0]);b.name=r.name,i.add(b)}else if(e.vertices.length>0){const d=new V({size:1,sizeAttenuation:!1}),g=new P;g.setAttribute("position",new w(e.vertices,3)),e.colors.length>0&&e.colors[0]!==void 0&&(g.setAttribute("color",new w(e.colors,3)),d.vertexColors=!0);const r=new C(g,d);i.add(r)}return i}}export{X as O};

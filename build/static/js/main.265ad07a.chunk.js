(this.webpackJsonpGA_FINAL=this.webpackJsonpGA_FINAL||[]).push([[0],{237:function(e,n,t){},238:function(e,n,t){},243:function(e,n,t){},249:function(e,n,t){},337:function(e,n,t){"use strict";t.r(n);var o=t(1),a=t(199),r=t.n(a),c=(t(237),t(6)),s=t(22),i=(t(238),t(21)),l=t(7),u=t(9),p=t(31),x=t(13);function v(e){return Object(x.jsx)("span",{className:"error",children:e.error})}var j=t(355),m=t(353),b=t(357),h=t(354);function d(){var e=localStorage.getItem("token");e&&(JSON.parse(atob(e.split(".")[1])).exp<Date.now()/1e3&&(localStorage.removeItem("token"),e=null));return e}var g={setToken:function(e){e?localStorage.setItem("token",e):localStorage.removeItem("token")},getToken:d,removeToken:function(){localStorage.removeItem("token")},getUserFromToken:function(){var e=d();return e?JSON.parse(atob(e.split(".")[1])).user:null}},O="/api/users/";var f,y={signup:function(e){return fetch(O+"signup",{method:"POST",body:e}).then((function(e){if(e.ok)return e.json();throw new Error("Email already taken!")})).then((function(e){var n=e.token;return g.setToken(n)}))},logout:function(){g.removeToken()},login:function(e){return fetch(O+"login",{method:"POST",headers:new Headers({"Content-Type":"application/json"}),body:JSON.stringify(e)}).then((function(e){if(e.ok)return e.json();throw new Error("Bad Credentials!")})).then((function(e){var n=e.token;return g.setToken(n)}))},getUser:function(){return g.getUserFromToken()}},w=t(200);t(201).a.svg(f||(f=Object(w.a)(["\n  color: grey;\n  position: relative;\n  margin: .4rem;\n  width: 7%;\n  height: 7%;\n  scroll-behavior: smooth;\n  & g.skin {\n    cursor: pointer;\n  }\n"])));var _=t(52);t(243);var C=function(e){var n=e.user,t=e.handleLogout;return Object(x.jsxs)("div",{className:"nav",children:[Object(x.jsx)(_.b,{to:"/",children:Object(x.jsx)("img",{className:"nav__logo",src:"https://i.imgur.com/ic7njgq.png",alt:"landscape terrain logo"})}),Object(x.jsxs)("div",{className:"nav__nav",children:[Object(x.jsx)(_.b,{to:!n&&"/login",children:Object(x.jsxs)("div",{onClick:t,className:"nav__option",children:[Object(x.jsx)("span",{className:"nav__optionLineOne",children:n?n.email:"Guest"}),Object(x.jsx)("span",{className:"nav__optionLineTwo",children:n?"Sign Out":"Sign In"})]})}),n?Object(x.jsx)(_.b,{to:"/locations",children:Object(x.jsx)("div",{className:"nav__option",children:Object(x.jsx)("span",{className:"nav__optionLineOne",children:" My Locations"})})}):"",Object(x.jsx)(_.b,{to:"/signup",children:Object(x.jsx)("div",{className:"nav__option",children:Object(x.jsx)("span",{className:"nav__optionLineOne",children:" or Sign Up"})})})]})]})};function k(e){var n=Object(s.g)(),t=Object(o.useState)(""),a=Object(c.a)(t,2),r=a[0],d=a[1],g=Object(o.useState)({username:"",email:"",password:"",passwordConf:"",bio:""}),O=Object(c.a)(g,2),f=O[0],w=O[1];function _(){return(_=Object(p.a)(Object(i.a)().mark((function t(o){return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o.preventDefault(),t.prev=1,t.next=4,y.signup(f);case 4:e.handleSignUpOrLogin(),n("/"),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),console.log(t.t0.message),d(t.t0.message);case 12:case"end":return t.stop()}}),t,null,[[1,8]])})))).apply(this,arguments)}function k(e){w(Object(u.a)(Object(u.a)({},f),{},Object(l.a)({},e.target.name,e.target.value)))}return Object(x.jsx)(j.a,{textAlign:"center",style:{height:"100vh"},verticalAlign:"middle",children:Object(x.jsxs)(j.a.Column,{children:[Object(x.jsx)(C,{user:e.user}),Object(x.jsxs)(m.a,{autoComplete:"off",onSubmit:function(e){return _.apply(this,arguments)},children:[Object(x.jsxs)(b.a,{stacked:!0,children:[Object(x.jsx)(m.a.Input,{name:"username",placeholder:"username",value:f.username,onChange:k,required:!0}),Object(x.jsx)(m.a.Input,{type:"email",name:"email",placeholder:"email",value:f.email,onChange:k,required:!0}),Object(x.jsx)(m.a.Input,{name:"password",type:"password",placeholder:"password",value:f.password,onChange:k,required:!0}),Object(x.jsx)(m.a.Input,{name:"passwordConf",type:"password",placeholder:"Confirm Password",value:f.passwordConf,onChange:k,required:!0}),Object(x.jsx)(h.a,{type:"submit",className:"btn",children:"Signup"})]}),r?Object(x.jsx)(v,{error:r}):null]})]})})}t(249);function z(e){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("h1",{children:"Setup Login Page"}),Object(x.jsxs)("ul",{children:[Object(x.jsx)("li",{children:"Read the Login Model, You can change it to fit your needs"}),Object(x.jsx)("li",{children:"Make sure you read the Login func in the User Controller, to know how it is setup to find the user!"})]})]})}var S=t(106),M=t.n(S),N=(t(266),t(83)),T=t(11),L=t(358),I=t(359);t(351),t(336);var A=t(213),D=t(210),U=t.n(D),F=function(){var e=Object(p.a)(Object(i.a)().mark((function e(n,t,o){var a,r,c,s,l,u;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=function(e,n){return Math.floor((1-Math.log(Math.tan(e*Math.PI/180)+1/Math.cos(e*Math.PI/180))/Math.PI)/2*Math.pow(2,n))},a=function(e,n){return Math.floor((e+180)/360*Math.pow(2,n))},c=Math.abs(a(n,o)),s=Math.abs(r(t,o)),l=[c,s],console.log(l),e.prev=6,e.next=9,U.a.get("https://api.mapbox.com/v4/mapbox.terrain-rgb/".concat(o,"/").concat(c,"/").concat(s,".png?access_token=").concat("pk.eyJ1IjoiZnJhemllcm1hcmsiLCJhIjoiY2wzOTBhZzJiMDFwejNqbzJyMGs0YmZ5NCJ9.2VB9C63HoxzjCpCmbhga9A"),{responseType:"blob"});case 9:u=e.sent.data,e.next=15;break;case 12:return e.prev=12,e.t0=e.catch(6),e.abrupt("return",null);case 15:return e.abrupt("return",URL.createObjectURL(u));case 16:case"end":return e.stop()}}),e,null,[[6,12]])})));return function(n,t,o){return e.apply(this,arguments)}}(),J=t(27),q=t(352),P=Object(q.a)({uTime:0,uColor:new T.Color(0,0,0),uTexture:new T.Texture},"\n    // Allows us to determine how much precision GPU uses\n    precision mediump float;\n\n    //varying allows us to transmit info from vertex shader to the fragment shader\n    varying vec2 vUv;\n    varying float vWave;\n    uniform float uTime;\n\n    //snoise3 function from pragma....\n    //\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_2273911253(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_2273911253(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_2273911253(vec4 x) {\n     return mod289_2273911253(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_2273911253(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise3(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_2273911253 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_2273911253 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_2273911253;\n  vec3 i1 = min( g_2273911253.xyz, l.zxy );\n  vec3 i2 = max( g_2273911253.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_2273911253.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_2273911253(i);\n  vec4 p = permute_2273911253( permute_2273911253( permute_2273911253(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_2273911253.wyz - D_2273911253.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_2273911253 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_2273911253 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_2273911253.xy,h.z);\n  vec3 p3 = vec3(a1_2273911253.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_2273911253(vec4(dot(p0_2273911253,p0_2273911253), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_2273911253 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_2273911253,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n    void main() {\n        // uv coordinates or uv mapping\n      vUv = uv;\n      vec3 pos = position;\n      float noiseFreq = 2.0;\n      float noiseAmp = 0.32;\n      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);\n      pos.z += snoise3(noisePos) * noiseAmp;\n      vWave = pos.z;\n\n      // gl_position eventually will contain all vertex information\n      // modelMatrix - allpys all transformations related to our mesh, ie. scale, rotation, movement\n      // viewMatrix - applys all of the transformations related to the camera, camera movement, rotations, zoom...\n      // projectionMatrix - transforms all collected coordinates and displays final clip space\n      \n      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  \n    }\n  ","\n    precision mediump float;\n    uniform vec3 uColor;\n    uniform float uTime;\n    uniform sampler2D uTexture;\n    varying vec2 vUv;\n    varying float vWave;\n    void main() {\n        float wave = vWave * 0.2;\n        // Split each texture color vector\n        float r = texture2D(uTexture, vUv).r;\n        float g = texture2D(uTexture, vUv).g;\n        float b = texture2D(uTexture, vUv + wave).b;\n      vec3 texture = vec3(r, g, b);\n      // vec4 can be (r, g, b, a) or  (a, y, z, w)\n      // texture is a vec3 + 1.0 which equals a vec4\n      gl_FragColor = vec4(texture, 1.0); \n    }\n  ");Object(J.g)({WaveShaderMaterial:P});var E=function(e,n,t){return.1*(256*e*256+256*n+t)-1e4},G=function(e){var n=e.lng,t=e.lat,a=e.zoom,r=Object(o.useRef)(),s=Object(o.useState)([]),l=Object(c.a)(s,2),u=(l[0],l[1]),v=Object(o.useState)(),j=Object(c.a)(v,2),m=(j[0],j[1]),b=Object(o.useState)(),h=Object(c.a)(b,2),d=h[0],g=h[1],O=Object(o.useState)([]),f=Object(c.a)(O,2),y=(f[0],f[1],Object(o.useState)()),w=Object(c.a)(y,2),_=(w[0],w[1]),C=Object(o.useState)([]),k=Object(c.a)(C,2),z=k[0],S=k[1],M=function(){var e=Object(p.a)(Object(i.a)().mark((function e(){var o,r,c,s,l,p,x,v,j,b,h,d,O;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F(n,t,a);case 2:return o=e.sent,_(o),e.next=6,Object(A.a)(o);case 6:for(r=e.sent,c=Math.sqrt(r.data.length/4),m(c),s=Array.from(r.data),u(s),l=[],p=0;p<s.length;p+=4)x=s[p+0],v=s[p+1],j=s[p+2],b=E(x,v,j),l.push(b);h=Math.max.apply(Math,l)/80,console.log(h),d=new T.PlaneBufferGeometry(256,256,c-1,c-1),O=new Array(d.attributes.position.count),O.fill(1).forEach((function(e,n){d.attributes.position.setZ(n,l[n]/h)})),g(d);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(o.useEffect)((function(){M()}),[z]),Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("button",{className:"generate_button",onClick:function(){console.log("Update Geometry!");var e=Number(n),o=Number(t);S(F(e,o,a))},children:"Generate New 3D Terrrain"}),Object(x.jsxs)(N.a,{className:"canvas",camera:{position:[0,230,295]},children:[Object(x.jsx)("mesh",{geometry:d,position:[60,-70,0],rotation:[4.64,0,0],children:Object(x.jsx)("waveShaderMaterial",{uColor:"hotpink",ref:r,side:T.DoubleSide,wireframe:!0})}),Object(x.jsx)("primitive",{object:new T.AxesHelper(10)}),Object(x.jsx)(L.a,{dampingFactor:.5,enableDamping:"true"}),Object(x.jsx)(I.a,{azimuth:.1,turbidity:10,rayleigh:.5,inclination:.6,distance:1e3})]})]})},Z=t(211),B=t.n(Z);t(335);M.a.accessToken="pk.eyJ1IjoiZnJhemllcm1hcmsiLCJhIjoiY2wzOTBhZzJiMDFwejNqbzJyMGs0YmZ5NCJ9.2VB9C63HoxzjCpCmbhga9A";var R=function(){var e=Object(o.useRef)(),n=Object(o.useState)(-90.00129),t=Object(c.a)(n,2),a=t[0],r=t[1],s=Object(o.useState)(35.1797),l=Object(c.a)(s,2),u=l[0],v=l[1],j=Object(o.useState)(13),m=Object(c.a)(j,2),b=m[0],h=m[1];return Object(o.useEffect)((function(){var n=new M.a.Map({container:e.current,style:"mapbox://styles/mapbox/satellite-streets-v11",center:[a,u],zoom:13,pitch:0,tileSize:256});return n.addControl(new M.a.NavigationControl,"bottom-right"),n.addControl(new B.a({accessToken:M.a.accessToken,mapboxgl:M.a,position:"bottom-left"})),n.on("move",(function(){r(n.getCenter().lng.toFixed(5)),v(n.getCenter().lat.toFixed(5)),h(Math.floor(n.getZoom()))})),n.on("load",Object(p.a)(Object(i.a)().mark((function e(){return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.addLayer({id:"sky",type:"sky",paint:{"sky-type":"atmosphere","sky-atmosphere-sun":[0,90],"sky-atmosphere-sun-intensity":15}}),n.setFog({range:[-.5,20],color:"grey","horizon-blend":.1}),e.next=4,n.once("idle");case 4:case"end":return e.stop()}}),e)})))),function(){return n.remove()}}),[]),Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(C,{}),Object(x.jsxs)("div",{className:"mapbox_map",ref:e,children:[Object(x.jsxs)("div",{className:"long_lat_bar",children:["Longitude: ",a," | Latitude: ",u," | Zoom: ",b]}),Object(x.jsx)("div",{})]}),Object(x.jsx)(G,{className:"plane",lng:a,lat:u,zoom:b})]})},W=function(){return Object(x.jsx)("div",{children:" PLACE HOLDER "})};var H=function(){var e=Object(o.useState)(y.getUser()),n=Object(c.a)(e,2),t=n[0],a=n[1];function r(){a(y.getUser())}return t?Object(x.jsxs)(s.d,{children:[Object(x.jsx)(s.b,{path:"/",element:Object(x.jsx)(R,{})}),Object(x.jsx)(s.b,{path:"/locations",element:Object(x.jsx)(W,{user:t,handleLogout:function(){y.logout(),a(null)}})}),Object(x.jsx)(s.b,{path:"/login",element:Object(x.jsx)(z,{handleSignUpOrLogin:r})}),Object(x.jsx)(s.b,{path:"/signup",element:Object(x.jsx)(k,{handleSignUpOrLogin:r})})]}):Object(x.jsxs)(s.d,{children:[Object(x.jsx)(s.b,{path:"/",element:Object(x.jsx)(R,{})}),Object(x.jsx)(s.b,{path:"/login",element:Object(x.jsx)(z,{handleSignUpOrLogin:r})}),Object(x.jsx)(s.b,{path:"/signup",element:Object(x.jsx)(k,{handleSignUpOrLogin:r})}),Object(x.jsx)(s.b,{path:"/*",element:Object(x.jsx)(s.a,{to:"/"})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.createRoot(document.getElementById("root")).render(Object(x.jsx)(_.a,{children:Object(x.jsx)(H,{})})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[337,1,2]]]);
//# sourceMappingURL=main.265ad07a.chunk.js.map
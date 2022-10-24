import glsl from "babel-plugin-glsl/macro";


const fragmentShader = glsl`

uniform vec3 uColor;
uniform vec3 u_ColorA;
uniform vec3 u_ColorB;


varying vec2 vUv;
varying float vElevation;
varying vec3 vPosition;
varying float vZ;


  void main() {

   vec3 color = mix(u_ColorA, u_ColorB, (vZ * 0.2 )); 
    //gl_FragColor = vec4(color, 1.0);

    gl_FragColor = vec4(color, 1.0);

    }
  `

export default fragmentShader
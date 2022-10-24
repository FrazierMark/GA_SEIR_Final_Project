import glsl from "babel-plugin-glsl/macro";


const vertexShader = glsl`

attribute vec3 aPosition;

varying vec2 vUv;
varying float vElevation;
varying vec3 vPosition;
varying float vZ;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = modelPosition.x;
  float vZ = modelPosition.y;

  //gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vElevation = elevation;
  vUv = uv;
  vPosition = aPosition;
  
}`

export default vertexShader
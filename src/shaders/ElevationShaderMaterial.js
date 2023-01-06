import glsl from 'babel-plugin-glsl/macro'
import * as THREE from 'three'
import { extend, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'


const ElevationShaderMaterialImpl = shaderMaterial(
    {
        uMaxElevation: 54.0,
        uMinElevation: 46.0,
        uMidElevation: 40.0,
    },

    glsl`
   // Allows us to determine how much precision GPU uses
   precision mediump float;

   //varying allows us to transmit info from vertex shader to the fragment shader
   varying vec2 vUv;
   varying float vElevation;
   uniform float uMinElevation;
   uniform float uMidElevation;
   uniform float uMaxElevation;

   //snoise3 function from pragma....
   #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
   void main() {
       // uv coordinates or uv mapping
     vUv = uv;
     vec3 pos = position;
     float noiseFreq = 2.0;
     float noiseAmp = 0.32;
     vec3 noisePos = vec3(pos.x * noiseFreq, pos.y, pos.z);
     pos.z += snoise3(noisePos) * noiseAmp;
     vElevation = pos.z;

     // gl_position eventually will contain all vertex information
     // modelMatrix - allpys all transformations related to our mesh, ie. scale, rotation, movement
     // viewMatrix - applys all of the transformations related to the camera, camera movement, rotations, zoom...
     // projectionMatrix - transforms all collected coordinates and displays final clip space
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
}`,

    glsl`

    precision mediump float;
    uniform vec3 uColor;
    uniform float uMinElevation;
    uniform float uMaxElevation;
    uniform float uMidElevation;
    varying vec2 vUv;
    varying float vElevation;

    //float intensity = vElevation;
    // vec4 can be (r, g, b, a) or  (a, y, z, w)
    // texture is a vec3 + 1.0 which equals a vec4

    void main() {
        float intensity = (vElevation - uMinElevation) / (uMaxElevation - uMinElevation);
        vec3 color = mix(vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), smoothstep(0.0, 1.0, intensity));
        color = mix(color, vec3(1.0, 1.0, 1.0), smoothstep(0.0, 1.0, intensity - 1.0));
        gl_FragColor = vec4(color, 1.0);
}`
)


export function ElevationShaderMaterial(props) {
    extend({ ElevationShaderMaterial: ElevationShaderMaterialImpl })
    const size = useThree((state) => state.size)
    const dpr = useThree((state) => state.viewport.dpr)
    return <elevationShaderMaterial winResolution={[size.width * dpr, size.height * dpr]} {...props} />
}

import glsl from 'babel-plugin-glsl/macro'
import * as THREE from 'three'
import { extend, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'


const ContourLinesMaterialImpl = shaderMaterial(
    {
        uMaxElevation: 54.0,
        uMinElevation: 46.0,
        uDashDiv: 0.4,
        uuDashSeg: 1 / 0.07,
    },

    glsl`
   // Allows us to determine how much precision GPU uses
   precision mediump float;

   //varying allows us to transmit info from vertex shader to the fragment shader
   vec3    position;
   vec3    color;
   float   config;
   vec3 pos = position;

   uniform     mat4    modelViewMatrix;
    uniform     mat4    projectionMatrix;
    uniform     float   u_scale;

   void main() {
    vec4 wPos 	        = modelViewMatrix * vec4( pos, 1.0 );
        
    fragColor			= color;
    fragLen			    = config;
    gl_Position			= projectionMatrix * wPos;
}`,

    glsl`

    precision mediump float;
    uniform float uDashSeg;
    uniform float uDashDiv;
    in  vec3    fragColor;
    in  float   fragLen;
    out vec4    outColor;

    void main(){
        float alpha = 1.0;
        if( fragLen > 0.0 ) alpha = step( uDashDiv, fract( fragLen * uDashSeg ) );
        outColor = vec4( fragColor, alpha );
    }`
)


export function ContourLinesMaterial(props) {
    extend({ ContourLinesMaterial: ContourLinesMaterialImpl })
    const size = useThree((state) => state.size)
    const dpr = useThree((state) => state.viewport.dpr)
    return <contourLinesMaterial winResolution={[size.width * dpr, size.height * dpr]} {...props} />
}

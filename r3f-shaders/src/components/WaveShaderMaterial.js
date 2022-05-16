import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

const WaveShaderMaterial = shaderMaterial(
  // ---  Uniform ------
  // Provide a way to send data from Javascript to our shader
  // Uniforms used in both Vertex and Fragment shaders
  // Able to pass mouse position data, time info, colors, textures, ect...
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },

  // ---- Vertex Shader ----
  // Vertex shader runs first, it receieves attributes, calculates/manipulates
  // the position of each individual vertex. Position the vertices of the geometry

  glsl`
    // Allows us to determine how much precision GPU uses
    precision mediump float;

    //varying allows us to transmit info from vertex shader to the fragment shader
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;

    //snoise3 function from pragma....
    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
    void main() {
        // uv coordinates or uv mapping
      vUv = uv;
      vec3 pos = position;
      float noiseFreq = 2.0;
      float noiseAmp = 0.32;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
      pos.z += snoise3(noisePos) * noiseAmp;
      vWave = pos.z;

      // gl_position eventually will contain all vertex information
      // modelMatrix - allpys all transformations related to our mesh, ie. scale, rotation, movement
      // viewMatrix - applys all of the transformations related to the camera, camera movement, rotations, zoom...
      // projectionMatrix - transforms all collected coordinates and displays final clip space
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
    }
  `,


  // ----- Fragment Shader ------
  // Fragment or (pixel) shader runs after vertex; it sets the color of each individual
  // "fragment" of the geometry

  glsl`
    precision mediump float;
    uniform vec3 uColor;
    uniform float uTime;
    uniform sampler2D uTexture;
    varying vec2 vUv;
    varying float vWave;
    void main() {
        float wave = vWave * 0.2;
        // Split each texture color vector
        float r = texture2D(uTexture, vUv).r;
        float g = texture2D(uTexture, vUv).g;
        float b = texture2D(uTexture, vUv + wave).b;
      vec3 texture = vec3(r, g, b);
      // vec4 can be (r, g, b, a) or  (a, y, z, w)
      // texture is a vec3 + 1.0 which equals a vec4
      gl_FragColor = vec4(texture, 1.0); 
    }
  `
);

// allows us to use this glsl shader as a jsx component
extend({ WaveShaderMaterial });



const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [
    "assets/HOME.png",
  ]);

  return (
    <mesh>
      <planeBufferGeometry args={[3.9, 3.6, 20, 20]} />
      <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} />
    </mesh>
  );
};

export default Wave
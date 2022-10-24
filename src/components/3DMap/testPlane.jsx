import React, { useEffect, useRef, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Sky, shaderMaterial, Float } from "@react-three/drei";
import Light from "./Light";
import { useLocation } from "react-router-dom";
import { getPixels } from "just-give-me-the-pixels";
import { getPngTile } from "../../utils/tilesApi";
import glsl from "babel-plugin-glsl/macro";
import "./Plane.css";

// From - https://docs.mapbox.com/data/tilesets/guides/access-elevation-data/
const rgbToHeight = (r, g, b) => {
  return -10000 + (r * 256 * 256 + g * 256 + b) * 0.1;
};

const WaveShaderMaterial = shaderMaterial(
  //Uniform - Javascript Data sent to the shader
  {
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    u_ColorA: new THREE.Color("#FFE486"),
    u_ColorB: new THREE.Color("#FEB3D9"),
  },

  //Vertex Shader
  glsl`

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
    
}`,

  //Fragment Shader
  glsl`

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
);

extend({ WaveShaderMaterial });

const Plane = ({ lng, lat, zoom, favLocations }) => {
  const ref = useRef();
  const [pixelArray, setPixelArray] = useState([]);
  const [planeSize, setPlaneSize] = useState();
  const [meshGeometry, setMeshGeometry] = useState();
  const [heightDataState, setHeightDataState] = useState([]);
  const [pngData, setPngData] = useState();
  const [update, setUpdate] = useState([]);
  const location = useLocation();

  const handleClick = () => {
    const tempLng = Number(lng);
    const tempLat = Number(lat);
    setUpdate(getPngTile(tempLng, tempLat, zoom));
  };

  const createElevationGrid = async () => {
    const newImage = await getPngTile(lng, lat, zoom);
    setPngData(newImage);

    const imageData = await getPixels(newImage);
    const planeSize = Math.sqrt(imageData.data.length / 4);
    setPlaneSize(planeSize);
    const pixelArray = Array.from(imageData.data);
    setPixelArray(pixelArray);

    let heightData = [];
    for (let i = 0; i < pixelArray.length; i += 4) {
      const r = pixelArray[i + 0];
      const g = pixelArray[i + 1];
      const b = pixelArray[i + 2];
      const height = rgbToHeight(r, g, b);
      heightData.push(height);
    }
    setHeightDataState(heightData);

    // used to normalize data between all elevation levels
    const ratio = Math.max.apply(Math, heightData) / 90;

    const customPlaneGeometry = new THREE.PlaneBufferGeometry(
      256,
      256,
      planeSize - 1,
      planeSize - 1
    );

    //Put HeightData into mesh
    const arr1 = new Array(customPlaneGeometry.attributes.position.count);
    const arr = arr1.fill(1);
    arr.forEach((a, index) => {
      customPlaneGeometry.attributes.position.setZ(
        index,
        heightData[index] / ratio
      );
    });

    setMeshGeometry(customPlaneGeometry);
  };

  useEffect(() => {
    createElevationGrid();
  }, [update]);

  return (
    <>
      {location.pathname !== "/locations" && (
        <button id="submit-btn" onClick={handleClick}>
          Generate New 3D Terrrain
        </button>
      )}
      <Canvas className="canvas" camera={{ position: [0, 100, 195] }}>
        <mesh
          geometry={meshGeometry}
          position={[60, -70, 0]}
          rotation={[4.64, 0, 0]}
        >
          <waveShaderMaterial
            uColor={"hotpink"}
            wireframe={true}
            side={THREE.DoubleSide}
          />
        </mesh>
        <Light />
        <ambientLight intensity={0.5} />
        <OrbitControls dampingFactor={0.5} enableDamping="true" />
        <Sky
          azimuth={0.1}
          turbidity={10}
          rayleigh={0.5}
          inclination={0.6}
          distance={1000}
        />
      </Canvas>
    </>
  );
};

export default Plane;

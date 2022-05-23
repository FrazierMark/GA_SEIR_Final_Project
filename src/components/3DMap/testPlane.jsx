import React, { useEffect, useRef, useState } from "react";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Sky } from "@react-three/drei";
import Light from "./Light";
import { getPixels } from "just-give-me-the-pixels";

// const getPixelArray = async (tilePath) => {
//   try {
//     const imageData = await getPixels(tilePath);

//     // imageData = {width: 256, height: 256, data: Uint8Array(262144)}
//     console.log(imageData);
//   } catch (err) {
//     console.log(err);
//   }
// };

// From - https://docs.mapbox.com/data/tilesets/guides/access-elevation-data/
const rgbToHeight = (r, g, b) => {
  return -10000 + (r * 256 * 256 + g * 256 + b) * 0.1;
};

const Plane = ({ size, position }) => {
  const mesh = useRef(null);
  const [pixelArray, setPixelArray] = useState([]);
  const [planeSize, setPlaneSize] = useState();

  const tileToMesh = async () => {
    try {
      const imageData = await getPixels("./test2.pngraw");

     

      const planeSize = Math.sqrt(imageData.data.length / 4);
      setPlaneSize(planeSize);

      console.log(Array.from(imageData.data));
      const newPixelArray = Array.from(imageData.data);

      setPixelArray(newPixelArray);

      const geometry = new THREE.PlaneBufferGeometry(
        planeSize,
        planeSize,
        // Number of segments
        415,
        415
      );

      // console.log(pixels.length);

      console.log(imageData.data.length);

      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i + 0];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const height = rgbToHeight(r, g, b);

        console.log(geometry.vertices, "Vertices??");

        if (!geometry.attributes.position[i / 4]) {
          console.error(`No vertices at index ${i / 4} found.`);
          break;
        }
        geometry.attributes.position[i / 4].z = height;
      }

      geometry.attributes.position.verticesNeedUpdate = true;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    tileToMesh();
  }, []);

  return (
    <Canvas
      shadows
      camera={{ near: 0.01, far: 190, fov: 45, position: [-17, 43, 33] }}
      gl={{ alpha: false, antialias: false }}
      dpr={[1, 1.5]}
    >
      <mesh ref={mesh} position={position}>
        <planeBufferGeometry args={[planeSize, planeSize, 256, 256]} />
        <meshStandardMaterial side={THREE.DoubleSide} />
      </mesh>
      <Light />
      <OrbitControls
        dampingFactor={0.5}
        enableDamping="true"
        target={[0, 0, 0]}
      />
      <Sky
        azimuth={0.1}
        turbidity={10}
        rayleigh={0.5}
        inclination={0.6}
        distance={500}
      />
    </Canvas>
  );
};

export default Plane;

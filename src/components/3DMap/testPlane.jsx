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



const getHeightData = (allPixels) => {
  let heightData = [];
  for (let i = 0; i < allPixels.length; i += 4) {
    const r = allPixels[i + 0];
    const g = allPixels[i + 1];
    const b = allPixels[i + 2];
    const height = rgbToHeight(r, g, b);
    heightData.push(height);
  }
  return heightData;
};

const Plane = ({ size, position }) => {
  const mesh = useRef(null);
  const [pixelArray, setPixelArray] = useState([]);
  const [planeSize, setPlaneSize] = useState();
  const [meshGeometry, setMeshGeometry] = useState({});
  const [heightData, setHeightData] = useState([]);

  const tileToMesh = async () => {
    try {
      const imageData = await getPixels("./test.png");

      const planeSize = Math.sqrt(imageData.data.length / 4);
      setPlaneSize(planeSize);
      const newPixelArray = Array.from(imageData.data);

      setPixelArray(newPixelArray);

      const customPlaneGeometry = new THREE.PlaneBufferGeometry(
        planeSize,
        planeSize,
        // Number of segments
        250,
        250
      );
      const position = customPlaneGeometry.getAttribute("position");
      console.log(position.array);
      //customPlaneGeometry.rotateX(Math.PI * 0.5);

      console.log(position.array);

      let heightData = [];
      for (let i = 0; i < newPixelArray.length; i += 4) {
        const r = newPixelArray[i + 0];
        const g = newPixelArray[i + 1];
        const b = newPixelArray[i + 2];
        const height = rgbToHeight(r, g, b);
        heightData.push(height);
      }
      // console.log(heightData); // heightData good!!

      // GET HEIGHT DATA IN TO POSITION>...

      // let j = 0;

      // for (let i = 2; i < position.array.length; i += 3) {
      //   position.array[i] = heightData[j] / 10;

      //   j++;
      // }
      // Cleaner....
      const arr1 = new Array(customPlaneGeometry.attributes.position.count);
      const arr = arr1.fill(1);
      arr.forEach((a, index) => {
        customPlaneGeometry.attributes.position.setZ(index, (heightData[index] / 30) * -1);
      });
      

      // console.log(height);
      // console.log(position.array, "Vertices??");
      console.log(position.array);

      setMeshGeometry(customPlaneGeometry);
      position.needsUpdate = true;
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
      camera={{ near: 0.01, far: 390, fov: 45, position: [10, 10, 10] }}
      gl={{ alpha: false, antialias: false }}
      dpr={[1, 1.5]}
    >
      <mesh geometry={meshGeometry} position={[0, 0, -200]}>
        <meshStandardMaterial side={THREE.DoubleSide} wireframe={true} />
      </mesh>
      <primitive object={new THREE.AxesHelper(10)} />
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

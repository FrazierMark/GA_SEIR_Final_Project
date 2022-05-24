import React, { useEffect, useRef, useState } from "react";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Sky } from "@react-three/drei";
import Light from "./Light";
import { getPixels } from "just-give-me-the-pixels";
import {ImageLoader} from '@loaders.gl/images';
import { TerrainLoader } from "@loaders.gl/terrain";
import { load, registerLoaders } from "@loaders.gl/core";

registerLoaders(ImageLoader);

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
      const dataTerrain = await load("./test10.png", TerrainLoader);
      console.log(dataTerrain);
    } catch (err) {
      console.error(err);
    }

    try {
      const imageData = await getPixels("./test10.png");

      const planeSize = Math.sqrt(imageData.data.length / 4);
      setPlaneSize(planeSize);
      const newPixelArray = Array.from(imageData.data);
      setPixelArray(newPixelArray);

      const customPlaneGeometry = new THREE.PlaneBufferGeometry(
        60,
        60,
        199,
        199
        // Number of segments
      );

      //customPlaneGeometry.rotation.x = -Math.PI * 0.5;
      const position = customPlaneGeometry.getAttribute("position");

      //customPlaneGeometry.position.rotateX(Math.PI * 0.5);

      console.log(position.array);

      let heightData = [];
      for (let i = 0; i < newPixelArray.length; i += 4) {
        const r = newPixelArray[i + 0];
        const g = newPixelArray[i + 1];
        const b = newPixelArray[i + 2];
        const height = rgbToHeight(r, g, b);
        heightData.push(Math.round((height / 65535) * 2470));
      }

      // Put HeightData into mesh
      const arr1 = new Array(customPlaneGeometry.attributes.position.count);
      const arr = arr1.fill(1);
      arr.forEach((a, index) => {
        customPlaneGeometry.attributes.position.setZ(
          index,
          (heightData[index] / 65) * 10
        );
      });

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
    <Canvas>
      <mesh
        geometry={meshGeometry}
        position={[0, -105, 0]}
        rotation={[5, 0, 0]}
      >
        <meshStandardMaterial side={THREE.DoubleSide} wireframe={true} />
      </mesh>
      <primitive object={new THREE.AxesHelper(10)} />
      <Light />
      <OrbitControls dampingFactor={0.5} enableDamping="true" />
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

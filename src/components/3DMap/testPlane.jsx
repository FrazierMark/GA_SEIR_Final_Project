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

const options = {
  terrain: {
    elevationDecoder: {
      rScaler: 65536 * 0.1,
      gScaler: 256 * 0.1,
      bScaler: 0.1,
      offset: -10000,
    },
    meshMaxError: 5.0,
    bounds: [83, 329.5, 83.125, 329.625], // note: not the real tile bounds
    tesselator: "martini",
  },
};

const getDataTerrain = async () => {
  try {
    const dataTerrain = await load("./test10.png", TerrainLoader, options);
    console.log(dataTerrain);
    return dataTerrain;
  } catch (err) {
    console.error(err);
  }
};

const Plane = ({ size, position }) => {
  const mesh = useRef(null);
  const [pixelArray, setPixelArray] = useState([]);
  const [planeSize, setPlaneSize] = useState();
  const [meshGeometry, setMeshGeometry] = useState({});
  const [heightData, setHeightData] = useState([]);

  const tileToMesh = async () => {
    const terrainObject = getDataTerrain();

    try {
      const imageData = await getPixels("./test.png");
      console.log(imageData);

      const planeSize = Math.sqrt(imageData.data.length / 4);
      setPlaneSize(planeSize);
      const newPixelArray = Array.from(imageData.data);
      setPixelArray(newPixelArray);

      const customPlaneGeometry = new THREE.PlaneBufferGeometry(
        256,
        256,
        planeSize - 1,
        planeSize - 1
        // Number of segments
      );

      //customPlaneGeometry.rotation.x = -Math.PI * 0.5;
      const position = customPlaneGeometry.getAttribute("position");

      //customPlaneGeometry.position.rotateX(Math.PI * 0.5);

      let heightData = [];
      for (let i = 0; i < newPixelArray.length; i += 4) {
        const r = newPixelArray[i + 0];
        const g = newPixelArray[i + 1];
        const b = newPixelArray[i + 2];
        const height = rgbToHeight(r, g, b);

        heightData.push(height / 10);
      }
      console.log(heightData);
      console.log(customPlaneGeometry.attributes.position);

      const vertices = customPlaneGeometry.attributes.position.array;

      //Put HeightData into mesh
      const arr1 = new Array(customPlaneGeometry.attributes.position.count);
      console.log(arr1.length);
      const arr = arr1.fill(1);
      arr.forEach((a, index) => {
        customPlaneGeometry.attributes.position.setZ(index, heightData[index]);
      });

      setMeshGeometry(customPlaneGeometry);
      customPlaneGeometry.attributes.position.needsUpdate = true;
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
        position={[0, -250, 0]}
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

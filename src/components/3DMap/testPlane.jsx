import React, { useEffect, useRef, useState } from "react";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Sky } from "@react-three/drei";
import Light from "./Light";
import { getPixels } from "just-give-me-the-pixels";

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

const Plane = ({ size, position }) => {
  const mesh = useRef(null);
  const [pixelArray, setPixelArray] = useState([]);
  const [planeSize, setPlaneSize] = useState();
  const [meshGeometry, setMeshGeometry] = useState({});
  const [heightData, setHeightData] = useState([]);

  const tileToMesh = async () => {
    try {
      const imageData = await getPixels("./test10.png");
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
      );

      let heightData = [];
      for (let i = 0; i < newPixelArray.length; i += 4) {
        const r = newPixelArray[i + 0];
        const g = newPixelArray[i + 1];
        const b = newPixelArray[i + 2];
        const height = rgbToHeight(r, g, b);

        heightData.push(height);
      }
      // used to normalize data between all elevation levels
      const ratio = Math.max.apply(Math, heightData) / 100;
      console.log(ratio);

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
      customPlaneGeometry.attributes.position.needsUpdate = true;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    tileToMesh();
  }, []);

  return (
    <Canvas camera={{ position: [0, 40, 195] }}>
      <mesh
        geometry={meshGeometry}
        position={[0, -70, 0]}
        rotation={[4.64, 0, 0]}
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

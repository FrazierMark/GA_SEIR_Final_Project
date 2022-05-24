import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Sky } from "@react-three/drei";
import Light from "./Light";
import { getPixels } from "just-give-me-the-pixels";
import { getPngTile } from "../../utils/tilesApi";
import axios from "axios";

// From - https://docs.mapbox.com/data/tilesets/guides/access-elevation-data/
const rgbToHeight = (r, g, b) => {
  return -10000 + (r * 256 * 256 + g * 256 + b) * 0.1;
};
function lon2tile(lon, zoom) {
  return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
}
function lat2tile(lat, zoom) {
  return Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
      Math.pow(2, zoom)
  );
}

const Plane = ({ lng, lat, zoom }) => {
  const mesh = useRef(null);
  const [pixelArray, setPixelArray] = useState([]);
  const [planeSize, setPlaneSize] = useState();
  const [meshGeometry, setMeshGeometry] = useState({});
  const [heightData, setHeightData] = useState([]);
  const [pngData, setPngData] = useState([]);

  const tileToMesh = async () => {
    //   // console.log(getPngTile(lng, lat, zoom));
    // console.log(pngData);
    // const newImage = getPngTile(lng, lat, zoom);

    const newImage = await getPngTile(lng, lat, zoom);
    setPngData(newImage)

    const imageData = await getPixels(newImage);
    // console.log(imageData);
    const planeSize = Math.sqrt(imageData.data.length / 4);
    setPlaneSize(planeSize);
    const pixelArray = Array.from(imageData.data);
    setPixelArray(pixelArray);

    const customPlaneGeometry = new THREE.PlaneBufferGeometry(
      256,
      256,
      planeSize - 1,
      planeSize - 1
    );

    let heightData = [];
    for (let i = 0; i < pixelArray.length; i += 4) {
      const r = pixelArray[i + 0];
      const g = pixelArray[i + 1];
      const b = pixelArray[i + 2];
      const height = rgbToHeight(r, g, b);

      heightData.push(height);
    }
    // used to normalize data between all elevation levels
    const ratio = Math.max.apply(Math, heightData) / 100;

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
  };

  useEffect(() => {
    tileToMesh();
    // rerenders on change....
  }, []);

  return (
    <>
      <button>Generate New 3D Terrrain</button>
      <Canvas camera={{ position: [0, 40, 195] }}>
        <mesh
          geometry={meshGeometry}
          position={[0, -70, 0]}
          rotation={[4.64, 0, 0]}
        >
          <meshStandardMaterial side={THREE.DoubleSide} wireframe={true} />
        </mesh>
        <primitive object={new THREE.AxesHelper(10)} />
        {/* <Light /> */}
        <OrbitControls dampingFactor={0.5} enableDamping="true" />
        <Sky
          azimuth={0.1}
          turbidity={10}
          rayleigh={0.5}
          inclination={0.6}
          distance={500}
        />
      </Canvas>
    </>
  );
};;;;;;;

export default Plane;

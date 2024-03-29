import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Sky, shaderMaterial, Float } from "@react-three/drei";
import { useLocation } from "react-router-dom";
import { getPixels } from "just-give-me-the-pixels";
import { getPngTile } from "../../utils/tilesApi";
import glsl from "babel-plugin-glsl/macro";
import "./Plane.css";
import { rgbToHeight } from "./PlaneFunctions.jsx";
import { ElevationShaderMaterial } from "../../shaders/ElevationShaderMaterial";
import { ContourLinesMaterial } from "../../shaders/ContourLinesMaterial";
import { useControls } from "leva";
import Light from "./Light";

const Plane = ({ lng, lat, zoom, favLocations }) => {
  const [pixelArray, setPixelArray] = useState([]);
  const [planeSize, setPlaneSize] = useState();
  const [meshGeometry, setMeshGeometry] = useState();
  const [heightDataState, setHeightDataState] = useState([]);
  const [pngData, setPngData] = useState();
  const [update, setUpdate] = useState([]);
  const location = useLocation();

  const { ...config } = useControls({
    uMinElevation: { value: 46.0, min: 0, max: 100 },
    uMaxElevation: { value: 54.0, min: 0, max: 100 },
    uDashDiv: { value: 0.4, min: 0, max: 10 },
    uDashSeg: { value: 1 / 0.07, min: 0, max: 15 },
  });

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
    const ratio = Math.max.apply(Math, heightData) / 80;

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
        // heightData[index] / ratio
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
        <Light />
        <Float rotationIntensity={0.4}>
          <mesh
            geometry={meshGeometry}
            position={[60, -70, 0]}
            rotation={[4.64, 0, 0]}
          >
            {/* <ElevationShaderMaterial
              uMaxElevation={54}
              uMinElevation={46}
              wireframe={true}
              side={THREE.DoubleSide}
              {...config}
            /> */}
            <ContourLinesMaterial
              uMaxElevation={54}
              uMinElevation={46}
              uDashDiv={0.4}
              uDashSeg={1 / 0.07}
              wireframe={true}
              side={THREE.DoubleSide}
              {...config}
            />
          </mesh>
        </Float>
        <ambientLight intensity={0.9} />
        <OrbitControls dampingFactor={0.3} enableDamping="true" />
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

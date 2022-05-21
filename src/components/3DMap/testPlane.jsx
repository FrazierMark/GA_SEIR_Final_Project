import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import Light from "./Light";
import * as GeoTIFF from "geotiff";

const Plane = ({ size, position, matCapTexture }) => {
  useEffect(() => {
    const createTerrain = async () => {
      try {
        const rawTiff = await GeoTIFF.fromUrl("./sample.tif");
        const tifImage = await rawTiff.getImage();
        const image = {
          width: tifImage.getWidth(),
          height: tifImage.getHeight(),
        };
        const data = await tifImage.readRasters({ interleave: true });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    createTerrain();
  }, []);

  return (
    <Canvas
      shadows
      camera={{ near: 0.01, far: 190, fov: 45, position: [-17, 43, 33] }}
      gl={{ alpha: false, antialias: false }}
      dpr={[1, 1.5]}
    >
      <mesh position={position}>
        <planeGeometry args={[10, 10]} />
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

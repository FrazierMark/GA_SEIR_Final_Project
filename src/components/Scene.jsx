import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { PMREMGenerator, CylinderGeometry } from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import {
  Environment,
  OrbitControls,
  Sky,
  Stars,
  Sparkles,
} from "@react-three/drei";
// import { mergeBufferGeometries } from
import Wave from "./WaveShaderMaterial";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import { BoxGeometry } from "three";
import { Vector2 } from "three";
import SimplexNoise from "simplex-noise";
import Light from "../components/Light";
import { SphereBufferGeometry } from "three";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const HDRI = "assets/envmap.hdr";
let envMap;

const MAX_HEIGHT = 10;
const STONE_HEIGHT = MAX_HEIGHT * 0.8;
const DIRT_HEIGHT = MAX_HEIGHT * 0.7;
const GRASS_HEIGHT = MAX_HEIGHT * 0.5;
const SAND_HEIGHT = MAX_HEIGHT * 0.3;
const DIRT2_HEIGHT = MAX_HEIGHT * 0;

const EnvMap = () => {
  const { gl } = useThree();
  let pmrem = new PMREMGenerator(gl);
  pmrem.compileEquirectangularShader();
  let map;
  const envTexture = useLoader(RGBELoader, HDRI);
  let rt = pmrem.fromEquirectangular(envTexture);
  map = rt.texture;
  return map;
};

// Place holder geometries based on height
let stoneGeometries = new BoxGeometry(0, 0, 0);
let dirtGeometries = new BoxGeometry(0, 0, 0);
let dirt2Geometries = new BoxGeometry(0, 0, 0);
let sandGeometries = new BoxGeometry(0, 0, 0);
let grassGeometries = new BoxGeometry(0, 0, 0);

const getSmallStoneGeometry = (height, position) => {
  const posistionX = Math.random() * 0.4;
  const positionZ = Math.random() * 0.4;
  const stoneGeo = new SphereBufferGeometry(Math.random() * 0.3 + 0.1, 7, 7);
  // Adds random variation to the created stone...
  stoneGeo.translate(position.x + posistionX, height, position.y + positionZ);
  return stoneGeo;
};

const getTreeGeometry = (height, position) => {
  const treeHeight = Math.random() * 1 + 1.25;
  // Stacked pyramids will resemble a tree
  const geo = new CylinderGeometry(0, 1.5, treeHeight, 3);
  geo.translate(position.x, height + treeHeight * 0 + 1, position.y);

  const geo2 = new CylinderGeometry(0, 1.15, treeHeight, 3);
  geo.translate(position.x, height + treeHeight * 0.6 + 1, position.y);

  const geo3 = new CylinderGeometry(0, 0.8, treeHeight, 3);
  geo.translate(position.x, height + treeHeight * 1.25 + 1, position.y);

  return mergeBufferGeometries([geo, geo2, geo3]);
};

// Making hexagons with cylinderGeometry
const hexGeometry = (height, position) => {
  let geo = new CylinderGeometry(1, 1, height, 6, 1, false);
  // Posistion will later be past-in
  geo.translate(position.x, height * 0.5, position.y);
  return geo;
};

// Merges many hexagons into a single geometry (hexagonGeometry)
// Everytime makeHex() is called, we will append new geometries onto hexagonGeometries
const makeHex = (height, position) => {
  let hexGeo = hexGeometry(height, position);
  //hexagonGeometries = mergeBufferGeometries([hexagonGeometries, geo])
  if (height > STONE_HEIGHT) {
    stoneGeometries = mergeBufferGeometries([hexGeo, stoneGeometries]);
    if (Math.random() > 0.8) {
      grassGeometries = mergeBufferGeometries([
        grassGeometries,
        getTreeGeometry(height, position),
      ]);
    }
    // Merging smallStone geometry with the large stone pillars
    if (Math.random() > 0.8) {
      stoneGeometries = mergeBufferGeometries([
        stoneGeometries,
        getSmallStoneGeometry(height, position),
      ]);
    }
  } else if (height > DIRT_HEIGHT) {
    dirtGeometries = mergeBufferGeometries([hexGeo, dirtGeometries]);
  } else if (height > GRASS_HEIGHT) {
    grassGeometries = mergeBufferGeometries([hexGeo, grassGeometries]);
  } else if (height > SAND_HEIGHT) {
    sandGeometries = mergeBufferGeometries([hexGeo, sandGeometries]);

    if (Math.random() > 0.85 && stoneGeometries) {
      stoneGeometries = mergeBufferGeometries([
        stoneGeometries,
        getSmallStoneGeometry(height, position),
      ]);
    }
  } else if (height > DIRT2_HEIGHT) {
    dirt2Geometries = mergeBufferGeometries([hexGeo, dirt2Geometries]);
    // Populating our grassGeometry with trees...
  }
};

// Offsets each row when creating hexGrid
// Everytime a tile is odd we add an offset(* 0.5)
const createTilePosition = (tileX, tileY) => {
  return new Vector2((tileX + (tileY % 2) * 0.5) * 1.77, tileY * 1.535); //(1.77 is the x-spacing) (1.535 is the y-spacing)
};

// creates simplex object aka noise distortion/displacement map
const simplex = new SimplexNoise();

for (let i = -15; i < 15; i++) {
  for (let j = -15; j < 15; j++) {
    let tilePosition = createTilePosition(i, j);

    // displacementHeight is between -1 and 1
    let displacementHeight = (simplex.noise2D(i * 0.1, j * 0.1) + 1) * 0.5;
    // makes larger hexagons a bit higher
    displacementHeight = Math.pow(displacementHeight, 1.5);
    // parameters are height and position, height determined by simplex displacement/height map
    makeHex(displacementHeight * MAX_HEIGHT, tilePosition);
  }
}

const Tree = () => {
  const gltf = useLoader(GLTFLoader, "./assets/tree.glb");
  return (
    <Suspense fallback={null}>
      <primitive
        object={gltf.scene}
        dispose={null}
        scale={[0.002, 0.002, 0.002]}
      />
    </Suspense>
  );
};

const HexagonGrid = (props) => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [dirt, dirt2, grass, sand, water, stone] = useLoader(
    THREE.TextureLoader,
    [
      "https://makio135.com/matcaps/64/3D1F12_653821_070404_22130B-64px.png",
      "https://makio135.com/matcaps/64/48270F_C4723B_9B5728_7B431B-64px.png",
      "https://makio135.com/matcaps/64/04E804_04B504_04CB04_33FC33-64px.png",
      "https://makio135.com/matcaps/64/A971A9_E8CBE8_D4A8D4_DCB3DC-64px.png",
      "https://makio135.com/matcaps/64/677E93_36444D_99A9BA_435464-64px.png",
      "https://makio135.com/matcaps/64/837667_DCD4C8_C5BAAC_3C2E22-64px.png",
    ]
  );
  envMap = EnvMap();

  return (
    <>
      <mesh geometry={dirt2Geometries} castShadow={true} receiveShadow={true}>
        {/* <meshStandardMaterial envMap={envMap} envMapIntensity={1.135} flatShading={true} map={dirt2} /> */}
        <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={dirt2} />
      </mesh>
      <mesh geometry={sandGeometries} castShadow={true} receiveShadow={true}>
        <meshStandardMaterial
          envMap={envMap}
          envMapIntensity={1.135}
          flatShading={true}
          map={sand}
        />
        {/* <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} /> */}
      </mesh>
      <mesh geometry={grassGeometries} castShadow={true} receiveShadow={true}>
        <meshStandardMaterial
          envMap={envMap}
          envMapIntensity={1.135}
          flatShading={true}
          map={grass}
        />
        {/* <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} /> */}
      </mesh>
      <mesh geometry={dirtGeometries} castShadow={true} receiveShadow={true}>
        <meshStandardMaterial
          envMap={envMap}
          envMapIntensity={1.135}
          flatShading={true}
          map={dirt}
        />
        {/* <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} /> */}
      </mesh>
      <mesh geometry={stoneGeometries} castShadow={true} receiveShadow={true}>
        <meshStandardMaterial
          envMap={envMap}
          envMapIntensity={1.135}
          flatShading={true}
          map={stone}
        />
        {/* <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} /> */}
        <Tree />
      </mesh>
    </>
  );
};

const Water = () => {
  // const ref = useRef();
  // useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  let cylinderGeo = new BoxGeometry(56, MAX_HEIGHT * 0.2, 48);
  const water = useLoader(THREE.TextureLoader, "assets/textures/water.jpeg");
  return (
    <mesh
      geometry={cylinderGeo}
      position={[0, MAX_HEIGHT * 0.1, 0]}
      castShadow={true}
      receiveShadow={true}
    >
      <meshPhysicalMaterial
        envMap={envMap}
        color="#55aaff"
        ior={1}
        transmission={1}
        transparent={true}
        thickness={0.2}
        envMapIntensity={0.2}
        roughness={2}
        roughnessMap={water}
        metalnessMap={water}
      />
      {/* <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={water} /> */}
    </mesh>
  );
};

const Container = () => {
  let boxContainer = new BoxGeometry(57, MAX_HEIGHT * 0.2, 49);
  const dirt = useLoader(
    THREE.TextureLoader,
    "https://makio135.com/matcaps/64/6E524D_8496C5_AF6624_100B11-64px.png"
  );
  return (
    <mesh geometry={boxContainer} castShadow={true} receiveShadow={true}>
      <meshPhysicalMaterial envMap={envMap} map={dirt} envMapIntensity={0.8} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas
      shadows
      camera={{ near: 0.01, far: 190, fov: 45, position: [-17, 43, 33] }}
      gl={{ alpha: false, antialias: false }}
      dpr={[1, 1.5]}
    >
      {/* <Stars radius={10} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
      <Sky
        azimuth={0.1}
        turbidity={10}
        rayleigh={0.5}
        inclination={0.6}
        distance={500}
      />
      {/* <Sparkles count={10000} speed={0.2} opacity={1} color={[3, 40, 44]} size={1} scale={20} noise={1}/> */}
      <Environment preset="dawn" />
      <HexagonGrid props={<Tree />} />
      <Light />
      <Water />
      <Container transparent={true} />
      <OrbitControls
        dampingFactor={0.5}
        enableDamping="true"
        target={[0, 0, 0]}
      />
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>
  );
};
export default Scene;

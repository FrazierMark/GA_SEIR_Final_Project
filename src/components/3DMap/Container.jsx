import * as THREE from "three";

const Container = () => {
  let boxContainer = new THREE.BoxBufferGeometry(256, 10, 256, 3, 3);

  return (
    <mesh geometry={boxContainer} position={[60, -25, -4]}>
      <meshStandardMaterial wireframe={true} color={"black"} />
    </mesh>
  );
};

export default Container;

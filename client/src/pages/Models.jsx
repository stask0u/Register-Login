import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Navbar from "./components/Navbar";

function Box() {
  const mesh = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}

function Models() {
  return (
    <>
      <Navbar></Navbar>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box />
        </Canvas>
      </div>
    </>
  );
}

export default Models;

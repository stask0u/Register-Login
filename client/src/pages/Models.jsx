import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Navbar from "./components/Navbar";
import SingleModel from "./components/SingleModel";
import "./styles/Models.css"

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
      <div className="modelsPlaceholder">
        <SingleModel MeshToRender={Box}></SingleModel>
        <SingleModel MeshToRender={Box}></SingleModel>
        <SingleModel MeshToRender={Box}></SingleModel>
        <SingleModel MeshToRender={Box}></SingleModel>
        <SingleModel MeshToRender={Box}></SingleModel>
        <SingleModel MeshToRender={Box}></SingleModel>
        <SingleModel MeshToRender={Box}></SingleModel>
      </div>
    </>
  );
}

export default Models;

import "./SingleModel.css";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SingleModel({MeshToRender}) {
  return (
    <div className="modelPlaceholder">
      <Canvas>
        <pointLight position={[1, 1, 1]} intensity={5} />
        <MeshToRender />
      </Canvas>
    </div>
  );
}

export default SingleModel;

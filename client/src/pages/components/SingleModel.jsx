import "./SingleModel.css";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {OrbitControls,Stats } from '@react-three/drei';

function SingleModel({MeshToRender, meshProps}) {
  return (
    <div className="modelPlaceholder">
      <Canvas>
        <pointLight position={[2, 2, 2]} intensity={10} />
        <pointLight position={[-2, -2, 2]} intensity={10} />
        <pointLight position={[-2, 2, 2]} intensity={10} />
        <pointLight position={[2, -2, 2]} intensity={10} />
        <MeshToRender {...meshProps} />
        <OrbitControls/>
        <Stats/>
      </Canvas>
    </div>
  );
}

export default SingleModel;

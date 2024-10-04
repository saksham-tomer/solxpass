"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Html,
  Environment,
  useProgress,
  OrbitControls,
} from "@react-three/drei";
import { Model } from "./Mickey";

const Experience = () => {
  return (
    <div
      style={{
        width: "20vw",
        height: "20vh",
        position: "relative",
        zIndex: "20",
      }}
    >
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <directionalLight intensity={1} position={[5, 5, 5]} castShadow />
          {/* <Environment preset="sunset" background /> */}
          <Html position={[0, 2, 0]} distanceFactor={8} occlude></Html>
          <Model />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Experience;

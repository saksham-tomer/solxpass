"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Html,
  Environment,
  useProgress,
  OrbitControls,
} from "@react-three/drei";
import { Model } from "./Shirikami";

const Experience = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { progress, loaded, total } = useProgress();

  useEffect(() => {
    if (loaded === total && progress === 100) {
      // Add a small delay to ensure everything is ready
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress, loaded, total]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
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
          <Model animation={"Animation"} />
          {/* <OrbitControls /> */}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Experience;

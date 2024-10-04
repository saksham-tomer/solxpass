"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Html,
  Environment,
  useProgress,
  OrbitControls,
} from "@react-three/drei";
import { Model } from "./Bangbo";

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
        position: "absolute",
        zIndex: "20",
      }}
    >
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <directionalLight intensity={1} position={[5, 5, 5]} castShadow />
          {/* <Environment preset="sunset" background /> */}
          <Html position={[-12, 2, 0]} occlude>
            {/* <div className="w-[40rem]">
              <p className="font-impact leading-tight text-white min-w-full text-sm md:text-4xl ">
                Some more free than others reality has evolved beyond the
                physical to FACILITATE & create new digital tribes
              </p>
            </div> */}
          </Html>
          <Model animation={"Take 001"} />
          {/* <OrbitControls /> */}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Experience;

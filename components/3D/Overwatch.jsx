"use client";
import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Overwatch.glb");
  return (
    <group {...props} dispose={null}>
      <group
        rotation={[-Math.PI / 2, 0, 3.6]}
        position={[0, -4, 0]}
        scale={0.8}
      >
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.Material1}
        />
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.Material2}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Overwatch.glb");

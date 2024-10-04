import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Goddess.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, -0.8]} scale={8} position={[1, -6, 0]}>
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.aliceNIKKEEarbuds}
        />
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.aliceNIKKEACC}
        />
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.aliceNIKKEAddon}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.aliceNIKKEBag}
        />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials.aliceNIKKEFace}
        />
        <mesh
          geometry={nodes.Object_7.geometry}
          material={materials.aliceNIKKEEyes}
        />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.aliceNIKKEhairBangs}
        />
        <mesh
          geometry={nodes.Object_9.geometry}
          material={materials.aliceNIKKEHairFront}
        />
        <mesh
          geometry={nodes.Object_10.geometry}
          material={materials.aliceNIKKEHairBack}
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials.aliceNIKKEShoe}
        />
        <mesh
          geometry={nodes.Object_12.geometry}
          material={materials.aliceNIKKEBottom}
        />
        <mesh
          geometry={nodes.Object_13.geometry}
          material={materials.aliceNIKKECoat}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Goddess.glb");

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Mickey.glb");
  return (
    <group {...props} dispose={null}>
      <group
        scale={0.048}
        position={[14.6, -18, 1.2]}
        rotation={[-Math.PI / 8, 2.7, 0]}
      >
        <group
          position={[326.831, 148.032, 0.409]}
          rotation={[-1.638, 0, -0.668]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cylinder_White_0.geometry}
            material={materials.White}
          />
          <mesh
            geometry={nodes.Cylinder_Outline_0.geometry}
            material={materials.Outline}
          />
        </group>
        <group
          position={[437.952, 34.333, -17.244]}
          rotation={[-Math.PI / 2, 0, 0.442]}
          scale={100}
        >
          <mesh
            geometry={nodes.Torus001_Textures_0.geometry}
            material={materials.Textures}
          />
          <mesh
            geometry={nodes.Torus001_Black_0.geometry}
            material={materials.Black}
          />
          <mesh
            geometry={nodes.Torus001_Outline_0.geometry}
            material={materials.Outline}
          />
        </group>
        <group
          position={[294.674, 34.334, -22.143]}
          rotation={[-Math.PI / 2, 0, -0.668]}
          scale={100}
        >
          <mesh
            geometry={nodes.Torus002_Textures_0.geometry}
            material={materials.Textures}
          />
          <mesh
            geometry={nodes.Torus002_Black_0.geometry}
            material={materials.Black}
          />
          <mesh
            geometry={nodes.Torus002_Outline_0.geometry}
            material={materials.Outline}
          />
        </group>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            geometry={nodes.Retopo_Sphere004_Textures_0.geometry}
            material={materials.Textures}
          />
          <mesh
            geometry={nodes.Retopo_Sphere004_Outline_0.geometry}
            material={materials.Outline}
          />
        </group>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            geometry={nodes.Retopo_Sphere002_Textures_0.geometry}
            material={materials.Textures}
          />
          <mesh
            geometry={nodes.Retopo_Sphere002_Outline_0.geometry}
            material={materials.Outline}
          />
        </group>
        <group
          position={[401.828, 147.631, -3.054]}
          rotation={[-1.638, 0, 0.442]}
          scale={100}
        >
          <mesh
            geometry={nodes.Cylinder003_White_0.geometry}
            material={materials.White}
          />
          <mesh
            geometry={nodes.Cylinder003_Black_0.geometry}
            material={materials.Black}
          />
          <mesh
            geometry={nodes.Cylinder003_Outline_0.geometry}
            material={materials.Outline}
          />
        </group>
        <mesh
          geometry={nodes.BezierCurve002_Black_0.geometry}
          material={materials.Black}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.Cube_Black_0.geometry}
          material={materials.Black}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.Retopo_Sphere005_Black_0.geometry}
          material={materials.Black}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.Cylinder001_Black_0.geometry}
          material={materials.Black}
          position={[368.378, 428.113, -12.701]}
          rotation={[-Math.PI / 2, 0, 0.202]}
          scale={100}
        />
        <mesh
          geometry={nodes.Cylinder002_Black_0.geometry}
          material={materials.Black}
          position={[445.846, 358.425, 8.559]}
          rotation={[-Math.PI / 2, 0, 0.202]}
          scale={100}
        />
        <mesh
          geometry={nodes.Circle_Black_0.geometry}
          material={materials.Black}
          position={[316.463, 346.818, -59.909]}
          rotation={[-3.023, -0.818, -1.493]}
          scale={[18.639, 7.954, 8.746]}
        />
        <mesh
          geometry={nodes.Circle001_Black_0.geometry}
          material={materials.Black}
          position={[294.461, 346.818, -12.644]}
          rotation={[-2.942, -1.376, -1.397]}
          scale={[18.634, 7.953, 8.749]}
        />
        <mesh
          geometry={nodes.Cylinder004_Black_0.geometry}
          material={materials.Black}
          position={[313.284, 104.539, -7.362]}
          rotation={[-1.638, 0, -0.668]}
          scale={100}
        />
        <mesh
          geometry={nodes.Cylinder005_Black_0.geometry}
          material={materials.Black}
          position={[417.96, 102.829, -7.616]}
          rotation={[-1.638, 0, 0.442]}
          scale={100}
        />
        <mesh
          geometry={nodes.Retopo_Sphere001_Black_0.geometry}
          material={materials.Black}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Mickey.glb");

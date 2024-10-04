import React from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export function Model(props) {
  const { scene } = useGLTF("/cat.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 5.4]} position={[4, -4, 0]} scale={2}>
        <group rotation={[Math.PI / 2.2, 0.1, 0.2]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
              geometry={nodes.Object_7.geometry}
              material={materials.Hair}
              skeleton={nodes.Object_7.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Object_9.geometry}
              material={materials.Body}
              skeleton={nodes.Object_9.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Object_11.geometry}
              material={materials.Body}
              skeleton={nodes.Object_11.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Object_13.geometry}
              material={materials.Body}
              skeleton={nodes.Object_13.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Object_15.geometry}
              material={materials.Body}
              skeleton={nodes.Object_15.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Object_17.geometry}
              material={materials.Body}
              skeleton={nodes.Object_17.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Object_19.geometry}
              material={materials.Clothes}
              skeleton={nodes.Object_19.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/cat.glb");

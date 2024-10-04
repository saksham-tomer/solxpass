import React, { useEffect } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export function Model({ animation, ...props }) {
  const group = React.useRef();
  const { scene, animations } = useGLTF("/bangbo.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.24).play();
    return () => actions?.[animation]?.fadeOut(0.24);
  }, [animation]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 1.8, 0, -0.2]}
          scale={50.178}
        >
          <group
            name="a99bb0a609b545a986e1acec550f1a85fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <group name="ikHandle3" position={[2.981, 0.606, -0.143]} />
                  <group name="ikHandle4" position={[-2.753, 0.121, -0.1]} />
                  <primitive object={nodes._rootJoint} />
                  <group name="Object_6" />
                  <group name="Object_8" />
                  <group name="Object_10" />
                  <group name="Object_12" />
                  <group name="Object_14" />
                  <group name="Object_16" />
                  <group name="Object_18" />
                  <group name="Object_20" />
                  <group name="Object_22" />
                  <group name="Object_24" />
                  <group name="Object_26" />
                  <group name="Object_28" />
                  <group name="Object_30" />
                  <group name="Object_32" />
                  <group name="Object_34" />
                  <group name="Object_36" />
                  <group name="jacket" />
                  <group name="jacketButtons" />
                  <group name="trim" />
                  <group name="arms" />
                  <group name="body" />
                  <group name="handkerchief" />
                  <group name="eyes" />
                  <group name="earsScrews" />
                  <group name="zipperFront" />
                  <group name="knot" />
                  <group name="terminalUpper" />
                  <group name="terminalLower" />
                  <group name="plug" />
                  <group name="zipperBackRight" />
                  <group name="zipperBackLeft" />
                  <group name="armsStitching" />
                  <group name="ikHandle1" position={[0.658, 0.003, 0.423]} />
                  <group name="ikHandle2" position={[-0.658, 0.003, 0.423]} />
                  <group name="stool1" position={[0, -7.964, 0]} scale={0.554}>
                    <group name="seat">
                      <mesh
                        name="seat_stool_0"
                        geometry={nodes.seat_stool_0.geometry}
                        material={materials.stool}
                      />
                    </group>
                    <group name="upperArmature">
                      <mesh
                        name="upperArmature_stool_0"
                        geometry={nodes.upperArmature_stool_0.geometry}
                        material={materials.stool}
                      />
                    </group>
                    <group name="legs">
                      <mesh
                        name="legs_stool_0"
                        geometry={nodes.legs_stool_0.geometry}
                        material={materials.stool}
                      />
                    </group>
                    <group name="lowerArmature">
                      <mesh
                        name="lowerArmature_stool_0"
                        geometry={nodes.lowerArmature_stool_0.geometry}
                        material={materials.stool}
                      />
                    </group>
                    <group name="rivets">
                      <mesh
                        name="rivets_stool_0"
                        geometry={nodes.rivets_stool_0.geometry}
                        material={materials.stool}
                      />
                    </group>
                  </group>
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <skinnedMesh
                    name="Object_13"
                    geometry={nodes.Object_13.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_13.skeleton}
                  />
                  <skinnedMesh
                    name="Object_15"
                    geometry={nodes.Object_15.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_15.skeleton}
                  />
                  <skinnedMesh
                    name="Object_17"
                    geometry={nodes.Object_17.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_17.skeleton}
                  />
                  <skinnedMesh
                    name="Object_19"
                    geometry={nodes.Object_19.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_19.skeleton}
                  />
                  <skinnedMesh
                    name="Object_21"
                    geometry={nodes.Object_21.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_21.skeleton}
                  />
                  <skinnedMesh
                    name="Object_23"
                    geometry={nodes.Object_23.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_23.skeleton}
                  />
                  <skinnedMesh
                    name="Object_25"
                    geometry={nodes.Object_25.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_25.skeleton}
                  />
                  <skinnedMesh
                    name="Object_27"
                    geometry={nodes.Object_27.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_27.skeleton}
                  />
                  <skinnedMesh
                    name="Object_29"
                    geometry={nodes.Object_29.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_29.skeleton}
                  />
                  <skinnedMesh
                    name="Object_31"
                    geometry={nodes.Object_31.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_31.skeleton}
                  />
                  <skinnedMesh
                    name="Object_33"
                    geometry={nodes.Object_33.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_33.skeleton}
                  />
                  <skinnedMesh
                    name="Object_35"
                    geometry={nodes.Object_35.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_35.skeleton}
                  />
                  <skinnedMesh
                    name="Object_37"
                    geometry={nodes.Object_37.geometry}
                    material={materials.bangboo}
                    skeleton={nodes.Object_37.skeleton}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/bangbo.glb");

import React, { useEffect } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export function Model({ animation, ...props }) {
  const group = React.useRef();
  const { scene, animations } = useGLTF("/Shirikami.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.24).play();
    return () => actions?.[animation]?.fadeOut(0.24);
  }, [animation]);
  useEffect(() => {}, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group
        name="Sketchfab_Scene"
        scale={2.8}
        rotation={[-Math.PI / 4.6, 0.2, 0]}
        position={[0, -6, 0]}
      >
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="FBK_AnimationArmature_93">
                <group name="base_92">
                  <group
                    name="FK_hips_62"
                    position={[0, 2.333, -0.104]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <group name="hips_23" rotation={[1.95, 0.159, 0.135]}>
                      <group
                        name="waist_15"
                        position={[0, 0.474, 0]}
                        rotation={[-0.445, 0.019, -0.327]}
                      >
                        <group
                          name="fronttie_14"
                          position={[0, 0.394, 0.214]}
                          rotation={[-3.133, 0, 0]}
                        />
                      </group>
                      <group
                        name="upper_leg_L_17"
                        position={[0.322, 0.086, 0.081]}
                        rotation={[0.818, 1.285, 1.902]}
                      >
                        <group
                          name="lower_leg_L_16"
                          position={[0, 1.097, 0]}
                          rotation={[0.024, -0.035, 0.449]}
                        />
                      </group>
                      <group
                        name="upper_leg_R_19"
                        position={[-0.322, 0.086, 0.081]}
                        rotation={[-0.942, -1.103, 2.945]}
                      >
                        <group
                          name="lower_leg_R_18"
                          position={[0, 1.097, 0]}
                          rotation={[0.044, 0.02, -0.892]}
                        />
                      </group>
                      <group
                        name="tail_22"
                        position={[0, 0.114, -0.186]}
                        rotation={[-3.004, -0.197, -0.448]}
                      >
                        <group
                          name="tail001_21"
                          position={[0, 1.015, 0]}
                          rotation={[-0.982, -0.095, 0.471]}
                        >
                          <group
                            name="tail002_20"
                            position={[0, 0.87, 0]}
                            rotation={[0.289, 0.054, 0.165]}
                          />
                        </group>
                      </group>
                    </group>
                    <group
                      name="IK_core_61"
                      position={[0, -0.147, 0.888]}
                      rotation={[-0.057, -0.125, -0.499]}
                    >
                      <group
                        name="chest_60"
                        position={[-0.005, -0.003, -0.022]}
                        rotation={[1.254, 0, 0]}
                      >
                        <group
                          name="neck_51"
                          position={[0, 0.235, 0]}
                          rotation={[0.42, 0, 0]}
                        >
                          <group
                            name="head_50"
                            position={[0, 0.3, 0]}
                            rotation={[1.585, -0.065, -0.546]}
                          >
                            <group
                              name="bang_L_24"
                              position={[0.291, 0.231, -0.354]}
                              rotation={[1.531, -0.049, 0.197]}
                            />
                            <group
                              name="bang_R_25"
                              position={[-0.291, 0.231, -0.354]}
                              rotation={[1.515, 0.055, 0.099]}
                            />
                            <group
                              name="ear_L_26"
                              position={[0.182, -0.008, -0.535]}
                              rotation={[-1.583, -0.023, -1.14]}
                            />
                            <group
                              name="ear_R_27"
                              position={[-0.182, -0.008, -0.535]}
                              rotation={[-1.572, 0.034, 0.841]}
                            />
                            <group
                              name="ahoge_28"
                              position={[0, 0, -0.642]}
                              rotation={[-1.495, -0.015, 0.091]}
                              scale={[1.162, 1.181, 1.162]}
                            />
                            <group
                              name="ponytail001_34"
                              position={[0, -0.442, -0.282]}
                              rotation={[1.322, 0, 0.073]}
                            >
                              <group
                                name="ponytail002_33"
                                position={[0, 0.801, 0]}
                                rotation={[0.201, -0.014, -0.148]}
                              >
                                <group
                                  name="ponytail003_32"
                                  position={[0, 0.161, 0]}
                                  rotation={[0.29, -0.037, -0.171]}
                                >
                                  <group
                                    name="ponytail004_31"
                                    position={[0, 0.221, 0]}
                                    rotation={[0.243, -0.043, -0.186]}
                                  >
                                    <group
                                      name="ponytail005_30"
                                      position={[0, 0.676, 0]}
                                      rotation={[-0.31, 0.001, -0.143]}
                                    >
                                      <group
                                        name="ponytail006_29"
                                        position={[0, 0.551, 0]}
                                        rotation={[-0.126, 0.002, -0.065]}
                                      />
                                    </group>
                                  </group>
                                </group>
                              </group>
                            </group>
                            <group
                              name="TARGET_eyes_35"
                              position={[0, 0.548, -0.1]}
                              rotation={[-Math.PI, 0, Math.PI]}
                            />
                            <group
                              name="eye_L_36"
                              position={[0.123, 0.267, -0.1]}
                              rotation={[0, 0, -0.034]}
                            />
                            <group
                              name="eye_R_37"
                              position={[-0.123, 0.267, -0.1]}
                              rotation={[0, 0, 0.034]}
                            />
                            <group
                              name="ctrl_mouth_38"
                              position={[-0.085, 0.353, 0.034]}
                            />
                            <group
                              name="TARGET_ears_41"
                              position={[0.079, 0.006, -0.959]}
                              rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                            >
                              <group
                                name="TARGET_ear_L_39"
                                position={[0.008, -0.275, 0.427]}
                                rotation={[-2.279, -1.494, Math.PI]}
                              />
                              <group
                                name="TARGET_ear_R_40"
                                position={[0.008, -0.275, -0.427]}
                                rotation={[2.279, 1.494, -Math.PI]}
                              />
                            </group>
                            <group
                              name="TARGET_sidebangs_44"
                              position={[-0.107, 0.303, 0.379]}
                              rotation={[0, 1.571, 0]}
                            >
                              <group
                                name="TARGET_bang_L_42"
                                position={[0.018, -0.037, 0.256]}
                                rotation={[Math.PI, -1.471, Math.PI]}
                              />
                              <group
                                name="TARGET_bang_R_43"
                                position={[0.018, -0.037, -0.256]}
                                rotation={[0, -1.471, 0]}
                              />
                            </group>
                            <group
                              name="SIZE_eye_L_45"
                              position={[0.123, 0.267, -0.1]}
                              rotation={[-Math.PI, -1.571, 0]}
                            />
                            <group
                              name="SIZE_eye_R_46"
                              position={[-0.123, 0.267, -0.1]}
                              rotation={[-Math.PI, Math.PI / 2, 0]}
                            />
                            <group
                              name="SIZE_ctrl_eyes_47"
                              position={[0, 0.548, -0.1]}
                              rotation={[-Math.PI, -1.571, 0]}
                            />
                            <group
                              name="ctrl_eyelid_R_48"
                              position={[-0.127, 0.548, -0.193]}
                              rotation={[-Math.PI, -1.571, 0]}
                            />
                            <group
                              name="ctrl_eyelid_L_49"
                              position={[0.127, 0.548, -0.193]}
                              rotation={[Math.PI, Math.PI / 2, 0]}
                            />
                          </group>
                        </group>
                        <group
                          name="upper_arm_L_55"
                          position={[0.276, 0.181, -0.029]}
                          rotation={[-2.287, -0.312, -1.135]}
                        >
                          <group
                            name="lower_arm_L_54"
                            position={[0, 0.581, 0]}
                            rotation={[-0.058, 0.042, -2.127]}
                          >
                            <group
                              name="sleevetie_L_52"
                              position={[-0.005, -0.018, 0.009]}
                              rotation={[-2.756, -0.426, -0.181]}
                            />
                            <group
                              name="sleeve_end_L_53"
                              position={[0.139, 0.638, 0.073]}
                              rotation={[-3.114, 1.107, 1.529]}
                            />
                          </group>
                        </group>
                        <group
                          name="upper_arm_R_59"
                          position={[-0.276, 0.181, -0.029]}
                          rotation={[-0.025, 0.331, 1.808]}
                        >
                          <group
                            name="lower_arm_R_58"
                            position={[0, 0.581, 0]}
                            rotation={[-0.059, -0.04, 2.102]}
                          >
                            <group
                              name="sleevetie_R_56"
                              position={[-0.006, -0.018, 0.051]}
                              rotation={[-0.383, 0.143, -1.307]}
                            />
                            <group
                              name="sleeve_end_R_57"
                              position={[-0.139, 0.638, 0.073]}
                              rotation={[-3.114, -1.107, -1.529]}
                            />
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <group
                    name="FK_shoulder_L_69"
                    position={[0.276, 3.385, -0.041]}
                    rotation={[-1.068, 0, -0.352]}
                  >
                    <group
                      name="POLE_elbow_L_63"
                      position={[0.58, 0.01, -1.206]}
                      rotation={[-1.571, 1.524, 0]}
                    />
                    <group
                      name="IK_Hand_L_68"
                      position={[0.327, -0.003, 0.519]}
                      rotation={[-0.063, -0.853, -1.291]}
                    >
                      <group name="palm_L_67" rotation={[1.55, -0.017, 0.087]}>
                        <group
                          name="fingers_L_64"
                          position={[0, 0.333, 0]}
                          rotation={[0.048, -0.013, -0.298]}
                        />
                        <group
                          name="thumb_base_L_66"
                          position={[0.045, 0.211, 0.125]}
                          rotation={[0.801, -0.043, -0.933]}
                        >
                          <group
                            name="thumb_L_65"
                            position={[0, 0.077, 0]}
                            rotation={[-0.809, -0.702, 0.526]}
                          />
                        </group>
                      </group>
                    </group>
                  </group>
                  <group
                    name="FK_ponytail_73"
                    position={[0, 4.036, -0.445]}
                    rotation={[1.812, -1.21, Math.PI]}
                  >
                    <group
                      name="IK_ponytail_72"
                      position={[-2.529, -0.06, -0.068]}
                      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                    />
                  </group>
                  <group
                    name="FK_shoulder_R_80"
                    position={[-0.276, 3.385, -0.041]}
                    rotation={[0.19, 0, 0.868]}
                  >
                    <group
                      name="POLE_elbow_R_74"
                      position={[-1.135, 0.927, -0.327]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    />
                    <group
                      name="IK_Hand_R_79"
                      position={[-0.515, -0.24, 0.128]}
                      rotation={[0.798, -0.629, 2.194]}
                    >
                      <group name="palm_R_78" rotation={[1.55, 0.017, -0.087]}>
                        <group
                          name="fingers_R_75"
                          position={[0, 0.333, 0]}
                          rotation={[0.048, 0.013, 0.298]}
                        />
                        <group
                          name="thumb_base_R_77"
                          position={[-0.045, 0.211, 0.125]}
                          rotation={[0.801, 0.043, 0.933]}
                        >
                          <group
                            name="thumb_R_76"
                            position={[0, 0.077, 0]}
                            rotation={[-0.809, 0.702, -0.526]}
                          />
                        </group>
                      </group>
                    </group>
                  </group>
                  <group
                    name="TARGET_head_91"
                    position={[0.008, 3.659, 0.812]}
                    rotation={[Math.PI / 2, 0.127, 0]}
                  />
                  <group
                    name="FK_tail_71"
                    position={[0, 2.517, -0.244]}
                    rotation={[-1.486, -0.423, -0.331]}
                  >
                    <group
                      name="IK_tail_70"
                      position={[-0.319, -0.098, -2.226]}
                      rotation={[-1.774, -0.256, 0.331]}
                    />
                  </group>
                  <group
                    name="FK_leg_L_85"
                    position={[0.322, 2.48, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <group
                      name="POLE_knee_L_81"
                      position={[-0.097, -1.668, -1.08]}
                      rotation={[0, 0, Math.PI]}
                    />
                    <group
                      name="IK_heel_L_84"
                      position={[-0.168, 0.421, -2.112]}
                      rotation={[Math.PI, -0.033, 2.875]}
                    >
                      <group name="heel_L_83" rotation={[1.145, -0.051, 0.107]}>
                        <group
                          name="toes_L_82"
                          position={[0, 0.341, 0]}
                          rotation={[1.982, -0.004, -0.003]}
                        />
                      </group>
                    </group>
                  </group>
                  <group
                    name="FK_leg_R_90"
                    position={[-0.322, 2.48, 0]}
                    rotation={[-1.617, 0.095, 0.452]}
                  >
                    <group
                      name="POLE_knee_R_86"
                      position={[0.097, -1.668, -1.08]}
                      rotation={[-Math.PI, 0, 0]}
                    />
                    <group
                      name="IK_heel_R_89"
                      position={[0.056, 0.065, -2.112]}
                      rotation={[Math.PI, 0.033, -Math.PI]}
                    >
                      <group name="heel_R_88" rotation={[1.145, 0.051, -0.107]}>
                        <group
                          name="toes_R_87"
                          position={[0, 0.341, 0]}
                          rotation={[1.982, 0.004, 0.003]}
                        />
                      </group>
                    </group>
                  </group>
                </group>
              </group>
              <group name="FBK_DeformArmature_142">
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <group name="FubukiMesh_141" />
                  <skinnedMesh
                    name="Object_87"
                    geometry={nodes.Object_87.geometry}
                    material={materials.MatFubuki}
                    skeleton={nodes.Object_87.skeleton}
                  />
                  <skinnedMesh
                    name="Object_88"
                    geometry={nodes.Object_88.geometry}
                    material={materials.MatFBK_Eye_L}
                    skeleton={nodes.Object_88.skeleton}
                  />
                  <skinnedMesh
                    name="Object_89"
                    geometry={nodes.Object_89.geometry}
                    material={materials.MatFBK_Eye_R}
                    skeleton={nodes.Object_89.skeleton}
                  />
                  <skinnedMesh
                    name="Object_90"
                    geometry={nodes.Object_90.geometry}
                    material={materials.MatFBK_Mouth}
                    skeleton={nodes.Object_90.skeleton}
                  />
                  <skinnedMesh
                    name="Object_91"
                    geometry={nodes.Object_91.geometry}
                    material={materials.MatFBK_Face_R}
                    skeleton={nodes.Object_91.skeleton}
                  />
                  <skinnedMesh
                    name="Object_92"
                    geometry={nodes.Object_92.geometry}
                    material={materials.MatFBK_Face_L}
                    skeleton={nodes.Object_92.skeleton}
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

useGLTF.preload("/Shirikami.glb");

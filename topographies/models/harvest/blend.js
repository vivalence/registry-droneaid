export const scale = 0.05;
export const file = "DRONEAID_model_latest.blend";
export const plate = 0.002;
export const arm = 0.0075;

export const parts = [
  { slug: "antenna_rx", object: "Antenna.00", seat: "antenna.glb", tris: 380, bbox: [0.00263, 0.05998, 0.00263], extent: [[-0.00131, -0.02999, -0.00131], [0.00131, 0.02999, 0.00131]], family: "family.antenna", material: "material.electronics" },
  { slug: "antenna_vtx", object: "Antenna.02", seat: "antenna_3.glb", tris: 444, bbox: [0.01157, 0.06718, 0.01157], extent: [[-0.00578, -0.0614, -0.00578], [0.00578, 0.00578, 0.00578]], family: "family.antenna", material: "material.electronics" },
  { slug: "tail_mount", object: "AntennaFixture00", seat: "antenna_fixture.glb", tris: 756, bbox: [0.01574, 0.01407, 0.01203], extent: [[-0.01316, -0.01074, -0.00257], [0.00257, 0.00333, 0.00946]], family: "family.mount", material: "material.printed" },
  { slug: "antenna_mount", object: "AntennaFixture02", seat: "antenna_fixture_2.glb", tris: 92, bbox: [0.01862, 0.01861, 0.00988], extent: [[-0.00931, -0.00812, -0.00494], [0.00931, 0.01049, 0.00494]], family: "family.mount", material: "material.printed" },
  { slug: "cam_holder", object: "CamHolder1", seat: "cam_holder.glb", tris: 104, bbox: [0.01733, 0.0274, 0.01178], extent: [[-0.01353, -0.0038, -0.00798], [0.0038, 0.02359, 0.0038]], family: "family.mount", material: "material.printed" },
  { slug: "camera", object: "Camera", seat: "camera.glb", tris: 440, bbox: [0.0244, 0.01906, 0.01906], extent: [[-0.00433, -0.00953, -0.00953], [0.02007, 0.00953, 0.00953]], family: "family.camera", material: "material.electronics" },
  { slug: "vtx", object: "Computer", seat: "computer.glb", tris: 32, bbox: [0.04173, 0.01099, 0.02295], extent: [[-0.02086, -0.0055, -0.01147], [0.02086, 0.0055, 0.01147]], family: "family.vtx", material: "material.electronics" },
  { slug: "esc", object: "FlightController00", seat: "flight_controller.glb", tris: 92, bbox: [0.0303, 0.00094, 0.0303], extent: [[-0.01515, -0.00067, -0.01515], [0.01515, 0.00027, 0.01515]], family: "family.esc", material: "material.electronics" },
  { slug: "fc", object: "FlightController01", seat: "flight_controller.glb", tris: 92, bbox: [0.0303, 0.00094, 0.0303], extent: [[-0.01515, -0.00067, -0.01515], [0.01515, 0.00027, 0.01515]], family: "family.fc", material: "material.electronics" },
  { slug: "frame_bottom", object: "Frame_Bottom", seat: "frame_bottom.glb", tris: 2160, bbox: [0.28225, 0.002, 0.09699], extent: [[-0.1513, 0, -0.04849], [0.13095, 0.002, 0.04849]], family: "family.plate", material: "material.carbon" },
  { slug: "frame_root", object: "Frame_Star", seat: "frame_star.glb", tris: 624, bbox: [0.12195, 0.002, 0.0969], extent: [[-0.06097, 0, -0.04853], [0.06097, 0.002, 0.04837]], family: "family.plate", material: "material.carbon" },
  { slug: "frame_top", object: "Frame_Top", seat: "frame_top.glb", tris: 1584, bbox: [0.28225, 0.002, 0.04483], extent: [[-0.11356, 0, -0.02267], [0.16869, 0.002, 0.02216]], family: "family.plate", material: "material.carbon" },
  { slug: "motor", object: "Motor0", seat: "motor.glb", tris: 828, bbox: [0.0349, 0.03624, 0.0349], extent: [[-0.01745, -0.00821, -0.01745], [0.01745, 0.02803, 0.01745]], family: "family.motor", material: "material.motor" },
  { slug: "motor_arm", object: "Motor_Arm3", seat: "motor_arm.glb", tris: 80, bbox: [0.04134, 0.0075, 0.20863], extent: [[-0.02397, 0, -0.11011], [0.01737, 0.0075, 0.09852]], family: "family.arm", material: "material.carbon" },
  { slug: "propeller", object: "Propeller0", seat: "propeller.glb", tris: 14548, bbox: [0.17347, 0.00989, 0.20031], extent: [[-0.05798, -0.00495, -0.10015], [0.11549, 0.00495, 0.10015]], family: "family.propeller", material: "material.soft_goods" },
];

export const placements = [
  { name: "antenna_rx.0", ref: "antenna_rx", translation: [0.27406, 0.03532, 0.43915], rotation: [0, 0.70711, 0, 0.70711] },
  { name: "antenna_rx.1", ref: "antenna_rx", translation: [0.27022, 0.01258, 0.42267], rotation: [-0.5, 0.5, -0.5, 0.5] },
  { name: "antenna_vtx.0", ref: "antenna_vtx", translation: [0.23968, 0.06256, 0.42251], rotation: [0, 0, 0.37127, 0.92853] },
  { name: "tail_mount.0", ref: "tail_mount", translation: [0.28457, 0.03968, 0.43226] },
  { name: "antenna_mount.0", ref: "antenna_mount", translation: [0.28108, 0.01976, 0.42251], rotation: [-0.27402, 0.65186, 0.27402, 0.65186] },
  { name: "cam_holder.0", ref: "cam_holder", translation: [0.55395, 0.03319, 0.40453], rotation: [1, 0, -0.00149, 0] },
  { name: "cam_holder.1", ref: "cam_holder", translation: [0.55454, 0.0136, 0.44023] },
  { name: "camera.0", ref: "camera", translation: [0.55179, 0.02419, 0.42213] },
  { name: "vtx.0", ref: "vtx", translation: [0.33616, 0.01568, 0.42268], rotation: [0, 1, 0, 0] },
  { name: "esc.0", ref: "esc", translation: [0.42499, 0.01466, 0.42268] },
  { name: "fc.0", ref: "fc", translation: [0.42499, 0.02146, 0.42268] },
  { name: "frame_bottom.0", ref: "frame_bottom", translation: [0.42835, 0.00758, 0.42257] },
  { name: "frame_root.0", ref: "frame_root", translation: [0.42305, -0.00214, 0.42188] },
  { name: "frame_top.0", ref: "frame_top", translation: [0.39071, 0.03722, 0.42262] },
  { name: "motor_arm.0", ref: "motor_arm", translation: [0.51117, 0, 0.50423], rotation: [0, -0.94831, 0, 0.31733] },
  { name: "motor_arm.1", ref: "motor_arm", translation: [0.51117, 0, 0.33889], rotation: [0.94831, 0, 0.31733, 0] },
  { name: "motor_arm.2", ref: "motor_arm", translation: [0.33435, 0, 0.50423], rotation: [0.31733, 0, -0.94831, 0] },
  { name: "motor_arm.3", ref: "motor_arm", translation: [0.33435, 0, 0.33889], rotation: [0, 0.31733, 0, 0.94831] },
  { name: "motor.0", ref: "motor", translation: [0.28354, 0.01777, 0.57975] },
  { name: "motor.1", ref: "motor", translation: [0.56308, 0.01777, 0.57975] },
  { name: "motor.2", ref: "motor", translation: [0.56078, 0.01777, 0.26521] },
  { name: "motor.3", ref: "motor", translation: [0.28354, 0.01777, 0.26521] },
  { name: "propeller.0", ref: "propeller", translation: [0.28391, 0.04048, 0.57953], rotation: [0.66179, 0, 0.74969, 0] },
  { name: "propeller.1", ref: "propeller", translation: [0.56321, 0.03963, 0.57949], rotation: [0.90317, 0, 0.42928, 0] },
  { name: "propeller.2", ref: "propeller", translation: [0.56115, 0.04048, 0.26498], rotation: [0.66179, 0, 0.74969, 0] },
  { name: "propeller.3", ref: "propeller", translation: [0.28391, 0.04048, 0.26498], rotation: [0.66179, 0, 0.74969, 0] },
];

export const spacers = {
  stack: { origin: [0.42305, 0.0234, 0.42188], base: -0.01365, height: 0.02723, islands: [[0.04609, -0.01287], [-0.04609, -0.01287], [0.04609, 0.01287], [-0.04609, 0.01287]] },
  tail: { origins: [[0.28457, 0.0129, 0.43226], [0.28457, 0.0129, 0.41247]], base: -0.00257, height: 0.02668 },
};

export const separators = { origin: [0.42499, 0.02146, 0.42268], islands: [[-0.01078, 0.0116], [0.01078, 0.0116], [-0.01078, -0.0116], [0.01078, -0.0116]] };

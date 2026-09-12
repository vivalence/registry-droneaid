const bolt = (thread, length, qty, name) => ({
  slug: `bolt_${thread.toLowerCase()}_${length}`,
  name: name ?? `Bolt ${thread} × ${length}`,
  qty,
  parametric: { generator: "fastener.bolt", params: { thread, length } },
  family: `family.bolt.${thread.toLowerCase()}`,
  material: "material.fastener",
});

export const fasteners = [
  bolt("M3", 30, 4, "Bolt M3 × 30, stack"),
  bolt("M3", 28, 4, "Bolt M3 × 28, long"),
  bolt("M3", 18, 4, "Bolt M3 × 18, medium"),
  bolt("M3", 16, 6, "Bolt M3 × 16, short"),
  bolt("M3", 12, 1, "Bolt M3 × 12, RX antenna"),
  bolt("M3", 10, 16, "Bolt M3 × 10, motor"),
  bolt("M3", 8, 16, "Bolt M3 × 8, top plate"),
  bolt("M2", 4, 2, "Bolt M2 × 4, camera"),
  { slug: "locknut_m3", name: "Locknut M3", qty: 4, parametric: { generator: "fastener.nut", params: { thread: "M3" } }, family: "family.nut", material: "material.fastener" },
  { slug: "prop_nut_m5", name: "Prop nut M5", qty: 4, parametric: { generator: "fastener.nut", params: { thread: "M5" } }, family: "family.nut", material: "material.fastener" },
];

export const standoff = { slug: "standoff", name: "Standoff M3 × 27", qty: 8, family: "family.standoff", material: "material.fastener" };

export const generated = [
  { slug: "grommet", name: "Silicone grommet", qty: 8, parametric: { generator: "solid.bushing", params: { outer: 6, inner: 3, length: 5 } }, family: "family.grommet", material: "material.soft_goods" },
  { slug: "rx", name: "Receiver (ELRS)", qty: 1, parametric: { generator: "solid.box", params: { x: 20, y: 4, z: 12 } }, family: "family.rx", material: "material.electronics" },
  { slug: "battery_pad", name: "Battery pad", qty: 1, parametric: { generator: "solid.box", params: { x: 100, y: 3, z: 40 } }, family: "family.pad", material: "material.soft_goods" },
  { slug: "thermo_adhesive", name: "Thermal adhesive pad", qty: 1, parametric: { generator: "solid.box", params: { x: 40, y: 1, z: 22 } }, family: "family.pad", material: "material.soft_goods" },
];

export const routed = (slug, name, route, qty = 1) => ({
  slug,
  name,
  qty,
  parametric: { generator: "cable.route", params: { route, diameter: 2.4 } },
  family: "family.cable",
  material: "material.electronics",
});

export const loose = [
  { slug: "vtx_pigtail", name: "Pigtail", qty: 1, family: "family.antenna", material: "material.electronics" },
  { slug: "battery_strap", name: "Battery strap", qty: 2, family: "family.strap", material: "material.soft_goods" },
  { slug: "zip_tie", name: "Zip tie", qty: 6, family: "family.zip_tie", material: "material.soft_goods" },
  { slug: "heat_shrink", name: "Heat shrink", qty: 1, family: "family.cable", material: "material.soft_goods" },
  { slug: "sticker_id", name: "Drone ID sticker", qty: 1, family: "family.sticker", material: "material.soft_goods" },
];

export const subject = { slug: "drone", name: "DroneAid 10″ quadcopter", description: "Frame: 10” Partizan Edition PT10 V3 — the plug-and-play build of the EDTH 2026 DroneAid Hamburg manual v1.3.1" };

export const named = {
  frame_root: ["Bottom plate", "Carbon, the hub the arms bolt to — the manual's [1]"],
  frame_bottom: ["Arm sandwich plate", "Carbon, the middle plate over the arms — the manual's [3]"],
  frame_top: ["Top plate", "Carbon — the manual's [2]"],
  motor_arm: ["Arm", "Carbon motor arm — the manual's [6]"],
  motor: ["Motor", "Brushless motor, 10″ class"],
  propeller: ["Propeller", "10″ propeller — fitted last, never with a battery connected"],
  fc: ["Flight controller", "The FC board, arrow to the front"],
  esc: ["ESC", "The electronic speed controller board, under the FC"],
  vtx: ["Video transmitter", "The VTX, glued and zip-tied to the tail of the middle plate"],
  camera: ["FPV camera", "Between the two camera mounts, connector up"],
  cam_holder: ["Camera mount", "3D-printed — the manual's [9]"],
  antenna_rx: ["RX antenna", "ELRS receiver antenna — two in the kit"],
  antenna_vtx: ["VTX antenna", "On the pigtail, through the rear antenna mount"],
  tail_mount: ["Additional RX antenna mount", "3D-printed tail part — the manual's [8]"],
  antenna_mount: ["Antenna mount", "3D-printed rear mount for the VTX pigtail — the manual's [10]"],
};

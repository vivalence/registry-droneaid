// the product's own vocabulary: its part families (USD's class, one per kit family) and the
// manual's sections. the kinds and the universal vocabulary (material · source · joint · warn ·
// tool) come with the @assembly topologies.
const symbol = (slug, name, description) => ({
  slug,
  traits: ["ONTOLOGICAL", "LABELED"],
  trait: { ONTOLOGICAL: {}, LABELED: { name, description } },
});

export default [
  symbol("family.plate", "Plate", "Carbon plates — bottom, top, the arm sandwich."),
  symbol("family.arm", "Arm", "Motor arms."),
  symbol("family.standoff", "Standoff", "M3 standoffs between the plates."),
  symbol("family.bolt.m3", "M3 bolt", "M3 bolts, by length."),
  symbol("family.bolt.m2", "M2 bolt", "M2 bolts — the camera."),
  symbol("family.nut", "Nut", "Locknuts and the propeller nut."),
  symbol("family.motor", "Motor", "Brushless motors."),
  symbol("family.propeller", "Propeller", "The propellers — not in the kit list, in the model."),
  symbol("family.fc", "Flight controller", "The FC board."),
  symbol("family.esc", "ESC", "The electronic speed controller board."),
  symbol("family.computer", "Companion computer", "The computer the model shows on the stack."),
  symbol("family.vtx", "VTX", "The video transmitter."),
  symbol("family.rx", "RX", "The ELRS receiver."),
  symbol("family.camera", "Camera", "The FPV camera."),
  symbol("family.antenna", "Antenna", "VTX and RX antennas, the pigtail."),
  symbol("family.mount", "Mount", "3D-printed mounts — camera, antenna, RX tail."),
  symbol("family.cable", "Cable", "Cables, heat shrink."),
  symbol("family.connector", "Connector", "The connector set."),
  symbol("family.grommet", "Grommet", "Silicone grommets for the stack."),
  symbol("family.pad", "Pad", "Battery pad, thermal pad."),
  symbol("family.strap", "Strap", "Battery straps."),
  symbol("family.zip_tie", "Zip tie", "Zip ties."),
  symbol("family.sticker", "Sticker", "The drone ID sticker."),
  symbol("family.jig", "Jig", "The bolt-holding jig."),
  symbol("section.frame", "Frame Assembly", "Manual p3–13."),
  symbol("section.motors", "Motors installation", "Manual p14–16."),
  symbol("section.stack", "Stack (FC & ESC)", "Manual p17–23."),
  symbol("section.vtx", "Video Transmitter", "Manual p24–27."),
  symbol("section.rx", "Receiver Installation", "Manual p28–29."),
  symbol("section.camera", "Install Camera", "Manual p30–32."),
  symbol("section.top_plate", "Top Plate installation", "Manual p33–34."),
  symbol("section.checklist", "Checklist", "Manual p35."),
];

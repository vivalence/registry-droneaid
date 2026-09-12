import * as blend from "./blend.js";
import * as kit from "./kit.js";
import * as anchors from "./anchors.js";

const LAYER = kit.subject.slug;

const refs = (slugs) => [...new Set(slugs.filter(Boolean))].sort().map((slug) => ({ slug }));

const literal = (slug, traits, trait, symbols, uses = []) => ({ slug, traits, trait, symbols: refs(symbols), ...(uses.length ? { uses: refs(uses) } : {}) });

const labeled = (name, description) => ({ name, ...(description ? { description } : {}) });

const modeled = (part) =>
  literal(part.slug, ["LABELED", "SOURCED", "MODELED", "COUNTED"], {
    LABELED: labeled(...kit.named[part.slug]),
    SOURCED: { file: blend.file, object: part.object, scale: blend.scale },
    MODELED: { file: `parts/${part.slug}.glb`, tris: part.tris, bbox: part.bbox },
    COUNTED: { qty: blend.placements.filter((one) => one.ref === part.slug).length },
  }, ["part", part.family, part.material]);

const parametric = (part) =>
  literal(part.slug, ["LABELED", "PARAMETRIC", "COUNTED"], {
    LABELED: labeled(part.name),
    PARAMETRIC: part.parametric,
    COUNTED: { qty: part.qty },
  }, ["part", part.family, part.material, "source.parametric"]);

const counted = (part) => literal(part.slug, ["LABELED", "COUNTED"], { LABELED: labeled(part.name), COUNTED: { qty: part.qty } }, ["part", part.family, part.material]);

const standoffPart = () => {
  return literal(kit.standoff.slug, ["LABELED", "SOURCED", "MODELED", "COUNTED"], {
    LABELED: labeled(kit.standoff.name, "One standoff of the blend's FrameSpacers, unwelded — stands on its base"),
    SOURCED: { file: blend.file, object: "FrameSpacers.00 (x4)", scale: blend.scale },
    MODELED: { file: "parts/standoff.glb", tris: 124, bbox: [0.00572, blend.spacers.stack.height, 0.00572] },
    COUNTED: { qty: kit.standoff.qty },
  }, ["part", kit.standoff.family, kit.standoff.material]);
};

const spacers = () => anchors.standoffs();

export const cables = () => {
  const boards = anchors.stackBoards();
  const [fcX, , fcZ] = anchors.at("fc.0");
  const esc = anchors.extent("esc")[1][0];
  const vtx = anchors.vtx();
  const [camX, camY, camZ] = anchors.at("camera.0");
  const camBack = camX + anchors.extent("camera")[0][0];
  const rx = rxSeat();
  const v = anchors.vec;
  return [
    kit.routed("cable_esc_fc", "ESC–FC cable, 8-pin", [v(fcX + esc, boards.escTop, fcZ), v(fcX + esc + 0.004, (boards.escTop + boards.fcBottom) / 2, fcZ), v(fcX + esc, boards.fcBottom, fcZ)]),
    kit.routed("cable_vtx_fc", "VTX–FC cable", [v(fcX - esc, boards.fcTop, fcZ), v((fcX - esc + vtx.centre[0]) / 2, boards.fcTop + 0.003, fcZ), v(vtx.centre[0], vtx.top, vtx.centre[1])]),
    kit.routed("cable_camera", "Camera cable", [v(fcX + esc, boards.fcTop, fcZ), v((fcX + esc + camBack) / 2, camY + 0.004, (fcZ + camZ) / 2), v(camBack, camY, camZ)]),
    kit.routed("cable_rx", "RX cable", [v(fcX - esc, boards.fcTop, fcZ), v((fcX - esc + rx[0]) / 2, (boards.fcTop + rx[1]) / 2, fcZ), v(rx[0], rx[1], rx[2])]),
    kit.routed("motor_wire", "Motor wires", [v(0, -0.0082, 0), v(0.04, -0.004, -0.045), v(0.1263, -0.0033, -0.1419)], 4),
  ];
};

const rxSeat = () => {
  const plates = anchors.plates;
  return anchors.vec(plates.top.centreX - 0.108, plates.top.underside - 0.004, plates.top.centreZ);
};

export const parts = () => [
  literal(kit.subject.slug, ["LABELED"], { LABELED: labeled(kit.subject.name, kit.subject.description) }, ["part"]),
  ...blend.parts.map(modeled),
  standoffPart(),
  ...kit.fasteners.map(parametric),
  ...kit.generated.map(parametric),
  ...cables().map(parametric),
  ...kit.loose.map(counted),
];

const place = (name, ref, translation, { rotation, scale, joins, joint } = {}) =>
  literal(`${LAYER}.${name}`, ["LABELED", "PLACED", ...(joins ? ["JOINED"] : [])], {
    LABELED: { name },
    PLACED: { layer: LAYER, name, ref, ...(translation ? { translation } : {}), ...(rotation ? { rotation } : {}), ...(scale ? { scale } : {}) },
    ...(joins ? { JOINED: { joins } } : {}),
  }, ["placement", joint], [ref, LAYER]);

const series = (ref, items, shape) => items.map((item, index) => place(`${ref}.${index}`, ref, ...shape(item, index)));

export const placements = () => {
  const v = anchors.vec;
  const plates = anchors.plates;
  const held = spacers();
  const bolts = anchors.hubBolts();
  const motors = anchors.motors();
  const boards = anchors.stackBoards();
  const grommets = anchors.grommets();
  const vtx = anchors.vtx();
  const rx = rxSeat();
  const stackOf = (index) => `standoff.${index}`;

  return [
    ...blend.placements.map((one) => place(one.name, one.ref, one.translation, { rotation: one.rotation })),

    ...series("standoff", [...held.stack, ...held.corners], (translation, index) => [translation, { joins: index < 4 ? ["frame_bottom.0", `bolt_m3_18.${index}`] : ["frame_bottom.0", `bolt_m3_8.${index - 4}`], joint: "joint.threaded" }]),

    ...series("bolt_m3_16", bolts.sixteen, ({ arm, translation }) => [translation, { rotation: anchors.UP, joins: ["frame_root.0", ...(arm === null ? [] : [`motor_arm.${arm}`]), "frame_bottom.0"], joint: "joint.bolted" }]),
    ...series("bolt_m3_18", bolts.eighteen, (translation, index) => [translation, { rotation: anchors.UP, joins: ["frame_root.0", "frame_bottom.0", stackOf(index)], joint: "joint.bolted" }]),
    ...series("bolt_m3_8", [...held.corners.map(([x, , z]) => ({ translation: v(x, plates.mid.underside, z), rotation: anchors.UP, under: true })), ...[...held.stack, ...held.corners].map(([x, , z]) => ({ translation: v(x, plates.top.top, z), rotation: anchors.DOWN, under: false }))], ({ translation, rotation, under }, index) => [translation, { rotation, joins: under ? ["frame_bottom.0", stackOf(index + 4)] : ["frame_top.0", stackOf(index - 4)], joint: "joint.bolted" }]),

    ...series("bolt_m3_30", grommets, ([x, , z], index) => [v(x, plates.mid.underside, z), { rotation: anchors.UP, joins: ["frame_bottom.0", `grommet.${index}`, "esc.0", `grommet.${index + 4}`, "fc.0"], joint: "joint.bolted" }]),
    ...series("grommet", [...grommets.map(([x, , z]) => v(x, plates.mid.top, z)), ...grommets.map(([x, , z]) => v(x, boards.escTop, z))], (translation, index) => [translation, { joins: index < 4 ? ["frame_bottom.0", "esc.0"] : ["esc.0", "fc.0"], joint: "joint.pressed" }]),
    ...series("locknut_m3", grommets, ([x, , z]) => [v(x, boards.fcTop, z), { joins: ["fc.0", "esc.0", "frame_bottom.0"], joint: "joint.threaded" }]),

    ...series("bolt_m3_10", anchors.motorBolts(), ({ motor, translation }) => [translation, { rotation: anchors.UP, joins: [`motor_arm.${Object.entries(anchors.motorOf).find(([, m]) => m === motor)[0]}`, `motor.${motor}`], joint: "joint.bolted" }]),
    ...series("prop_nut_m5", motors, ({ index, centre: [x, z], top }) => [v(x, top, z), { joins: [`motor.${index}`, `propeller.${index}`], joint: "joint.threaded" }]),
    ...series("bolt_m2_4", anchors.cameraBolts(), ({ holder, translation, rotation }) => [translation, { rotation, joins: [`cam_holder.${holder}`, "camera.0"], joint: "joint.bolted" }]),

    place("thermo_adhesive.0", "thermo_adhesive", v(vtx.centre[0], plates.mid.top, vtx.centre[1]), { joins: ["frame_bottom.0", "vtx.0"], joint: "joint.adhesive" }),
    ...series("zip_tie", [
      { translation: v(vtx.centre[0] - 0.015, plates.mid.top, vtx.centre[1]), joins: ["vtx.0", "frame_bottom.0"] },
      { translation: v(vtx.centre[0] + 0.015, plates.mid.top, vtx.centre[1]), joins: ["vtx.0", "frame_bottom.0"] },
      { translation: v(plates.top.centreX, plates.top.top, plates.top.centreZ - 0.02), joins: ["frame_top.0"] },
      { translation: v(rx[0], plates.top.top, rx[2]), joins: ["rx.0", "frame_top.0"] },
      { translation: v(plates.top.centreX - 0.09, plates.top.top, plates.top.centreZ + 0.02), joins: ["antenna_rx.0", "frame_top.0"] },
    ], ({ translation, joins }) => [translation, { joins, joint: "joint.tied" }]),
    place("vtx_pigtail.0", "vtx_pigtail", anchors.at("antenna_mount.0"), { joins: ["antenna_mount.0", "vtx.0"], joint: "joint.threaded" }),
    place("rx.0", "rx", rx, { joint: "joint.tied" }),
    place("heat_shrink.0", "heat_shrink", v(rx[0] - 0.012, rx[1] + 0.002, rx[2]), { joins: ["rx.0", "cable_rx.0"], joint: "joint.pressed" }),
    place("battery_pad.0", "battery_pad", v(plates.top.centreX, plates.top.top, plates.top.centreZ), { joins: ["frame_top.0"], joint: "joint.adhesive" }),
    place("sticker_id.0", "sticker_id", v(plates.top.centreX + 0.1, plates.top.top, plates.top.centreZ), { joins: ["frame_top.0"], joint: "joint.adhesive" }),

    ...["cable_esc_fc", "cable_vtx_fc", "cable_camera", "cable_rx"].map((slug, index) => place(`${slug}.0`, slug, undefined, { joins: [["esc.0", "fc.0"], ["fc.0", "vtx.0"], ["fc.0", "camera.0"], ["fc.0", "rx.0"]][index], joint: "joint.plugged" })),
    ...series("motor_wire", motors, ({ index, centre: [x, z] }) => [v(x, anchors.at(`motor.${index}`)[1], z), { scale: [[1, 1, 1], [-1, 1, 1], [-1, 1, -1], [1, 1, -1]][index], joins: [`motor.${index}`, "esc.0"], joint: "joint.plugged" }]),
  ];
};

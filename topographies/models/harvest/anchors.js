import { arm, parts, placements, plate, separators, spacers } from "./blend.js";

export const round = (value) => Math.round(value * 100000) / 100000;
export const vec = (...numbers) => numbers.map(round);

export const UP = [1, 0, 0, 0];
export const DOWN = [0, 0, 0, 1];
export const TOWARD_MINUS_Z = [0.70711, 0, 0, 0.70711];
export const TOWARD_PLUS_Z = [-0.70711, 0, 0, 0.70711];

export const at = (name) => placements.find((one) => one.name === name).translation;
export const extent = (slug) => parts.find((one) => one.slug === slug).extent;

const hub = at("frame_root.0");
const mid = at("frame_bottom.0");
const top = at("frame_top.0");

export const plates = {
  bottom: { underside: hub[1], top: hub[1] + plate, centre: [hub[0], hub[2]], halfX: extent("frame_root")[1][0] },
  mid: {
    underside: mid[1],
    top: mid[1] + plate,
    centreX: mid[0] + (extent("frame_bottom")[0][0] + extent("frame_bottom")[1][0]) / 2,
    centreZ: mid[2],
  },
  top: { underside: top[1], top: top[1] + plate, centreX: top[0] + (extent("frame_top")[0][0] + extent("frame_top")[1][0]) / 2, centreZ: top[2] },
  armUnderside: 0,
  armTop: arm,
};

export const standoffs = () => {
  const stack = spacers.stack.islands.map(([dx, dz]) => vec(spacers.stack.origin[0] + dx, spacers.stack.origin[1] + spacers.stack.base, spacers.stack.origin[2] + dz));
  const tail = spacers.tail.origins.map(([x, y, z]) => vec(x, y + spacers.tail.base, z));
  const front = tail.map(([x, y, z]) => vec(2 * plates.mid.centreX - x, y, z));
  return { stack, corners: [...tail, ...front], height: spacers.stack.height };
};

export const grommets = () => separators.islands.map(([dx, dz]) => vec(separators.origin[0] + dx, plates.mid.top, separators.origin[2] + dz));

export const arms = () => {
  const [cx, , cz] = hub;
  return [0, 1, 2, 3].map((index) => {
    const [x, , z] = at(`motor_arm.${index}`);
    const length = Math.hypot(x - cx, z - cz);
    return { index, unit: [(x - cx) / length, (z - cz) / length] };
  });
};

export const motorOf = { 0: 1, 1: 2, 2: 0, 3: 3 };

export const hubBolts = () => {
  const [cx, , cz] = hub;
  const onArm = arms().map(({ index, unit }) => ({ arm: index, translation: vec(cx + 0.04 * unit[0], plates.bottom.underside, cz + 0.04 * unit[1]) }));
  const axis = [-1, 1].map((side) => ({ arm: null, translation: vec(cx + side * 0.052, plates.bottom.underside, cz) }));
  return { sixteen: [...onArm, ...axis], eighteen: standoffs().stack.map(([x, , z]) => vec(x, plates.bottom.underside, z)) };
};

export const motors = () => [0, 1, 2, 3].map((index) => {
  const [x, y, z] = at(`motor.${index}`);
  const [, propY] = at(`propeller.${index}`);
  return { index, centre: [x, z], base: y + extent("motor")[0][1], top: round(propY + extent("propeller")[1][1]) };
});

export const motorBolts = () => motors().flatMap(({ index, centre: [x, z] }) => [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz]) => ({ motor: index, translation: vec(x + 0.008 * sx, plates.armUnderside, z + 0.008 * sz) })));

export const stackBoards = () => {
  const [, escY] = at("esc.0");
  const [, fcY] = at("fc.0");
  return { escBottom: escY + extent("esc")[0][1], escTop: escY + extent("esc")[1][1], fcBottom: fcY + extent("fc")[0][1], fcTop: fcY + extent("fc")[1][1] };
};

export const cameraBolts = () => {
  const [cx, cy] = at("camera.0");
  const holder = extent("cam_holder");
  const inner = at("cam_holder.1");
  const outer = at("cam_holder.0");
  return [
    { holder: 1, translation: vec(cx + 0.004, cy, inner[2] + holder[1][2]), rotation: TOWARD_MINUS_Z },
    { holder: 0, translation: vec(cx + 0.004, cy, outer[2] - holder[1][2]), rotation: TOWARD_PLUS_Z },
  ];
};

export const vtx = () => {
  const [x, y, z] = at("vtx.0");
  return { centre: [x, z], bottom: y + extent("vtx")[0][1], top: y + extent("vtx")[1][1] };
};

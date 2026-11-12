import * as quadrocopter from "./quadrocopter.js";

export const views = {
  overview: quadrocopter.views.overview,
  frame: quadrocopter.views.frame,
  motors: quadrocopter.views.motors,
  stack: quadrocopter.views.stack,
};

export const sections = [
  ["frame", "Frame Assembly"],
  ["motors", "Installation of motors"],
  ["stack", "Stack (FC & ESC)"],
  ["tail", "Tail + ELRS"],
  ["camera", "Camera + VTX"],
];

const copied = (step) => ({ ...step, pages: [] });

const own = [
  {
    section: "tail",
    name: "The printed tail",
    pages: [],
    placements: [
      "tail_half_a.0",
      "tail_half_b.0",
      "hinge.0",
      "hinge.1",
      "hinge.2",
      "hinge.3",
      "antenna_cover.0",
      "antenna_cover.1",
      "antenna_cover.2",
      "antenna_cover.3",
      "antenna_standoff.0",
    ],
    lines: [
      "Join the two tail halves with the four hinges, fit the antenna covers and the standoff.",
    ],
    notes: [],
    tools: [],
    images: [],
  },
  {
    section: "camera",
    name: "The VTX mount",
    pages: [],
    placements: ["vtx_spacer.0", "pigtail_holder.0"],
    lines: ["Seat the VTX spacer and the pigtail holder."],
    notes: [],
    tools: [],
    images: [],
  },
  {
    section: "camera",
    name: "The head",
    pages: [],
    placements: ["head_shell.0", "lens_cover.0"],
    lines: ["Fit the lens cover on the head shell."],
    notes: [],
    tools: [],
    images: [],
  },
];

export const steps = [
  ...quadrocopter.steps.slice(0, 8).map(copied),
  ...quadrocopter.steps.slice(10, 19).map(copied),
  ...own,
];

export const guide = {
  slug: "mari",
  name: "Mari Drone assembly manual",
  description: "PT10 interceptor: tilt head, folding tail",
  subject: "interceptor",
  lines: [
    "Builds the PT10 interceptor: frame, motors and stack, then its tail, VTX mount and head.",
  ],
  images: [],
  notes: quadrocopter.guide.notes,
};

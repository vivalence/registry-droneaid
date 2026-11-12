import { literal } from "./rows.js";

export const subject = {
  slug: "interceptor",
  name: "PT10 interceptor",
  description: "Frame: 10” Partizan Edition PT10 V3 — built as the quadro through the stack, then its own tail, VTX mount and head",
};

export const shared = ["frame", "drive", "stack", "top"];

export const assemblies = [
  { slug: "head", name: "Head", description: "The tilting camera head and its lens cover" },
  { slug: "vtx_mount", name: "VTX mount", description: "The VTX spacer and the pigtail holder" },
  { slug: "tail", name: "Tail", description: "The two tail halves, their hinges, the antenna standoff and covers" },
];

const piece = (slug, name, qty, stl, assembly) => ({ slug, name, qty, stl, assembly });

export const printed = [
  piece("head_shell", "Camera head", 1, "head/drone_head.stl", "head"),
  piece("lens_cover", "Camera lens cover (TPU)", 1, "head/TPU_lens_cover.stl", "head"),
  piece("vtx_spacer", "VTX 20×20 spacer, 3 mm (TPU)", 1, "vtx/TPU_m2_20x20_3mm_spacer.stl", "vtx_mount"),
  piece("pigtail_holder", "VTX pigtail holder", 1, "vtx/vtx_pigtail.stl", "vtx_mount"),
  piece("tail_half_a", "Tail half A", 1, "tail/tail_half_A_with_holders_star.stl", "tail"),
  piece("tail_half_b", "Tail half B", 1, "tail/tail_half_B_with_star.stl", "tail"),
  piece("antenna_standoff", "Antenna standoff", 1, "tail/standoff/standoff_v2.stl", "tail"),
  piece("hinge", "Hinge, short", 4, "tail/hinge_short.stl", "tail"),
  piece("antenna_cover", "ELRS antenna cover (TPU)", 4, "tail/TPU_elrs_ant_wide_closed.stl", "tail"),
];

const SCALE = 0.001;
const GAP = 0.01;

const modeled = (measured) => (part) =>
  literal(part.slug, ["LABELED", "SOURCED", "MODELED", "COUNTED"], {
    LABELED: { name: part.name },
    SOURCED: { file: part.stl, scale: SCALE },
    MODELED: {
      file: `parts/${part.slug}.glb`,
      tris: measured[part.slug].tris,
      bbox: measured[part.slug].size,
    },
    COUNTED: { qty: part.qty },
  }, ["part", "family.mount", "material.printed", "source.print_stl"]);

const layer = (one) =>
  literal(one.slug, ["LABELED"], {
    LABELED: { name: one.name, description: one.description },
  }, ["part"]);

export const parts = (measured) => [
  layer(subject),
  ...assemblies.map(layer),
  ...printed.map(modeled(measured)),
];

const round = (n) => Math.round(n * 1e5) / 1e5;

const spread = (widths) =>
  widths.reduce(
    ({ edge, centres }, width) => ({
      edge: edge + width + GAP,
      centres: [...centres, round(edge + width / 2)],
    }),
    { edge: 0, centres: [] },
  ).centres;

const copies = (assembly) =>
  printed
    .filter((part) => part.assembly === assembly.slug)
    .flatMap((part) => Array.from({ length: part.qty }, (_, index) => ({ part, index })));

const placed = (into, name, ref, translation) =>
  literal(`${into}.${name}`, ["LABELED", "PLACED"], {
    LABELED: { name },
    PLACED: { layer: into, name, ref, ...(translation ? { translation } : {}) },
  }, ["placement"], [ref, into]);

export const placements = (measured) => {
  const width = ({ part }) => measured[part.slug].size[0];
  const depth = (assembly) => Math.max(...copies(assembly).map(({ part }) => measured[part.slug].size[2]));
  const rows = spread(assemblies.map(depth));
  return [
    ...shared.map((slug) => placed(subject.slug, `${slug}.0`, slug)),
    ...assemblies.map((assembly, row) => placed(subject.slug, `${assembly.slug}.0`, assembly.slug, [0, 0, -rows[row]])),
    ...assemblies.flatMap((assembly) => {
      const seats = spread(copies(assembly).map(width));
      return copies(assembly).map(({ part, index }, seat) =>
        placed(assembly.slug, `${part.slug}.${index}`, part.slug, [seats[seat], 0, 0]));
    }),
  ];
};

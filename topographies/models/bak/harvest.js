// the component rows: the kit list (sources/manifest.csv) joined with what the blend gave
// (intake/blend.json, written by harvest.py) → dataset/literals/components.json, and the chosen
// GLB per component copied to freight/parts/<slug>.glb.
//
//   deno run -A --config <repo>/deno.jsonc harvest.js
//
// the blend's objects are mapped to the kit's part ids by eye, here, once. an object the kit
// does not list (the propellers, the companion computer) becomes a component with no kit count.
// the kit's Tools rows are not components — they are tool.* symbols on the step topology.
const HERE = new URL(".", import.meta.url).pathname;
const read = (path) => Deno.readTextFileSync(`${HERE}${path}`);

// blend object → part id. one component, several placements: the first listed object gives the file.
const MAPPED = {
  Frame_Bottom: "bottom_plate",
  Frame_Top: "top_plate",
  Frame_Star: "sandwich_plate",
  Motor_Arm3: "arm", Motor_Arm0: "arm", Motor_Arm1: "arm", Motor_Arm2: "arm",
  Motor0: "motor", Motor1: "motor", Motor2: "motor", Motor3: "motor",
  Propeller0: "propeller", Propeller1: "propeller", Propeller2: "propeller", Propeller3: "propeller",
  FlightController00: "esc", // the lower board — "On top of the ESC, place FC" (manual p22)
  FlightController01: "fc",
  Computer: "computer",
  Camera: "camera",
  CamHolder0: "camera_mount", CamHolder1: "camera_mount",
  AntennaFixture00: "antenna_mount",
  AntennaFixture02: "rx_antenna_mount",
  "Antenna.02": "vtx_antenna", // the long one, on the rear mount
  "Antenna.00": "rx_antenna", "Antenna.01": "rx_antenna",
};
// welded copies the kit generates instead: standoffs and grommets are parametric
const SKIPPED = { "FrameSpacers.00 (x4)": "standoff (parametric)", "FrameSpacers.01": "standoff (parametric)", "FrameSpacers.02": "standoff (parametric)", "FlightControlSeparators (x8)": "grommet_silicone (parametric)" };

// parts the kit does not list but the model shows
const EXTRA = [
  { part_id: "propeller", pretty_name: "Propeller", qty: 4, spec: '10"', island: "motor", actual_source: "3d_scan", section: "Motors" },
  { part_id: "computer", pretty_name: "Companion computer", qty: 1, spec: "", island: "electronics", actual_source: "photo_model", section: "Stack" },
];

// what a parametric part's spec means to a generator; the standoff's length is measured off the blend (FrameSpacers.01: 0.5336 units × 0.05)
const GENERATED = {
  standoff: { generator: "fastener.standoff", params: { thread: "M3", length: 27 } },
  locknut_m3: { generator: "fastener.nut", params: { thread: "M3" } },
  motor_nut: { generator: "fastener.nut", params: { thread: "M5" } },
};
const bolt = (spec) => {
  const found = /^(M\d)x(\d+)/.exec(spec);
  return found ? { generator: "fastener.bolt", params: { thread: found[1], length: Number(found[2]) } } : null;
};

const FAMILY = (id, spec) => {
  if (id === "bolt_helper") return "family.jig";
  if (id.startsWith("bolt_")) return `family.bolt.${spec.slice(0, 2).toLowerCase()}`;
  if (id.includes("nut")) return "family.nut";
  if (id === "standoff") return "family.standoff";
  if (id.endsWith("_plate")) return "family.plate";
  if (id === "arm") return "family.arm";
  if (id === "motor") return "family.motor";
  if (id === "propeller") return "family.propeller";
  if (id === "fc" || id === "esc" || id === "computer" || id === "connector_set") return `family.${id === "connector_set" ? "connector" : id}`;
  if (id === "vtx" || id === "rx" || id === "camera") return `family.${id}`;
  if (id.endsWith("_antenna") || id === "vtx_pigtail") return "family.antenna";
  if (id.endsWith("_mount")) return "family.mount";
  if (id.startsWith("cable_") || id === "heat_shrink") return "family.cable";
  if (id === "grommet_silicone") return "family.grommet";
  if (id === "battery_pad" || id === "thermo_adhesive") return "family.pad";
  if (id === "battery_strap") return "family.strap";
  if (id === "zip_tie") return "family.zip_tie";
  if (id === "sticker_id") return "family.sticker";
  return null;
};

// RFC 4180 enough for the kit list: a quoted cell may hold commas and doubled quotes
const cells = (line) => {
  const out = [];
  let held = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (quoted && char === '"' && line[i + 1] === '"') (held += '"'), i++;
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) (out.push(held.trim()), (held = ""));
    else held += char;
  }
  out.push(held.trim());
  return out;
};
const csv = (text) => {
  const [head, ...lines] = text.trim().split("\n").map(cells);
  return lines.map((row) => Object.fromEntries(head.map((key, index) => [key, row[index] ?? ""])));
};

const kit = csv(read("sources/manifest.csv")).filter((row) => row.section !== "Tools");
const blend = JSON.parse(read("intake/blend.json"));
const byObject = Object.fromEntries(blend.parts.map((part) => [part.object, part]));
const modeled = {};
for (const [object, id] of Object.entries(MAPPED)) if (!modeled[id] && byObject[object]) modeled[id] = byObject[object];
for (const object of Object.keys(byObject)) if (!MAPPED[object] && !SKIPPED[object]) console.warn(`[harvest] unmapped object ${object}`);

const rows = [...kit, ...EXTRA].map((part) => {
  const id = part.part_id;
  const traits = ["LABELED"];
  const trait = { LABELED: { name: part.pretty_name, ...(part.spec && { description: part.spec }) } };
  const symbols = ["component", `material.${part.island}`];
  const source = part.actual_source || part.probable_source?.split(",")[0]?.trim();
  if (source) symbols.push(`source.${source}`);
  const family = FAMILY(id, part.spec);
  if (family) symbols.push(family);
  const held = modeled[id];
  if (held) {
    traits.push("SOURCED", "MODELED");
    trait.SOURCED = { file: blend.source, object: held.object, scale: blend.scale };
    trait.MODELED = { file: `parts/${id}.glb`, tris: held.tris, bbox: held.bbox };
    Deno.copyFileSync(`${HERE}intake/${held.file}`, `${HERE}freight/parts/${id}.glb`);
  }
  const generated = GENERATED[id] ?? (id.startsWith("bolt_") ? bolt(part.spec) : null);
  if (generated) (traits.push("PARAMETRIC"), (trait.PARAMETRIC = generated));
  if (part.qty !== "" && part.qty != null) (traits.push("COUNTED"), (trait.COUNTED = { qty: Number(part.qty) }));
  return { slug: id, traits, trait, symbols: symbols.map((slug) => ({ slug })) };
});

Deno.writeTextFileSync(`${HERE}dataset/literals/components.json`, JSON.stringify(rows, null, 1) + "\n");
const counts = { rows: rows.length, modeled: rows.filter((row) => row.trait.MODELED).length, parametric: rows.filter((row) => row.trait.PARAMETRIC).length, bare: rows.filter((row) => !row.trait.MODELED && !row.trait.PARAMETRIC).length };
console.log(`[harvest] components.json ${JSON.stringify(counts)}; families ${[...new Set(rows.flatMap((row) => row.symbols.map((s) => s.slug)).filter((s) => s.startsWith("family.")))].length}`);

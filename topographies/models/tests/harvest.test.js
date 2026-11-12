import { Datasink, specimen } from "@vivalence/typology";
import { parts, placements } from "../harvest/rows.js";
import * as kit from "../harvest/kit.js";
import * as interceptor from "../harvest/interceptor.js";
import { measured } from "../harvest/glb.js";
import written from "../dataset/literals/parts.js";
import placed from "../dataset/literals/placements.js";
import { accio, mode, mount } from "../../../tests/rig.js";
import * as models from "../models.viva.js";

const { describe, it, expect } = specimen;

const HERE = new URL("../", import.meta.url).pathname;

const sizes = await measured(`${HERE}freight`, interceptor.printed.map((part) => part.slug));
const bodies = () => [...parts(), ...interceptor.parts(sizes)];
const composed = () => [...placements(), ...interceptor.placements(sizes)];

const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

describe("the harvest — pure rows over the blend, the kit and the measured anchors", () => {
  it("P-kit: 41 part rows, the kit's counts, every PARAMETRIC part built by the domain's generators", async () => {
    const rows = parts();
    expect(rows.length).toBe(45);
    const qty = Object.fromEntries(rows.filter((row) => row.trait.COUNTED).map((row) => [row.slug, row.trait.COUNTED.qty]));
    expect(qty).toMatchObject({ bolt_m3_16: 6, bolt_m3_18: 4, bolt_m3_8: 16, bolt_m3_30: 4, bolt_m3_28: 4, bolt_m3_12: 1, bolt_m3_10: 16, bolt_m2_4: 2, standoff: 8, locknut_m3: 4, prop_nut_m5: 4, grommet: 8, motor: 4, motor_arm: 4, propeller: 4, cam_holder: 2, antenna_rx: 2, zip_tie: 6, battery_strap: 2 });
    const { generate } = await accio("@assembly/domain/assembly").then((domain) => import(`${domain.source.dirname}/generators/index.js`));
    for (const row of rows.filter((row) => row.trait.PARAMETRIC)) expect(generate(row.trait.PARAMETRIC).children.length, row.slug).toBeGreaterThan(0);
    expect(rows.filter((row) => row.trait.MODELED).length).toBe(16);
  });

  it("P-placements: fasteners by ref equal the kit's used column; every join names a placement; no two fasteners within 1 mm; the blend's 26 placements ride verbatim", () => {
    const rows = placements();
    const byRef = {};
    for (const row of rows) byRef[row.trait.PLACED.ref] = (byRef[row.trait.PLACED.ref] ?? 0) + 1;
    expect(byRef).toMatchObject({ bolt_m3_16: 6, bolt_m3_18: 4, bolt_m3_8: 12, bolt_m3_30: 4, bolt_m3_10: 16, bolt_m2_4: 2, standoff: 8, grommet: 8, locknut_m3: 4, prop_nut_m5: 4, motor_wire: 4, zip_tie: 5 });
    expect(byRef.bolt_m3_28).toBeUndefined();
    expect(byRef.bolt_m3_12).toBeUndefined();
    const homes = new Map(rows.map((row) => [row.trait.PLACED.name, row.trait.PLACED.layer]));
    expect([...new Set(homes.values())].sort()).toEqual(["drive", "frame", "quadro", "stack", "top"]);
    for (const assembly of kit.assemblies) expect(homes.get(`${assembly.slug}.0`), assembly.slug).toBe("quadro");
    for (const row of rows) for (const join of row.trait.JOINED?.joins ?? []) expect(homes.get(join), `${row.slug} joins ${join}`).toBe(row.trait.PLACED.layer);
    const fasteners = rows.filter((row) => /^(bolt|standoff|locknut|prop_nut|grommet)/.test(row.trait.PLACED.ref) && row.trait.PLACED.translation);
    for (let i = 0; i < fasteners.length; i++) {
      for (let j = i + 1; j < fasteners.length; j++) {
        expect(distance(fasteners[i].trait.PLACED.translation, fasteners[j].trait.PLACED.translation) >= 0.001, `${fasteners[i].slug} ~ ${fasteners[j].slug}`).toBe(true);
      }
    }
    const blend = rows.filter((row) => kit.named[row.trait.PLACED.ref]);
    expect(blend.length).toBe(26);
    expect(rows.find((row) => row.slug === "frame.frame_root.0").trait.PLACED.translation).toEqual([0.42305, -0.00214, 0.42188]);
  });

  it("P-canonical: the files on disk are the harvest's rows in the drain's own form — a re-run is a no-op", () => {
    expect(Datasink.canonical(bodies(), "js")).toBe(Deno.readTextFileSync(`${HERE}dataset/literals/parts.js`));
    expect(Datasink.canonical(composed(), "js")).toBe(Deno.readTextFileSync(`${HERE}dataset/literals/placements.js`));
    expect(written.length).toBe(bodies().length);
    expect(placed.length).toBe(composed().length);
  });
});

describe("the loop — install from disk, drain back, byte for byte", { sanitizeResources: false, sanitizeOps: false }, () => {
  it("P-roundtrip: DATASET installs the files into the assembly domain, DATASINK drains every row back and rewrites nothing", async () => {
    const rig = await mount();
    const scratch = await Deno.makeTempDir({ prefix: "droneaid-models-" });
    for (const dir of ["dataset/literals", "dataset/symbols"]) {
      await Deno.mkdir(`${scratch}/${dir}`, { recursive: true });
      for (const entry of Deno.readDirSync(`${HERE}${dir}`)) await Deno.copyFile(`${HERE}${dir}/${entry.name}`, `${scratch}/${dir}/${entry.name}`);
    }
    const held = await rig.install(mode({ ...models, source: { dirname: scratch } }, scratch));
    const literals = await rig.literal.find({}, { populate: ["symbols"] });
    expect(literals.length).toBe(bodies().length + composed().length);
    expect(literals.filter((row) => row.ontology === "part").length).toBe(bodies().length);
    expect(literals.filter((row) => row.ontology === "placement").length).toBe(composed().length);
    expect((await rig.literal.named("frame.bolt_m3_18.0")).trait.JOINED.joins).toEqual(["frame_root.0", "frame_bottom.0", "standoff.0"]);
    const report = await held.datasink.drain({ all: true });
    expect(report.drained.sort()).toEqual(["literal", "symbol"]);
    expect(report.written).toBe(0);
    expect(report.orphans.literal).toBe(0);
    const fold = await rig.literal.resolve(await rig.literal.named("quadro"));
    expect(fold.placements.length).toBe(placements().length);
    expect(fold.missing).toEqual([]);
    const second = await rig.literal.resolve(await rig.literal.named("interceptor"));
    const paths = second.placements.map((one) => one.path);
    const inside = (slug) => placements().filter((literal) => literal.trait.PLACED.layer === slug).length;
    expect(paths.length).toBe(interceptor.placements(sizes).length + interceptor.shared.reduce((sum, slug) => sum + inside(slug), 0));
    for (const slug of interceptor.shared) expect(paths.filter((path) => path.startsWith(`${slug}.0/`)).length, slug).toBe(inside(slug));
    expect(paths).toContain("head.0/head_shell.0");
    expect(paths).toContain("vtx_mount.0/pigtail_holder.0");
    expect(paths).toContain("tail.0/hinge.3");
    const flat = new Set(placements().filter((literal) => literal.trait.PLACED.layer === kit.subject.slug).map((literal) => literal.trait.PLACED.name));
    for (const one of second.placements) expect(flat.has(one.path) && !interceptor.shared.includes(one.ref), one.path).toBe(false);
    expect(second.missing).toEqual([]);
    const bom = Object.fromEntries(await rig.literal.bom(await rig.literal.named("quadro")));
    expect(bom).toMatchObject({ bolt_m3_16: 6, bolt_m3_18: 4, bolt_m3_8: 12, standoff: 8, grommet: 8, motor: 4, propeller: 4 });
    await rig.close();
  });
});

import { Datasink, specimen } from "@vivalence/typology";
import { parts, placements } from "../harvest/rows.js";
import * as kit from "../harvest/kit.js";
import written from "../dataset/literals/parts.js";
import placed from "../dataset/literals/placements.js";
import { accio, mode, mount } from "../../../tests/rig.js";
import * as models from "../models.viva.js";

const { describe, it, expect } = specimen;

const HERE = new URL("../", import.meta.url).pathname;

const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

describe("the harvest — pure rows over the blend, the kit and the measured anchors", () => {
  it("P-kit: 41 part rows, the kit's counts, every PARAMETRIC part built by the domain's generators", async () => {
    const rows = parts();
    expect(rows.length).toBe(41);
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
    const names = new Set(rows.map((row) => row.trait.PLACED.name));
    for (const row of rows) for (const join of row.trait.JOINED?.joins ?? []) expect(names.has(join), `${row.slug} joins ${join}`).toBe(true);
    const fasteners = rows.filter((row) => /^(bolt|standoff|locknut|prop_nut|grommet)/.test(row.trait.PLACED.ref) && row.trait.PLACED.translation);
    for (let i = 0; i < fasteners.length; i++) {
      for (let j = i + 1; j < fasteners.length; j++) {
        expect(distance(fasteners[i].trait.PLACED.translation, fasteners[j].trait.PLACED.translation) >= 0.001, `${fasteners[i].slug} ~ ${fasteners[j].slug}`).toBe(true);
      }
    }
    const blend = rows.filter((row) => kit.named[row.trait.PLACED.ref]);
    expect(blend.length).toBe(26);
    expect(rows.find((row) => row.slug === "drone.frame_root.0").trait.PLACED.translation).toEqual([0.42305, -0.00214, 0.42188]);
  });

  it("P-canonical: the files on disk are the harvest's rows in the drain's own form — a re-run is a no-op", () => {
    expect(Datasink.canonical(parts(), "js")).toBe(Deno.readTextFileSync(`${HERE}dataset/literals/parts.js`));
    expect(Datasink.canonical(placements(), "js")).toBe(Deno.readTextFileSync(`${HERE}dataset/literals/placements.js`));
    expect(written.length).toBe(parts().length);
    expect(placed.length).toBe(placements().length);
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
    expect(literals.length).toBe(parts().length + placements().length);
    expect(literals.filter((row) => row.ontology === "part").length).toBe(parts().length);
    expect(literals.filter((row) => row.ontology === "placement").length).toBe(placements().length);
    expect((await rig.literal.named("drone.bolt_m3_18.0")).trait.JOINED.joins).toEqual(["frame_root.0", "frame_bottom.0", "standoff.0"]);
    const report = await held.datasink.drain({ all: true });
    expect(report.drained.sort()).toEqual(["literal", "symbol"]);
    expect(report.written).toBe(0);
    expect(report.orphans.literal).toBe(0);
    const fold = await rig.literal.resolve(await rig.literal.named("drone"));
    expect(fold.placements.length).toBe(placements().length);
    expect(fold.missing).toEqual([]);
    const bom = Object.fromEntries(await rig.literal.bom(await rig.literal.named("drone")));
    expect(bom).toMatchObject({ bolt_m3_16: 6, bolt_m3_18: 4, bolt_m3_8: 12, standoff: 8, grommet: 8, motor: 4, propeller: 4 });
    await rig.close();
  });
});

import { Datasink, specimen } from "@vivalence/typology";
import { guideRow, stepRows } from "../harvest/rows.js";
import { steps as authored } from "../harvest/steps.js";
import placements from "../../models/dataset/literals/placements.js";
import { mode, mount } from "../../../tests/rig.js";
import * as models from "../../models/models.viva.js";
import * as guides from "../guides.viva.js";

const { describe, it, expect } = specimen;

const HERE = new URL("../", import.meta.url).pathname;
const MODELS = new URL("../../models/", import.meta.url).pathname;

describe("the harvest — the 33 steps over the drone's placements", () => {
  it("P-steps: 33 steps in 8 sections; every placement a step names exists in models; every placement but the unused bolts is installed exactly once; the props come last", () => {
    const steps = stepRows();
    expect(steps.length).toBe(33);
    const held = new Set(placements.map((row) => row.slug));
    const named = steps.flatMap((step) => step.trait.ASSEMBLED.placements.map((one) => one.literal));
    for (const slug of named) expect(held.has(slug), slug).toBe(true);
    expect(named.length).toBe(new Set(named).size);
    expect(new Set(named).size).toBe(placements.length);
    expect(steps.at(-1).trait.ASSEMBLED.placements.map((one) => one.literal)).toEqual(["drone.propeller.0", "drone.propeller.1", "drone.propeller.2", "drone.propeller.3"]);
    expect(steps[5].trait.ASSEMBLED.placements.map((one) => one.literal)).toEqual(["drone.bolt_m3_18.0", "drone.bolt_m3_18.1", "drone.bolt_m3_18.2", "drone.bolt_m3_18.3", "drone.bolt_m3_16.4", "drone.bolt_m3_16.5"]);
    for (const step of steps) {
      expect(step.trait.STAGED.camera.position.length, step.slug).toBe(3);
      expect(step.uses.map((one) => one.slug)).toEqual([...new Set(step.trait.ASSEMBLED.placements.map((one) => one.literal))].sort());
    }
    expect(authored.filter((step) => step.lines.length === 0)).toEqual([]);
    expect(authored.flatMap((step) => step.notes).every((note) => note.symbols[0] === "note.warning" || note.symbols[0] === "note.tip")).toBe(true);
  });

  it("P-canonical: the files on disk are the harvest's rows in the drain's own form", () => {
    expect(Datasink.canonical(stepRows(), "js")).toBe(Deno.readTextFileSync(`${HERE}dataset/literals/steps.js`));
    expect(Datasink.canonical([guideRow()], "js")).toBe(Deno.readTextFileSync(`${HERE}dataset/literals/guides.js`));
  });
});

describe("the loop — models then guides, drained back byte for byte", { sanitizeResources: false, sanitizeOps: false }, () => {
  it("P-roundtrip: both topographies install into one daemon; each drain rewrites nothing; the guide folds over the drone with no missing slug and /bom after 33 steps is the kit's used column", async () => {
    const rig = await mount();
    const copy = async (from) => {
      const scratch = await Deno.makeTempDir({ prefix: "droneaid-" });
      for (const dir of ["dataset/literals", "dataset/symbols"]) {
        await Deno.mkdir(`${scratch}/${dir}`, { recursive: true });
        for (const entry of Deno.readDirSync(`${from}${dir}`)) await Deno.copyFile(`${from}${dir}/${entry.name}`, `${scratch}/${dir}/${entry.name}`);
      }
      return scratch;
    };
    const modelsAt = await copy(MODELS);
    const guidesAt = await copy(HERE);
    const first = await rig.install(mode({ ...models, source: { dirname: modelsAt } }, modelsAt));
    const second = await rig.install(mode({ ...guides, source: { dirname: guidesAt } }, guidesAt));
    expect((await rig.literal.find({})).length).toBe(placements.length + 41 + 34);
    expect((await second.datasink.drain({ all: true })).written).toBe(0);
    expect((await first.datasink.drain({ all: true })).written).toBe(0);
    const guide = await rig.literal.named("droneaid");
    expect(guide.ontology).toBe("guide");
    const fold = await rig.literal.resolve(guide);
    expect(fold.missing).toEqual([]);
    expect(fold.steps.length).toBe(33);
    expect(fold.steps[5].prepared.parts).toEqual({ bolt_m3_18: 4, bolt_m3_16: 2 });
    expect(fold.steps[5].prepared.tools).toEqual(["tool.hex_2_0"]);
    const after = Object.fromEntries(await rig.literal.bom(guide, { upto: 33 }));
    expect(after).toMatchObject({ bolt_m3_16: 6, bolt_m3_18: 4, bolt_m3_8: 12, bolt_m3_30: 4, bolt_m3_10: 16, bolt_m2_4: 2, standoff: 8, grommet: 8, locknut_m3: 4, prop_nut_m5: 4, motor: 4, propeller: 4, motor_arm: 4 });
    expect(after.bolt_m3_28).toBeUndefined();
    expect(Object.fromEntries(await rig.literal.bom(guide, { upto: 6 }))).toMatchObject({ frame_root: 1, frame_bottom: 1, motor_arm: 4, bolt_m3_16: 6, bolt_m3_18: 4 });
    await rig.close();
  });
});

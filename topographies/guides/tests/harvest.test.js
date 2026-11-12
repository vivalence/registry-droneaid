import { Datasink, specimen } from "@vivalence/typology";
import { guideRow, stepRows } from "../harvest/rows.js";
import * as quadrocopter from "../harvest/quadrocopter.js";
import * as mari from "../harvest/mari.js";
import * as soldering from "../harvest/soldering.js";
import written from "../dataset/literals/guides.js";
import steps from "../dataset/literals/steps.js";
import placements from "../../models/dataset/literals/placements.js";
import parts from "../../models/dataset/literals/parts.js";
import { mode, mount } from "../../../tests/rig.js";
import * as models from "../../models/models.viva.js";
import * as guides from "../guides.viva.js";

const { describe, it, expect } = specimen;

const HERE = new URL("../", import.meta.url).pathname;
const MODELS = new URL("../../models/", import.meta.url).pathname;

const installs = (rows) => rows.flatMap((step) => step.trait.ASSEMBLED.placements.map((one) => one.literal));

describe("the harvest — the seed of each guide, written once; the dataset is the record after", () => {
  it("P-seed: quadrocopter seeds 33 steps that install every piece under quadro once, the props last; mari seeds 20 of its own over interceptor, none of quadrocopter's", () => {
    const quad = stepRows(quadrocopter);
    expect(quad.length).toBe(33);
    expect(installs(quad).length).toBe(new Set(installs(quad)).size);
    const layers = new Set(placements.map((row) => row.trait.PLACED.layer));
    const reached = new Set(["quadro", ...placements.filter((row) => row.trait.PLACED.layer === "quadro" && layers.has(row.trait.PLACED.ref)).map((row) => row.trait.PLACED.ref)]);
    const pieces = placements.filter((row) => reached.has(row.trait.PLACED.layer) && !layers.has(row.trait.PLACED.ref));
    expect(new Set(installs(quad)).size).toBe(pieces.length);
    expect(quad.at(-1).trait.ASSEMBLED.placements.map((one) => one.literal)).toEqual(["drive.propeller.0", "drive.propeller.1", "drive.propeller.2", "drive.propeller.3"]);
    const own = stepRows(mari);
    expect(own.length).toBe(20);
    expect(own.every((step) => step.slug.startsWith("mari."))).toBe(true);
    expect(guideRow(mari).trait.SEQUENCED.subject).toBe("interceptor");
    expect(guideRow(mari).trait.SEQUENCED.sections.flatMap((section) => section.steps)).toEqual(own.map((step) => step.slug));
    const mine = placements.filter((row) => ["tail", "vtx_mount", "head"].includes(row.trait.PLACED.layer)).map((row) => row.slug);
    expect(installs(own.slice(-3)).sort()).toEqual(mine.sort());
    expect(own.every((step) => !step.trait.LABELED.description.includes("Manual p"))).toBe(true);
    const joints = stepRows(soldering);
    expect(joints.length).toBe(6);
    expect(installs(joints)).toEqual([]);
    expect(guideRow(soldering).trait.SEQUENCED.subject).toBe(undefined);
    expect(guideRow(soldering).uses.map((one) => one.slug)).toEqual(joints.map((step) => step.slug));
  });

  it("P-record: on disk every step names placements that exist, a guide installs a placement once, a step uses what it installs; both files are in the drain's own form", () => {
    const held = new Set(placements.map((row) => row.slug));
    const index = new Map(steps.map((step) => [step.slug, step]));
    for (const slug of installs(steps)) expect(held.has(slug), slug).toBe(true);
    for (const guide of written) {
      const named = installs(guide.trait.SEQUENCED.sections.flatMap((section) => section.steps).flatMap((slug) => (index.has(slug) ? [index.get(slug)] : [])));
      expect(named.length, guide.slug).toBe(new Set(named).size);
    }
    for (const step of steps) {
      const used = new Set((step.uses ?? []).map((one) => one.slug));
      for (const slug of installs([step])) expect(used.has(slug), `${step.slug} uses ${slug}`).toBe(true);
    }
    expect(Datasink.canonical(steps, "js")).toBe(Deno.readTextFileSync(`${HERE}dataset/literals/steps.js`));
    expect(Datasink.canonical(written, "js")).toBe(Deno.readTextFileSync(`${HERE}dataset/literals/guides.js`));
  });
});

describe("the loop — models then guides, drained back byte for byte", { sanitizeResources: false, sanitizeOps: false }, () => {
  it("P-roundtrip: both topographies install into one daemon; each drain rewrites nothing; every guide folds over its subject with no missing slug and every step it sequences", async () => {
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
    expect((await rig.literal.find({})).length).toBe(placements.length + parts.length + steps.length + written.length);
    expect((await second.datasink.drain({ all: true })).written).toBe(0);
    expect((await first.datasink.drain({ all: true })).written).toBe(0);
    for (const one of written) {
      const guide = await rig.literal.named(one.slug);
      expect(guide.ontology).toBe("guide");
      const fold = await rig.literal.resolve(guide);
      expect(fold.missing, one.slug).toEqual([]);
      expect(fold.steps.map((step) => step.slug)).toEqual(one.trait.SEQUENCED.sections.flatMap((section) => section.steps));
    }
    await rig.close();
  });
});

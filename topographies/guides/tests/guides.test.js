import { specimen } from "@vivalence/typology";
import * as guides from "../guides.viva.js";
import sections from "../dataset/symbols/sections.js";
import steps from "../dataset/literals/steps.js";
import written from "../dataset/literals/guides.js";

const { describe, it, expect } = specimen;

const HERE = new URL("../", import.meta.url).pathname;
const list = (dir) => [...Deno.readDirSync(`${HERE}${dir}`)].filter((entry) => entry.isFile && !entry.name.startsWith(".")).map((entry) => entry.name).sort();

describe("@droneaid/topography/guides — the manual as rows, installed from disk and drained back to it", () => {
  it("P-manifest: a DATASET · FILESET · DATASINK topography named guides; sinks on guide and step rows and the section symbols", () => {
    expect(guides.manifest.type).toBe("topography");
    expect(guides.manifest.slug).toBe("guides");
    expect([...guides.manifest.traits].sort()).toEqual(["DATASET", "DATASINK", "FILESET"]);
    expect(guides.datasink.targets.sort()).toEqual(["dataset/literals/guides.js", "dataset/literals/steps.js", "dataset/symbols/sections.js"]);
    expect(list("dataset/literals")).toEqual(["guides.js", "steps.js"]);
    expect(list("dataset/symbols")).toEqual(["sections.js"]);
  });

  it("P-vocabulary: the manual's 8 sections as symbols, ONTOLOGICAL · LABELED", () => {
    expect(sections.map((row) => row.slug)).toEqual(["section.camera", "section.checklist", "section.frame", "section.motors", "section.rx", "section.stack", "section.top_plate", "section.vtx"]);
    for (const row of sections) expect(row.traits, row.slug).toEqual(["ONTOLOGICAL", "LABELED"]);
  });

  it("P-guides: a step is sequenced once, by one guide; every step a guide sequences is on disk; a guide uses its subject and its steps", () => {
    const sequenced = (guide) => guide.trait.SEQUENCED.sections.flatMap((section) => section.steps);
    const every = written.flatMap(sequenced);
    const held = new Set(steps.map((row) => row.slug));
    expect(new Set(every).size).toBe(every.length);
    for (const slug of every) expect(held.has(slug), slug).toBe(true);
    for (const guide of written) {
      const used = new Set((guide.uses ?? []).map((one) => one.slug));
      for (const slug of [guide.trait.SEQUENCED.subject, ...sequenced(guide)].filter(Boolean)) expect(used.has(slug), `${guide.slug} uses ${slug}`).toBe(true);
    }
  });

  it("P-freight: every picture a step or the guide names is a page on the freight", () => {
    const pages = new Set(list("freight/manual").map((name) => `manual/${name}`));
    const named = [...written, ...steps].flatMap((row) => [...row.trait.INSTRUCTED.images, ...row.trait.ANNOTATED.notes.flatMap((note) => note.images ?? [])]);
    for (const image of named) expect(pages.has(image), image).toBe(true);
    expect(guides.fileset.path).toBe("freight");
  });
});

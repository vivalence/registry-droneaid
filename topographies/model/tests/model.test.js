// the topography as it ships: the product's own vocabulary (part families, the manual's sections)
// beside the @assembly topologies', the manual's pages on the freight, and an EMPTY literal
// dataset — the rows are what @assembly/editor/import writes here (dataset/literals/<assembly>.json
// and freight/parts/*.glb), never authored by hand or by a script. what the daemon holds is what
// was imported. the domain is the sibling registry package; a test has no ledger, so by path.
import { specimen } from "@vivalence/typology";
import component from "../../../../assembly/topologies/component/dataset/symbols/ontological.js";
import assembly from "../../../../assembly/topologies/assembly/dataset/symbols/ontological.js";
import step from "../../../../assembly/topologies/step/dataset/symbols/ontological.js";
import own from "../dataset/symbols/ontological.js";
import * as model from "../model.viva.js";

const { describe, it, expect } = specimen;

const HERE = new URL("../", import.meta.url).pathname;
const list = (dir) => {
  try {
    return [...Deno.readDirSync(`${HERE}${dir}`)].filter((entry) => entry.isFile && !entry.name.startsWith(".")).map((entry) => entry.name).sort();
  } catch {
    return null;
  }
};

describe("@droneaid/topography/model — vocabulary and pages; the rows are the importer's", () => {
  it("P-manifest: a DATASET · FRAUGHT topography named model, version 0.0.0, declaring symbol and literal sources", () => {
    expect(model.manifest.type).toBe("topography");
    expect(model.manifest.slug).toBe("model");
    expect(model.manifest.version).toBe("0.0.0");
    expect([...model.manifest.traits].sort()).toEqual(["DATASET", "FRAUGHT"]);
    expect(model.dataset.types.sort()).toEqual(["literal", "symbol"]);
  });

  it("P-vocabulary: 32 symbols of its own — 24 part families, 8 manual sections — none TOPOGRAPHICAL, none overlapping the @assembly topologies", () => {
    expect(own.length).toBe(32);
    expect(own.filter((row) => row.slug.startsWith("family.")).length).toBe(24);
    expect(own.filter((row) => row.slug.startsWith("section.")).length).toBe(8);
    for (const row of own) {
      expect(row.traits, row.slug).toEqual(["ONTOLOGICAL", "LABELED"]);
      expect(row.trait.LABELED.name.length, row.slug).toBeGreaterThan(0);
    }
    const universal = new Set([...component, ...assembly, ...step].map((row) => row.slug));
    for (const row of own) expect(universal.has(row.slug), row.slug).toBe(false);
    expect(new Set(own.map((row) => row.slug)).size).toBe(own.length);
  });

  it("P-empty-until-written: the literal dataset ships no rows — the importer writes them; nothing here is authored by hand", () => {
    expect(list("dataset/literals")).toEqual([]);
    expect(list("freight/parts")).toBe(null);
    expect(list("bak/dataset/literals")).toEqual(["assemblies.json", "components.json", "steps.json"]);
  });

  it("P-freight: the manual's pages ride the freight, in metres beside whatever the importer writes", () => {
    const pages = list("freight/manual") ?? [];
    expect(pages.length).toBeGreaterThan(0);
    for (const page of pages) expect(page, page).toMatch(/\.webp$/);
    expect(model.freight.path.nature).toBe("/freight");
  });
});

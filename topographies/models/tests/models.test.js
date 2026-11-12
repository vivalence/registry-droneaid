import { specimen } from "@vivalence/typology";
import * as models from "../models.viva.js";
import families from "../dataset/symbols/families.js";
import parts from "../dataset/literals/parts.js";
import placements from "../dataset/literals/placements.js";
import { load, meshes, winding } from "../harvest/glb.js";

const { describe, it, expect } = specimen;

const HERE = new URL("../", import.meta.url).pathname;
const list = (dir) => [...Deno.readDirSync(`${HERE}${dir}`)].filter((entry) => entry.isFile && !entry.name.startsWith(".")).map((entry) => entry.name).sort();

describe("@droneaid/topography/models — the drone as rows, installed from disk and drained back to it", () => {
  it("P-manifest: a DATASET · FILESET · DATASINK topography named models; sinks on part and placement rows and the family symbols, to the files the dataset reads", () => {
    expect(models.manifest.type).toBe("topography");
    expect(models.manifest.slug).toBe("models");
    expect([...models.manifest.traits].sort()).toEqual(["DATASET", "DATASINK", "FILESET"]);
    expect(models.dataset.types.sort()).toEqual(["literal", "symbol"]);
    expect(models.datasink.targets.sort()).toEqual(["dataset/literals/parts.js", "dataset/literals/placements.js", "dataset/symbols/families.js"]);
    expect(list("dataset/literals")).toEqual(["parts.js", "placements.js"]);
    expect(list("dataset/symbols")).toEqual(["families.js"]);
  });

  it("P-vocabulary: 23 part families of its own, every one ONTOLOGICAL · LABELED, no computer", () => {
    expect(families.length).toBe(23);
    for (const row of families) {
      expect(row.slug.startsWith("family."), row.slug).toBe(true);
      expect(row.traits, row.slug).toEqual(["ONTOLOGICAL", "LABELED"]);
      expect(row.trait.LABELED.name.length, row.slug).toBeGreaterThan(0);
    }
    expect(families.some((row) => row.slug === "family.computer")).toBe(false);
    expect(new Set(families.map((row) => row.slug)).size).toBe(families.length);
  });

  it("P-rows: every part carries the root symbol and a family; every placement lies in the layer of a body or of one of its sub-assemblies, places a part the file holds, and uses its ref and its layer", () => {
    const slugs = new Set(parts.map((row) => row.slug));
    const layers = new Set(placements.map((row) => row.trait.PLACED.layer));
    expect([...layers].sort()).toEqual(["drive", "frame", "head", "interceptor", "quadro", "stack", "tail", "top", "vtx_mount"]);
    for (const layer of layers) expect(slugs.has(layer), layer).toBe(true);
    for (const row of parts) {
      expect(row.symbols.some((one) => one.slug === "part"), row.slug).toBe(true);
      if (!layers.has(row.slug)) expect(row.symbols.some((one) => one.slug.startsWith("family.")), row.slug).toBe(true);
    }
    for (const row of placements) {
      expect(row.slug).toBe(`${row.trait.PLACED.layer}.${row.trait.PLACED.name}`);
      expect(slugs.has(row.trait.PLACED.ref), row.slug).toBe(true);
      expect(row.uses.map((one) => one.slug).sort()).toEqual([row.trait.PLACED.layer, row.trait.PLACED.ref].sort());
    }
  });

  it("P-freight: a GLB on the freight for every MODELED part, and no GLB without a part", () => {
    const modeled = parts.filter((row) => row.trait.MODELED).map((row) => row.trait.MODELED.file.replace("parts/", "")).sort();
    expect(list("freight/parts")).toEqual(modeled);
    expect(models.fileset.path).toBe("freight");
  });

  it("P-winding: every part mesh on the freight faces outward — a positive volume, and where it is closed no two faces wind one edge the same way", async () => {
    for (const name of list("freight/parts")) {
      for (const mesh of meshes(await load(Deno.readFileSync(`${HERE}freight/parts/${name}`).buffer))) {
        const { volume, doubled, loose } = winding(mesh.geometry);
        expect(volume * mesh.matrixWorld.determinant(), name).toBeGreaterThan(0);
        if (loose === 0) expect(doubled, name).toBe(0);
      }
    }
  });
});

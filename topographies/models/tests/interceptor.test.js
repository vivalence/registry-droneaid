import { specimen } from "@vivalence/typology";
import { parts } from "../harvest/rows.js";
import * as interceptor from "../harvest/interceptor.js";
import * as kit from "../harvest/kit.js";
import { load, measured, meshes } from "../harvest/glb.js";
import families from "../dataset/symbols/families.js";
import written from "../dataset/literals/parts.js";
import placed from "../dataset/literals/placements.js";

const { describe, it, expect } = specimen;

const HERE = new URL("../", import.meta.url).pathname;
const sizes = await measured(`${HERE}freight`, interceptor.printed.map((part) => part.slug));

describe("the interceptor — the second body of the models topography", () => {
  it("P-kit: its parts are its own, none minted twice, each a part of a family the dataset holds, each on disk", () => {
    const theirs = new Set(parts().map((literal) => literal.slug));
    const held = new Set(families.map((symbol) => symbol.slug));
    const own = interceptor.parts(sizes);
    expect(own.map((literal) => literal.slug)).toEqual(["interceptor", "head", "vtx_mount", "tail", "head_shell", "lens_cover", "vtx_spacer", "pigtail_holder", "tail_half_a", "tail_half_b", "antenna_standoff", "hinge", "antenna_cover"]);
    for (const literal of own) {
      const symbols = literal.symbols.map((symbol) => symbol.slug);
      expect(theirs.has(literal.slug), literal.slug).toBe(false);
      expect(symbols.includes("part"), literal.slug).toBe(true);
      expect(symbols.filter((slug) => slug.startsWith("family.")).every((slug) => held.has(slug)), literal.slug).toBe(true);
      expect(written.find((one) => one.slug === literal.slug), literal.slug).toEqual(literal);
    }
  });

  it("P-placements: the body places the stages it shares with the first body by reference, once each, then its own sub-assemblies; no loose piece of the first body; every printed piece once per count inside its own, no two of a layer on one seat, each on disk", () => {
    const own = interceptor.placements(sizes);
    expect(own.slice(0, 7).map((literal) => literal.slug)).toEqual(["interceptor.frame.0", "interceptor.drive.0", "interceptor.stack.0", "interceptor.top.0", "interceptor.head.0", "interceptor.vtx_mount.0", "interceptor.tail.0"]);
    expect(own.length).toBe(7 + interceptor.printed.reduce((sum, part) => sum + part.qty, 0));
    const stages = new Set(kit.assemblies.map((assembly) => assembly.slug));
    for (const slug of interceptor.shared) expect(stages.has(slug), slug).toBe(true);
    const mine = new Set(interceptor.parts(sizes).map((literal) => literal.slug));
    for (const literal of own) expect(mine.has(literal.trait.PLACED.ref) || interceptor.shared.includes(literal.trait.PLACED.ref), literal.slug).toBe(true);
    const seats = own.filter((literal) => literal.trait.PLACED.translation).map((literal) => `${literal.trait.PLACED.layer} ${literal.trait.PLACED.translation.join(" ")}`);
    expect(new Set(seats).size).toBe(own.length - interceptor.shared.length);
    for (const part of interceptor.printed) {
      expect(own.filter((literal) => literal.trait.PLACED.ref === part.slug).length, part.slug).toBe(part.qty);
    }
    for (const literal of own) {
      expect([interceptor.subject.slug, ...interceptor.assemblies.map((assembly) => assembly.slug)], literal.slug).toContain(literal.trait.PLACED.layer);
      expect(placed.find((one) => one.slug === literal.slug), literal.slug).toEqual(literal);
    }
  });

  it("P-freight: each printed piece is one mesh in metres, its origin under its own centre on its floor, under 1 MiB", async () => {
    for (const part of interceptor.printed) {
      const bytes = await Deno.readFile(`${HERE}freight/parts/${part.slug}.glb`);
      const found = meshes(await load(bytes.buffer));
      expect(found.length, part.slug).toBe(1);
      found[0].geometry.computeBoundingBox();
      const { min, max } = found[0].geometry.boundingBox;
      expect(min.y, part.slug).toBeCloseTo(0, 6);
      expect(min.x + max.x, part.slug).toBeCloseTo(0, 6);
      expect(min.z + max.z, part.slug).toBeCloseTo(0, 6);
      expect(Math.max(max.x - min.x, max.y, max.z - min.z) < 0.15, part.slug).toBe(true);
      expect(bytes.length < 1048576, part.slug).toBe(true);
    }
  });
});

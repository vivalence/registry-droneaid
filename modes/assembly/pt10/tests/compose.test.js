import { specimen } from "@vivalence/typology";
import { catalog, compose, loadGltf, splitIslands } from "../compose.js";
import { guide } from "../guide.js";

const bytes = await Deno.readFile(new URL("../freight/animated_drone.glb", import.meta.url));
const gltf = await loadGltf(bytes.buffer);

specimen.describe("compose — the glTF becomes parts", () => {
  specimen.it("catalogs six meshes, the body in twenty islands", () => {
    const meshes = catalog(gltf);
    specimen.expect(meshes.length).toBe(6);
    const body = meshes.find((entry) => entry.names.includes("main_CuerpoDron_0"));
    specimen.expect(body.islands.length).toBe(20);
    meshes.filter((entry) => entry.names.some((name) => /^h\d_Helice_0$/.test(name))).forEach((rotor) => specimen.expect(rotor.islands.length).toBe(5));
  });

  specimen.it("island order is stable across runs", () => {
    const fingerprint = (entry) => entry.islands.map((island) => `${island.tris}:${island.centroid.x.toFixed(3)}:${island.centroid.z.toFixed(3)}`).join("|");
    const [first, second] = [catalog(gltf), catalog(gltf)];
    first.forEach((entry, i) => specimen.expect(fingerprint(entry)).toBe(fingerprint(second[i])));
  });

  specimen.it("binds every guide part and never moves the frame", () => {
    const { parts, bounds } = compose(gltf, guide);
    specimen.expect(parts.map((part) => part.id)).toEqual(guide.parts.map((part) => part.id));
    const frame = parts.find((part) => part.id === "frame");
    specimen.expect(frame.explode.length()).toBe(0);
    specimen.expect(bounds.isEmpty()).toBe(false);
    parts.filter((part) => part.id.startsWith("prop-")).forEach((prop) => {
      const motor = parts.find((part) => part.id === `motor-${prop.id.slice(5)}`);
      specimen.expect(prop.obj.position.x).toBeCloseTo(motor.center.x, 5);
      specimen.expect(prop.obj.position.z).toBeCloseTo(motor.center.z, 5);
    });
  });

  specimen.it("every step names a known part", () => {
    const ids = new Set(guide.parts.map((part) => part.id));
    guide.steps.forEach((step, i) => step.parts.forEach((id) => specimen.expect(ids.has(id)).toBe(true)));
    Object.values(guide.animations).forEach((animation) => Object.keys(animation.parts).forEach((id) => specimen.expect(ids.has(id)).toBe(true)));
  });

  specimen.it("a selector naming an absent mesh throws with the roster", () => {
    specimen.expect(() => compose(gltf, { ...guide, parts: [{ id: "ghost", label: "ghost", select: { mesh: "nothing" } }] })).toThrow(/no mesh named nothing/);
  });

  specimen.it("splitIslands on a two-triangle strip yields one island", () => {
    const meshes = catalog(gltf);
    const lens = meshes.find((entry) => entry.names.includes("main_CuerpoDron_0")).islands[4];
    specimen.expect(splitIslands(lens.geometry).length).toBe(1);
  });
});

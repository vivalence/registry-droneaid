import { Dataset, Datasink, project } from "@vivalence/typology";

export const manifest = {
  type: "topography",
  slug: "models",
  name: "DroneAid models",
  description:
    "The DroneAid Hamburg PnP drone as rows of the assembly domain: its parts from the blend and the kit list, " +
    "every placement of the build under the one layer `drone`, the fasteners where the measured anchors put them. " +
    "Geometry on the freight in metres, Y-up. The rows are installed from dataset/ and drained back to it on every change; harvest/ writes them first.",
  version: "0.1.0",
  traits: ["DATASET", "FILESET", "DATASINK"],
};

export const fileset = { path: "freight" };

export const dataset = new Dataset({
  symbol: "dataset/symbols",
  literal: "dataset/literals",
});

const lean = project.pipe(project.lean(["symbols", "uses"]), project.omit("in", "mode"));

export const datasink = new Datasink({
  symbol: [[{ slug: { $like: "family.%" } }, project.omit("literals"), "dataset/symbols/families.js"]],
  literal: [
    ["part", lean, "dataset/literals/parts.js"],
    ["placement", lean, "dataset/literals/placements.js"],
  ],
});

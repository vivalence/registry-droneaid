import { Dataset, Datasink, project } from "@vivalence/typology";

export const manifest = {
  type: "topography",
  slug: "guides",
  name: "DroneAid guides",
  description:
    "The DroneAid Hamburg PnP assembly manual as rows of the assembly domain: one guide over the drone of @droneaid/topography/models, " +
    "33 steps in the manual's 8 sections, the manual's pages on the freight. " +
    "The rows are installed from dataset/ and drained back to it on every change; harvest/ writes them first.",
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
  symbol: [[{ slug: { $like: "section.%" } }, project.omit("literals"), "dataset/symbols/sections.js"]],
  literal: [
    ["guide", lean, "dataset/literals/guides.js"],
    ["step", lean, "dataset/literals/steps.js"],
  ],
});

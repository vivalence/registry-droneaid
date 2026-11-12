import { Dataset, Datasink, project } from "@vivalence/typology";

export const manifest = {
  type: "topography",
  slug: "guides",
  name: "DroneAid guides",
  description:
    "The build guides over the bodies of @droneaid/topography/models as rows of the assembly domain: quadrocopter, the DroneAid Hamburg PnP " +
    "manual over the quadro, mari, the Mari Drone manual over the interceptor, and soldering, the soldering checklist over no body; the manuals' pages on the freight. " +
    "The rows are installed from dataset/ and drained back to it on every change; harvest/ seeds them once.",
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

import { App, Freight, v, Vector } from "@vivalence/typology";

export const manifest = {
  type: "assembly",
  slug: "pt10",
  name: "PT10 V3",
  description:
    "Step-by-step construction of the 10″ carbon frame: the model in exploded view, a guide the builder steps " +
    "through, each step lighting up and seating the parts it installs.",
  version: "0.0.1",
  traits: ["APPLICATION", "STANDALONE", "EXPOSED", "FRAUGHT", "HARNESSED", "TOOLING", "CONVERSATIONAL"],
};

export { harness, tools } from "./harness.js";

export const freight = new Freight("freight");

export const aperture = new Vector();

export const application = new App(
  "buffer/Assembly.svelte",
  v.buffer({
    data: {
      step: v.integer().default(0).desc("Index of the guide step on screen; 0 is the overview. Example: 3"),
    },
  }),
);

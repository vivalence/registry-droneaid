import { Dataset, Freight } from "@vivalence/typology";

export const manifest = {
  type: "topography",
  slug: "model",
  name: "DroneAid model",
  description:
    "The DroneAid Hamburg PnP drone as rows of the assembly domain: its parts from the blend and the kit list, their placements, " +
    "the frame as a layer stack of the manual's steps. Geometry on the freight in metres, Y-up; the manual's pages beside it.",
  version: "0.0.0",
  traits: ["DATASET", "FRAUGHT"],
};

export const freight = new Freight("freight");

export const dataset = new Dataset({
  symbol: "dataset/symbols",
  literal: "dataset/literals",
});

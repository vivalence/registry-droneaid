export const droneaid = {
  manifest: {
    type: "daemon",
    slug: "droneaid",
    version: "0.0.2",
    name: "DroneAid",
    description: "The workshop: the assembly domain, the PT10 as rows, the importer that reads a blend into them, and the build guide.",
    icon: { emoji: "🛠️" },
  },
  kernel: [
    "@assembly/domain/assembly",
    "@assembly/topology/part",
    "@assembly/topology/placement",
    "@assembly/topology/step",
    "@assembly/topology/guide",
    "@droneaid/topography/model",
    "@assembly/editor/import",
    "@assembly/editor/assembly",
    "@assembly/editor/guide",
    "@assembly/player/guide",
    "@droneaid/assembly/pt10",
  ],
};

import { Datasink } from "@vivalence/typology";
import * as blend from "./blend.js";
import { families } from "./vocabulary.js";
import { parts, placements } from "./rows.js";
import { standing } from "./glb.js";

const HERE = new URL("..", import.meta.url).pathname;

const write = async (path, rows) => {
  const text = Datasink.canonical(rows, "js");
  const was = await Deno.readTextFile(`${HERE}${path}`).catch(() => null);
  await Deno.mkdir(new URL(path, `file://${HERE}`).pathname.replace(/\/[^/]+$/, ""), { recursive: true });
  await Deno.writeTextFile(`${HERE}${path}`, text);
  console.log(`${was === text ? "unchanged" : was === null ? "written  " : "rewritten"} ${path} ${rows.length} rows`);
};

const geometry = async (seat) => {
  await Deno.mkdir(`${HERE}freight/parts`, { recursive: true });
  for (const part of blend.parts) {
    await Deno.copyFile(`${seat}/${part.seat}`, `${HERE}freight/parts/${part.slug}.glb`);
  }
  const bytes = await Deno.readFile(`${seat}/frame_spacers.glb`);
  const standoff = await standing(bytes, "standoff");
  await Deno.writeFile(`${HERE}freight/parts/standoff.glb`, standoff.bytes);
  console.log(`freight/parts: ${blend.parts.length} copied from ${seat}; standoff.glb ${standoff.tris} tris ${standoff.size.map((n) => n.toFixed(5)).join(" × ")}`);
};

if (import.meta.main) {
  await write("dataset/symbols/families.js", families);
  await write("dataset/literals/parts.js", parts());
  await write("dataset/literals/placements.js", placements());
  const seat = Deno.args.indexOf("--seat");
  if (seat >= 0) await geometry(Deno.args[seat + 1]);
}

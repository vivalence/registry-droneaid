import { Datasink } from "@vivalence/typology";
import { sections } from "./vocabulary.js";
import { guideRow, stepRows } from "./rows.js";

const HERE = new URL("..", import.meta.url).pathname;

const write = async (path, rows) => {
  const text = Datasink.canonical(rows, "js");
  const was = await Deno.readTextFile(`${HERE}${path}`).catch(() => null);
  await Deno.mkdir(`${HERE}${path}`.replace(/\/[^/]+$/, ""), { recursive: true });
  await Deno.writeTextFile(`${HERE}${path}`, text);
  console.log(`${was === text ? "unchanged" : was === null ? "written  " : "rewritten"} ${path} ${rows.length} rows`);
};

if (import.meta.main) {
  await write("dataset/symbols/sections.js", sections);
  await write("dataset/literals/guides.js", [guideRow()]);
  await write("dataset/literals/steps.js", stepRows());
}

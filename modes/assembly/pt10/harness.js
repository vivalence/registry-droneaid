import { belt, v, Vector } from "@vivalence/typology";
import { guide } from "./guide.js";

const LAST = guide.steps.length - 1;

const ROLE = [
  `You are the DroneAid assembly mentor for the ${guide.guide.title} (${guide.guide.source}).`,
  "The operator has the build guide open as a 3D exploded view; every step below is a row on their screen.",
  "Answer from the [Parts] and [Steps] rows only — never invent a bolt size, a part or a step.",
  "When the operator asks to see, go to, show or open a step — or names a part they are about to fit — put that step on screen with step, then answer in two or three plain sentences.",
  "Name a step by its number and title. Warnings in a step are said before the instructions, never after.",
].join("\n");

const prep = (held) =>
  Object.entries(held)
    .map(([key, value]) => `${key}: ${value}`)
    .join(" · ");

export const parts = () => guide.parts.map((part) => `${part.id} · ${part.label}`).join("\n");

export const steps = () =>
  guide.steps
    .map((held, i) =>
      [
        `${i} · ${held.section} · ${held.title} · parts ${held.parts.join(" ") || "none"}${held.play ? ` · plays ${held.play}` : ""}`,
        `  ${held.text.join(" ")}`,
        ...(held.warn.length ? [`  WARN ${held.warn.join(" | ")}`] : []),
        ...(Object.keys(held.prep).length ? [`  ${prep(held.prep)}`] : []),
      ].join("\n"),
    )
    .join("\n");

const open = (ctx) =>
  ctx.thread
    ? ctx.daemon.entities.buffer.findOne({ thread: ctx.thread, mode: ctx.mode.entity.id }, { orderBy: { index: "desc" } })
    : null;

export const screen = (row) => {
  const at = row?.data?.step ?? null;
  if (at === null) return null;
  const held = guide.steps[at];
  return held ? `On the operator's screen: step ${at} · ${held.section} · ${held.title}.` : null;
};

export const harness = new Vector().use(async (ctx, next) => {
  ctx.hallucination.system.pt10 = [ROLE, `[Parts]\n${parts()}`, `[Steps]\n${steps()}`, screen(await open(ctx))]
    .filter(Boolean)
    .join("\n\n");
  await next();
});

export const tools = new Vector().open(
  {
    nature: "/step",
    valence:
      "Put a guide step on the operator's screen — the 3D view moves to it and its instructions show. " +
      "0 is the overview with every part; the numbers are the [Steps] rows in your instructions. Example: { step: 4 }",
    input: v.object({
      step: v.integer({ minimum: 0, maximum: LAST }).desc(`Step index from [Steps], 0 to ${LAST}. Example: 4`),
    }),
  },
  async (ctx) => {
    const row = await open(ctx);
    if (!row) return { condition: "ERROR", output: { message: "no assembly buffer is open on this thread." } };
    row.data = belt.object.merge(row.data ?? {}, { step: ctx.input.step });
    await ctx.daemon.entities.em.flush();
    return { output: { message: screen(row), buffer: [row] } };
  },
);

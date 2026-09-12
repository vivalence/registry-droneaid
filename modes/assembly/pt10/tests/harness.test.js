import { shape, shard, specimen, Vector } from "@vivalence/typology";
import { harness, parts, screen, steps, tools } from "../harness.js";
import { guide } from "../guide.js";

const LAST = guide.steps.length - 1;

const rig = () => {
  const rows = [
    { id: "b1", index: 0, thread: "t1", mode: "m1", data: { step: 0 } },
    { id: "b2", index: 1, thread: "t1", mode: "m1", data: { step: 3 } },
  ];
  const flushed = [];
  const daemon = {
    entities: {
      buffer: {
        findOne: async (where, options) => {
          const matching = rows.filter((row) => row.thread === where.thread && row.mode === where.mode);
          const sorted = options?.orderBy?.index === "desc" ? [...matching].sort((a, b) => b.index - a.index) : matching;
          return sorted[0] ?? null;
        },
      },
      em: { flush: async () => flushed.push(rows.map((row) => ({ ...row, data: { ...row.data } }))) },
    },
  };
  const bound = (vector, thread) =>
    new Vector()
      .use(shard.context.bind("daemon", daemon))
      .use(shard.context.bind("mode", { entity: { id: "m1" } }))
      .use(shard.context.bind("thread", thread))
      .use(shard.context.bind("hallucination", { system: {} }))
      .slurp(vector);
  return { rows, flushed, bound };
};

specimen.describe("pt10 harness — the guide in context, one verb to move the screen", () => {
  specimen.it("parts and steps index every row of the guide", () => {
    specimen.expect(parts().split("\n").length).toBe(guide.parts.length);
    specimen.expect(steps().split("\n").filter((line) => /^\d+ · /.test(line)).length).toBe(guide.steps.length);
    specimen.expect(steps()).toContain(`${LAST} · Check · Spin up · parts none · plays spin`);
    specimen.expect(steps()).toContain("WARN Props on, battery in: the drone is live. Stand clear.");
    specimen.expect(steps()).toContain("Bolts: 16 mm ×6, 18 mm ×4 · Tool: Hex 2.0");
  });

  specimen.it("the system section names the newest buffer's step; no thread, no screen line", async () => {
    const { bound } = rig();
    const render = (thread) =>
      shape.object(bound(harness, thread).open({ nature: "/render" }, (ctx) => ctx.hallucination.system.pt10)).render({});
    const on = await render("t1");
    specimen.expect(on).toContain("[Parts]\nframe · Frame");
    specimen.expect(on).toContain("[Steps]\n0 · Overview · Everything in the kit");
    specimen.expect(on).toContain("On the operator's screen: step 3 · Motors · Check the motor bolts.");
    const off = await render(null);
    specimen.expect(off).not.toContain("On the operator's screen");
    specimen.expect(screen({ data: {} })).toBe(null);
  });

  specimen.it("step writes the newest buffer on the thread and flushes; an empty thread refuses", async () => {
    const { rows, flushed, bound } = rig();
    const armed = shape.object(bound(tools, "t1"));
    const moved = await armed.step({ step: 7 });
    specimen.expect(moved.output.message).toBe("On the operator's screen: step 7 · Stack · Flight controller.");
    specimen.expect(moved.output.buffer[0].id).toBe("b2");
    specimen.expect(rows[1].data).toEqual({ step: 7 });
    specimen.expect(rows[0].data).toEqual({ step: 0 });
    specimen.expect(flushed.length).toBe(1);
    const refused = await shape.object(bound(tools, "t9")).step({ step: 1 });
    specimen.expect(refused.condition).toBe("ERROR");
    specimen.expect(flushed.length).toBe(1);
  });
});

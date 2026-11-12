import composed from "../../models/dataset/literals/placements.js";

const layers = new Set(composed.map((one) => one.trait.PLACED.layer));

const seats = (subject) => {
  const reached = new Set([
    subject,
    ...composed.filter((one) => one.trait.PLACED.layer === subject && layers.has(one.trait.PLACED.ref)).map((one) => one.trait.PLACED.ref),
  ]);
  const slugs = new Map(composed.filter((one) => reached.has(one.trait.PLACED.layer)).map((one) => [one.trait.PLACED.name, one.slug]));
  return (name) => {
    if (!slugs.has(name)) throw new Error(`[guides] no placement named "${name}" under "${subject}"`);
    return slugs.get(name);
  };
};

const refs = (slugs) => [...new Set(slugs.filter(Boolean))].sort().map((slug) => ({ slug }));

const literal = (slug, traits, trait, symbols, uses) => ({ slug, traits, trait, symbols: refs(symbols), uses: refs(uses) });

export const slugOf = (guide, index) => `${guide.slug}.${String(index + 1).padStart(2, "0")}`;

const cite = (step) => (step.pages.length ? ` Manual p${step.pages.length > 1 ? `${step.pages[0]}–${step.pages.at(-1)}` : step.pages[0]}.` : "");

const staging = (camera) => ({ ...(camera && { camera }), ghost: true });

export const stepRows = ({ guide, sections, steps, views }) => {
  const seated = seats(guide.subject);
  return steps.map((step, index) => {
    const placements = step.placements.map(seated);
    return literal(slugOf(guide, index), ["LABELED", "ASSEMBLED", "INSTRUCTED", "ANNOTATED", "STAGED"], {
      LABELED: { name: step.name, description: `${sections.find(([key]) => key === step.section)[1]}.${cite(step)}` },
      ASSEMBLED: { placements: placements.map((slug) => ({ literal: slug, active: true })) },
      INSTRUCTED: { lines: step.lines.map((text) => ({ text })), images: step.images },
      ANNOTATED: { notes: step.notes },
      STAGED: staging(views[step.section]),
    }, ["step", ...step.tools], placements);
  });
};

export const guideRow = ({ guide, sections, steps, views }) =>
  literal(guide.slug, ["LABELED", "SEQUENCED", "INSTRUCTED", "ANNOTATED", "STAGED"], {
    LABELED: { name: guide.name, description: guide.description },
    SEQUENCED: {
      subject: guide.subject,
      sections: sections.map(([key, name]) => ({ name, steps: steps.flatMap((step, index) => (step.section === key ? [slugOf(guide, index)] : [])) })),
    },
    INSTRUCTED: { lines: guide.lines.map((text) => ({ text })), images: guide.images },
    ANNOTATED: { notes: guide.notes },
    STAGED: { camera: views.overview, explode: 0, ghost: true },
  }, ["guide"], [guide.subject, ...steps.map((_, index) => slugOf(guide, index))]);

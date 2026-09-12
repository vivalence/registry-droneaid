import { guide, sections, steps, views } from "./steps.js";

const LAYER = "drone";

const refs = (slugs) => [...new Set(slugs.filter(Boolean))].sort().map((slug) => ({ slug }));

const literal = (slug, traits, trait, symbols, uses) => ({ slug, traits, trait, symbols: refs(symbols), uses: refs(uses) });

export const slugOf = (index) => `${guide.slug}.${String(index + 1).padStart(2, "0")}`;

const cite = (step) => (step.pages.length ? ` Manual p${step.pages.length > 1 ? `${step.pages[0]}–${step.pages.at(-1)}` : step.pages[0]}.` : "");

export const stepRows = () =>
  steps.map((step, index) => {
    const placements = step.placements.map((name) => `${LAYER}.${name}`);
    return literal(slugOf(index), ["LABELED", "ASSEMBLED", "INSTRUCTED", "ANNOTATED", "STAGED"], {
      LABELED: { name: step.name, description: `${sections.find(([key]) => key === step.section)[1]}.${cite(step)}` },
      ASSEMBLED: { placements: placements.map((slug) => ({ literal: slug, active: true })) },
      INSTRUCTED: { lines: step.lines.map((text) => ({ text })), images: step.images },
      ANNOTATED: { notes: step.notes },
      STAGED: { camera: views[step.section], ghost: true },
    }, ["step", ...step.tools], placements);
  });

export const guideRow = () =>
  literal(guide.slug, ["LABELED", "SEQUENCED", "INSTRUCTED", "ANNOTATED", "STAGED"], {
    LABELED: { name: guide.name, description: guide.description },
    SEQUENCED: {
      subject: guide.subject,
      sections: sections.map(([key, name]) => ({ name, steps: steps.flatMap((step, index) => (step.section === key ? [slugOf(index)] : [])) })),
    },
    INSTRUCTED: { lines: guide.lines.map((text) => ({ text })), images: guide.images },
    ANNOTATED: { notes: guide.notes },
    STAGED: { camera: views.overview, explode: 0, ghost: true },
  }, ["guide"], [guide.subject, ...steps.map((_, index) => slugOf(index))]);

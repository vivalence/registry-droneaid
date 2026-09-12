import { contexts, Path, shard, Span, Twitch } from "@vivalence/typology";
import { gestalten, sets, DaemonEntity, UserEntity, traits as catalog } from "@vivalence/runtime";
import { provider as datamap, descriptors, twitches } from "@vivalence/runtime/scenarios";
import paladin from "@vivalence/paladin";

const { DATASET, DATASINK } = catalog.mode;
const { gather, mint, strike } = gestalten.belt;

const ASSEMBLY = new Path(new URL("../../assembly", import.meta.url).pathname);

// the ledger is this test's own (HOME empty): the sibling package is mounted from the store this package lives in
let supplied = null;
export const accio = async (identifier) => {
  supplied ??= paladin.ledger.registry.supply().then((registry) => registry.mount(ASSEMBLY, { owner: "@assembly", slug: "assembly" }));
  await supplied;
  return await paladin.ledger.registry.accio(identifier);
};

export const DAEMON = "droneaid-rig";
export const TOPOLOGIES = ["part", "placement", "step", "guide"];

export const mode = (module, dirname = module.source.dirname) => ({
  manifest: module.manifest,
  entity: { installed: false },
  stdout: new Span("mode"),
  module: { ...module, source: { ...module.source, dirname } },
});

export async function mount() {
  const domain = await accio("@assembly/domain/assembly");
  const held = await datamap(descriptors);
  const { orm } = held;
  const em = held.entities.em;
  const runtime = new Twitch();
  for (const each of twitches) runtime.graft(each);
  runtime.branch("/after").use(shard.datamap.detached(held));
  held.registerSubscriber(runtime);
  const traits = Object.fromEntries(Object.keys(sets.traits).map((kind) => [kind, gather(domain, [], kind)]));
  const entities = { ...held.entities, ...strike(mint({ slug: DAEMON, kinds: sets.traits, traits }), em, sets.traits) };

  em.create(DaemonEntity, { slug: DAEMON, mask: { manifest: { type: "daemon", slug: DAEMON } } });
  const user = em.create(UserEntity, { slug: "beef" });
  await em.flush();
  em.setFilterParams("user", { user: user.id });

  const daemon = { slug: DAEMON, manifest: { slug: DAEMON, traits: [] }, reference: new Path(`/daemon/${DAEMON}`), modes: {}, entities, datamap: held, twitch: new Twitch(), domain };
  daemon.twitch.use(shard.context.spread(contexts.host, daemon)).use(shard.datamap.owned());
  daemon.twitch.branch("/after").use(shard.datamap.detached(held));
  held.registerSubscriber(daemon.twitch);

  const seat = async (unseated) => {
    const { type, slug, name, version } = unseated.manifest;
    const row = entities.mode.create({ type, slug, name: name ?? slug, traits: [], installed: "", version: version ?? "0.0.0" });
    await em.flush();
    return Object.assign(unseated, { id: row.id, entity: row });
  };

  for (const slug of TOPOLOGIES) await DATASET(await seat(mode(await accio(`@assembly/topology/${slug}`))), daemon);

  const install = async (unseated) => {
    const seated = await seat(unseated);
    await DATASET(seated, daemon);
    const sink = DATASINK(seated, daemon);
    await sink.finalize();
    return seated;
  };

  return { daemon, entities, orm, em, user, literal: entities.literal, domain, install, close: () => orm.close() };
}

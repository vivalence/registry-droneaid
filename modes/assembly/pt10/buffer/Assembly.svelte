<script>
  import { loadGltf } from "../compose.js";
  import { guide } from "../guide.js";
  import { ensureTextures, stage } from "./scene.js";

  let { daemon, mode, buffer } = $props();

  let container = $state(null);
  let panel = $state(null);
  let world = $state(null);
  let step = $state(buffer?.data?.step ?? 0);
  let fault = $state(null);
  let textures = $state("");
  let hover = $state(null);
  let tip = $state({ x: 0, y: 0 });
  let sound = $state(true);
  let explode = $state(1);
  let rows = $state([]);
  let dragging = $state(false);

  const last = guide.steps.length - 1;
  const sections = $derived(
    guide.steps.reduce((held, entry, i) => {
      if (i === 0 || guide.steps[i - 1].section !== entry.section) held.push({ section: entry.section, steps: [] });
      held.at(-1).steps.push({ ...entry, i });
      return held;
    }, []),
  );

  const retain = (next) => {
    if (!buffer?.id || !daemon?.entities?.buffer || buffer.data?.step === next) return;
    buffer.data = { ...buffer.data, step: next };
    daemon.entities.buffer.updateOne({ id: buffer.id }, { data: buffer.data }).catch((error) => (fault = `buffer · ${error.message}`));
  };

  const show = (index) => {
    const next = Math.max(0, Math.min(last, index));
    const forward = next > step;
    step = next;
    world?.go(next, forward);
    explode = next === 0 ? 1 : 0;
    rows[next]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    return next;
  };

  const go = (index) => retain(show(index));

  $effect(() =>
    daemon?.entities?.buffer?.subscribe?.({ id: buffer?.id }, (row) => {
      const next = row?.data?.step;
      if (Number.isInteger(next) && next !== step) show(next);
    }),
  );

  const onKey = (event) => {
    if (event.key === "ArrowRight") go(step + 1);
    if (event.key === "ArrowLeft") go(step - 1);
  };

  $effect(() => {
    if (!container) return;
    let held = null;
    let alive = true;
    (async () => {
      try {
        const catalog = await mode.call.freight();
        const asset = catalog[guide.model.asset];
        if (!asset) throw new Error(`freight carries no ${guide.model.asset}; has ${Object.keys(catalog).join(", ")}`);
        const bytes = await (await fetch(asset.url)).arrayBuffer();
        const gltf = await loadGltf(bytes);
        const report = await ensureTextures(gltf);
        textures = report.unfixed ? `${report.unfixed} texture(s) failed to load` : report.fixed ? `textures re-attached (${report.fixed})` : `${report.total} materials textured`;
        if (!alive) return;
        held = stage(container, {
          gltf,
          guide,
          panel,
          onHover: (part, at) => {
            hover = part;
            tip = at;
          },
          onPick: (part) => go(part.step),
        });
        world = held;
        held.go(step, false);
        explode = step === 0 ? 1 : 0;
      } catch (error) {
        fault = error.message;
      }
    })();
    return () => {
      alive = false;
      held?.dispose();
      world = null;
    };
  });

  $effect(() => {
    world?.mute(!sound);
  });

  $effect(() => {
    if (!world) return;
    const timer = setInterval(() => {
      if (!dragging) explode = world.exploded();
    }, 100);
    return () => clearInterval(timer);
  });

</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,400..800&display=swap" rel="stylesheet" />
</svelte:head>

<svelte:window onkeydown={onKey} />

<div class="assembly">
  <div class="stage" bind:this={container}>
    {#if hover}
      <div class="tip" style="left:{tip.x}px;top:{tip.y}px">{hover.label}</div>
    {/if}
    <div class="credit">
      {guide.model.credit}<br /><kbd>←</kbd> <kbd>→</kbd> step · drag to orbit · in the overview, click a part to jump to its step
    </div>
  </div>

  <aside class="panel" bind:this={panel}>
    <header>
      <h1>{guide.guide.title}</h1>
      <p>{guide.guide.source}{textures ? ` · ${textures}` : ""}</p>
    </header>

    <div class="toc">
      {#if fault}
        <div class="section">Could not load the model</div>
        <div class="step"><span class="number">!</span><span class="title">{fault}</span></div>
      {/if}
      {#each sections as group}
        <div class="section">{group.section}</div>
        {#each group.steps as entry}
          <div
            class="step"
            class:done={entry.i < step}
            class:current={entry.i === step}
            bind:this={rows[entry.i]}
            role="button"
            tabindex="0"
            onclick={() => go(entry.i)}
            onkeydown={(event) => event.key === "Enter" && go(entry.i)}
          >
            <span class="number">{entry.i === 0 ? "—" : String(entry.i).padStart(2, "0")}</span>
            <span class="title">{entry.title}</span>
            {#if entry.i === step}
              <div class="detail">
                {#each entry.text as paragraph}<p>{paragraph}</p>{/each}
                {#each entry.warn as warning}<div class="warn">{warning}</div>{/each}
                {#if Object.keys(entry.prep ?? {}).length}
                  <dl class="prep">
                    {#each Object.entries(entry.prep) as [label, value]}<dt>{label}</dt><dd>{value}</dd>{/each}
                  </dl>
                {/if}
                {#if entry.parts.length && world}
                  <div class="chips">
                    {#each entry.parts as id}
                      <span class="chip"><i style="background:{world.byId[id].swatch}"></i>{world.byId[id].label}</span>
                    {/each}
                  </div>
                {/if}
              </div>
            {/if}
          </div>
        {/each}
      {/each}
    </div>

    <footer>
      <div class="explode">
        <span>Assembled</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          bind:value={explode}
          onpointerdown={() => (dragging = true)}
          onpointerup={() => (dragging = false)}
          oninput={() => world?.explode(explode, dragging)}
        />
        <span>Exploded</span>
        <label class="sound" class:on={sound}>
          <input type="checkbox" bind:checked={sound} />
          <span class="switch"></span>
          <span>Sound</span>
        </label>
      </div>
      <div class="nav">
        <button disabled={step === 0} onclick={() => go(step - 1)}>Back</button>
        <button class="primary" disabled={step === last} onclick={() => go(step + 1)}>{step === last ? "Done" : "Next step"}</button>
        <button title="Reset camera" onclick={() => world?.view()}>View</button>
      </div>
    </footer>
  </aside>
</div>

<style>
  .assembly {
    --navy: #14224f;
    --ink: #1b2233;
    --paper: #ffffff;
    --studio: #e9ebef;
    --yellow: #ffd23f;
    --amber: #b86a00;
    --amber-bg: #fff4df;
    --mute: #6b7386;
    --line: #dde1e8;
    --hover: #f5f6f9;
    --current: #fffbea;
    --chip: #f1f3f7;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 480px;
    overflow: hidden;
    background: var(--studio);
    color: var(--ink);
    font-family: Archivo, system-ui, sans-serif;
    font-size: 16px;
    line-height: normal;
  }
  .assembly * {
    box-sizing: border-box;
  }
  .stage {
    position: absolute;
    inset: 0;
  }
  .stage :global(canvas) {
    display: block;
    outline: none;
  }
  .panel {
    position: absolute;
    left: 16px;
    top: 16px;
    bottom: 16px;
    width: 380px;
    display: flex;
    flex-direction: column;
    background: var(--paper);
    box-shadow: 0 1px 0 rgba(20, 34, 79, 0.06), 0 12px 40px rgba(20, 34, 79, 0.1);
    border-radius: 6px;
  }
  header {
    padding: 16px 20px 12px;
    border-bottom: 1px solid var(--line);
  }
  header h1 {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: var(--navy);
  }
  header p {
    margin: 3px 0 0;
    font-size: 12px;
    color: var(--mute);
  }
  .toc {
    flex: 1;
    overflow: auto;
    padding: 8px 0;
  }
  .section {
    padding: 14px 20px 4px;
    font-size: 12px;
    color: var(--mute);
    letter-spacing: 0.01em;
  }
  .step {
    display: grid;
    grid-template-columns: 34px 1fr;
    gap: 0 10px;
    padding: 7px 20px;
    cursor: pointer;
    border-left: 3px solid transparent;
    outline: none;
  }
  .step:hover {
    background: var(--hover);
  }
  .number {
    font-weight: 700;
    font-size: 13px;
    color: var(--mute);
    padding-top: 2px;
    font-variation-settings: "wdth" 82;
  }
  .title {
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    line-height: 1.3;
  }
  .step.done .title {
    color: var(--mute);
    font-weight: 500;
  }
  .step.current {
    border-left-color: var(--yellow);
    background: var(--current);
  }
  .step.current .number {
    background: var(--yellow);
    color: var(--navy);
    border-radius: 3px;
    text-align: center;
    padding: 2px 0;
  }
  .step.current .title {
    color: var(--navy);
    font-size: 17px;
    font-variation-settings: "wdth" 92;
  }
  .detail {
    grid-column: 2;
    padding: 8px 0 4px;
    font-size: 14px;
    line-height: 1.5;
  }
  .detail p {
    margin: 0 0 8px;
  }
  .warn {
    border-left: 3px solid var(--amber);
    background: var(--amber-bg);
    color: var(--amber);
    padding: 6px 10px;
    margin: 0 0 6px;
    font-size: 13px;
    line-height: 1.4;
    border-radius: 0 4px 4px 0;
  }
  .prep {
    margin: 8px 0 0;
    font-size: 13px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 3px 12px;
  }
  .prep dt {
    color: var(--mute);
  }
  .prep dd {
    margin: 0;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin: 10px 0 2px;
  }
  .chip {
    font-size: 12px;
    padding: 3px 8px 3px 6px;
    border-radius: 3px;
    background: var(--chip);
    color: var(--navy);
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .chip i {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  footer {
    border-top: 1px solid var(--line);
    padding: 12px 20px 16px;
    display: grid;
    gap: 10px;
    min-width: 0;
  }
  footer > * {
    min-width: 0;
  }
  .nav {
    display: flex;
    gap: 8px;
  }
  button {
    min-width: 0;
    font: inherit;
    font-weight: 600;
    border: 1px solid var(--navy);
    background: var(--paper);
    color: var(--navy);
    padding: 9px 14px;
    border-radius: 4px;
    cursor: pointer;
  }
  button.primary {
    background: var(--navy);
    color: #fff;
    flex: 1;
  }
  button:disabled {
    opacity: 0.35;
    cursor: default;
  }
  button:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--yellow);
    outline-offset: 2px;
  }
  .explode {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: var(--mute);
  }
  .explode input[type="range"] {
    flex: 1;
    accent-color: var(--navy);
    min-width: 0;
  }
  .sound {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }
  .sound input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  .switch {
    width: 30px;
    height: 17px;
    border-radius: 9px;
    background: var(--line);
    position: relative;
    transition: background 0.15s;
  }
  .switch::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 2px rgba(20, 34, 79, 0.3);
    transition: transform 0.15s;
  }
  .sound.on .switch {
    background: var(--navy);
  }
  .sound.on .switch::after {
    transform: translateX(13px);
  }
  .sound.on {
    color: var(--navy);
    font-weight: 600;
  }
  .tip {
    position: absolute;
    pointer-events: none;
    background: var(--navy);
    color: #fff;
    font-size: 12px;
    padding: 5px 8px;
    border-radius: 3px;
    transform: translate(12px, -50%);
  }
  .credit {
    position: absolute;
    right: 16px;
    bottom: 12px;
    font-size: 11px;
    color: var(--mute);
    max-width: 46%;
    text-align: right;
  }
  .credit kbd {
    font: inherit;
    border: 1px solid var(--line);
    background: #fff;
    padding: 0 4px;
    border-radius: 3px;
  }
  @media (max-width: 820px) {
    .panel {
      left: 0;
      right: 0;
      top: auto;
      bottom: 0;
      width: auto;
      max-height: 55vh;
      border-radius: 10px 10px 0 0;
    }
    .credit {
      display: none;
    }
  }
</style>

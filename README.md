# droneaid

DroneAid's package: the workshop that builds drones, as vivalence modes.

    @droneaid/package/droneaid

It carries one instance — the `droneaid` daemon — whose kernel is the assembly domain from
`@assembly` (components, assemblies and steps as literals, with the three topologies that ship
the vocabulary), this package's topography (`topographies/model`: the PT10's vocabulary and manual pages; its rows
are what the importer writes), the importer that reads a blend file into rows
(`@assembly/editor/import`, mounted under the daemon's mountpoint), and the PT10 V3 build guide:
the drone as an exploded 3D model, a stepped manual beside it, and a mentor in the chat.

## Getting started

Everything runs through `viva`, the vivalence shell tool. If you do not have it yet, follow the
[vivalence quickstart](https://github.com/vivalence/vivalence#quickstart) up to `viva ledger/init`
(deno, the checkout, `deno task install`, the ledger). Then:

### 1 — tap the package

    viva registry/tap https://github.com/crackedbeefcake/vivalence-assembly.git
    viva registry/tap https://github.com/crackedbeefcake/vivalence-droneaid.git

Both packages are cloned into the ledger's `registry/` and recorded there; their modes resolve by
identifier from any shell. The daemon mounts `@assembly`'s domain, topologies and importer beside
this package's topography and guide.

    viva registry/doctor
    @assembly       5 modes  ~/.viva/registry/assembly
    @droneaid       3 modes  ~/.viva/registry/droneaid

### 2 — create the instance

    viva instance/create @droneaid/instance/droneaid --use --init

`create` copies the recipe to `~/.viva/instances/droneaid/`, `--use` binds it to this shell and
`--init` runs the first boot: `.env` is populated (defaults, minted secrets), and you are asked to
create the first user.

Both keys are optional. The build guide runs without either; they are what gives it a mentor in
the chat. One is enough, and a key left blank leaves its provider dormant:

    SECRET_VIVA_ANTHROPIC_API_KEY=      # optional
    SECRET_VIVA_OPENROUTER_API_KEY=     # optional

The importer mounts `<instance>/mountpoint/daemon_droneaid/mode_editor_import/`: drop a `.blend` there.

### 3 — run it

    viva instance/run

    run runtime=… anima=…
      ➜  Local:   http://127.0.0.1:1794/
    launching on http://localhost:2501/

Open **http://localhost:1794**, log in with the account from step 2, pick the `droneaid` daemon and
open **PT10 V3** — or **Import**, to walk a blend file into the rows: harvest (blender on the
daemon's host) or load an intake, interpret, annotate, embed, then write it into
`topographies/model`. The importer's second pane lists the rows the daemon holds.

### 4 — build

- **The stage**: drag to orbit, scroll to zoom. In the overview every part floats apart; click one
  and the guide jumps to the step that installs it.
- **The guide**: `→` / `←` or the step list. Each step seats its parts, moves the camera and shows
  instructions, warnings and what to have ready. The last step spins the props up.
- **The mentor**: the chat beside the buffer. Ask about a bolt, a step, a part — or say *"show me
  the flight controller step"* and the view moves. What you see and what the mentor moves is the
  same thing: the buffer's `step`, written by either side and read by both.

### 5 — later

    viva instance/stop            # tear the processes down
    viva instance/doctor          # environment, processes, faults, dormant hallucinators

The instance under `~/.viva/instances/droneaid/` is yours: edit its `.env`, add daemons and modes.

## Shape

    package.viva.js                 the declaration
    instances/droneaid/             the instance — one daemon: @assembly's domain · topologies · importer, this topography, the guide; two hallucinators
    topographies/model/             the PT10's own vocabulary (part families, the manual's sections), the manual's pages on the freight — and the rows the importer writes into dataset/literals/
    modes/assembly/pt10/            the PT10 V3 build guide

Coming: knowledge base, learner resources, management panels, supply chain, ERP — each a sibling mode.

## assembly/pt10

    pt10.viva.js          manifest · freight · app · harness · tools
    guide.js              the data — this drone, this guide (parts, steps, views, animations)
    compose.js            glTF → parts. No drone knowledge: meshes split into islands, islands bound by selectors
    harness.js            the mentor: the guide indexed into context, `step` the one verb that moves the screen
    buffer/Assembly.svelte   the view: panel + stage; keeps `buffer.data.step` and follows it
    buffer/scene.js       three.js: lights, camera, explode/settle, highlight, spin, sound
    buffer/motor.js       the WebAudio motor synth
    freight/              animated_drone.glb — Animated Drone · alvarotakano · CC-BY-4.0

The guide belongs to the PT10 (DroneAid's assembly manual). The geometry belongs to the Sketchfab model.
`guide.parts[].select` is the only model-specific thing; swap the GLB and the selectors, the steps stay.

The screen is state, not a message: the view writes `step` to its buffer on every move, the
`step` tool writes the same field on the newest PT10 buffer of the thread, and the view subscribes
to its own buffer and follows. No side talks to the other; both talk to the row.

## Test

    deno test -A --no-check --config <checkout>/deno.jsonc ~/.viva/registry/droneaid/modes/assembly/pt10/tests/

`compose.test.js` parses the GLB headless and checks the parts; `harness.test.js` checks the
context index and the `step` verb against a stub thread.

# droneaid

DroneAid's package: the workshop that builds drones, as vivalence modes.

    @droneaid/package/droneaid

It carries one instance — the `droneaid` daemon — whose kernel is the assembly domain from
`@assembly` (parts, placements, steps and guides as literals, with the four topologies that ship
the vocabulary), this package's two topographies — `topographies/models`, the drone: its parts, the
kit and every placement of the build; `topographies/guides`, the manual: one guide, 33 steps in 8
sections, the manual's pages on the freight — the importer that reads a blend file into rows
(`@assembly/editor/import`), and `@assembly`'s editors and player over them.

The rows live on disk, in this package, as each topography's `dataset/`. The daemon installs them
at boot (DATASET) and writes every change back to the same files (DATASINK), so an edit in the
assembly editor or the guide editor lands in `dataset/literals/*.js` within two seconds and shows
in `git diff`. The daemon is working memory; the files are the record.

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
    @assembly       9 modes  ~/.viva/registry/assembly
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
open the **guide player** on `droneaid`, the guide editor to change a step, or the assembly editor
to move a part — every change drains back to `topographies/*/dataset/`. **Import** walks a new blend
file into rows beside them: harvest (blender on the daemon's host) or load an intake, interpret,
annotate, embed, commit.

### 4 — build

- **The guide** is `droneaid`: 33 steps in the manual's 8 sections over the subject part `drone`.
  `→` / `←` or the step list; each step seats the placements it installs, moves the camera and
  shows the manual's lines, warnings and pictures. The props come last.
- **The stage** draws every placement of `drone` from the freight (`models/freight/parts/*.glb`) or
  from a generator (`/geometry`: bolts, nuts, grommets, cables); what is not built yet is a ghost.
- **The mentor**: the chat beside the buffer. Ask what step 6 threads and it answers the four 18 mm
  bolts and the two 16 mm by slug.

### Re-harvest

The rows were first written by each topography's `harvest/` — pure data modules (the blend's
placements as the importer read them, the kit, the measured anchors, the 33 steps) and a
`harvest.js` that writes `dataset/` in the drain's own canonical form, so the next drain is a no-op:

    deno run -A --config <checkout>/deno.jsonc topographies/models/harvest/harvest.js --seat <mountpoint>/daemon_droneaid/mode_editor_import/parts
    deno run -A --config <checkout>/deno.jsonc topographies/guides/harvest/harvest.js

`--seat` also copies the importer's GLBs to `freight/parts/` and cuts one standoff out of the
blend's welded spacers. Run it after a re-import of the blend; it overwrites what the drain wrote
since, on purpose. Between harvests the drain owns the files — do not hand-edit them while the
daemon runs.

### 5 — later

    viva instance/stop            # tear the processes down
    viva instance/doctor          # environment, processes, faults, dormant hallucinators

The instance under `~/.viva/instances/droneaid/` is yours: edit its `.env`, add daemons and modes.

## Shape

    package.viva.js                 the declaration
    instances/droneaid/             the instance — one daemon: @assembly's domain · topologies · importer · editors · player, the two topographies, the dataspace dashboard
    topographies/models/            the drone — dataset/literals/{parts,placements}.js, dataset/symbols/families.js, freight/parts/*.glb; harvest/ writes them
    topographies/guides/            the manual — dataset/literals/{guides,steps}.js, dataset/symbols/sections.js, freight/manual/*.webp; harvest/ writes them

Coming: knowledge base, learner resources, management panels, supply chain, ERP — each a sibling mode.

## Test

    deno test -A --no-check --config <checkout>/deno.jsonc ~/.viva/registry/droneaid/

`models/tests` pins the manifest, the vocabulary, the freight and the harvest's rows (the kit's
counts, every join resolving, no two fasteners within a millimetre); `guides/tests` the 33 steps
against the placements and the pages. Each `harvest.test.js` ends with the loop itself: the files
install into the assembly domain over an in-memory datamap and drain back byte for byte.

const body = (...islands) => ({ mesh: "main_CuerpoDron_0", islands });
const mounts = (...islands) => ({ mesh: "main_Helice_0", islands });
const rotor = (h, ...islands) => ({ mesh: `${h}_Helice_0`, islands });

const corners = [
  ["fr", "front right", "h1", 3],
  ["fl", "front left", "h3", 2],
  ["rr", "rear right", "h2", 1],
  ["rl", "rear left", "h4", 0],
];

export const guide = {
  model: {
    asset: "animated_drone.glb",
    front: "+x",
    credit: "Animated Drone · alvarotakano · CC-BY-4.0 · sketchfab.com/3d-models/animated-drone-932cc7dfce3040269b9357b66fdacee2",
  },
  guide: { title: "10″ FPV drone", source: "DroneAid Hamburg · assembly manual v1.3.1 (EDTH 2026)" },
  explode: { radial: 0.55, up: 3.2, lift: 0.12 },
  animations: {
    spin: { axis: [0, 1, 0], rpm: 420, ramp: 2.5, sound: "motor", parts: { "prop-fr": 1, "prop-rl": 1, "prop-fl": -1, "prop-rr": -1 } },
  },
  parts: [
    { id: "frame", label: "Frame (bottom plate + arms)", select: body(0), explode: [0, 0, 0] },
    { id: "standoffL", label: "Standoff, rear left", select: body(12) },
    { id: "standoffR", label: "Standoff, rear right", select: body(13) },
    ...corners.map(([k, name, , mi]) => ({ id: `mount-${k}`, label: `Motor mount, ${name}`, select: mounts(mi) })),
    ...corners.map(([k, name, h]) => ({ id: `motor-${k}`, label: `Motor, ${name}`, select: rotor(h, 0, 1) })),
    { id: "stackPlate", label: "Stack plate", select: body(7) },
    { id: "fc", label: "Flight controller", select: body(6), explode: { lift: 0.4 } },
    { id: "fcHolder", label: "Stack holder", select: body(14, 15, 16, 17), explode: { lift: 0.7 } },
    { id: "vtx", label: "Video transmitter", select: body(2, 5, 8, 9, 10, 11), explode: { lift: 0.25, radial: 1.4 } },
    { id: "cameraMount", label: "Camera holder", select: body(3, 18, 19) },
    { id: "camera", label: "Camera", select: body(4), explode: { radial: 1.3 } },
    { id: "topPlate", label: "Top plate", select: body(1), explode: { lift: 0.6 } },
    ...corners.map(([k, name, h]) => ({ id: `prop-${k}`, label: `Propeller, ${name}`, select: rotor(h, 2, 3, 4), pivot: { part: `motor-${k}` } })),
  ],
  steps: [
    { section: "Overview", title: "Everything in the kit", view: "iso", parts: [],
      text: ["Unpack and identify every component. Sort all bolts by size with the measuring tool before you start."],
      warn: ["30 mm bolts are in the stack set, the 12 mm bolt in the additional package."],
      prep: { Bolts: "30 mm ×4 · 28 mm ×4 · 18 mm ×4 · 16 mm ×6 · 12 mm ×1 · 8 mm ×16 · M2 4 mm ×2", Tip: "Use a magnetic bolt organizer" } },

    { section: "Frame", title: "Bottom plate and arms", view: "top", parts: ["frame"],
      text: ["Identify the top side of the bottom plate — the side where the integrated nuts stick out. Work with the plate bottom side up.", "Set the arms into the hub one by one and cover them with the sandwich plate. Thread a 16 mm bolt for each arm. Then push the four 18 mm bolts in from below — no thread there — and thread the last two 16 mm bolts."],
      warn: ["Don’t tighten anything yet. Leave every bolt loose.", "18 mm bolts under the standoff positions, not 16 mm."],
      prep: { Parts: "Bottom plate, sandwich plate, arms ×4", Bolts: "16 mm ×6, 18 mm ×4", Tool: "Hex 2.0" } },
    { section: "Frame", title: "Standoffs", view: "iso", parts: ["standoffL", "standoffR"],
      text: ["Flip the frame. Thread standoffs onto the four 18 mm bolts sticking up through the sandwich plate. Now tighten all six 16 mm bolts firmly.", "Fasten the remaining standoffs to the plate corners with 8 mm bolts."],
      warn: ["A 16 mm bolt must not stick out of its nut more than 1 mm — otherwise the wrong bolt is in."],
      prep: { Standoffs: "×8", Bolts: "8 mm ×4", Tool: "Hex 2.0" } },

    { section: "Motors", title: "Check the motor bolts", view: "iso", parts: ["mount-fr", "mount-fl", "mount-rr", "mount-rl"],
      text: ["For a 10″ drone the motor bolts are 10 mm. Through the arm they must reach the end of the motor base without touching the windings — about 3 mm of bolt shows beneath the arm."],
      warn: ["The motor has strong magnets. Keep bolts, nuts and tools away from it."],
      prep: { Bolts: "10 mm ×16", Nuts: "×4" } },
    { section: "Motors", title: "First motor", view: "iso", parts: ["motor-fr"],
      text: ["Screw the prop nut on by hand, loose. Set the motor on the arm and tighten all four bolts."],
      warn: ["Mind motor and cable orientation.", "Don’t glue the motors yet."],
      prep: { Bolts: "10 mm ×4", Tool: "Hex 2.0" } },
    { section: "Motors", title: "Remaining motors", view: "top", parts: ["motor-fl", "motor-rr", "motor-rl"],
      text: ["Repeat for the other three motors."], warn: [], prep: { Bolts: "10 mm ×12" } },

    { section: "Stack", title: "Stack bolts and plate", view: "under", parts: ["stackPlate"],
      text: ["Open the stack package. Insert the four 30 mm round‑head screws from below through the bottom and sandwich plate into the nuts and tighten well.", "Put a silicone grommet on each screw, longer side up."],
      warn: ["The frame set has 28 mm screws — don’t use them."],
      prep: { Bolts: "30 mm ×4 (stack set)", Grommets: "×4", Tool: "Hex 2.0, tweezers" } },
    { section: "Stack", title: "Flight controller", view: "iso", parts: ["fc"],
      text: ["Connect the 8‑pin cable to the ESC first. Seat the ESC on the grommets with the power leads towards the antennas, plug each motor into the nearest output and wrap each wire once around a standoff.", "Fit grommets into the FC (longer side down) and place it on top."],
      warn: ["The arrow on the FC points to the front — the camera side.", "Mind cable orientation. Don’t force it."],
      prep: { Grommets: "×4", Tool: "Tweezers" } },
    { section: "Stack", title: "Secure the stack", view: "iso", parts: ["fcHolder"],
      text: ["Fix FC and ESC with the four metal locknuts. Tighten until the stack stands straight but the silicone can still compress — locknuts level with the nuts.", "Check the bolts under the board, then connect the 8‑pin cable between ESC and FC."],
      warn: ["Don’t overtighten, don’t leave it loose."],
      prep: { Nuts: "Metal locknuts ×4", Tool: "Nutdriver 5.5" } },

    { section: "VTX", title: "Video transmitter", view: "back", parts: ["vtx"],
      text: ["Connect the cable to the VTX, twist it, and connect it to the FC. Click the pigtail onto the VTX with the cable pointing up.", "Fix the pigtail in the antenna mount with ring and nut, no washer. Attach the VTX to the frame with the thermal pad and lock it with two zip‑ties."],
      warn: ["Wire colors differ on each end of the cable — match them.", "Don’t bend the pigtail cable. Route zip‑ties clear of the VTX button."],
      prep: { Parts: "VTX, pigtail, cable, zip‑ties ×2, thermal pad" } },

    { section: "Camera", title: "Camera holder", view: "front", parts: ["cameraMount"],
      text: ["Fit the camera holder at the front of the frame. Insert the M2 bolts into the second holes, closer to the front."],
      warn: ["Check which end is the front and the orientation of the holder."],
      prep: { Parts: "Camera holder", Bolts: "M2 4 mm ×2" } },
    { section: "Camera", title: "Camera", view: "front", parts: ["camera"],
      text: ["Mount the camera in the most forward position, connector on top. Twist the cable and connect it to the flight controller."],
      warn: ["Camera screws tight — the camera moves by hand, with effort."],
      prep: { Parts: "Camera, cable from FC box" } },

    { section: "Top plate", title: "Top plate", view: "iso", parts: ["topPlate"],
      text: ["Place the top plate and screw in the eight 8 mm bolts. Power wires leave the frame on the side, zip‑tied on the right when looking at the front.", "Zip‑tie the receiver under the top plate, antenna contacts down. Stick the battery pad on top, attach the VTX antenna, add the drone ID sticker up front."],
      warn: ["Don’t pinch wires while screwing.", "No sharp zip‑tie edges."],
      prep: { Bolts: "8 mm ×8", Other: "Zip‑ties, battery pad, straps" } },

    { section: "Props", title: "Propellers", view: "top", parts: ["prop-fr", "prop-fl", "prop-rr", "prop-rl"],
      text: ["Not part of the workshop manual — props go on only after the bench check. Match CW and CCW props to the motor direction and tighten the prop nuts."],
      warn: ["Never fit props with a battery connected."], prep: { Props: "×4" } },

    { section: "Check", title: "Checklist", view: "iso", parts: [],
      text: ["Every bolt tight from all sides, none overtightened.", "All wiring inside the frame. The second RX antenna cable runs between the standoffs right under the top plate.", "Show the drone to your mentor."],
      warn: [], prep: {} },
    { section: "Check", title: "Spin up", view: "front", parts: [], play: "spin",
      text: ["Bench test without props first, then a hover. Front-right and rear-left motors turn one way, front-left and rear-right the other — the props must match."],
      warn: ["Props on, battery in: the drone is live. Stand clear."], prep: {} },
  ],
};

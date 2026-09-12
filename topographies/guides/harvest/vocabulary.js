const symbol = (slug, name, description) => ({ slug, traits: ["ONTOLOGICAL", "LABELED"], trait: { ONTOLOGICAL: {}, LABELED: { name, description } } });

export const sections = [
  symbol("section.frame", "Frame Assembly", "Manual p3–13."),
  symbol("section.motors", "Motors installation", "Manual p14–16."),
  symbol("section.stack", "Stack (FC & ESC)", "Manual p17–23."),
  symbol("section.vtx", "Video Transmitter", "Manual p24–27."),
  symbol("section.rx", "Receiver Installation", "Manual p28–29."),
  symbol("section.camera", "Install Camera", "Manual p30–32."),
  symbol("section.top_plate", "Top Plate installation", "Manual p33–34."),
  symbol("section.checklist", "Checklist", "Manual p35."),
];

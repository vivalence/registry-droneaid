export const motor = () => {
  let context, master, voices = [], noise, running = false;

  const start = () => {
    if (running) return;
    context ??= new (globalThis.AudioContext || globalThis.webkitAudioContext)();
    context.resume();
    master = context.createGain();
    master.gain.value = 0;
    const compressor = context.createDynamicsCompressor();
    master.connect(compressor).connect(context.destination);
    const lowpass = context.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 1800;
    lowpass.Q.value = 0.8;
    lowpass.connect(master);
    voices = [0.97, 1.0, 1.02, 1.045].map((ratio, i) => {
      const oscillator = context.createOscillator();
      oscillator.type = i % 2 ? "sawtooth" : "triangle";
      const gain = context.createGain();
      gain.gain.value = 0.18;
      const lfo = context.createOscillator();
      lfo.frequency.value = 0.4 + i * 0.17;
      const lfoGain = context.createGain();
      lfoGain.gain.value = 3 + i;
      lfo.connect(lfoGain).connect(oscillator.detune);
      oscillator.connect(gain).connect(lowpass);
      oscillator.start();
      lfo.start();
      return { oscillator, ratio };
    });
    const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
    noise = context.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const bandpass = context.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 900;
    bandpass.Q.value = 0.5;
    const noiseGain = context.createGain();
    noiseGain.gain.value = 0.12;
    noise.connect(bandpass).connect(noiseGain).connect(master);
    noise.start();
    running = true;
  };

  const set = (level, muted) => {
    if (!running) return;
    const t = context.currentTime;
    const frequency = 70 + 330 * Math.pow(level, 0.8);
    voices.forEach(({ oscillator, ratio }) => oscillator.frequency.setTargetAtTime(frequency * ratio, t, 0.05));
    master.gain.setTargetAtTime(muted ? 0 : 0.6 * Math.pow(level, 1.6), t, 0.08);
  };

  const stop = () => {
    if (!running) return;
    master.gain.setTargetAtTime(0, context.currentTime, 0.25);
    const held = voices, source = noise;
    setTimeout(() => {
      held.forEach(({ oscillator }) => oscillator.stop());
      source.stop();
    }, 1500);
    running = false;
  };

  const dispose = () => {
    stop();
    context?.close();
  };

  return { start, set, stop, dispose };
};

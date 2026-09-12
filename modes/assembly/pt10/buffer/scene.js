import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { compose } from "../compose.js";
import { motor } from "./motor.js";

const frontBasis = (front) => {
  const forward = { "+x": [1, 0, 0], "-x": [-1, 0, 0], "+z": [0, 0, 1], "-z": [0, 0, -1] }[front ?? "-z"];
  const F = new THREE.Vector3(...forward);
  const R = F.clone().cross(new THREE.Vector3(0, 1, 0));
  return { F, R };
};

const makeViews = (bounds, front) => {
  const center = bounds.getCenter(new THREE.Vector3());
  const radius = bounds.getSize(new THREE.Vector3()).length() * 1.7;
  const { F, R } = frontBasis(front);
  const U = new THREE.Vector3(0, 1, 0);
  const at = (f, r, u) => new THREE.Vector3().addScaledVector(F, f * radius).addScaledVector(R, r * radius).addScaledVector(U, u * radius).add(center);
  return { iso: at(0.65, 0.6, 0.45), top: at(0.05, 0.08, 1), under: at(0.55, 0.5, -0.5), front: at(1, 0.25, 0.25), back: at(-1, -0.25, 0.28) };
};

const swatches = new Map();
const pixels = (texture) => {
  if (!swatches.has(texture)) {
    const image = texture.image;
    const canvas = Object.assign(document.createElement("canvas"), { width: image.width, height: image.height });
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    swatches.set(texture, { data: context.getImageData(0, 0, image.width, image.height).data, w: image.width, h: image.height, flip: texture.flipY });
  }
  return swatches.get(texture);
};

const swatchOf = (part) => {
  const acc = [0, 0, 0, 0];
  part.obj.traverse((o) => {
    if (!o.isMesh) return;
    const uv = o.geometry.attributes.uv;
    const index = o.geometry.index?.array;
    const texture = o.material.map;
    if (!uv || !index || !texture?.image?.width) {
      const c = o.material.color;
      acc[0] += c.r * 255;
      acc[1] += c.g * 255;
      acc[2] += c.b * 255;
      acc[3]++;
      return;
    }
    const px = pixels(texture);
    for (let k = 0; k < index.length; k += Math.max(1, Math.floor(index.length / 200))) {
      const u = ((uv.getX(index[k]) % 1) + 1) % 1, v = ((uv.getY(index[k]) % 1) + 1) % 1;
      const x = Math.floor(u * (px.w - 1)), y = Math.floor((px.flip ? 1 - v : v) * (px.h - 1));
      const i = (y * px.w + x) * 4;
      acc[0] += px.data[i];
      acc[1] += px.data[i + 1];
      acc[2] += px.data[i + 2];
      acc[3]++;
    }
  });
  return acc[3] ? `rgb(${acc.slice(0, 3).map((v) => Math.round(v / acc[3])).join(",")})` : "#888";
};

export const ensureTextures = async (gltf) => {
  const parser = gltf.parser;
  const json = parser?.json ?? {};
  const materials = [];
  gltf.scene.traverse((o) => {
    if (o.isMesh) [].concat(o.material).forEach((m) => materials.includes(m) || materials.push(m));
  });
  const missing = materials.filter((m) => !(m.map?.image?.width > 0));
  if (!missing.length) return { total: materials.length, fixed: 0, unfixed: 0 };
  const textureOf = async (index) => {
    const source = json.images[json.textures[index].source];
    const blob = source.bufferView !== undefined
      ? new Blob([await parser.getDependency("bufferView", source.bufferView)], { type: source.mimeType })
      : await (await fetch(source.uri)).blob();
    const bitmap = await createImageBitmap(blob, { colorSpaceConversion: "none" });
    const texture = new THREE.Texture(bitmap);
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
  };
  let fixed = 0;
  for (const material of missing) {
    const definition = (json.materials ?? []).find((d) => d.name === material.name);
    const index = definition?.pbrMetallicRoughness?.baseColorTexture?.index;
    if (index === undefined) continue;
    material.map = await textureOf(index);
    material.needsUpdate = true;
    fixed++;
  }
  return { total: materials.length, fixed, unfixed: missing.length - fixed };
};

export const stage = (container, { gltf, guide, panel = null, onHover = () => {}, onPick = () => {} }) => {
  const animate = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1;
  const background = new THREE.Color(0xe9ebef);
  const tint = new THREE.Color(0xffd23f);

  const scene = new THREE.Scene();
  scene.background = background;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);
  const camera = new THREE.PerspectiveCamera(36, 1, 0.01, 200);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb8bcc6, 1.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.0004;
  key.shadow.radius = 4;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xdfe6ff, 0.7);
  scene.add(fill);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.ShadowMaterial({ opacity: 0.16 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const { parts, bounds } = compose(gltf, guide);
  parts.forEach((part) => {
    part.rest = part.obj.position.clone();
    part.settle = 0;
    part.step = Infinity;
    part.hi = 0;
    part.swatch = swatchOf(part);
    scene.add(part.obj);
  });
  const byId = Object.fromEntries(parts.map((part) => [part.id, part]));
  guide.steps.forEach((step, i) =>
    step.parts.forEach((id) => {
      if (!byId[id]) throw new Error(`step ${i} names unknown part ${id}`);
      byId[id].step = Math.min(byId[id].step, i);
    })
  );
  const views = makeViews(bounds, guide.model?.front);
  const look = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3()).length();
  floor.position.y = bounds.min.y - size * 0.02;
  key.position.copy(look).add(new THREE.Vector3(size, size * 2, size * 0.7));
  key.shadow.camera.left = key.shadow.camera.bottom = -size * 2.5;
  key.shadow.camera.right = key.shadow.camera.top = size * 2.5;
  key.shadow.camera.far = size * 8;
  fill.position.copy(look).add(new THREE.Vector3(-size, size * 0.6, -size));
  camera.near = size * 0.01;
  camera.far = size * 40;
  camera.position.copy(views.iso);
  controls.target.copy(look);

  const world = { step: 0, explode: 1, explodeGoal: 1, hover: null, clock: 0, muted: false, dragging: false };
  const target = { position: views.iso.clone(), t: 1 };
  const sound = motor();

  const setView = (name) => {
    target.position.copy(views[name] ?? views.iso);
    target.t = 0;
  };

  const go = (index, forward) => {
    world.step = index;
    const step = guide.steps[index];
    parts.forEach((part) => {
      part.obj.visible = index === 0 || part.step <= index;
      part.settle = step.parts.includes(part.id) && forward ? 1 : 0;
    });
    world.clock = 0;
    world.explodeGoal = index === 0 ? 1 : 0;
    setView(step.view);
  };

  const setHi = (part, level) => {
    if (part.hi === level) return;
    part.hi = level;
    part.obj.traverse((o) => {
      if (!o.isMesh) return;
      o.material.emissive.copy(level ? tint : new THREE.Color(0));
      o.material.emissiveIntensity = level;
    });
  };

  const ray = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const onPointerMove = (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObjects(parts.filter((part) => part.obj.visible).map((part) => part.obj), true)[0];
    world.hover = hit ? byId[hit.object.userData.part] : null;
    renderer.domElement.style.cursor = hit ? "pointer" : "";
    onHover(world.hover, { x: event.clientX - rect.left, y: event.clientY - rect.top });
  };
  const pressed = new THREE.Vector2();
  const onPointerDown = (event) => pressed.set(event.clientX, event.clientY);
  const onClick = (event) => {
    const dragged = pressed.distanceTo(new THREE.Vector2(event.clientX, event.clientY)) > 4;
    if (dragged || world.step !== 0 || !world.hover || world.hover.step === Infinity) return;
    onPick(world.hover);
  };
  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("click", onClick);

  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    const cover = panel?.getBoundingClientRect();
    const beside = cover && cover.width < width * 0.8;
    camera.setViewOffset(width, height, cover ? (beside ? -(cover.width + 32) / 2 : 0) : 0, cover ? (beside ? 0 : cover.height / 2) : 0, width, height);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
  };
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  const clock = new THREE.Clock();
  let frame = 0;
  const loop = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!world.dragging) world.explode += (world.explodeGoal - world.explode) * Math.min(1, animate ? dt * 6 : 1);
    const step = guide.steps[world.step];
    const current = new Set(step?.parts ?? []);
    const play = step?.play ? guide.animations?.[step.play] : null;
    world.clock += dt;
    const spin = play ? Math.min(1, world.clock / (play.ramp ?? 1)) : 0;
    if (play?.sound) {
      sound.start();
      sound.set(spin, world.muted);
    } else sound.stop();
    const omega = play ? (play.rpm / 60) * Math.PI * 2 * spin : 0;
    const axis = new THREE.Vector3(...(play?.axis ?? [0, 1, 0]));
    parts.forEach((part) => {
      const direction = play?.parts?.[part.id];
      if (direction) part.obj.rotateOnAxis(axis, omega * direction * dt);
      else if (!play) part.obj.rotation.set(0, 0, 0);
      part.settle = animate ? Math.max(0, part.settle - dt * 0.7) : 0;
      const amount = Math.max(world.explode, current.has(part.id) ? Math.pow(part.settle, 1.6) : 0);
      part.obj.position.copy(part.rest).addScaledVector(part.explode, amount);
      setHi(part, current.has(part.id) && world.step > 0 ? 0.35 : part === world.hover ? 0.2 : 0);
    });
    if (target.t < 1) {
      target.t = Math.min(1, target.t + (animate ? dt * 0.9 : 1));
      const eased = 1 - Math.pow(1 - target.t, 3);
      camera.position.lerp(target.position, eased * 0.5);
      controls.target.lerp(look, eased);
    }
    controls.update();
    renderer.render(scene, camera);
    frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);

  const dispose = () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    renderer.domElement.removeEventListener("click", onClick);
    controls.dispose();
    sound.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };

  return {
    parts,
    byId,
    go,
    view: () => setView(guide.steps[world.step].view),
    explode: (value, dragging) => {
      world.dragging = dragging;
      world.explode = world.explodeGoal = value;
    },
    exploded: () => world.explode,
    mute: (muted) => (world.muted = muted),
    dispose,
  };
};

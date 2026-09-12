import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const range = (n) => [...Array(n).keys()];
const key = (x, y, z) => `${x.toFixed(4)},${y.toFixed(4)},${z.toFixed(4)}`;

export const loadGltf = (buffer) => new Promise((res, rej) => new GLTFLoader().parse(buffer, "", res, rej));

const bake = (mesh) => {
  const g = mesh.geometry.clone();
  const pos = g.attributes.position;
  const v = new THREE.Vector3();
  if (mesh.isSkinnedMesh) {
    mesh.skeleton.update();
    range(pos.count).forEach((i) => {
      v.fromBufferAttribute(pos, i);
      mesh.applyBoneTransform(i, v).applyMatrix4(mesh.matrixWorld);
      pos.setXYZ(i, v.x, v.y, v.z);
    });
  } else g.applyMatrix4(mesh.matrixWorld);
  ["skinIndex", "skinWeight", "tangent"].forEach((a) => g.deleteAttribute(a));
  g.computeVertexNormals();
  return g;
};

const findRoot = (parent, i) => {
  while (parent[i] !== i) { parent[i] = parent[parent[i]]; i = parent[i]; }
  return i;
};

export const splitIslands = (g) => {
  const pos = g.attributes.position;
  const idx = g.index ? Array.from(g.index.array) : range(pos.count);
  const weld = new Map();
  const wid = range(pos.count).map((i) => {
    const k = key(pos.getX(i), pos.getY(i), pos.getZ(i));
    if (!weld.has(k)) weld.set(k, weld.size);
    return weld.get(k);
  });
  const parent = range(weld.size);
  for (let t = 0; t < idx.length; t += 3) {
    const a = findRoot(parent, wid[idx[t]]);
    parent[findRoot(parent, wid[idx[t + 1]])] = a;
    parent[findRoot(parent, wid[idx[t + 2]])] = findRoot(parent, a);
  }
  const groups = new Map();
  for (let t = 0; t < idx.length; t += 3) {
    const r = findRoot(parent, wid[idx[t]]);
    if (!groups.has(r)) groups.set(r, []);
    groups.get(r).push(idx[t], idx[t + 1], idx[t + 2]);
  }
  const islands = [...groups.values()].map((sub) => {
    const geo = new THREE.BufferGeometry();
    Object.entries(g.attributes).forEach(([n, a]) => geo.setAttribute(n, a));
    geo.setIndex(sub);
    const seen = [...new Set(sub)].map((i) => new THREE.Vector3().fromBufferAttribute(pos, i));
    const bbox = seen.reduce((b, v) => b.expandByPoint(v), new THREE.Box3());
    const centroid = seen.reduce((s, v) => s.add(v), new THREE.Vector3()).divideScalar(seen.length);
    geo.boundingBox = bbox.clone();
    return { geometry: geo, tris: sub.length / 3, centroid, bbox };
  });
  const r = (x) => Math.round(x * 1000);
  return islands.sort((a, b) => b.tris - a.tris || r(a.centroid.x) - r(b.centroid.x) || r(a.centroid.z) - r(b.centroid.z) || r(a.centroid.y) - r(b.centroid.y));
};

export const catalog = (gltf) => {
  gltf.scene.updateMatrixWorld(true);
  const meshes = [];
  gltf.scene.traverse((o) => { if (o.isMesh) meshes.push(o); });
  const defs = gltf.parser?.json?.meshes ?? [];
  const meshName = (m) => defs[gltf.parser?.associations?.get(m)?.meshes]?.name;
  return meshes.map((m) => ({ names: [...new Set([meshName(m), m.name, m.parent?.name].filter(Boolean))], material: m.material, islands: splitIslands(bake(m)) }));
};

const resolve = (cat, sel) => {
  const entry = cat.find((e) => e.names.includes(sel.mesh));
  if (!entry) throw new Error(`no mesh named ${sel.mesh}; have ${cat.map((e) => e.names.join("|")).join(", ")}`);
  const ids = sel.islands ?? range(entry.islands.length);
  return ids.map((i) => ({ ...entry.islands[i], material: entry.material }));
};

const autoExplode = (centroid, bounds, cfg) => {
  const a = bounds.getCenter(new THREE.Vector3());
  return new THREE.Vector3((centroid.x - a.x) * cfg.radial, (centroid.y - bounds.min.y) * cfg.up + cfg.lift, (centroid.z - a.z) * cfg.radial);
};

export const compose = (gltf, guide) => {
  const cat = catalog(gltf);
  const bounds = new THREE.Box3();
  cat.forEach((e) => e.islands.forEach((i) => bounds.union(i.bbox)));
  const cfg = { radial: 0.5, up: 3, lift: 0, ...(guide.explode ?? {}) };
  const staged = guide.parts.map((p) => {
    const pieces = [].concat(p.select).flatMap((s) => resolve(cat, s));
    const bbox = pieces.reduce((b, pc) => b.union(pc.bbox), new THREE.Box3());
    return { ...p, pieces, bbox, center: bbox.getCenter(new THREE.Vector3()) };
  });
  const pivotOf = (p) => {
    if (Array.isArray(p.pivot)) return new THREE.Vector3(...p.pivot);
    if (p.pivot?.part) { const o = staged.find((q) => q.id === p.pivot.part); return new THREE.Vector3(o.center.x, p.center.y, o.center.z); }
    return p.center.clone();
  };
  const parts = staged.map((p) => {
    const obj = new THREE.Group();
    obj.name = p.id;
    const pivot = pivotOf(p);
    obj.position.copy(pivot);
    p.pieces.forEach((pc) => {
      const geo = pc.geometry.clone();
      geo.setAttribute("position", pc.geometry.attributes.position.clone());
      geo.translate(-pivot.x, -pivot.y, -pivot.z);
      geo.boundingBox = null;
      geo.boundingSphere = null;
      const m = new THREE.Mesh(geo, pc.material.clone());
      m.castShadow = m.receiveShadow = true;
      m.userData.part = p.id;
      obj.add(m);
    });
    const centroid = p.pieces.reduce((s, pc) => s.addScaledVector(pc.centroid, pc.tris), new THREE.Vector3()).divideScalar(p.pieces.reduce((s, pc) => s + pc.tris, 0));
    const explode = Array.isArray(p.explode) ? new THREE.Vector3(...p.explode) : autoExplode(centroid, bounds, { ...cfg, ...(p.explode ?? {}) });
    const { pieces, ...rest } = p;
    return { ...rest, obj, centroid, explode, pivot };
  });
  return { parts, bounds, catalog: cat };
};

export const autoGuide = (gltf) => {
  const cat = catalog(gltf);
  const parts = cat.flatMap((e, mi) => e.islands.map((isl, ii) => ({ id: `${e.names[0]}/${ii}`, label: `${e.names[0]} · island ${ii} (${isl.tris} tris)`, select: { mesh: e.names[0], islands: [ii] }, y: isl.centroid.y })));
  parts.sort((a, b) => a.y - b.y);
  return {
    model: { front: "+x" },
    parts,
    steps: [{ section: "Catalog", title: "All islands", text: ["Every connected mesh island, exploded. Bind them to named parts in a guide."], warn: [], prep: {}, parts: [], view: "iso" },
      ...parts.map((p) => ({ section: "Islands", title: p.label, text: [], warn: [], prep: {}, parts: [p.id], view: "iso" }))],
  };
};

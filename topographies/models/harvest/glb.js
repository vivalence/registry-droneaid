import * as THREE from "npm:three@0.186.0";
import { GLTFLoader } from "npm:three@0.186.0/addons/loaders/GLTFLoader.js";
import { GLTFExporter } from "npm:three@0.186.0/addons/exporters/GLTFExporter.js";

const range = (n) => [...Array(n).keys()];
const key = (x, y, z) => `${x.toFixed(4)},${y.toFixed(4)},${z.toFixed(4)}`;
const root = (parent, i) => {
  while (parent[i] !== i) {
    parent[i] = parent[parent[i]];
    i = parent[i];
  }
  return i;
};

export const load = (buffer) => new Promise((resolve, reject) => new GLTFLoader().parse(buffer, "", resolve, reject));

export const meshes = (gltf) => {
  gltf.scene.updateMatrixWorld(true);
  const found = [];
  gltf.scene.traverse((object) => {
    if (object.isMesh) found.push(object);
  });
  return found;
};

const welding = (geometry) => {
  const position = geometry.attributes.position;
  const index = geometry.index ? Array.from(geometry.index.array) : range(position.count);
  const welded = new Map();
  const vertex = range(position.count).map((i) => {
    const at = key(position.getX(i), position.getY(i), position.getZ(i));
    if (!welded.has(at)) welded.set(at, welded.size);
    return welded.get(at);
  });
  return { position, index, vertex, count: welded.size };
};

export const winding = (geometry) => {
  const { position, index, vertex } = welding(geometry);
  const point = (i) => new THREE.Vector3().fromBufferAttribute(position, i);
  const directed = new Map();
  const shared = new Map();
  let volume = 0;
  for (let t = 0; t < index.length; t += 3) {
    const [a, b, c] = [index[t], index[t + 1], index[t + 2]];
    volume += point(a).dot(point(b).cross(point(c))) / 6;
    for (const [from, to] of [[a, b], [b, c], [c, a]]) {
      const edge = `${vertex[from]}>${vertex[to]}`;
      const pair = [vertex[from], vertex[to]].sort((one, other) => one - other).join("-");
      directed.set(edge, (directed.get(edge) ?? 0) + 1);
      shared.set(pair, (shared.get(pair) ?? 0) + 1);
    }
  }
  return {
    volume,
    doubled: [...directed.values()].filter((faces) => faces > 1).length,
    loose: [...shared.values()].filter((faces) => faces !== 2).length,
  };
};

export const islands = (geometry) => {
  const { index, vertex, count } = welding(geometry);
  const parent = range(count);
  for (let t = 0; t < index.length; t += 3) {
    const a = root(parent, vertex[index[t]]);
    parent[root(parent, vertex[index[t + 1]])] = a;
    parent[root(parent, vertex[index[t + 2]])] = root(parent, a);
  }
  const groups = new Map();
  for (let t = 0; t < index.length; t += 3) {
    const r = root(parent, vertex[index[t]]);
    if (!groups.has(r)) groups.set(r, []);
    groups.get(r).push(index[t], index[t + 1], index[t + 2]);
  }
  return [...groups.values()].map((triangles) => {
    const used = [...new Set(triangles)];
    const remap = new Map(used.map((i, n) => [i, n]));
    const island = new THREE.BufferGeometry();
    for (const [name, attribute] of Object.entries(geometry.attributes)) {
      const out = new Float32Array(used.length * attribute.itemSize);
      used.forEach((i, n) => {
        for (let c = 0; c < attribute.itemSize; c++) out[n * attribute.itemSize + c] = attribute.array[i * attribute.itemSize + c];
      });
      island.setAttribute(name, new THREE.BufferAttribute(out, attribute.itemSize));
    }
    island.setIndex(triangles.map((i) => remap.get(i)));
    island.computeBoundingBox();
    const centre = new THREE.Vector3();
    island.boundingBox.getCenter(centre);
    return { geometry: island, tris: triangles.length / 3, centre, bbox: island.boundingBox };
  });
};

export const standing = async (bytes, name) => {
  const [mesh] = meshes(await load(bytes.buffer));
  const baked = mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);
  const [island] = islands(baked).sort((a, b) => a.centre.x - b.centre.x || a.centre.z - b.centre.z);
  const geometry = island.geometry.translate(-island.centre.x, -island.bbox.min.y, -island.centre.z);
  const out = new THREE.Mesh(geometry, mesh.material);
  out.name = name;
  const glb = await new GLTFExporter().parseAsync(out, { binary: true });
  return { bytes: new Uint8Array(glb), tris: island.tris, size: island.bbox.getSize(new THREE.Vector3()).toArray() };
};

export const seated = async (bytes, name) => {
  const [mesh] = meshes(await load(bytes.buffer));
  const geometry = mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  const centre = box.getCenter(new THREE.Vector3());
  geometry.translate(-centre.x, -box.min.y, -centre.z);
  const out = new THREE.Mesh(geometry, mesh.material);
  out.name = name;
  const glb = await new GLTFExporter().parseAsync(out, { binary: true });
  return {
    bytes: new Uint8Array(glb),
    tris: geometry.index.count / 3,
    size: box.getSize(new THREE.Vector3()).toArray(),
  };
};

const round = (n) => Math.round(n * 1e5) / 1e5;

export const measured = async (freight, slugs) => {
  const found = {};
  for (const slug of slugs) {
    const bytes = await Deno.readFile(`${freight}/parts/${slug}.glb`);
    const [mesh] = meshes(await load(bytes.buffer));
    mesh.geometry.computeBoundingBox();
    const { min, max } = mesh.geometry.boundingBox;
    found[slug] = {
      tris: mesh.geometry.index.count / 3,
      size: [max.x - min.x, max.y - min.y, max.z - min.z].map(round),
    };
  }
  return found;
};

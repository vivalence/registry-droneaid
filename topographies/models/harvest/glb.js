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

export const islands = (geometry) => {
  const position = geometry.attributes.position;
  const index = geometry.index ? Array.from(geometry.index.array) : range(position.count);
  const welded = new Map();
  const vertex = range(position.count).map((i) => {
    const at = key(position.getX(i), position.getY(i), position.getZ(i));
    if (!welded.has(at)) welded.set(at, welded.size);
    return welded.get(at);
  });
  const parent = range(welded.size);
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

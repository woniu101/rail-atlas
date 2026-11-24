import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {createHash} from 'node:crypto';
import {pathToFileURL,fileURLToPath} from 'node:url';
import * as THREE from 'three';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';

// Same public, author-documented path as src/modelModule.ts + src/exportRun.ts.
// There are no model textures here; FileReader only bridges Blob -> ArrayBuffer.
class NodeFileReader {
  result=null;onloadend=null;onerror=null;
  readAsArrayBuffer(blob){blob.arrayBuffer().then(value=>{this.result=value;this.onloadend?.({target:this});}).catch(error=>this.onerror?.(error));}
  readAsDataURL(blob){blob.arrayBuffer().then(value=>{this.result=`data:${blob.type};base64,${Buffer.from(value).toString('base64')}`;this.onloadend?.({target:this});}).catch(error=>this.onerror?.(error));}
}
globalThis.FileReader=NodeFileReader;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const directory=path.join(root,'assets/export-research/published');
const out=process.argv[2]||path.join(os.homedir(),'Downloads');
const hash=data=>createHash('sha256').update(data).digest('hex');
const subset={};for(const key of ['Group','Mesh','BufferGeometry','BufferAttribute','MeshStandardMaterial','DoubleSide','AnimationClip','QuaternionKeyframeTrack','VectorKeyframeTrack'])subset[key]=THREE[key];
const records=[];
for(const slug of ['qj','cr400af','crh380a']){
  const input=path.join(directory,`${slug}.mjs`);const source=await fs.readFile(input);
  const model=await import(pathToFileURL(input).href);
  const object=model.default(subset,{},false);object.updateMatrixWorld(true);
  const bytes=Buffer.from(await new GLTFExporter().parseAsync(object,{binary:true,animations:object.animations}));
  const json=JSON.parse(bytes.toString('utf8',20,20+bytes.readUInt32LE(12)));
  let triangles=0;object.traverse(o=>{if(o.isMesh&&o.visible){const g=o.geometry;triangles+=(g.index?.count||g.attributes.position.count)/3;}});
  const box=new THREE.Box3().setFromObject(object);const dimensions=box.getSize(new THREE.Vector3()).toArray();
  const params=Object.fromEntries((model.params||[]).map(p=>[p.name,p.default]));
  const record={slug,sourceUrl:`https://factory.railisland.com/js/proc-vehicle-cr-${slug}.js`,modelUrl:`https://factory.railisland.com/model/proc-vehicle-cr-${slug}/`,author:'Rail Island',license:'CC0 1.0',sourceSha256:hash(source),params,lod:false,exportOptions:{binary:true,animations:true},exporter:THREE.REVISION,bytes:bytes.length,sha256:hash(bytes),triangles,dimensions,date:'2026-11-24'};
  if(slug==='crh380a'){
    // Keep the earlier official browser download unchanged; compare geometry only.
    const old=await fs.readFile(path.join(out,'railisland-crh380a.glb'));const previous=JSON.parse(old.toString('utf8',20,20+old.readUInt32LE(12)));
    record.browserComparison={bytes:old.length,nodeCount:previous.nodes.length,generatedNodeCount:json.nodes.length,meshCount:previous.meshes.length,generatedMeshCount:json.meshes.length,accessorCountsMatch:JSON.stringify(previous.accessors.map(a=>a.count))===JSON.stringify(json.accessors.map(a=>a.count))};
  }else{
    const target=path.join(out,`railisland-${slug}.glb`);try{await fs.writeFile(target,bytes,{flag:'wx'});}catch(e){if(e.code!=='EEXIST')throw e;if(hash(await fs.readFile(target))!==hash(bytes))throw new Error(`${target}: existing original differs; not overwritten`);}
  }
  records.push(record);console.log(JSON.stringify(record));
}
let upstreamTree;try{upstreamTree=JSON.parse(await fs.readFile(path.join(root,'assets/export-research/tree.json'),'utf8')).sha;}catch{}
await fs.writeFile(path.join(root,'assets/export-research/export-manifest.json'),JSON.stringify({note:'Raw GLBs exported from author-published CC0 procedural models with the official default-build + GLTFExporter workflow; original exports are not optimized.',upstreamRepository:'https://github.com/rail-island/rail-island-factory',upstreamTree,models:records},null,2)+'\n');

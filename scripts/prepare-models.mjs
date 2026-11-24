import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {NodeIO, Logger} from '@gltf-transform/core';
import {ALL_EXTENSIONS} from '@gltf-transform/extensions';
import {dedup, weld, simplify, prune, textureCompress, meshopt, getBounds} from '@gltf-transform/functions';
import {MeshoptEncoder, MeshoptDecoder, MeshoptSimplifier} from 'meshoptimizer';
import sharp from 'sharp';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sourceDirectory=path.resolve(process.argv[2]||path.join(os.homedir(),'Downloads'));
const only=process.argv[3];
const selectedSlugs=only?new Set(only.split(',').map(value=>value.trim()).filter(Boolean)):null;
const preparedAt='2026-11-24';
const inputs=[
  ['hxd3d','hxd3d_electric_locomotive_hxd3d.glb'],
  ['df4d','df4ddf4d_diesel_locomotive.glb'],
  ['ss9','ss9_electric_locomotive_9.glb'],
  ['hxd2','hxd2_electric_locomotive_2.glb'],
  ['hxd3b','hxd3b_electric_locomotive__0001.glb'],
  ['nd5','nd5_diesel_locomotive_prc_ge_c36-7nd5.glb'],
  ['drb-01-10','drb_01.10_steam_locomotive_low_poly.glb'],
  ['lms-fowler-4f','lms_fowler_4f.glb'],
  ['chme3','train__locomotive_low-poly_locomotive.glb'],
  ['qj','railisland-qj.glb'],
  ['crh380a','railisland-crh380a.glb'],
  ['cr400af','railisland-cr400af.glb'],
];
const lowPolySlugs=new Set(['drb-01-10','lms-fowler-4f','chme3','qj','crh380a','cr400af']);
// These files are official UI or author-published generator exports without embedded credit metadata.
// The source pages declare CC0; add credits only to derived outputs, never archives.
const creditOverrides={
  qj:{file:'railisland-qj.glb',title:'CR QJ',source:'https://factory.railisland.com/model/proc-vehicle-cr-qj/'},
  crh380a:{file:'railisland-crh380a.glb',title:'CRH380A',source:'https://factory.railisland.com/model/proc-vehicle-cr-crh380a/'},
  cr400af:{file:'railisland-cr400af.glb',title:'Fuxing CR400AF',source:'https://factory.railisland.com/model/proc-vehicle-cr-cr400af/'},
};
await Promise.all([MeshoptEncoder.ready,MeshoptDecoder.ready,MeshoptSimplifier.ready]);
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder,'meshopt.decoder':MeshoptDecoder});
const outDirectory=path.join(root,'public/models');const archiveDirectory=path.join(root,'assets/source-models');
await fs.mkdir(outDirectory,{recursive:true});await fs.mkdir(archiveDirectory,{recursive:true});
let records=[];
try{records=JSON.parse(await fs.readFile(path.join(outDirectory,'manifest.json'),'utf8')).models||[];}catch{}
function statistics(doc){const scene=doc.getRoot().getDefaultScene()||doc.getRoot().listScenes()[0];const bounds=getBounds(scene);let triangles=0,lines=0;for(const mesh of doc.getRoot().listMeshes())for(const primitive of mesh.listPrimitives()){const count=primitive.getIndices()?.getCount()||primitive.getAttribute('POSITION')?.getCount()||0;if(primitive.getMode()===4)triangles+=count/3;else if(primitive.getMode()===1)lines+=count/2;}return {triangles,lines,meshes:doc.getRoot().listMeshes().length,bounds};}
for(const [slug,name] of inputs){
  if(selectedSlugs&&!selectedSlugs.has(slug))continue;
  const source=path.join(sourceDirectory,name);const original=await fs.readFile(source);
  if(original.toString('ascii',0,4)!=='glTF'||original.readUInt32LE(4)!==2)throw new Error(`${name}: 不是 GLB 2.0`);
  const originalJson=JSON.parse(original.toString('utf8',20,20+original.readUInt32LE(12)));
  const override=creditOverrides[slug];
  if(override&&override.file!==name)throw new Error(`${name}: 不在许可覆盖白名单中`);
  const credit=override?{...originalJson.asset?.extras,author:'Rail Island',license:'CC0-1.0 (https://creativecommons.org/publicdomain/zero/1.0/)',source:override.source,title:override.title,representation:'procedural-simplified-reconstruction'}:originalJson.asset?.extras;
  const ccBy4=/CC-BY-4\.0|https?:\/\/creativecommons\.org\/licenses\/by\/4\.0\//i.test(credit?.license||'');
  if(!override&&(!ccBy4||!credit?.author||!credit?.source?.startsWith('https://sketchfab.com/')))throw new Error(`${name}: 缺少预期来源、作者与授权，请人工检查`);
  const external=[...(originalJson.buffers||[]),...(originalJson.images||[])].filter(item=>item.uri&&!item.uri.startsWith('data:'));
  if(external.length)throw new Error(`${name}: 包含外部资源，须先收集依赖再处理`);
  const hash=createHash('sha256').update(original).digest('hex');const archive=path.join(archiveDirectory,`${slug}.glb`);
  try{await fs.writeFile(archive,original,{flag:'wx'});}catch(e){if(e.code!=='EEXIST')throw e;const old=createHash('sha256').update(await fs.readFile(archive)).digest('hex');if(old!==hash)throw new Error(`${slug}: 归档已存在且内容不同，未覆盖`);}
  const originalDoc=await io.read(source);const before=statistics(originalDoc);const variants=[];
  const profiles=lowPolySlugs.has(slug)
    ?[{name:'desktop',ratio:1,error:0,textureSize:2048},{name:'mobile',ratio:.85,error:.00005,textureSize:1024}]
    :[{name:'desktop',ratio:.65,error:.0003,textureSize:2048},{name:'mobile',ratio:.3,error:.0008,textureSize:1024}];
  for(const variant of profiles){
    const document=await io.read(source);document.setLogger(new Logger(Logger.Verbosity.ERROR));
    // SketchUp exports include dense edge overlays; solid triangle meshes retain the vehicle.
    for(const mesh of document.getRoot().listMeshes())for(const primitive of mesh.listPrimitives())if(primitive.getMode()===1){mesh.removePrimitive(primitive);primitive.dispose();}
    const transforms=[dedup(),weld()];
    if(variant.ratio<1)transforms.push(simplify({simplifier:MeshoptSimplifier,ratio:variant.ratio,error:variant.error}));
    transforms.push(prune({keepLeaves:true}),textureCompress({encoder:sharp,targetFormat:'webp',resize:[variant.textureSize,variant.textureSize],quality:88}),meshopt({encoder:MeshoptEncoder,level:'high'}));
    await document.transform(...transforms);
    const operations=['remove-auxiliary-edge-lines','deduplicate','weld',...(variant.ratio<1?['simplify']:[]),'texture-webp','meshopt'];
    document.getRoot().getAsset().extras={...credit,railAtlas:{modified:true,operations,variant:variant.name,date:preparedAt}};
    const file=`${slug}${variant.name==='mobile'?'.mobile':''}.glb`;const output=await io.writeBinary(document);await fs.writeFile(path.join(outDirectory,file),output);
    variants.push({name:variant.name,path:`/models/${file}`,bytes:output.byteLength,...statistics(document)});
    console.log(`${slug} ${variant.name}: ${(original.length/1048576).toFixed(1)} -> ${(output.byteLength/1048576).toFixed(2)} MiB; ${Math.round(variants.at(-1).triangles).toLocaleString()} triangles`);
  }
  const record={slug,sourceFile:name,originalBytes:original.length,sha256:hash,author:credit.author,sourceUrl:credit.source,license:override?'CC0 1.0':'CC BY 4.0',licenseUrl:override?'https://creativecommons.org/publicdomain/zero/1.0/':'https://creativecommons.org/licenses/by/4.0/',...(override?{representation:credit.representation,creditEvidence:'Official source page and catalog.json; credit metadata added only to derived files.',preparedAt}:{}),before,variants};
  records=records.filter(r=>r.slug!==slug);records.push(record);
  await fs.writeFile(path.join(outDirectory,'manifest.json'),JSON.stringify({preparedAt,models:records},null,2)+'\n');
}
await fs.writeFile(path.join(archiveDirectory,'manifest.json'),JSON.stringify({note:'Original GLB files are local archives, excluded from static output and git.',models:records.map(({slug,sourceFile,originalBytes,sha256,sourceUrl,license})=>({slug,sourceFile,originalBytes,sha256,sourceUrl,license}))},null,2)+'\n');

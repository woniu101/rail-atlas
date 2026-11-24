import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const dist=path.join(root,'dist');
const base=(process.env.SITE_BASE||'').replace(/\/$/,'');
function routePath(value){const clean=decodeURIComponent(value.split(/[?#]/)[0]);if(!base)return clean;assert.ok(clean===base||clean.startsWith(`${base}/`),`站内资源缺少部署前缀 ${base}: ${value}`);return clean.slice(base.length)||'/';}
async function exists(file){try{await fs.access(file);return true;}catch(e){if(e.code==='ENOENT')return false;throw e;}}
async function walk(folder){const entries=await fs.readdir(folder,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(folder,e.name)):path.join(folder,e.name)))).flat();}

test('静态页面的内部链接与图片、脚本资源均存在',async()=>{
  const pages=(await walk(dist)).filter(p=>p.endsWith('.html'));
  assert.equal(pages.length,34,'应生成34个正式页面');
  assert.ok(!pages.some(p=>p.includes('model-preview')),'临时封面页面不能进入交付');
  for(const page of pages){const html=await fs.readFile(page,'utf8');for(const [,value] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)){
    if(!value.startsWith('/')||value.startsWith('//'))continue;
    const clean=routePath(value);const target=path.join(dist,clean,clean.endsWith('/')?'index.html':'');
    await assert.doesNotReject(fs.access(target),`${path.relative(dist,page)} 引用了不存在的资源 ${value}`);
  }}
});
test('11个公开车型均有资料来源、正确图片与许可记录',async()=>{
  const folder=path.join(root,'src/content/trains');const entries=await fs.readdir(folder);assert.equal(entries.length,11);
  const manifest=JSON.parse(await fs.readFile(path.join(root,'scripts/assets-manifest.json'),'utf8'));
  for(const entry of entries){const text=await fs.readFile(path.join(folder,entry),'utf8');const data=JSON.parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);assert.ok(data.sources.length>0,entry);assert.ok(data.aliases.length>0,entry);await fs.access(path.join(root,'public',data.image));assert.ok(manifest.some(m=>m.id===data.slug&&m.author&&m.license&&m.sourceUrl),entry);if(data.model?.path)await fs.access(path.join(root,'public',data.model.path));
  }
});
test('本地原理GLB、压缩解码器和搜索索引可供静态托管',async()=>{
  const bytes=await fs.readFile(path.join(dist,'models/rail-principle.glb'));assert.equal(bytes.toString('ascii',0,4),'glTF');assert.equal(bytes.readUInt32LE(4),2);
  for(const asset of ['models/basis/basis_transcoder.js','models/basis/basis_transcoder.wasm','pagefind/pagefind.js'])await fs.access(path.join(dist,asset));
});

test('十二款车型模型的两档文件有效、署名完整且原件未进入构建',async()=>{
 const registry=JSON.parse(await fs.readFile(path.join(root,'public/models/manifest.json'),'utf8'));
 assert.deepEqual(registry.models.map(m=>m.slug).sort(),['chme3','cr400af','crh380a','df4d','drb-01-10','hxd2','hxd3b','hxd3d','lms-fowler-4f','nd5','qj','ss9']);
 for(const model of registry.models){
  for(const variant of model.variants){
   const data=await fs.readFile(path.join(dist,variant.path));assert.equal(data.toString('ascii',0,4),'glTF');assert.equal(data.readUInt32LE(4),2);assert.equal(data.length,variant.bytes);
   const json=JSON.parse(data.toString('utf8',20,20+data.readUInt32LE(12)));assert.equal(json.asset.extras.author,model.author);assert.match(json.asset.extras.license,/CC-BY-4.0|CC0/);assert.equal(json.asset.extras.railAtlas.modified,true);
   assert.ok((json.buffers||[]).every(b=>!b.uri),'GLB 应内嵌 buffer');assert.ok((json.images||[]).every(i=>!i.uri),'GLB 应内嵌贴图');assert.ok(variant.bytes<model.originalBytes*.35,'压缩副本应明显小于原件');
  }
  const sourcePath=path.join(root,'assets/source-models',`${model.slug}.glb`);if(await exists(sourcePath)){const source=await fs.readFile(sourcePath);assert.equal(source.length,model.originalBytes);assert.equal(createHash('sha256').update(source).digest('hex'),model.sha256);}
  assert.equal((await fs.readdir(dist)).includes('assets'),false,'原始归档不应进入 dist');assert.equal((await fs.readdir(dist)).includes('model-backups'),false,'备份不应进入dist');
 }
});

test('专题、车型和历史延伸阅读的站内锚点均有实际目标',async()=>{
 const pages=(await walk(dist)).filter(p=>p.endsWith('.html'));
 for(const page of pages){const html=await fs.readFile(page,'utf8');for(const [,href] of html.matchAll(/href="([^"]*#[^"]+)"/g)){
  if(!href.startsWith('/')&&!href.startsWith('#'))continue;
  const [relative,hash]=href.split('#');if(!hash)continue;
  const clean=relative?routePath(relative):'';const file=relative?path.join(dist,clean,clean.endsWith('/')?'index.html':''):page;
  const target=relative?await fs.readFile(file,'utf8'):html;const ids=[...target.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
  assert.ok(ids.includes(decodeURIComponent(hash)),`${path.relative(dist,page)} 的目录/延伸阅读目标不存在: ${href}`);
 }}
});

test('每篇科普专题有独立图解、要点、来源和有效关联车型',async()=>{
 const folder=path.join(root,'src/content/articles');const names=await fs.readdir(folder);const trains=await fs.readdir(path.join(root,'src/content/trains'));
 const records=await Promise.all(names.map(async name=>{const text=await fs.readFile(path.join(folder,name),'utf8');const match=text.match(/^---\r?\n([\s\S]*?)\r?\n---/);return {data:JSON.parse(match[1]),body:text.slice(match[0].length)};}));
 assert.ok(records.filter(r=>r.data.type==='principle').length>=7);assert.ok(records.filter(r=>r.data.type==='world').length>=5);
 for(const {data,body} of records){assert.equal(data.takeaways.length,3,data.slug);assert.ok(data.visual,data.slug);assert.ok(data.sources.length>=2,data.slug);assert.ok(body.includes('## '),data.slug);for(const slug of data.relatedTrains)assert.ok(trains.includes(`${slug}.md`),`${data.slug}: ${slug}`);if(data.modelTrain){const raw=await fs.readFile(path.join(root,'src/content/trains',`${data.modelTrain}.md`),'utf8');const d=JSON.parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);assert.ok(d.model?.path,`${data.slug} 应指向已取得的模型`);}}
});

test('原始GLB备份清单完整，本地存在备份时核验全部SHA-256',async(t)=>{
 const backup=JSON.parse(await fs.readFile(path.join(root,'model-backups/manifest.json'),'utf8'));
 const records=backup.models||backup.files||backup.backups;
 assert.equal(records.length,13,'12款车型加1款通用示意模型');
 const names=new Set();let present=0;
 for(const record of records){const name=record.backupName;assert.ok(name&&name.endsWith('.glb'));assert.ok(!names.has(name));names.add(name);assert.match(record.sha256,/^[a-f0-9]{64}$/);assert.ok(record.author&&record.sourceUrl&&record.license);const file=path.join(root,'model-backups',name);if(await exists(file)){present++;const bytes=await fs.readFile(file);assert.equal(createHash('sha256').update(bytes).digest('hex'),record.sha256);}}
 assert.ok(present===0||present===13,'本地原始备份缺失部分文件');if(!present)t.diagnostic('当前为不含原始备份GLB的源码检出；已检查13份来源与校验记录。');
});

test('新增世界车型有独立来源，简化模型明确展示范围',async()=>{
 const directory=path.join(root,'src/content/world-models');const entries=await fs.readdir(directory);assert.equal(entries.length,3);
 for(const name of entries){const text=await fs.readFile(path.join(directory,name),'utf8');const data=JSON.parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);assert.ok(data.sources.length>=2);assert.equal(data.takeaways.length,3);const raw=await fs.readFile(path.join(root,'public',data.model.path));const gltf=JSON.parse(raw.toString('utf8',20,20+raw.readUInt32LE(12)));for(const focus of data.model.focusNodes||[])assert.ok(gltf.nodes.some(n=>n.name===focus),`未找到展示部件 ${focus}`);await fs.access(path.join(dist,'world/models',data.slug,'index.html'));}
 for(const slug of ['qj','crh380a','cr400af']){const html=await fs.readFile(path.join(dist,'trains',slug,'index.html'),'utf8');assert.ok(html.includes('程序化简化重建'));assert.ok(html.includes(slug==='qj'?'机车本体':'头车'));}
});

test('样式内的本地字体和其他资源适配部署子目录',async()=>{
 const styles=(await walk(path.join(dist,'_astro'))).filter(p=>p.endsWith('.css'));let fonts=0;
 for(const file of styles){const css=await fs.readFile(file,'utf8');for(const [,value] of css.matchAll(/url\(["']?(\/[^\s)"']+)["']?\)/g)){if(value.startsWith('//'))continue;const target=routePath(value);await fs.access(path.join(dist,target));if(target.endsWith('.woff2'))fonts++;}}
 assert.ok(fonts>=2,'正文与标题字体应在构建中引用');
});

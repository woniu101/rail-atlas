import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const [slug,input]=process.argv.slice(2);
if(!slug||!input||!/^[a-z0-9-]+$/.test(slug)){console.error('用法：node scripts/import-model.mjs <车型slug> <已获授权的本地GLB文件>');process.exit(1);}
const contentPath=path.join(root,'src','content','trains',`${slug}.md`);
try{
  const content=await fs.readFile(contentPath,'utf8');const match=content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if(!match)throw new Error('找不到车型元数据。');
  const metadata=JSON.parse(match[1]);if(!metadata.model)throw new Error('此车型尚未登记模型来源与许可，请先完善元数据。');
  const source=path.resolve(input);const bytes=await fs.readFile(source);if(bytes.toString('ascii',0,4)!=='glTF'||bytes.readUInt32LE(4)!==2)throw new Error('需要 GLB 2.0 文件，不能使用压缩包、FBX 或网页文件。');
  const jsonLength=bytes.readUInt32LE(12);const json=JSON.parse(bytes.toString('utf8',20,20+jsonLength));
  if(json.buffers?.some(b=>b.uri&&!b.uri.startsWith('data:'))||json.images?.some(i=>i.uri&&!i.uri.startsWith('data:')))throw new Error('模型包含外部文件引用，请先打包成完整 GLB。');
  const out=path.join(root,'public','models',`${slug}.glb`);try{await fs.access(out);throw new Error('目标模型已存在，请手动备份并移除后再导入。');}catch(e){if(e.code!=='ENOENT')throw e;}
  await fs.mkdir(path.dirname(out),{recursive:true});await fs.writeFile(out,bytes,{flag:'wx'});
  metadata.model.path=`/models/${slug}.glb`;await fs.writeFile(contentPath,content.replace(match[0],`---\n${JSON.stringify(metadata,null,2)}\n---`));
  console.log(`已导入 ${metadata.code}：${(bytes.length/1024/1024).toFixed(2)} MB。请预览并核对材质、朝向、热点及授权记录后再发布。`);
}catch(e){console.error(e.message);process.exit(1);}

import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const backupDirectory=path.join(root,'model-backups');
const preparedAt='2026-11-24';
const names={
  hxd3d:'CN-HXD3D-chinarailstory.glb',
  df4d:'CN-DF4D-chinarailstory.glb',
  ss9:'CN-SS9-chinarailstory.glb',
  hxd2:'CN-HXD2-chinarailstory.glb',
  hxd3b:'CN-HXD3B-chinarailstory.glb',
  nd5:'CN-ND5-chinarailstory.glb',
  'drb-01-10':'DE-DRB-01-10-Goetz-von-Berlichingen.glb',
  'lms-fowler-4f':'GB-LMS-Fowler-4F-Steve-Emfore.glb',
  chme3:'WORLD-ChME3-Nikcore.glb',
  qj:'CN-QJ-Rail-Island.glb',
  crh380a:'CN-CRH380A-Rail-Island.glb',
  cr400af:'CN-CR400AF-Rail-Island.glb',
};
const sha256=buffer=>createHash('sha256').update(buffer).digest('hex');
const manifest=JSON.parse(await fs.readFile(path.join(root,'public/models/manifest.json'),'utf8'));
const bySlug=new Map(manifest.models.map(model=>[model.slug,model]));
const records=[];
await fs.mkdir(backupDirectory,{recursive:true});
async function backup({sourcePath,backupName,...metadata}){
  const source=await fs.readFile(path.join(root,sourcePath));
  const hash=sha256(source);
  if(metadata.sha256&&metadata.sha256!==hash)throw new Error(`${metadata.slug}: 原始清单与源文件哈希不一致`);
  const target=path.join(backupDirectory,backupName);
  try{await fs.writeFile(target,source,{flag:'wx'});}catch(error){
    if(error.code!=='EEXIST')throw error;
    if(sha256(await fs.readFile(target))!==hash)throw new Error(`${backupName}: 已存在不同内容，未覆盖`);
  }
  const generated=['qj','crh380a','cr400af'].includes(metadata.slug);
  records.push({...metadata,sourcePath,backupName,bytes:source.length,sha256:hash,backedUpAt:preparedAt,kind:generated?'unmodified-author-generator-export':'unmodified-original-download',...(generated?{acquisition:metadata.slug==='crh380a'?'official-browser-export':'official-generator-export',provenance:'docs/railisland-export.md'}:{})});
}
for(const [slug,backupName] of Object.entries(names)){
  const model=bySlug.get(slug);
  if(!model)throw new Error(`${slug}: 尚未完成原始归档和展示文件准备`);
  await backup({slug,sourcePath:`assets/source-models/${slug}.glb`,backupName,originalName:model.sourceFile,author:model.author,sourceUrl:model.sourceUrl,license:model.license,licenseUrl:model.licenseUrl,sha256:model.sha256,...(model.representation?{representation:model.representation}:{})});
}
await backup({slug:'rail-principle',sourcePath:'public/models/rail-principle.glb',backupName:'GENERIC-High-Speed-Train-Tevy.glb',originalName:'lod1.glb',author:'tevy.dev',sourceUrl:'https://tevy.dev/models/high-speed-train',downloadUrl:'https://tevy.dev/models/high-speed-train/v1/lod1.glb',license:'CC0 1.0',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/',representation:'generic-principle-model'});
await fs.writeFile(path.join(backupDirectory,'manifest.json'),JSON.stringify({preparedAt,note:'Byte-identical renamed backups of original downloads or original exports from the author-published generator. Website-optimized desktop/mobile derivatives remain in public/models; source licensing is recorded externally when the original export has no credit metadata.',models:records},null,2)+'\n');
const rows=records.map(record=>`| \`${record.backupName}\` | \`${record.originalName}\` | ${record.author} | [${record.license}](${record.licenseUrl}) | [来源](${record.sourceUrl}) |`).join('\n');
await fs.writeFile(path.join(backupDirectory,'README.md'),`# 原始模型统一备份\n\n备份日期：${preparedAt}。共${records.length}个GLB文件，为12款具名车型加1个通用原理模型。\n\n所有备份只改文件名，字节内容与原始归档一致；不减面、不转换贴图、不补写内嵌署名。部分Rail Island官方导出原文件没有内嵌许可字段，其CC0来源和作者记录在清单中；网站衍生文件才补入署名元数据。\n\n**本目录备份原始下载或作者生成器原始导出，不是网站压缩副本。** 原始文件本身可能已经由平台编码或压缩，这里“原始”仅表示本站未修改其内容。网站桌面和手机优化版本位于\`public/models/\`。\n\nGLB大文件通过\`.gitignore\`排除，仍保留在本地；本README和\`manifest.json\`可以提交版本管理。Git克隆不包含这些GLB，迁移时需自行复制整个备份目录并校验SHA-256。\n\n备份可复现：\`node scripts/backup-models.mjs\`。排他创建：同名文件仅在SHA-256一致时复用，内容不同时终止，绝不覆盖。机器可读清单保存原名、新名、来源、作者、许可、字节数、SHA-256与备份日期。\n\n| 备份名 | 原名 | 作者 | 许可 | 来源 |\n| --- | --- | --- | --- | --- |\n${rows}\n\nCRH380A来自官方网页GLB导出，QJ和CR400AF按作者公开生成器与官方流程导出，过程见 docs/railisland-export.md。QJ、CRH380A和CR400AF是Rail Island程序化简化重建，不能当作精确工程模型。\`GENERIC-High-Speed-Train-Tevy.glb\`是通用高速列车原理示意，不对应特定真实型号。\n`,'utf8');
console.log(`Verified ${records.length} original model backups in ${backupDirectory}`);

# Rail Island GLB 获取与导出记录

日期：2026-11-24。已接入前进型（QJ）、CRH380A、CR400AF三款，均为作者发布的CC0程序化简化模型。QJ为机车本体，不含煤水车；两款动车为头车，不代表完整编组。

## 官方网页获取方式

打开车型页，选择 **Add to export**，再打开顶部 **Export**，将格式从OpenTTD GRF改为 **ZIP of GLB files**，最后选择 **Export .zip**。预览区域旁的“Download for OpenTTD”仅下载GRF。

官方页面：[QJ](https://factory.railisland.com/model/proc-vehicle-cr-qj/)、[CRH380A](https://factory.railisland.com/model/proc-vehicle-cr-crh380a/)、[CR400AF](https://factory.railisland.com/model/proc-vehicle-cr-cr400af/)。导出选项截图保存在 `screenshots/factory-glb-export.jpg`。

## 本次取得方式

- CRH380A：官方网页导出ZIP中的GLB，原件1,158,220字节。
- QJ、CR400AF：网页打包下载未完成，改用作者公开的、自包含程序化模块及官方GLTFExporter流程，默认参数、完整细节（lod=false）导出，分别1,085,452和1,070,404字节。
- 为验证流程，使用同一流程生成CRH380A对照文件：40个节点、35个网格、全部accessor数量与网页导出一致。文件序列化长度差4字节；归档仍保留网页下载原件。

作者公开仓库：[rail-island-factory](https://github.com/rail-island/rail-island-factory)。参考 `src/modelModule.ts` 的默认构建及 `src/exportRun.ts` 的GLTFExporter二进制导出。发布模块保存于 `assets/export-research/published/`；上游树版本、模块SHA-256、参数、导出版本与比对结果见 `assets/export-research/export-manifest.json`。

本地复现脚本为 `scripts/export-railisland.mjs`，默认向Downloads排他写入，发现不同内容同名文件会停止。模块代码许可与模型输出许可分别记录：生成器代码MIT，作者发布模型输出CC0。原始GLB未补写署名或修改几何；来源记录在外部清单，网页优化副本才加入署名元数据。

## 网页与备份

桌面和手机副本位于 `public/models/`，经资源去重、WebP贴图转换及Meshopt压缩。页面标注“简化模型”与头车范围，封面来自本地实际渲染，不以游戏性能参数代替实车资料。

原始文件同时归档于 `assets/source-models/` 和统一命名的 `model-backups/`，后者的 `manifest.json` 记录原名、新名、作者、来源、许可、字节数和SHA-256。全部13份备份包含12款车型与1款通用原理模型，备份文件不进入 `dist/`。

# 模型获取与增补

核对日期：2026-11-24。

## 已取得并接入

用户官方下载的 HXD3D、HXD2、HXD3B、DF4D、SS9、ND5 已接入；原始文件保存在 `assets/source-models/`，网页桌面/手机副本在 `public/models/`。原作者 chinarailstory，CC BY 4.0，完整来源及实际体积见 `public/models/manifest.json`。

重新优化现有六款：

```powershell
node scripts/prepare-models.mjs "C:\Users\<用户名>\Downloads"
```

## 本轮找到的新增候选

详见 [10款候选的逐项核对清单](./model-candidates-2026-11.md)。优先SS3，随后SS1、SS5、SS6。它们有官方可下载标记及CC BY 4.0记录，需要维护者登录Sketchfab官方页面，使用Download入口获取。GLB/glTF或原始格式及文件体积以官方下载面板为准。

QJ、CRH380A、CR400AF三款Rail Island CC0程序化简化模型已导出、完成外观核验并接入。GLB需要通过Add to export → Export → ZIP of GLB files导出；Download for OpenTTD仅提供GRF。取得过程及公开生成器复现见 [导出记录](./railisland-export.md)。动车模型为头车，QJ仅含机车本体。

用户提供的候选8–10：DRB 01.10、LMS Fowler 4F、ChME3也已接入世界机车展厅，各自保留原作者和CC BY 4.0署名。至此共12款车型模型与1款通用原理模型，13份原始GLB统一备份于 `model-backups/`，每份均记录SHA-256。候选清单中其余未取得模型仍为待办。

## 下载后的处理

1. 保留原始压缩包、作者、许可、官方来源和下载日期。
2. 优先取得带完整贴图的自包含GLB；glTF多文件包需在本地转换并保留来源。
3. 登记车型模型元数据，再进行归档、简化、贴图转换与压缩。
4. 检查坐标、长轴、材质、默认视角和型号，生成封面后再显示3D标记。
5. 简化重建应明确标注；不能直接复用通用模型的部件热点，不能拿游戏数值当车型参数。

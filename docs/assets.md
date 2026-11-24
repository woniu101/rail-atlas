# 素材来源与获取记录

日期：2026-11-23。全部已使用图像和模型存放于 `public/`，核心浏览不依赖远程媒体。

## 图片

- `*-photo.jpg`：来自 Wikimedia Commons，保留各文件作者和许可；表格及 JSON 清单为逐文件记录。
- `hxd3d.jpg`、`df4d.jpg`、`ss9.jpg`、`hxd3b.jpg`：来自作者 chinarailstory 在 Sketchfab 发布的 CC BY 4.0 模型预览渲染，裁去灰色空白边缘；原始图保留为 `*-render.jpg`。展示时通过 CSS 亮度适配与混合模式融入页面背景，未修改模型结构。
- `rail-principle.jpg`：本地 Three.js 查看器的模型截图，来自同一 CC0 通用列车模型，包含教育热点，用作加载前封面。
- `qj.jpg`、`df4b.jpg`、`ss3.jpg`、`hxd2.jpg`、`crh380a.jpg`、`cr400af.jpg`：对应同名 `*-photo.jpg` 的本地展示版本。照片可能由 CSS 根据容器裁切显示；无 AI 补绘。
- 12款具名车型的交互状态已分别标注。Rail Island三款简化模型与DRB 01.10、LMS Fowler 4F、ChME3的封面均为本地实际渲染，来源与许可见机器可读清单。无模型车型保留照片。

## 本地原理示意模型

`/models/rail-principle.glb` 来自 tevy.dev 的通用高速列车，固定 v1、LOD1（1,217,624 bytes），许可 CC0 1.0，GLB 内置 copyright 同样声明 CC0。该模型不能标成 CR400AF、CRH380A 或其他实际型号。

模型包含独立的车门、转向架、轮对和受电弓节点，可以为原理演示提供基础。需要 GLTFLoader 的 MeshoptDecoder 与 KTX2Loader。KTX2 转码器位于 `/models/basis/`，来自本项目安装的 Three.js；随附说明、Three.js MIT 许可与 Basis Universal Apache 2.0 许可。

## 六款真实机车 GLB

用户于 2026-11-23 从 Sketchfab 官方下载 HXD3D、HXD2、HXD3B、DF4D、SS9、ND5。六个文件均为自包含 GLB 2.0，内嵌作者 chinarailstory、原始页面和 CC BY 4.0 声明。下载文件保持原样，校验 SHA-256 后归档至 `assets/source-models/`，该目录不进入静态构建。

`public/models/{slug}.glb` 和 `{slug}.mobile.glb` 是网页优化副本，经过去重、焊接、网格简化、辅助边线移除、WebP 贴图转换、Meshopt 压缩。保留玻璃透明材质、原有 UV 及署名；移除辅助边线以减少白色线框干扰。页面调整整体居中与朝向，未制作机械运动或假冒精确结构。所有原始大小、优化大小、三角面数、哈希及来源均记录于 `public/models/manifest.json`。ND5 为此次新增车型。

模型封面由本地查看器实际渲染截图生成，沿用相同模型作者、来源及许可。网站素材页同时说明优化处理，所有引用保留原始作品链接。

## 逐文件署名表

| 素材 | 作者 | 许可 | 来源 |
| --- | --- | --- | --- |
| `/images/qj-photo.jpg` | Bärtschi, Hans-Peter | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [原始页面](https://commons.wikimedia.org/wiki/File:QJ-2215_at_Mengyuan_Railway_Station_(SIK_01-008219-Print).jpg) |
| `/images/df4b-photo.jpg` | Mark Fischer | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [原始页面](https://commons.wikimedia.org/wiki/File:China_Railways_DF4B_2212.jpg) |
| `/images/df4d-photo.jpg` | JacobLyu | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [原始页面](https://commons.wikimedia.org/wiki/File:DF4D-3245_at_Sankeshu_Locomotive_Depot,_Harbin_20240120.jpg) |
| `/images/ss3-photo.jpg` | 颐园居 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [原始页面](https://commons.wikimedia.org/wiki/File:SS3_5181.jpg) |
| `/images/ss9-photo.jpg` | N509FZ | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [原始页面](https://commons.wikimedia.org/wiki/File:SS9_0003@NXH_(20151224104809).jpg) |
| `/images/hxd2-photo.jpg` | 慕尼黑啤酒 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | [原始页面](https://commons.wikimedia.org/wiki/File:HXD2-0001.jpg) |
| `/images/hxd3b-photo.jpg` | N509FZ | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [原始页面](https://commons.wikimedia.org/wiki/File:HXD3B_0258@NXH_(20180518092203).jpg) |
| `/images/hxd3d-photo.jpg` | N509FZ | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [原始页面](https://commons.wikimedia.org/wiki/File:HXD3D_0055_at_Liucun_(20210504110602).jpg) |
| `/images/crh380a-photo.jpg` | 颐园新居 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | [原始页面](https://commons.wikimedia.org/wiki/File:CRH380A-6020_20130414.jpg) |
| `/images/cr400af-photo.jpg` | N509FZ | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [原始页面](https://commons.wikimedia.org/wiki/File:CR400AF-2007_at_Guangnan_(20181107092901).jpg) |
| `/images/df4d.jpg` | chinarailstory | [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/) | [原始页面](https://sketchfab.com/3d-models/df4ddf4d-diesel-locomotive-9dbe2eb62f4b4e4eab7653721fcea748) |
| `/images/ss9.jpg` | chinarailstory | [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/) | [原始页面](https://sketchfab.com/3d-models/ss9-electric-locomotive-9-32f65c752b8c45adb3c3ed32461fff04) |
| `/images/hxd3b.jpg` | chinarailstory | [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/) | [原始页面](https://sketchfab.com/3d-models/hxd3b-electric-locomotive-0001-18323f9649504fe9bfe3c182845ca0fa) |
| `/images/hxd3d.jpg` | chinarailstory | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [原始页面](https://sketchfab.com/3d-models/hxd3d-electric-locomotive-hxd3d-aa40849b8687426ea5da47deacb8c12f) |
| `/models/rail-principle.glb` | tevy.dev | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [原始页面](https://tevy.dev/models/high-speed-train) |

机器可读清单：`scripts/assets-manifest.json`。修改或重新获取素材时，应同步更新该清单和页面署名。

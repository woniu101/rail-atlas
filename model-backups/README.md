# 原始模型统一备份

备份日期：2026-11-24。共13个GLB文件，为12款具名车型加1个通用原理模型。

所有备份只改文件名，字节内容与原始归档一致；不减面、不转换贴图、不补写内嵌署名。部分Rail Island官方导出原文件没有内嵌许可字段，其CC0来源和作者记录在清单中；网站衍生文件才补入署名元数据。

**本目录备份原始下载或作者生成器原始导出，不是网站压缩副本。** 原始文件本身可能已经由平台编码或压缩，这里“原始”仅表示本站未修改其内容。网站桌面和手机优化版本位于`public/models/`。

GLB大文件通过`.gitignore`排除，仍保留在本地；本README和`manifest.json`可以提交版本管理。Git克隆不包含这些GLB，迁移时需自行复制整个备份目录并校验SHA-256。

备份可复现：`node scripts/backup-models.mjs`。排他创建：同名文件仅在SHA-256一致时复用，内容不同时终止，绝不覆盖。机器可读清单保存原名、新名、来源、作者、许可、字节数、SHA-256与备份日期。

| 备份名 | 原名 | 作者 | 许可 | 来源 |
| --- | --- | --- | --- | --- |
| `CN-HXD3D-chinarailstory.glb` | `hxd3d_electric_locomotive_hxd3d.glb` | chinarailstory (https://sketchfab.com/chinarailstory) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [来源](https://sketchfab.com/3d-models/hxd3d-electric-locomotive-hxd3d-aa40849b8687426ea5da47deacb8c12f) |
| `CN-DF4D-chinarailstory.glb` | `df4ddf4d_diesel_locomotive.glb` | chinarailstory (https://sketchfab.com/chinarailstory) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [来源](https://sketchfab.com/3d-models/df4ddf4d-diesel-locomotive-9dbe2eb62f4b4e4eab7653721fcea748) |
| `CN-SS9-chinarailstory.glb` | `ss9_electric_locomotive_9.glb` | chinarailstory (https://sketchfab.com/chinarailstory) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [来源](https://sketchfab.com/3d-models/ss9-electric-locomotive-9-32f65c752b8c45adb3c3ed32461fff04) |
| `CN-HXD2-chinarailstory.glb` | `hxd2_electric_locomotive_2.glb` | chinarailstory (https://sketchfab.com/chinarailstory) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [来源](https://sketchfab.com/3d-models/hxd2-electric-locomotive-2-97847f39791e4292a4cbd837d9fbf6ba) |
| `CN-HXD3B-chinarailstory.glb` | `hxd3b_electric_locomotive__0001.glb` | chinarailstory (https://sketchfab.com/chinarailstory) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [来源](https://sketchfab.com/3d-models/hxd3b-electric-locomotive-0001-18323f9649504fe9bfe3c182845ca0fa) |
| `CN-ND5-chinarailstory.glb` | `nd5_diesel_locomotive_prc_ge_c36-7nd5.glb` | chinarailstory (https://sketchfab.com/chinarailstory) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [来源](https://sketchfab.com/3d-models/nd5-diesel-locomotive-prc-ge-c36-7nd5-4d4579615d0e485eb1fe57d3df39ab74) |
| `DE-DRB-01-10-Goetz-von-Berlichingen.glb` | `drb_01.10_steam_locomotive_low_poly.glb` | Götz von Berlichingen (https://sketchfab.com/vonBerlichingen) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [来源](https://sketchfab.com/3d-models/drb-0110-steam-locomotive-low-poly-b4e4252632f44492b6c018627a6b4a60) |
| `GB-LMS-Fowler-4F-Steve-Emfore.glb` | `lms_fowler_4f.glb` | Steve Emfore (https://sketchfab.com/steve_Emfore) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [来源](https://sketchfab.com/3d-models/lms-fowler-4f-b84f7a5079d343ea83b35cb10517565e) |
| `WORLD-ChME3-Nikcore.glb` | `train__locomotive_low-poly_locomotive.glb` | Nikcore (https://sketchfab.com/nikcore76) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [来源](https://sketchfab.com/3d-models/train-locomotive-low-poly-locomotive-0eea1fa85cfa40769ce8e0cbb98e1d05) |
| `CN-QJ-Rail-Island.glb` | `railisland-qj.glb` | Rail Island | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [来源](https://factory.railisland.com/model/proc-vehicle-cr-qj/) |
| `CN-CRH380A-Rail-Island.glb` | `railisland-crh380a.glb` | Rail Island | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [来源](https://factory.railisland.com/model/proc-vehicle-cr-crh380a/) |
| `CN-CR400AF-Rail-Island.glb` | `railisland-cr400af.glb` | Rail Island | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [来源](https://factory.railisland.com/model/proc-vehicle-cr-cr400af/) |
| `GENERIC-High-Speed-Train-Tevy.glb` | `lod1.glb` | tevy.dev | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [来源](https://tevy.dev/models/high-speed-train) |

CRH380A来自官方网页GLB导出，QJ和CR400AF按作者公开生成器与官方流程导出，过程见 docs/railisland-export.md。QJ、CRH380A和CR400AF是Rail Island程序化简化重建，不能当作精确工程模型。`GENERIC-High-Speed-Train-Tevy.glb`是通用高速列车原理示意，不对应特定真实型号。

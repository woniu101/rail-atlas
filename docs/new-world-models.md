# 世界铁路三款模型整合记录

处理日期：2026-11-24。原始文件由用户从官方平台下载至 `C:\Users\<用户名>\Downloads`。本次仅处理新增三款，没有重新处理既有六款中国机车。

## 1. 来源与许可

三个原文件均为 GLB 2.0，自包含二进制缓冲与图像，没有外部 buffer 或图片 URL。三个文件的 `asset.extras` 均明确保存作者、Sketchfab来源和 `CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)`。输出继承这些字段，不将作者统一写成已有中国车型作者。

| slug | 原文件 | 内嵌作者 | 来源 |
| --- | --- | --- | --- |
| `drb-01-10` | `drb_01.10_steam_locomotive_low_poly.glb` | Götz von Berlichingen | [DRB 01.10](https://sketchfab.com/3d-models/drb-0110-steam-locomotive-low-poly-b4e4252632f44492b6c018627a6b4a60) |
| `lms-fowler-4f` | `lms_fowler_4f.glb` | Steve Emfore | [LMS Fowler 4F](https://sketchfab.com/3d-models/lms-fowler-4f-b84f7a5079d343ea83b35cb10517565e) |
| `chme3` | `train__locomotive_low-poly_locomotive.glb` | Nikcore | [ChME3](https://sketchfab.com/3d-models/train-locomotive-low-poly-locomotive-0eea1fa85cfa40769ce8e0cbb98e1d05) |

三个模型均采用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。网站展示需保留作者、来源、许可链接，并说明压缩、材质贴图转换与移动版轻度减面等修改。

## 2. 处理与输出

`scripts/prepare-models.mjs` 增加三个输入文件与专用低面模型配置，原有六款的减面参数与处理流程不变。

- 桌面：不调用 `simplify`；清理重复资源、焊接顶点、WebP贴图和Meshopt压缩。
- 手机：减面目标比例0.85、误差上限0.00005，优先保留细杆件；贴图最大1024。实际减面幅度受误差约束，不承诺一定达到85%。
- 桌面贴图最大2048，原图更小时不放大。
- 不删除原始模型里的机车、煤水车、车厢和轨道节点。DRB的默认单机展示由viewer clone裁剪完成，磁盘原始与优化GLB仍保留整列。
- 格式验证新增对署名、许可和自包含资源的校验；允许CC-BY-4.0标识或对应许可URL。
- 参数筛选支持逗号分隔slug，旧单个slug调用方式继续可用。

复现本次处理：

```powershell
node scripts/prepare-models.mjs 'C:\Users\<用户名>\Downloads' 'drb-01-10,lms-fowler-4f,chme3'
```

| slug | 原始字节 | 桌面字节 | 手机字节 | 原始网格三角面计数 | 桌面计数 | 手机计数 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `drb-01-10` | 5,091,220 | 896,796 | 862,440 | 36,359 | 36,359 | 31,111 |
| `lms-fowler-4f` | 3,481,408 | 470,552 | 371,792 | 36,992 | 30,280 | 29,036 |
| `chme3` | 1,495,724 | 176,288 | 176,160 | 24,693 | 24,693 | 24,661 |

上述计数沿用处理脚本的统计口径：对文档中独立Mesh资源求和，不重复计算共享Mesh的多个场景实例。LMS桌面去重后独立Mesh从9个变为5个，因此资源三角面计数下降，并非执行了减面，也不意味着删除了场景中共享几何的实例。平台页面给出的计数与文件内统计可能存在差异，应以各自口径注明。

输出位置：

- 原始归档：`assets/source-models/{slug}.glb`，写入时使用排他创建；若同名原始文件已存在但哈希不同，则中止，不覆盖。
- 桌面：`public/models/{slug}.glb`。
- 手机：`public/models/{slug}.mobile.glb`。
- 原始清单：`assets/source-models/manifest.json`。
- 公开清单：`public/models/manifest.json`，共9款；本次新增三款，既有六条记录保留。
- 新输出内嵌修改日期为2026-11-24；既有六款输出文件及内嵌修改日期未改变。

## 3. 几何、材质与坐标

下表为NodeIO读取桌面输出后、按原始世界坐标得到的近似包围盒尺寸。**坐标单位未经过实际车辆长度标定，不应直接当作米用于车型参数。**

| 模型 | 宽度/长度轴 | 世界包围盒尺寸 X×Y×Z | 材质 | 贴图 | 建议 |
| --- | --- | --- | ---: | --- | --- |
| DRB整列 | 长度沿Z | 418.853×508.636×14,099.080 | 7（源8） | 7张WebP，512或1024 | 默认聚焦机车+煤水车；绕Y旋转π/2以便统一沿X展示 |
| LMS Fowler 4F | 长度沿X | 16.139×4.136×2.596 | 2 | 2张WebP，2048与1024 | 可沿用默认长X展示，注意包含煤水车 |
| ChME3 | 长度沿Z | 2.923×4.161×16.333 | 9 | 无图像贴图 | 绕Y旋转π/2以便统一沿X展示；保留源材质颜色 |

DRB源模型不仅有机车和煤水车，还包含客车、行李车及长轨道，整列的长度是镜头过远的主要原因。不能用整列bounds归一化后宣称机车本身很小。

### DRB准确节点层级

以下名称来自优化GLB，大小写及空格均应保留：

```text
Sketchfab_model
└── Collada visual scene group
    ├── DRB0110
    │   └── Material1
    ├── Tender
    │   └── Material1
    ├── Wagon1
    │   └── Material1
    ├── Wagon2
    │   └── Material1
    ├── Mitropa
    │   └── Material1
    ├── Baggage
    │   └── Material1
    └── rails
        ├── Material2
        └── Material1
```

建议viewer在克隆场景内保留 `DRB0110`、`Tender` 及祖先，移除同级 `Wagon1`、`Wagon2`、`Mitropa`、`Baggage`、`rails`；然后重算世界bounds，平移到地面并归一化。不能只保留所有名为 `Material1` 的节点，因为该名称在不同车辆里重复出现。不要在共享原始loader场景上直接修改。

桌面优化GLB的world bounds（原坐标、未额外旋转）：

| 节点 | min [X,Y,Z] | max [X,Y,Z] |
| --- | --- | --- |
| `DRB0110` | [-154.760996, -165.063429, -832.940002] | [154.760996, 295.823391, 879.096981] |
| `Tender` | [-153.642071, -165.064533, -1639.664952] | [153.642071, 246.339605, -786.739964] |
| 两节点并集 | [-154.760996, -165.064533, -1639.664952] | [154.760996, 295.823391, 879.096981] |

只保留两节点时，包围盒约309.522×460.888×2518.762。朝向正反仍由浏览器中观察机车前端确定，不能仅凭最长轴推断。

## 4. 原始文件SHA-256

| slug | SHA-256 |
| --- | --- |
| `drb-01-10` | `9d34050fb230bcc12d62551acbfd20faa373e9efee509522d6ae5931c1fe0b9f` |
| `lms-fowler-4f` | `42359892ca5c11e8dd9a6ad15d45f257c0ce816c21014be624f0a9ebe8a5585f` |
| `chme3` | `c2b1a03a6e065133973121e33d02f8ea525e9cfb13dd5cfd552df4f35136ab90` |

## 5. 验证边界

已进行GLB解析、来源与许可检查、原始归档哈希检查、NodeIO重新加载优化文件、材质和bounds检查。浏览器灯光、方向、热点、部件显示完整性和移动端观感由主任务完成视觉验收。


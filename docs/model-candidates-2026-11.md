# 真实车型 3D 模型增补候选

核对日期：2026-11-23。本文仅记录候选、许可及获取状态，不代表模型已下载、已接入或已完成外形验收。

## 优先建议

1. **SS3 韶山3：最适合直接补齐现有图鉴。** 作者与已接入的六款机车一致，官方 API 确认可下载及 CC BY 4.0。需要维护者登录 Sketchfab 官方下载；约70万三角面，取得文件后仍需优化。
2. **QJ 前进型：发现原作者提供的 CC0 程序化简化重建。** Rail Island Factory 明确按真实 QJ 命名并提供 GLB 导出，约1.37万三角面。可作为标明“简化模型”的候选，不能等同精确工程还原。
3. **CR400AF：同一原作者提供具名的 CC0 程序化简化模型。** 约1.44万三角面，支持头车、中间车、编组和涂装参数。适合评估能否补齐动车组类别，但必须先观察外形、车头和转向架，不能仅凭名称直接上线。

## 核对方法与状态定义

- Sketchfab：读取官方 `GET https://api.sketchfab.com/v3/models/{id}`，核对 `name`、`user.displayName`、`license.url`、`isDownloadable` 和 `faceCount`。官方模型页为下列逐项链接。
- Rail Island Factory：读取原作者模型页及公开目录 [`catalog.json`](https://factory.railisland.com/catalog.json)。目录提供作者、CC0、模型名称、三角面数和可公开下载的程序化 JS 文件；模型页明确声明可导出 GLB。
- **未下载**：尚未取得 GLB 或原始三维文件。预览图、模型页可打开、API 可下载标记都不等于已取得文件。
- **待浏览器导出核验**：页面声明 GLB 导出，但本轮只读取公开页面与目录，未操作导出按钮，未确认文件体积或实际导出结果。
- **需登录官方下载**：Sketchfab 的下载端点需要合法账户认证；本轮对 SS3 和 DRB 01.10 的无认证下载请求实测为 HTTP 401，没有从播放器内部提取数据。
- 网格面数不是下载体积；JS 源文件体积也不是导出的 GLB 体积。

## 中国车型候选

### 1. SS3 韶山3型电力机车

- 准确标题：`SS3 Electric Locomotive SS3电力机车`。
- 作者：`chinarailstory`。
- [模型页面](https://sketchfab.com/3d-models/ss3-electric-locomotive-ss3-2a2be4ba2975434f8e011fee8a5dbd7e)。
- [官方 API](https://api.sketchfab.com/v3/models/2a2be4ba2975434f8e011fee8a5dbd7e)。
- 模型 ID：`2a2be4ba2975434f8e011fee8a5dbd7e`。
- 许可：[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)；官方 `isDownloadable=true`。
- 复杂度：701,319 三角面，377,383 顶点。
- 格式及体积：公开 API 未返回可用的下载归档信息；需登录下载面板确认 GLB/glTF 或原始文件格式与体积，不推测。
- 获取状态：未下载；官方无认证下载端点实测 HTTP 401。
- 加入方式：取得并检查模型后，直接对应现有 `ss3` 车型，保留署名、来源、许可证链接和减面说明。

### 2. QJ 前进型蒸汽机车（简化重建）

- 准确标题：`CR QJ`；作者：`Rail Island`。
- [原作者页面](https://factory.railisland.com/model/proc-vehicle-cr-qj/)。
- 模型 ID：`proc-vehicle-cr-qj`。
- 许可：[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)。
- 可下载状态：非 Sketchfab，无 `isDownloadable` 字段；模型页声明可导出 GLB，公开目录也提供 [程序化源文件](https://factory.railisland.com/js/proc-vehicle-cr-qj.js)。
- 页面/目录标注：13,681 三角面，41,043 顶点；车头和煤水车两种单元参数。
- 格式及体积：GLB 为页面导出格式；最终字节数未核实。公开 JS 是271,763字节，**不能作为 GLB 下载大小**。
- 登录：公开页面与目录无需登录；实际浏览器导出是否完整成功尚待操作核验。
- 获取状态：未下载 GLB，待浏览器导出核验。
- 加入方式：可对应现有 `qj`，但应明确“QJ 简化示意重建”；核对动轮、导轮、从轮、连杆、煤水车及车型比例后再决定是否使用。

### 3. CRH380A 动车组（简化重建）

- 准确标题：`CRH380A`；作者：`Rail Island`。
- [原作者页面](https://factory.railisland.com/model/proc-vehicle-cr-crh380a/)。
- 模型 ID：`proc-vehicle-cr-crh380a`。
- 许可：CC0 1.0。
- 可下载状态：原作者页面声明可导出 GLB；非 Sketchfab，无 `isDownloadable` 字段；提供 [程序化源文件](https://factory.railisland.com/js/proc-vehicle-cr-crh380a.js)。
- 页面/目录标注：15,675 三角面，49,209 顶点；头车、中间车和整列参数，整列支持2—8车选项。
- 格式及体积：GLB 需页面导出；最终大小待核实。程序化 JS 为245,702字节，不是 GLB 大小。
- 登录：公开页面、目录与源文件无需登录；浏览器导出尚未操作。
- 获取状态：未下载 GLB，待浏览器导出核验。
- 加入方式：可对应现有 `crh380a`，明确“简化示意重建”；网站已有车型参数继续采用独立资料，不照搬作者面向游戏的功率或载重配置。

### 4. CR400AF 复兴号（简化重建）

- 准确标题：`Fuxing CR400AF`；作者：`Rail Island`。
- [原作者页面](https://factory.railisland.com/model/proc-vehicle-cr-cr400af/)。
- 模型 ID：`proc-vehicle-cr-cr400af`。
- 许可：CC0 1.0。
- 可下载状态：原作者页面声明可导出 GLB；非 Sketchfab，无 `isDownloadable` 字段；提供 [程序化源文件](https://factory.railisland.com/js/proc-vehicle-cr-cr400af.js)。
- 页面/目录标注：14,443 三角面，45,873 顶点；头车、中间车和整列参数；提供复兴红、智能复兴号涂装选项。
- 格式及体积：GLB 需页面导出；最终大小待核实。程序化 JS 为245,826字节，不是 GLB 大小。
- 登录：公开页面、目录与源文件无需登录；浏览器导出尚未操作。
- 获取状态：未下载 GLB，待浏览器导出核验。
- 加入方式：可对应现有 `cr400af`，标明“简化示意重建”；必须核查外形及子型号，不能将可切换的游戏涂装参数视为精确子型号还原。

### 5. SS1 韶山1型电力机车

- 准确标题：`SS1 Electric Locomotive SS1电力机车`；作者：`chinarailstory`。
- [模型页面](https://sketchfab.com/3d-models/ss1-electric-locomotive-ss1-fce09ba4a17041408bee81b7fdb2bf34)。
- [官方 API](https://api.sketchfab.com/v3/models/fce09ba4a17041408bee81b7fdb2bf34)。
- 模型 ID：`fce09ba4a17041408bee81b7fdb2bf34`。
- 许可：CC BY 4.0；官方 `isDownloadable=true`；488,587 三角面。
- 格式及体积：公开 API 未提供归档下载信息，需登录官方下载面板确认。
- 获取状态：未下载；属于需登录官方下载的 Sketchfab 候选，本轮未使用账户。
- 加入方式：需新增车型资料，适合补充中国早期国产电力机车的发展历程。

### 6. SS5 韶山5型电力机车

- 准确标题：`SS5 Electric Locomotive SS5型电力机车`；作者：`chinarailstory`。
- [模型页面](https://sketchfab.com/3d-models/ss5-electric-locomotive-ss5-da1c77dbf00c436ab8d294e431adf2ed)。
- [官方 API](https://api.sketchfab.com/v3/models/da1c77dbf00c436ab8d294e431adf2ed)。
- 模型 ID：`da1c77dbf00c436ab8d294e431adf2ed`。
- 许可：CC BY 4.0；官方 `isDownloadable=true`；693,863 三角面。
- 格式及体积：公开 API 未提供归档下载信息，需登录官方下载面板确认。
- 获取状态：未下载；需登录官方下载。
- 加入方式：需新增车型资料，适合作为快速客运机车技术探索的专题内容，不暗示其曾大规模批量运用。

### 7. SS6 韶山6型电力机车

- 准确标题：`SS6 Electric Locomotive SS6型电力机车`；作者：`chinarailstory`。
- [模型页面](https://sketchfab.com/3d-models/ss6-electric-locomotive-ss6-7cfa7922a0964c8d892141b2226481d7)。
- [官方 API](https://api.sketchfab.com/v3/models/7cfa7922a0964c8d892141b2226481d7)。
- 模型 ID：`7cfa7922a0964c8d892141b2226481d7`。
- 许可：CC BY 4.0；官方 `isDownloadable=true`；757,604 三角面。
- 格式及体积：公开 API 未提供归档下载信息，需登录官方下载面板确认。
- 获取状态：未下载；需登录官方下载。
- 加入方式：需新增车型资料，注意与韶山6B区分，不能直接复用后者参数。

## 世界铁路精选候选

### 8. 德国 DRB 01.10 蒸汽机车

- 准确标题：`DRB 01.10 Steam Locomotive (low poly)`。
- 作者：`Götz von Berlichingen`。
- [模型页面](https://sketchfab.com/3d-models/drb-0110-steam-locomotive-low-poly-b4e4252632f44492b6c018627a6b4a60)。
- [官方 API](https://api.sketchfab.com/v3/models/b4e4252632f44492b6c018627a6b4a60)。
- 模型 ID：`b4e4252632f44492b6c018627a6b4a60`。
- 许可：CC BY 4.0；官方 `isDownloadable=true`；36,761 三角面。
- 格式及体积：公开 API 未提供归档下载信息，需登录官方下载面板确认。
- 获取状态：未下载；无认证官方 `/download` 端点实测 HTTP 401。
- 加入方式：适合世界铁路蒸汽机车专题；低面数，可能比现有机车更容易优化，但仍需检查贴图和材质数量。

### 9. 英国 LMS Fowler 4F 蒸汽机车

- 准确标题：`LMS Fowler 4F`；作者：`Steve Emfore`。
- [模型页面](https://sketchfab.com/3d-models/lms-fowler-4f-b84f7a5079d343ea83b35cb10517565e)。
- [官方 API](https://api.sketchfab.com/v3/models/b84f7a5079d343ea83b35cb10517565e)。
- 模型 ID：`b84f7a5079d343ea83b35cb10517565e`。
- 许可：CC BY 4.0；官方 `isDownloadable=true`；37,393 三角面。
- 格式及体积：公开 API 未提供归档下载信息，需登录官方下载面板确认。
- 获取状态：未下载；需登录官方下载。
- 加入方式：适合介绍英国传统蒸汽机车及不同轮式、用途；新增资料后再接入。

### 10. ChME3 内燃调车机车

- 平台标题：`Train | Locomotive, Low-poly locomotive`；作者说明明确标为 `LOW POLY Model of diesel locomotive ChME3`，不是根据外形自行猜测。
- 作者：`Nikcore`。
- [模型页面](https://sketchfab.com/3d-models/train-locomotive-low-poly-locomotive-0eea1fa85cfa40769ce8e0cbb98e1d05)。
- [官方 API](https://api.sketchfab.com/v3/models/0eea1fa85cfa40769ce8e0cbb98e1d05)。
- 模型 ID：`0eea1fa85cfa40769ce8e0cbb98e1d05`。
- 许可：CC BY 4.0；官方 `isDownloadable=true`；24,742 三角面。
- 格式及体积：公开 API 未提供归档下载信息，需登录官方下载面板确认。
- 获取状态：未下载；需登录官方下载。
- 加入方式：适合世界铁路调车机车专题，新增独立资料；不能改称中国东风系列。

## 现有缺模型车型的覆盖情况

| 车型 | 本轮结论 |
| --- | --- |
| QJ | 找到具名 CC0 程序化简化模型，待浏览器 GLB 导出与视觉核验 |
| DF4B | 未找到本轮可明确核验并适合自托管的精确模型。Rail Island 的 `CR DF4` 仅标 DF4，不能自动当成DF4B；Nexprint既有DF4B许可禁止托管，不采用 |
| SS3 | 找到原作者CC BY 4.0模型，官方标为可下载，需维护者登录下载 |
| CRH380A | 找到具名 CC0 程序化简化模型，待导出及外形核验，不声称找到高保真精确模型 |
| CR400AF | 找到具名 CC0 程序化简化模型，待导出及子型号核验，不声称找到高保真精确模型 |

## 本轮文件状态与下一步

- 检查 `C:\Users\<用户名>\Downloads`，仍为先前六个用户下载的GLB：DF4D、HXD2、HXD3B、HXD3D、ND5、SS9，未发现本轮候选新增文件。
- 本轮没有修改 `src/`、`public/`，没有创建账号，没有从受保护的播放器内部提取网格。
- 本轮未取得新的候选GLB，因此没有建立伪装成已下载成果的候选模型目录。
- 建议先由维护者登录官方下载SS3，再评估Rail Island的QJ和CR400AF简化模型；如果目标是与已有六款保持相同精细程度，应优先采用SS3及SS1，而不是直接混合粗细风格。
- 导入前应记录原始文件、实际格式、文件大小、内容哈希、许可获取日期和修改过程，再做坐标统一、尺寸核验、压缩与浏览器检查。
- 原作者对模型的许可不自动替代真实车辆标志、贴图引用或参考图片的独立权利核验；程序化目录中的游戏数值不能直接作为车型事实资料。

# 2026-11-24接入更新

本文原有逐项候选记录保留作为获取依据。候选8–10（DRB 01.10、LMS Fowler 4F、ChME3）现已接入世界机车展厅；Rail Island的QJ、CRH380A、CR400AF也已取得并接入，均已生成本地预览图和桌面/手机副本。Rail Island导出方式与本次取得过程见 [导出记录](./railisland-export.md)。原始GLB已汇总至 `model-backups/`，旧记录中的“未下载/待导出”状态由本更新取代。


# 世界车型模型内容查证（2026-11-24）

本轮新增三个 `src/content/world-models/*.md` 条目。正文各约500–700中文汉字，采用JSON frontmatter，不含模型文件或图片字段。模型资产与内容身份由主开发流程关联。

## DRB 01.10

已阅读：

1. 德国蒸汽机车博物馆的01 1061展品原页：<https://www.dampflokmuseum.de/en/the-museum/exponate/the-powerful-runner>。明确01.10是三缸发展型号，早期流线罩与后期拆罩、燃油改造，以及该馆保存车辆资料。
2. Stoom Stichting Nederland的01 1075原页：<https://www.stoomstichting.nl/collectie/locomotief-01-1075/>。通过完整HTML读取，核对Pacific、2′C1′三缸轴列式、流线罩的维护与冷却取舍及车辆后续经历。

边界：没有将01.10三缸结构推广到全部01型；没有把保育机车01 1061或01 1075指认为网页模型所精确复刻的具体车号；没有用某次燃烧方式改造代表全系列全部时期。国家字段使用“德国·历史车型”。

## LMS Fowler 4F

已阅读：

1. London Midland Society（实际拥有及修复4123的组织）的型别解释：<https://4123.co.uk/what-is-a-4f/>。核对0-6-0货运机车、4F分类与Midland传统。
2. Avon Valley Railway的44123原页：<https://www.avonvalleyrailway.org/about-us/locomotives-rolling-stock/fowler-4f-0-6-0-44123/>。核对1925年Crewe制造、具体车辆服役及修复情况。
3. 英国国家铁路博物馆图纸目录：<https://www.railwaymuseum.org.uk/sites/default/files/2019-02/Drawing%20Registers%20List.pdf>，AA/A/4/40–41项明确“LMSR Class 4F 0-6-0”。

边界：4F动力分类不解释成四轴；0-6-0按车轮数计、对应三根动轴，煤水车另算。没有把Midland前身、LMS型别与具体保存车制造年合为一个“首台”历史。模型用于外形观察，不声明其等同44123精确测绘。

## ChME3 / ЧМЭ3

已阅读：

1. 2007年拍摄的十月铁路博物馆ChME3-001展牌照片页面及文字转录：<https://commons.wikimedia.org/wiki/File:Diesel_shunting_locomotive_ChME3-001_(3).jpg>。该页保存的展牌文字明确ČKD、Czechoslovakia、electric transmission与调车用途。这里引用的是有可追溯照片记录的博物馆展牌，不把Wikimedia页面冒称为博物馆现行官方网站。原图下载遇限，未另作高清图像复核，正文未引用其数量、功率或投产日期。
2. 制造商CZ LOKO项目页：<https://www.czloko.com/reference-projects-1.htm>。网页明确列出ČME3M(BY/EST/LT/LV)项目；仅用于讨论现代化改型和多国应用，不把改型参数套到原型。
3. 喀山联邦大学官方发布的2025年第3期原始学术期刊：<https://kpfu.ru/portal/docs/F_306200606/___SETS._3_101_.2025_26.statej.pdf>，研究段落讨论ChME3柴油机、牵引发电机和三轴转向架。用于结构说明，不以搜索汇总页充当期刊。

边界：未使用维基百科条目作唯一或主要型别依据；没有把T669/770等近亲型号当成同配置ChME3；没有把制造国与历史使用国混写。没有把电传动的共同机制当成其与中国东风系列有制造谱系关系。国家字段使用“捷克斯洛伐克制造·多国运用”。

## 编辑检查

- 各条目都有三个要点、来源、类别、状态和2026-11-24更新时间。
- 正文数字引用按frontmatter `sources` 顺序排列。
- 不设置 `model`、`image` 字段，避免与资产manifest产生两个真相来源。
- 不把低面数模型当作博物馆测绘数据，不凭作者标题确认全部几何细节。

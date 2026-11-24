---
{
  "slug": "pantograph-and-power",
  "type": "principle",
  "title": "受电弓怎样把电送进火车？",
  "eyebrow": "从接触网到车轮",
  "summary": "车顶的金属折臂不是天线。从接触导线到牵引电机，一次取电需要机械接触、电压变换和控制系统共同完成。",
  "visual": "power",
  "relatedTrains": [
    "hxd3d",
    "hxd2",
    "cr400af"
  ],
  "sources": [
    {
      "title": "Network Rail · 接触网电气化指南",
      "url": "https://www.bathnes.gov.uk/sites/default/files/sitedocuments/Planning-and-Building-Control/Planning/nr_a_guide_to_overhead_electrification.pdf"
    },
    {
      "title": "铁科院等 · 高速铁路弓网离线在线识别及应对策略",
      "url": "https://edl.csrzic.com/zh/article/doi/10.13890/j.issn.1000-128X.2024.02.021/"
    },
    {
      "title": "中国中车 · HXD3D型电力机车",
      "url": "https://www.crrcgc.cc/crrcgc/2016-01/19/article_BA28BFAC686B41E0AF63C7A4F8B8D0E6.html"
    }
  ],
  "status": "published",
  "updatedAt": "2026-11-23",
  "takeaways": [
    "受电弓依靠滑动接触取电，弓网双方共同决定接触品质。",
    "高压电需经过变压和变流，才能成为适合牵引电机的电源。",
    "供电形式与传动形式不同，不能把一条能量路径套用到所有火车。"
  ],
  "modelTrain": "hxd3d"
}
---

## 滑过导线，而不是夹住导线

受电弓的弓头向上贴住接触导线，列车前进时，滑板沿导线滑动取电。支柱、承力索和吊弦共同维持导线的位置与张力；接触线在轨道上方作适当的横向布置，让磨耗分散在滑板上，而非始终磨出一道沟。它是列车和线路共同组成的运动接触系统。[1](https://www.bathnes.gov.uk/sites/default/files/sitedocuments/Planning-and-Building-Control/Planning/nr_a_guide_to_overhead_electrification.pdf)

可以把它想象成一支需要持续贴着起伏纸面写字的笔：只顾用力压，不一定写得更稳。弓网设计要兼顾接触稳定、磨耗和运动响应，线路与车辆的状态都重要。

## 电进了车，还不能直接给电机

在采用高压交流供电的现代交流传动车辆上，电能经受电弓、主断路器进入牵引变压器，再由牵引变流器处理，形成适合牵引电机的电源。变压器主要解决电压等级，变流器还控制电压和频率；电机最终通过机械传动带动车轮。回流也有设计好的路径，不是电能进车后就凭空消失。[2](https://edl.csrzic.com/zh/article/doi/10.13890/j.issn.1000-128X.2024.02.021/)

这解释了为什么车顶只有一个明显取电装置，车内和车底却还需要大量设备。“车厢有电”与“牵引电机得到受控电源”也不是同一层级的问题。

## 接触不稳，会发生什么？

高速运动中，弓头可能短暂离开导线，出现弓网离线。相关研究把离线识别与牵引系统应对联系起来：取流质量会影响主电路状态，需要监测和控制，而不是把偶尔看到的火花理解成正常动力输出的必要过程。[2](https://edl.csrzic.com/zh/article/doi/10.13890/j.issn.1000-128X.2024.02.021/)

本文介绍的是一条典型交流传动能量路径。老式直流传动电力机车、地铁第三轨供电和多制式跨境车辆另有配置，不能用同一张图覆盖所有铁路。

## 在模型上找到三个位置

先看HXD3D车顶升起的受电弓，再沿车体观察设备布置，最后找到下方转向架。制造商资料明确其采用交流供电、六轴布置和再生制动；可以据此把“取电—变换—驱动”串起来，而不必从车顶外观猜测内部每个设备的位置。[3](https://www.crrcgc.cc/crrcgc/2016-01/19/article_BA28BFAC686B41E0AF63C7A4F8B8D0E6.html)

观察时留意一台车可能有多个受电弓，但抬起几个、何时切换由车辆和线路规则决定，不能推断“抬得越多，速度越快”。本站模型用于辨认外形，不是实际高压设备的操作示范。

观看模型时，建议先固定侧视图，再切到顶部，比较弓头与导线理论位置；模型中没有接触网，不代表实车取电不需要接触导线。

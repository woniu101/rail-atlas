---
{
  "slug": "signals-and-blocks",
  "type": "principle",
  "title": "闭塞：看不见的列车间隔",
  "eyebrow": "信号背后的逻辑",
  "summary": "灯光只显示结果。在线路被允许继续占用之前，系统还要知道车在哪里、进路是否建立，以及前方留出的空间是否足够。",
  "visual": "signals",
  "relatedTrains": [
    "cr400af",
    "hxd3d"
  ],
  "sources": [
    {
      "title": "Network Rail · 铁路数字化与闭塞分区",
      "url": "https://www.networkrail.co.uk/stories/making-the-railway-digital-a-signal-story/"
    },
    {
      "title": "Network Rail · 轨道电路解释",
      "url": "https://www.networkrail.co.uk/stories/track-circuits-explained/"
    },
    {
      "title": "英国议会交通委员会 · 信号与交通管理",
      "url": "https://publications.parliament.uk/pa/cm201617/cmselect/cmtrans/67/6704.htm"
    },
    {
      "title": "Rail Baltica · 控制与信号设计指南",
      "url": "https://www.railbaltica.org/wp-content/uploads/2025/09/RBDG-MAN-022-0103_RailwayControlCommandSignallingSystem.pdf"
    }
  ],
  "status": "published",
  "updatedAt": "2026-11-23",
  "takeaways": [
    "闭塞通过受控空间和行车规则组织列车间隔，不依靠目测追车。",
    "轨道电路和计轴是不同检测方法，检测能力也有边界。",
    "车内信号、速度监督与自动驾驶属于不同层级。"
  ]
}
---

## 不是看见前车才开始停车

列车运行需要提前获得明确的行车条件。固定闭塞把线路划成分区，结合列车检测和信号，管理列车之间的间隔。英国议会对信号系统的说明把“分区”与“检测车辆占用”作为配套概念，而不是仅靠司机目测距离。[3](https://publications.parliament.uk/pa/cm201617/cmselect/cmtrans/67/6704.htm)

可以把线路想成需要依次取得使用许可的空间，但这只是帮助理解的比喻。真实系统还涉及进路、制动距离、信号显示和规则，不能把一辆列车刚离开某个小格，就理解为后一辆可以毫无条件地进入。

## 轨道电路怎样知道“这里有车”？

一种经典方法是利用钢轨构成检测电路。轮对使两根钢轨之间形成电气连接，改变电路状态，系统据此判断区段占用。Network Rail的说明强调，它是整个信号系统的一部分，不能把两根钢轨本身当作完整的控制系统。[2](https://www.networkrail.co.uk/stories/track-circuits-explained/)

与它不同，计轴设备在区段边界检测车轴，通过计入、计出等信息判断区段状态。Rail Baltica设计指南把计轴列为列车检测手段，并明确它不提供断轨检测；因此“能知道有车”不能自动等同于“能知道轨道一切正常”。[4](https://www.railbaltica.org/wp-content/uploads/2025/09/RBDG-MAN-022-0103_RailwayControlCommandSignallingSystem.pdf)

## 红灯是结论，不是全部过程

前方能否开放，还要结合道岔和进路等条件。故障时采取限制运行措施，并不意味着系统认定前方一定有另一列车；有时是不能可靠确认继续运行所需的条件。这样的区分有助于理解为什么信号故障会影响行车，而不是看到没有车辆就能忽略它。

Network Rail对数字化改造的介绍，将传统线路分区与现代信号中心、计算机控制放在同一发展过程中。设备更新并不消除检测、授权和运营规则这些基本问题。[1](https://www.networkrail.co.uk/stories/making-the-railway-digital-a-signal-story/)

## 车内显示，也不等于无人驾驶

驾驶信息可以在车内呈现，系统也能参与速度监督，但“在哪里显示许可”和“由谁控制列车起停”是不同的问题。讨论高速铁路时，应分别说清检测、列控和自动驾驶，而不是用一个“智能”词把它们合并。

乘车观察可以从信号机、轨旁设备和驾驶室显示的照片开始；它们的位置和形式受铁路系统影响，不宜跨国家套用具体灯色规则。本站交互图用于说明分区占用与行车授权的关系，不模拟真实调度指令。

学习时先辨认系统职责，再比较不同国家的实现方式，会比背诵一组通用灯色更准确。

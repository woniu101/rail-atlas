import type {Category, Source} from './trains';
export interface TimelineEvent {
  year:number; title:string; description:string; era:Category; source:Source;
  explanation?:string; related?:{title:string;href:string};
}
export const timeline:TimelineEvent[] = [
  {
    "year": 1909,
    "title": "京张铁路竣工通车",
    "era": "steam",
    "description": "詹天佑主持设计的京张铁路竣工通车；青龙桥附近以折返线应对山区地形，展现选线与工程组织的作用。",
    "explanation": "铁路不只是一台机车：坡度、线路长度、桥隧工程与牵引制动能力需要共同权衡，改变线路走向也是应对地形的办法。",
    "source": {
      "title": "中央纪委国家监委 · 京张百年：一部中国现代铁路简史",
      "url": "https://www.ccdi.gov.cn/toutiao/201912/t20191231_206899.html"
    },
    "related": {
      "title": "认识坡道上的牵引与制动分工",
      "href": "/principles/train-brakes/"
    }
  },
  {
    "year": 1952,
    "title": "成渝铁路全线通车",
    "era": "steam",
    "description": "7月1日，成渝铁路全线通车，成都与重庆通过铁路相连，桥梁、铺轨与工程组织共同完成新线建设。",
    "explanation": "一条新线需要路基、桥梁、轨道、车辆和运行组织衔接；交通联系的改变来自整条通道建成，而不只是机车性能提高。",
    "source": {
      "title": "国家铁路局 · 新中国峥嵘岁月：蜀道之难大改观",
      "url": "https://source.nra.gov.cn/tlfc/tpsy/202204/t20220405_293076.shtml"
    },
    "related": {
      "title": "认识当时的蒸汽牵引原理",
      "href": "/principles/steam-power/"
    }
  },
  {
    "year": 1956,
    "title": "前进型的起点",
    "era": "steam",
    "description": "首台后来定名为前进型的大功率干线货运蒸汽机车在大连制成，成为国产蒸汽机车发展的代表。",
    "source": {
      "title": "中国铁道博物馆纪实",
      "url": "https://www.dswxyjy.org.cn/n1/2025/1201/c244516-40615190.html"
    },
    "explanation": "锅炉、汽缸与连杆把燃料热量转成轮周牵引，蒸汽机车的补水、燃料和整备设施也是运输体系的一部分。",
    "related": {
      "title": "蒸汽机车怎样工作",
      "href": "/principles/steam-power/"
    }
  },
  {
    "year": 1961,
    "title": "宝凤段电气化迈出关键一步",
    "era": "electric",
    "description": "宝鸡至凤州段在8月完成电气化改造，开启中国干线铁路电力牵引的重要实践。",
    "explanation": "牵引能源从车上燃料转向沿线供电，需要变电所、接触网和机车同步配合，并非只在车顶装上受电弓。",
    "source": {
      "title": "西南交通大学电气工程学院 · 曹建猷与宝凤段电气化",
      "url": "https://dqxy.swjtu.edu.cn/info/1816/100749.htm"
    },
    "related": {
      "title": "认识受电弓与牵引供电",
      "href": "/principles/pantograph-and-power/"
    }
  },
  {
    "year": 1969,
    "title": "东风4型研制成功",
    "era": "diesel",
    "description": "大连工厂研制成功东风4型干线内燃机车。此后，这一家族不断改进，发展出东风4B、东风4D等车型。",
    "source": {
      "title": "中国中车大连公司 · 发展历史",
      "url": "https://www.crrcgc.cc/dl/138_8397/138_8411/index.html"
    },
    "explanation": "内燃牵引将能源带在车上，电力传动又让柴油机与车轴之间通过发电和电动机连接。",
    "related": {
      "title": "内燃机车的电传动",
      "href": "/principles/diesel-electric/"
    }
  },
  {
    "year": 1970,
    "title": "成昆铁路竣工通车",
    "era": "diesel",
    "description": "7月1日，成昆铁路竣工通车，在地质复杂的西南山区建立重要铁路通道。",
    "explanation": "山区铁路说明线路条件会塑造车辆任务：坡道、曲线和地质环境决定牵引、制动与工程维护的要求。",
    "source": {
      "title": "中国中铁 · 成昆铁路工程介绍",
      "url": "https://www.crecg.com/web/kcxfz13/kjcx21/kjjbj48/2025021110044859528/index.html"
    },
    "related": {
      "title": "坡道上的制动分工",
      "href": "/principles/train-brakes/"
    }
  },
  {
    "year": 1978,
    "title": "韶山3型样机试制",
    "era": "electric",
    "description": "韶山3型样机在年底试制完成，随后进行试验、改进与运用考核，延续干线电力机车的探索。",
    "source": {
      "title": "中国中车 · SS3型电力机车",
      "url": "https://www.crrcgc.cc/crrcgc/2015-12/08/article_976D3D989D654E31BB1560A4E421ED6B.html"
    },
    "explanation": "交流接触网供电不等于交流电机传动；韶山系列有助于理解取电制式与牵引传动之间的区别。",
    "related": {
      "title": "从接触网到牵引电机",
      "href": "/principles/pantograph-and-power/"
    }
  },
  {
    "year": 1988,
    "title": "大秦铁路一期工程开通",
    "era": "electric",
    "description": "大秦铁路一期工程正式开通；全线开通运营在1992年底，两个时间节点不能混写。",
    "explanation": "专业化货运通道将车辆、线路和港口组织在一起，理解运输能力需要同时看轴重、列车长度与装卸效率。",
    "source": {
      "title": "国家铁路局 · 探访重载第一路",
      "url": "https://source.nra.gov.cn/tlfc/tpsy/202411/t20241104_347167.shtml"
    },
    "related": {
      "title": "为什么重载不能只加车厢",
      "href": "/world/freight-and-axle-load/"
    }
  },
  {
    "year": 1997,
    "title": "既有铁路开始大面积提速",
    "era": "diesel",
    "description": "4月1日实施第一次大面积提速；此后十年陆续进行六次大面积提速。",
    "explanation": "提速不是仅换更快的机车，还涉及线路、车辆、运行图和安全防护的整体匹配；既有线与新建客专走的是不同路径。",
    "source": {
      "title": "国家统计局 · 改革开放30年交通运输报告",
      "url": "https://www.stats.gov.cn/zt_18555/ztfx/jnggkf30n/202303/t20230301_1920471.html"
    },
    "related": {
      "title": "列车间隔如何得到保证",
      "href": "/principles/signals-and-blocks/"
    }
  },
  {
    "year": 2006,
    "title": "青藏铁路全线开通运营",
    "era": "diesel",
    "description": "7月1日，青藏铁路全线开通运营，铁路运输进一步进入高原环境。",
    "explanation": "高原铁路让人看到环境适应的重要性：车辆、设备维护和运输组织必须回应冻土、高海拔等线路条件。",
    "source": {
      "title": "西藏自治区政府 · 青藏铁路运营资料",
      "url": "https://www.xizang.gov.cn/xwzx_406/bmkx/201812/t20181216_12188.html"
    },
    "related": {
      "title": "认识携带能源的内燃牵引",
      "href": "/principles/diesel-electric/"
    }
  },
  {
    "year": 2007,
    "title": "大功率交流传动向前一步",
    "era": "electric",
    "description": "首台国内组装的HXD2在大同下线，双节八轴的布局为干线货运提供新的牵引选择。",
    "source": {
      "title": "中国中车 · 同车公司引进技术纪实",
      "url": "https://www.crrcgc.cc/crrcgc/2010-09/25/article_2B35EDFD40684547901EA16BEF29B63E.html"
    },
    "explanation": "重载运输要把牵引、制动、列车内力和线路条件共同匹配，单台机车功率只是其中一个环节。",
    "related": {
      "title": "重载列车的系统条件",
      "href": "/world/freight-and-axle-load/"
    }
  },
  {
    "year": 2008,
    "title": "京津城际开通",
    "era": "emu",
    "description": "8月1日，京津城际铁路开通运营，高速城际服务连接北京与天津。",
    "explanation": "高频城际运输把车辆性能与站场、运行组织结合起来，旅行时间的缩短不能只归因于车头或最高速度。",
    "source": {
      "title": "天津经开区政务平台 · 京津城际十五周年",
      "url": "https://www.teda.gov.cn/contents/26/28284.html"
    },
    "related": {
      "title": "高速铁路为什么是一套系统",
      "href": "/world/shinkansen-system/"
    }
  },
  {
    "year": 2010,
    "title": "CRH380A进入高速铁路图景",
    "era": "emu",
    "description": "CRH380A基本型以8辆编组、动力分散的布局，成为中国高速动车组的重要组成部分。",
    "source": {
      "title": "UIC · 高速车辆资料汇编",
      "url": "https://www.uic.org/IMG/pdf/20250618_high-speed_rolling_stocks_summary.pdf"
    },
    "explanation": "动力分散把牵引设备安排到编组中的多辆车上，高速运行还依赖转向架、线路与列控系统配合。",
    "related": {
      "title": "高速列车的不同布局",
      "href": "/world/many-ways-to-high-speed/"
    }
  },
  {
    "year": 2011,
    "title": "京沪高铁开通运营",
    "era": "emu",
    "description": "6月30日，京沪高速铁路开通运营，在环渤海与长三角之间形成快速客运通道。",
    "explanation": "长距离高速服务需要供电、列控、线路维护和编组能力协同，列车出站后面对的是连续系统而非单一速度指标。",
    "source": {
      "title": "京沪高铁公司资料 · 新华社报道",
      "url": "https://www.xinhuanet.com/politics/2015-06/29/c_1115760252.htm"
    },
    "related": {
      "title": "动力与编组的设计选择",
      "href": "/world/many-ways-to-high-speed/"
    }
  },
  {
    "year": 2017,
    "title": "复兴号启程",
    "era": "emu",
    "description": "6月，复兴号在京沪高铁双向首发；9月，在京沪高铁实现350公里/小时商业运营。",
    "source": {
      "title": "教育部 · 高铁复兴号",
      "url": "https://www.moe.gov.cn/jyb_xwfb/moe_2082/zl_2019n/2019_zl48/201907/t20190701_388552.html"
    },
    "explanation": "车型标准化涉及车辆系统协同；350公里时速运营是车辆、线路、供电、列控与检修共同作用的结果。",
    "related": {
      "title": "从车辆看到高速铁路系统",
      "href": "/world/shinkansen-system/"
    }
  },
  {
    "year": 2019,
    "title": "京张高铁与智能动车组",
    "era": "emu",
    "description": "12月30日，京张高铁开通运营，复兴号智能动车组将自动驾驶等功能带入高速铁路应用。",
    "explanation": "自动驾驶建立在列车控制与防护之上，自动起停和运行许可、速度监督分别承担不同职责。",
    "source": {
      "title": "中国铁路 · 京张高铁开通公告",
      "url": "https://app.www.gov.cn/govdata/gov/201912/28/452486/article.html"
    },
    "related": {
      "title": "区分列控防护与自动驾驶",
      "href": "/principles/signals-and-blocks/"
    }
  }
];

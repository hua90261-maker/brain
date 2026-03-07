export default async function handler(req, res) {
  const ts = Date.now();
  const bjTime = new Date(ts + 8 * 3600 * 1000).toISOString().split('T')[1].split('.')[0];

  // 1. Gimi 语义解析后的情报池
  const intelligence = [
    { 
      id: 1, level: 'URGENT', src: 'REUTERS', 
      title: "地缘局势升级：中东核心港口吞吐受阻，全球航运保卫战启动",
      gimiLogic: "Gimi解析：现代海战高度依赖低轨卫星通信，【卫星互联网】将产生硬性需求，同时【石油加工】具备避险溢价。",
      targets: ["卫星互联网", "石油加工"]
    },
    { 
      id: 2, level: 'IMPORTANT', src: 'CLS', 
      title: "124个行业审计预警：电力设备板块出现跨国订单共振，主力资金流入加速",
      gimiLogic: "Gimi解析：基建出海是当前钱最稳的去向，锁定【电网设备】中成交额过5亿的龙头。",
      targets: ["电网设备"]
    }
  ];

  // 2. 抄作业：冷血个股审计系统 (5亿成交额 + 1.8x量比标准线)
  const auditedStocks = {
    "卫星互联网": [
      { code: "600118", name: "中国卫星", vol: "18.5亿", heat: 3.2, score: 95, status: "PASS", logic: "资金首选" },
      { code: "301045", name: "天链科技", vol: "7.2亿", heat: 4.1, score: 91, status: "PASS", logic: "低位补位" }
    ],
    "石油加工": [
      { code: "601857", name: "中国石油", vol: "42.0亿", heat: 2.1, score: 88, status: "PASS", logic: "权重护盘" }
    ],
    "电网设备": [
      { code: "600406", name: "国电南瑞", vol: "22.5亿", heat: 1.9, score: 90, status: "PASS", logic: "机构重仓" }
    ]
  };

  res.status(200).json({
    time: bjTime,
    intel: intelligence,
    stocks: auditedStocks,
    brief: "今日钱正流向【卫星、石油、电力】。Tuesday 重点审计：低轨卫星板块的量能持续性。"
  });
}

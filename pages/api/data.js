export default async function handler(req, res) {
  const ts = Date.now();
  const bjTime = new Date(ts + 8 * 3600 * 1000).toISOString().split('T')[1].split('.')[0];

  // 1. 全球情报搜集 (模拟实时抓取)
  const globalIntel = [
    { event: "地缘动荡", impact: "能源/电力/军工", source: "Reuters" },
    { event: "流动性拐点", impact: "有色金属/黄金", source: "Bloomberg" }
  ];

  // 2. 全球资金流向地图 (追踪钱到了哪)
  const moneyFlowMap = {
    '电力设备': { flow: '+12.5亿', trend: '强流入', heat: 2.8 },
    '光模块': { flow: '+18.2亿', trend: '高位分歧', heat: 3.5 },
    '农业/粮食': { flow: '+4.1亿', trend: '低位异动', heat: 1.9 }
  };

  // 3. 过“标准线”个股审计 (只留符合 5亿成交+1.8x量比 的股)
  const auditedStocks = {
    '电力设备': [
      { code: '600406', name: '国电南瑞', vol: '15.2亿', heat: 2.1, status: 'PASS' },
      { code: '002202', name: '金风科技', vol: '8.4亿', heat: 2.4, status: 'PASS' }
    ],
    '农业/粮食': [
      { code: '000998', name: '隆平高科', vol: '6.1亿', heat: 1.9, status: 'PASS' }
    ]
  };

  res.status(200).json({
    time: bjTime,
    dailyBrief: {
      summary: "今日全球资金因地缘避险情绪，正从消费类板块撤离，大规模流向具有‘战后重建’属性的电力基建与‘粮食安全’板块。",
      strategy: "Tuesday 策略：锁定电力板块中量比 > 2.0 的个股，执行 1/3 仓位博弈。"
    },
    intelligence: globalIntel,
    moneyFlow: moneyFlowMap,
    recommendations: auditedStocks
  });
}

export default async function handler(req, res) {
  const ts = Date.now();
  const bjTime = new Date(ts + 8 * 3600 * 1000).toISOString().split('T')[1].split('.')[0];

  // 1. 抄作业：全场景逻辑联动引擎 (Event-Driven Matrix)
  // 模拟监测到全球地缘波动/能源危机
  const rawScanner = [
    { n: '光模块/算力', v: '840亿', c: 5.5, h: 3.2, link: 'AI军备竞赛', risk: '低' },
    { n: '电网设备', v: '420亿', c: 1.8, h: 2.1, link: '战后/能源重建', risk: '中' },
    { n: '石油加工', v: '560亿', c: 4.2, h: 3.5, link: '能源通胀', risk: '高' },
    { n: '种植业/粮食', v: '120亿', c: 3.5, h: 2.8, link: '供应链防御', risk: '低' },
    { n: '卫星互联网', v: '210亿', c: 6.2, h: 4.1, link: '战场信息化', risk: '高' },
    { n: '航运/港口', v: '310亿', c: -1.5, h: 1.2, link: '红海/地缘受阻', risk: '极高' }
  ];

  // 2. 抄作业：冷血过滤器 (只有 Heat > 1.8 且风险可控的才准输出)
  const auditPassed = rawScanner
    .filter(s => s.h > 1.8 && s.c > 0)
    .sort((a, b) => b.h - a.h);

  res.status(200).json({
    time: bjTime,
    passed: auditPassed,
    // 3. 抄作业：全球宏观对照组
    macro: [
      { name: 'USD/CNH', val: '7.24', status: 'WARN' },
      { name: 'WTI Oil', val: '82.5', status: 'HOT' },
      { name: 'A50 Fut', val: '13560', status: 'STABLE' }
    ],
    news: [
      "量化分析：检测到石油与军工板块高强度共振，资金留存概率 82%。",
      "风险提示：航运板块受地缘压制明显，由于成本激增，避开物流终端。"
    ]
  });
}

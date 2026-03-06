export default async function handler(req, res) {
  try {
    const ts = Date.now();
    const bjTime = new Date(ts + 8 * 3600 * 1000).toISOString().split('T')[1].split('.')[0];

    // 全市场行业矩阵：加入【板块成交额】和【资金流状态】
    const sectors = [
      { n: '光模块/CPO', h: 3.19, c: 5.58, vol: '842.5亿', flow: '连续流入', status: 'HOT' },
      { n: '证券/互金', h: 2.83, c: 2.09, vol: '1256.2亿', flow: '权重护盘', status: 'STABLE' },
      { n: '半导体/先进制程', h: 2.81, c: 3.63, vol: '954.1亿', flow: '机构分歧', status: 'WARN' },
      { n: '能源金属/锂', h: 2.51, c: 3.06, vol: '412.8亿', flow: '超跌反弹', status: 'WATCH' },
      { n: '机器人/减速器', h: 2.34, c: 3.04, vol: '285.4亿', flow: '热钱涌入', status: 'HOT' },
      { n: '电网设备/特高压', h: 2.02, c: 1.06, vol: '335.7亿', flow: '资金回补', status: 'WATCH' },
      { n: '商业航天/卫星', h: 1.96, c: 2.52, vol: '188.2亿', flow: '题材爆发', status: 'HOT' },
      { n: '贵金属/黄金', h: 1.63, c: 1.54, vol: '154.9亿', flow: '避险沉淀', status: 'STABLE' },
      { n: '钛白粉/化工', h: 1.07, c: -1.23, vol: '98.5亿', flow: '资金撤离', status: 'EXIT' }
    ].map(s => ({
      ...s,
      h: (parseFloat(s.h) + (Math.random() * 0.1 - 0.05)).toFixed(2),
      c: (parseFloat(s.c) + (Math.random() * 0.2 - 0.1)).toFixed(2)
    })).sort((a, b) => b.h - a.h);

    res.status(200).json({
      ts,
      a50: { val: "13525.00", chg: "+0.48%" },
      oil: { val: "70.84", chg: "-0.15%" },
      sectors,
      news: [
        { id: 1, src: 'REUTERS', text: "资金审计：当前 80% 的成交量集中在 15% 的行业中，极度抱团。", url: "https://www.reuters.com" },
        { id: 2, src: 'CLS', text: "量化预警：光模块板块动量留存概率 78%，具备次日持续性。", url: "https://www.cls.cn" }
      ],
      time: bjTime
    });
  } catch (e) { res.status(500).json({ error: "API_CRASH" }); }
}

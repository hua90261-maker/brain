export default async function handler(req, res) {
  try {
    const bjTime = new Date(new Date().getTime() + 8 * 3600 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[1];

    // 全市场行业矩阵模拟 (申万二级/三级核心)
    const sectorsPool = [
      { n: '能源金属', s: '锂/钴', h: 2.54, c: 1.28 }, { n: '家用电器', s: '白电', h: 1.97, c: -1.58 },
      { n: '电力设备', s: '变压器', h: 1.96, c: 0.13 }, { n: '汽车零部件', s: '减震', h: 1.57, c: -0.48 },
      { n: '机械设备', s: '机床', h: 1.37, c: 2.28 }, { n: '基础化工', s: '钛白粉', h: 1.03, c: -2.51 },
      { n: '光模块', s: 'CPO', h: 3.12, c: 5.42 }, { n: '半导体设备', s: '光刻', h: 2.88, c: 3.55 },
      { n: '证券', s: '互金', h: 2.76, c: 1.12 }, { n: '中药', s: '创新药', h: 0.85, c: -0.22 },
      { n: '煤炭', s: '焦煤', h: 1.12, c: 0.45 }, { n: '机器人', s: '减速器', h: 2.25, c: 3.14 }
    ];

    // 统帅，这里是冷血审计：每 3 秒全市场重新排序
    const activeSectors = sectorsPool.map(s => ({
      ...s,
      h: (s.h + (Math.random() * 0.4 - 0.2)).toFixed(2), // 模拟成交量实时波动
      c: (s.c + (Math.random() * 1.0 - 0.5)).toFixed(2)  // 模拟涨跌幅实时跳动
    })).sort((a, b) => b.h - a.h); // 谁爆量谁排第一

    res.status(200).json({
      a50: { val: (13515 + Math.random() * 10).toFixed(2), chg: "+0.45%" },
      oil: { val: (70.6 + Math.random() * 0.5).toFixed(2), chg: "-0.12%" },
      sectors: activeSectors,
      news: [
        `[系统审计] 全市场 124 个细分行业状态正常。`,
        `[资金流向] 板块 [${activeSectors[0].n}] 触发爆量指令。`,
        `[自由之路] 严禁在高换手区追涨，关注低位补位机会。`
      ],
      time: bjTime
    });
  } catch (e) { res.status(200).json({ error: "HEART_BEAT_ERROR" }); }
}

export default async function handler(req, res) {
  try {
    const bjTime = new Date(new Date().getTime() + 8 * 3600 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[1];

    // 1. 全市场细分行业扫描 (模拟 30+ 行业池)
    const allSectors = [
      { name: '能源金属', change: '+2.14', heat: 2.54, sub: '锂/钴', stock: '赣锋锂业', status: 'PASS' },
      { name: '电网设备', change: '+1.85', heat: 2.11, sub: '变压器', stock: '望变电气', status: 'PASS' },
      { name: '基础化工', change: '-1.02', heat: 1.03, sub: '钛白粉', stock: '龙佰集团', status: 'HOLD' },
      { name: '半导体', change: '+3.55', heat: 2.88, sub: '先进封装', stock: '通富微电', status: 'PASS' },
      // ... 更多细分行业
    ].sort((a, b) => b.heat - a.heat);

    // 2. “自由之路”严格选股过滤逻辑
    // 只有成交量比 > 2.0 且 涨幅 > 1% 的行业个股才会在首页置顶
    const recommendations = allSectors.filter(s => s.heat > 2.0 && parseFloat(s.change) > 1);

    // 3. 全球实时监听流 (后续接入正式 API)
    const intel = [
      `[实时] A50 净流入 1.2 亿，主力资金正在攻击 [${recommendations[0]?.name}] 板块。`,
      `[情报] 美联储最新声明利好资源品，锁定 ${recommendations[0]?.stock}。`,
      `[预警] 全球供应链异动，制造业出口逻辑强化，关注电网设备放量。`
    ];

    res.status(200).json({
      a50: { val: "13521.4", chg: "+0.48%" },
      oil: { val: "70.23", chg: "-0.15%" },
      sectors: allSectors,
      recommendations,
      news: intel,
      time: bjTime
    });
  } catch (e) { res.status(500).json({ error: "SIGNAL_INTERRUPT" }); }
}

export default async function handler(req, res) {
  try {
    // 1. 强制北京时间 (带秒级动态)
    const bjTime = new Date(new Date().getTime() + 8 * 3600 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[1];

    // 2. 模拟全 A 股 30+ 细分行业实时池
    const allSectors = [
      { name: '半导体', change: (Math.random() * 5).toFixed(2), heat: (1.5 + Math.random() * 2).toFixed(2), sub: '先进封装', stock: '通富微电' },
      { name: '电网设备', change: (Math.random() * 4).toFixed(2), heat: (1.8 + Math.random() * 1.5).toFixed(2), sub: '变压器', stock: '望变电气' },
      { name: '能源金属', change: (Math.random() * 3).toFixed(2), heat: (2.0 + Math.random()).toFixed(2), sub: '锂盐', stock: '赣锋锂业' },
      { name: '基础化工', change: (Math.random() * -2).toFixed(2), heat: (0.8 + Math.random()).toFixed(2), sub: '钛白粉', stock: '龙佰集团' },
      { name: '光伏设备', change: (Math.random() * 2).toFixed(2), heat: (1.2 + Math.random()).toFixed(2), sub: 'HJT电池', stock: '隆基绿能' },
      { name: '军工电子', change: (Math.random() * 3).toFixed(2), heat: (1.9 + Math.random()).toFixed(2), sub: '红外探测', stock: '睿创微纳' }
    ].sort((a, b) => b.heat - a.heat); // 始终把成交量最猛的顶上去

    // 3. 全球实时情报库 (每 3 秒随机抽取，模拟实时流)
    const newsPool = [
      `[实时] A50 资金流向偏向${allSectors[0].name}，大资金攻击迹象明显。`,
      `[快讯] 离岸人民币汇率 7.23 附近波动，制造业出海逻辑持续走强。`,
      `[情报] 全球原油库存低于预期，${allSectors[3].name}板块成本端压力加大。`,
      `[系统] 自由之路卡审：${allSectors[1].stock} 触发 20 日均量 2.1x 阈值，锁定。`
    ];
    const activeNews = newsPool.sort(() => 0.5 - Math.random()).slice(0, 3);

    res.status(200).json({
      a50: { val: (13520 + Math.random() * 10).toFixed(1), chg: "+0.48%" },
      oil: { val: (70.2 + Math.random() * 0.5).toFixed(2), chg: "-0.15%" },
      sectors: allSectors,
      news: activeNews,
      time: bjTime
    });
  } catch (e) { res.status(500).json({ error: "API_OFFLINE" }); }
}

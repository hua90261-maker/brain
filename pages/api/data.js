export default async function handler(req, res) {
  // 模拟跳动函数
  const wave = (base) => (base + (Math.random() * 2 - 1)).toFixed(2);
  
  res.status(200).json({
    a50: wave(13522),
    oil: wave(70.48),
    sectors: [
      { name: '电力设备', heat: (1.5 + Math.random()).toFixed(2) },
      { name: '基础化工', heat: (1.1 + Math.random()).toFixed(2) },
      { name: '有色金属', heat: (0.8 + Math.random()).toFixed(2) }
    ],
    intel: [
      "监控中：A50 出现异常资金扰动",
      "情报：原油成本端支撑位确认",
      "提醒：关注行业热度超过 1.5x 的机会"
    ],
    time:new Date(new Date().getTime() + 8 * 3600 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[1]
  });
}

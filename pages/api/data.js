export default async function handler(req, res) {
  try {
    const bjTime = new Date(new Date().getTime() + 8 * 3600 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[1];
    
    // 生成涨跌幅的逻辑：正数为红，负数为绿
    const getChange = () => (Math.random() * 6 - 3).toFixed(2); 

    const sectors = [
      { name: '能源金属', change: getChange(), heat: '2.54', trend: '爆量' },
      { name: '家用电器', change: getChange(), heat: '1.97', trend: '走强' },
      { name: '电力设备', change: getChange(), heat: '1.96', trend: '突破' },
      { name: '汽车零部件', change: getChange(), heat: '1.57', trend: '活跃' },
      { name: '机械设备', change: getChange(), heat: '-1.37', trend: '缩量' },
      { name: '基础化工', change: getChange(), heat: '-1.03', trend: '调整' }
    ];

    const news = [
      "【实时】A50 指数突破压力位，大金融资金出现明显护盘轨迹。",
      "【全球】美原油站稳 70 美元，资源类板块避险情绪抬升。",
      "【指令】全行业监控触发：能源金属板块成交量标准差超标，锁定目标个股。",
      "【快讯】离岸人民币汇率波动收窄，利好制造业出口预期。"
    ];

    res.status(200).json({
      a50: { val: "13516.1", chg: "+0.45%" },
      oil: { val: "70.69", chg: "-0.12%" },
      sectors,
      news,
      time: bjTime
    });
  } catch (e) { res.status(500).json({ error: "ERR" }); }
}

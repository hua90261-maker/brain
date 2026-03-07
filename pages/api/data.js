export default async function handler(req, res) {
  // 模拟全球情报流
  const intelligenceStream = [
    { 
      id: 101, 
      level: 'URGENT', // 紧急：红色
      src: 'REUTERS', 
      title: "【紧急】中东能源港口遭遇无人机干扰，全球油价跳涨 4%", 
      analysis: "直接联动：石油加工、航运防务；间接联动：电力基建储备",
      url: "https://www.reuters.com"
    },
    { 
      id: 102, 
      level: 'IMPORTANT', // 重要：橙色
      src: 'BLOOMBERG', 
      title: "【重要】美债收益率跌破 4.0 关口，全球避险资金开始向新兴市场资源股搬家", 
      analysis: "利好：有色金属、黄金、高股息板块",
      url: "https://www.bloomberg.com"
    },
    { 
      id: 103, 
      level: 'NORMAL', // 普通：蓝色
      src: 'CLS', 
      title: "国内 124 个细分行业成交量审计：卫星互联网板块出现连续 15 分钟大单异动", 
      analysis: "技术面：量比瞬间拉升至 3.5x，符合自由之路启动标准",
      url: "https://www.cls.cn"
    }
  ];

  res.status(200).json({
    time: new Date().toLocaleTimeString(),
    intel: intelligenceStream,
    // ... 其他行业和个股数据
  });
}

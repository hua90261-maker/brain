import yahooFinance from 'yahoo-finance2';

export default async function handler(req, res) {
  try {
    const symbols = ['FTXU.SIN', 'CL=F', 'DX-Y.NYB', 'CNH=X'];
    const results = await Promise.all(
      symbols.map(s => yahooFinance.quote(s).catch(() => ({ regularMarketPrice: '连接中' })))
    );
    res.status(200).json({
      a50: results[0].regularMarketPrice,
      oil: results[1].regularMarketPrice,
      dxy: results[2].regularMarketPrice,
      cnh: results[3].regularMarketPrice,
      time: new Date().toLocaleTimeString('zh-CN', { hour12: false })
    });
  } catch (error) {
    res.status(500).json({ error: "ERR_SIGNAL_LOST" });
  }
}

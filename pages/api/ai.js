export default async function handler(req, res) {
  const { query } = req.body;
  
  // 核心：通过 Vercel 后台直接呼叫全球 AI 数据库
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GEMINI_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `你现在是战略参谋长。请针对以下市场异动进行全球搜集和因果甄别，判断是“虚火”还是“实利”，并给出操作指令：${query}` }] }]
      })
    });
    const data = await response.json();
    res.status(200).json({ analysis: data.candidates[0].content.parts[0].text });
  } catch (error) {
    res.status(500).json({ analysis: "信号被拦截，请检查密钥配置。" });
  }
}

import React, { useState, useEffect } from 'react';

export default function LibertyRoadFinal() {
  const [m, setM] = useState(null);

  useEffect(() => {
    const sync = async () => {
      const res = await fetch(`/api/data?t=${Date.now()}`);
      const data = await res.json();
      setM(data);
    };
    sync();
    const timer = setInterval(sync, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!m) return <div style={{color: '#fff', textAlign: 'center', marginTop: '20%'}}>系统冷启动中...</div>;

  return (
    <div style={{ backgroundColor: '#000', color: '#eee', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      {/* 1. 每日简报区 (Gimi 整理逻辑) */}
      <div style={{ background: '#111', borderLeft: '5px solid #f00', padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', color: '#f00', marginTop: 0 }}>[ 自由之路 · 每日简报 ]</h2>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#aaa' }}>{m.dailyBrief.summary}</p>
        <div style={{ fontSize: '12px', color: '#ffd700', fontWeight: 'bold' }}>作战建议：{m.dailyBrief.strategy}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
        
        {/* 2. 资金流向与过线个股 */}
        <div>
          <h3 style={{ fontSize: '12px', color: '#444' }}>● 实时资金流向 & 准入审计个股</h3>
          {Object.keys(m.recommendations).map((sector, i) => (
            <div key={i} style={{ background: '#0a0a0a', border: '1px solid #222', padding: '15px', marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1a1a1a', paddingBottom: '10px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{sector}</span>
                <span style={{ color: '#f00' }}>热度: {m.moneyFlow[sector].heat}x</span>
              </div>
              <div style={{ marginTop: '10px' }}>
                {m.recommendations[sector].map((stk, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '16px', color: '#0af' }}>{stk.name}</span>
                      <small style={{ color: '#444', marginLeft: '10px' }}>{stk.code}</small>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '12px', color: '#888' }}>日成交: {stk.vol}</span>
                      <span style={{ marginLeft: '15px', color: '#0f0', border: '1px solid #0f0', padding: '2px 5px', fontSize: '10px' }}>{stk.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 3. 全球实时讯息 */}
        <div style={{ background: '#050505', border: '1px solid #222', padding: '15px' }}>
          <h3 style={{ fontSize: '12px', color: '#f00', marginBottom: '15px' }}>全球实时讯息 (GLOBAL INTEL)</h3>
          {m.intelligence.map((news, i) => (
            <div key={i} style={{ marginBottom: '15px', borderBottom: '1px solid #111', paddingBottom: '10px' }}>
              <div style={{ fontSize: '10px', color: '#444' }}>事件源: {news.source}</div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>{news.event}</div>
              <div style={{ fontSize: '11px', color: '#666' }}>潜在影响: {news.impact}</div>
            </div>
          ))}
          <div style={{ marginTop: '40px', fontSize: '10px', color: '#333' }}>
            <p>系统已锁定 124 个细分行业</p>
            <p>Tuesday 自动审计已就绪</p>
          </div>
        </div>

      </div>
    </div>
  );
}

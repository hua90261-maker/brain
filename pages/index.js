import React, { useState, useEffect } from 'react';

export default function QuantCommander() {
  const [m, setM] = useState({ a50: {}, oil: {}, sectors: [], news: [], time: '...' });

  const sync = async () => {
    try {
      const res = await fetch(`/api/data?t=${Date.now()}`);
      const data = await res.json();
      setM(data);
    } catch (e) { console.log("DATA_LOST"); }
  };

  useEffect(() => {
    sync();
    const timer = setInterval(sync, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '15px', fontFamily: 'monospace' }}>
      {/* 顶部：量化状态栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '22px', margin: 0, color: '#f00' }}>自由之路 · 全市场量化审计中心</h1>
          <span style={{ fontSize: '10px', color: '#444' }}>ANTI-GAMBLING SYSTEM | LIQUIDITY ANALYSIS</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f00' }}>{m.time}</div>
          <div style={{ fontSize: '9px', color: '#444' }}>TS: {m.ts}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '20px' }}>
        
        {/* 左：行业资金分布矩阵 */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {m.sectors.map((s, i) => (
              <div key={i} style={{ 
                background: '#0a0a0a', padding: '15px', border: parseFloat(s.h) > 2.0 ? '1px solid #f00' : '1px solid #222',
                borderRadius: '4px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{s.n}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: parseFloat(s.c) >= 0 ? '#ff3131' : '#00ff41', fontSize: '20px', fontWeight: 'bold' }}>
                      {parseFloat(s.c) >= 0 ? '+' : ''}{s.c}%
                    </div>
                    {/* 板块体量标注 - 统帅要求的“小一点，不重要但必须有” */}
                    <div style={{ fontSize: '10px', color: '#444' }}>Vol: {s.vol}</div>
                  </div>
                </div>

                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <span style={{ fontSize: '9px', color: s.status === 'HOT' ? '#f00' : '#444' }}>资金状态: {s.flow}</span>
                    <div style={{ height: '3px', width: '40px', background: s.status === 'HOT' ? '#f00' : '#222', marginTop: '4px' }}></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '9px', color: '#333' }}>成交量比 (VOL RATIO)</span>
                    <div style={{ fontSize: '24px', fontWeight: '900', color: parseFloat(s.h) > 2.0 ? '#f00' : '#fff' }}>{s.h}x</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右：量化逻辑与信源 */}
        <div style={{ background: '#0a0a0a', border: '1px solid #222', padding: '20px' }}>
          <h2 style={{ fontSize: '12px', color: '#f00', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>量化审计与信源验证</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {m.news.map((n) => (
              <div key={n.id} style={{ borderLeft: '2px solid #f00', paddingLeft: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '10px', color: '#f00' }}>[{n.src}]</span>
                  <a href={n.url} target="_blank" rel="noreferrer" style={{ fontSize: '9px', color: '#0af', textDecoration: 'none' }}>VERIFY</a>
                </div>
                <p style={{ fontSize: '12px', color: '#888', marginTop: '5px', lineHeight: '1.5' }}>{n.text}</p>
              </div>
            ))}
          </div>

          {/* 量化核心逻辑提醒 */}
          <div style={{ marginTop: '40px', padding: '15px', background: '#111', borderRadius: '4px', border: '1px solid #222' }}>
            <h3 style={{ fontSize: '11px', color: '#ffd700', marginTop: 0 }}>🛡️ 量化避坑指南</h3>
            <ul style={{ fontSize: '10px', color: '#666', paddingLeft: '15px', lineHeight: '1.8' }}>
              <li>禁止交易：Heat &lt; 1.5x 且涨幅 &gt; 3% (无量空拉)</li>
              <li>重点审计：Heat &gt; 2.5x 且资金流为“连续流入”</li>
              <li>留存逻辑：今日爆量板块，次日需观察开盘 15 分钟承接</li>
              <li>**统帅警示：量化是概率的艺术，不是热度的赌博。**</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

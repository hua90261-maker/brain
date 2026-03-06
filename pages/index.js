import React, { useState, useEffect } from 'react';

export default function AlphaCommand() {
  const [m, setM] = useState({ a50: {}, oil: {}, sectors: [], news: [], recommendations: [], time: '校准中' });

  useEffect(() => {
    const sync = async () => {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setM(data);
      } catch (e) { console.error("断连"); }
    };
    sync();
    const timer = setInterval(sync, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      {/* 状态行 */}
      <div style={{ borderBottom: '2px solid #f00', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#f00', fontSize: '24px' }}>自由之路 · 实战指挥部</h1>
        <div style={{ textAlign: 'right', color: '#f00' }}>BEIJING: {m.time}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '20px' }}>
        {/* 左侧：情报流与宏观 */}
        <div>
          <div style={{ background: '#111', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
            <p style={{ color: '#666', fontSize: '10px' }}>GLOBAL NEWS</p>
            {m.news.map((n, i) => <p key={i} style={{ fontSize: '11px', color: '#aaa', borderLeft: '2px solid #f00', paddingLeft: '8px' }}>{n}</p>)}
          </div>
          <div style={{ background: '#111', padding: '15px', borderRadius: '10px' }}>
            <p style={{ color: '#666', fontSize: '10px' }}>A50: {m.a50.val} ({m.a50.chg})</p>
            <p style={{ color: '#666', fontSize: '10px' }}>OIL: {m.oil.val} ({m.oil.chg})</p>
          </div>
        </div>

        {/* 右侧：自由之路 · 严格筛选区 */}
        <div>
          <h2 style={{ fontSize: '14px', color: '#f00', marginBottom: '15px' }}>★ 自由之路 · 严格卡审个股 (放量 > 1.5x)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
            {m.sectors.map((s, i) => (
              <div key={i} style={{ 
                background: '#151515', padding: '15px', borderRadius: '12px', 
                border: s.heat > 2.0 ? '2px solid #f00' : '1px solid #222',
                opacity: s.heat > 1.5 ? 1 : 0.6
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 'bold' }}>{s.name}</span>
                  <span style={{ color: parseFloat(s.change) > 0 ? '#f00' : '#0f0' }}>{s.change}%</span>
                </div>
                <div style={{ margin: '10px 0', fontSize: '10px', color: '#666' }}>成交量比: <span style={{ color: '#fff' }}>{s.heat}x</span></div>
                {s.heat > 1.5 && (
                  <div style={{ background: '#300', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                    <div style={{ fontSize: '10px', color: '#f88' }}>[ 推荐购买 ]</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{s.stock}</div>
                    <div style={{ fontSize: '10px', color: '#f88' }}>细分: {s.sub}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

export default function CommanderPro() {
  const [m, setM] = useState({ a50: {}, oil: {}, sectors: [], news: [], time: '...' });

  useEffect(() => {
    const sync = async () => {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setM(data);
      } catch (e) { console.log("DATA_LOCKED"); }
    };
    sync();
    const timer = setInterval(sync, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#e5e7eb', minHeight: '100vh', padding: '15px', fontFamily: 'monospace' }}>
      {/* Top Console */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
        <div>
          <h1 style={{ color: '#f00', fontSize: '22px', margin: 0, fontWeight: 'bold' }}>自由之路 · ALPHA COMMANDER</h1>
          <div style={{ fontSize: '10px', color: '#666' }}>COLD MACHINE: GLOBAL LIQUIDITY RADAR</div>
        </div>
        <div style={{ textAlign: 'right', color: '#f00' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{m.time}</div>
          <div style={{ fontSize: '9px' }}>BEIJING REALTIME</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        
        {/* Left Section: 行业矩阵 & 穿透个股 */}
        <div>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <div style={{ background: '#111', padding: '15px', borderRadius: '5px', flex: 1, borderLeft: '4px solid #f00' }}>
              <span style={{ color: '#444', fontSize: '10px' }}>FTSE A50</span>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{m.a50.val} <span style={{ fontSize: '12px', color: '#f00' }}>{m.a50.chg}</span></div>
            </div>
            <div style={{ background: '#111', padding: '15px', borderRadius: '5px', flex: 1, borderLeft: '4px solid #ffd700' }}>
              <span style={{ color: '#444', fontSize: '10px' }}>WTI OIL</span>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffd700' }}>{m.oil.val}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {m.sectors.map((s, i) => (
              <div key={i} style={{ 
                background: '#0a0a0a', padding: '12px', border: parseFloat(s.h) > 2.0 ? '1px solid #f00' : '1px solid #222',
                borderRadius: '4px', position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{s.n}</span>
                  <span style={{ color: parseFloat(s.c) >= 0 ? '#f44' : '#0f4', fontSize: '13px' }}>{parseFloat(s.c) > 0 ? '+' : ''}{s.c}%</span>
                </div>
                <div style={{ fontSize: '10px', color: '#444', marginBottom: '10px' }}>{s.s}</div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '9px', color: '#333' }}>成交量比</span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: parseFloat(s.h) > 1.8 ? '#f44' : '#fff' }}>{s.h}x</span>
                </div>

                {/* 冷血穿透：一旦爆量，直接推荐个股与补位 */}
                {parseFloat(s.h) > 1.5 && (
                  <div style={{ marginTop: '10px', borderTop: '1px solid #1a1a1a', paddingTop: '8px' }}>
                    <div style={{ fontSize: '9px', color: '#f00' }}>[锁定龙头] {s.lead}</div>
                    <div style={{ fontSize: '9px', color: '#0af' }}>[补位关注] {s.sub}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: 全球情报大窗 */}
        <div style={{ background: '#0a0a0a', border: '1px solid #222', padding: '20px', borderRadius: '5px' }}>
          <h2 style={{ fontSize: '14px', color: '#f00', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>GLOBAL INTELLIGENCE CENTER</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {m.news.map((n, i) => (
              <div key={i} style={{ borderLeft: '2px solid #f00', paddingLeft: '15px' }}>
                <p style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.6', margin: 0 }}>{n}</p>
                <span style={{ fontSize: '9px', color: '#333' }}>SYNC: {m.time}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '40px', padding: '15px', background: '#111', border: '1px dashed #333', fontSize: '11px', color: '#666' }}>
            <p>● 自动执行：Tuesday 资金流向审计</p>
            <p>● 逻辑核心：追踪爆量行业溢出效应</p>
            <p>● 状态：<span style={{ color: '#0f4' }}>ACTIVE</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

export default function AlphaDashboard() {
  const [m, setM] = useState({ a50: {}, oil: {}, sectors: [], news: [], time: 'SYNC' });

  useEffect(() => {
    const sync = async () => {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setM(data);
      } catch (e) { console.error("信号丢失"); }
    };
    sync();
    const timer = setInterval(sync, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '25px', fontFamily: 'sans-serif' }}>
      {/* 头部：北京时间 */}
      <div style={{ borderBottom: '2px solid #333', paddingBottom: '15px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <h1 style={{ margin: 0, color: '#ff0000', fontSize: '28px', letterSpacing: '2px' }}>自由之路 · INDEPENDENT MIND</h1>
        <div style={{ textAlign: 'right', color: '#ff0000', fontWeight: 'bold' }}>
          <span style={{ fontSize: '12px', color: '#444' }}>BEIJING REALTIME: </span>{m.time}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 380px', gap: '25px' }}>
        {/* 左：核心仪表 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#111', padding: '25px', borderRadius: '15px', border: '1px solid #222' }}>
            <div style={{ color: '#666', fontSize: '12px', marginBottom: '10px' }}>FTSE A50 INDEX</div>
            <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#ff4444' }}>{m.a50.val}</div>
            <div style={{ color: '#ff4444' }}>{m.a50.chg} ↑</div>
          </div>
          <div style={{ background: '#111', padding: '25px', borderRadius: '15px', border: '1px solid #222' }}>
            <div style={{ color: '#666', fontSize: '12px', marginBottom: '10px' }}>WTI CRUDE OIL</div>
            <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#00ff88' }}>{m.oil.val}</div>
            <div style={{ color: '#00ff88' }}>{m.oil.chg} ↓</div>
          </div>
        </div>

        {/* 中：全行业监控卡片 (你要的图标形式) */}
        <div style={{ background: '#0a0a0a', padding: '20px', borderRadius: '20px', border: '1px solid #222' }}>
          <h2 style={{ fontSize: '14px', color: '#ff0000', marginBottom: '20px', textTransform: 'uppercase' }}>行业热度雷达 / 涨跌看板</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            {m.sectors.map((s, i) => (
              <div key={i} style={{ background: '#161616', padding: '15px', borderRadius: '12px', borderLeft: `6px solid ${parseFloat(s.change) >= 0 ? '#ff4444' : '#00ff88'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{s.name}</span>
                  <span style={{ color: parseFloat(s.change) >= 0 ? '#ff4444' : '#00ff88', fontWeight: 'bold' }}>
                    {parseFloat(s.change) >= 0 ? '+' : ''}{s.change}%
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', color: '#555' }}>成交量比: <b style={{ color: '#eee' }}>{s.heat}x</b></span>
                  <span style={{ fontSize: '10px', padding: '2px 6px', background: '#222', borderRadius: '4px', color: '#999' }}>{s.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右：全球快讯流 */}
        <div style={{ background: '#000', padding: '10px' }}>
          <h2 style={{ fontSize: '12px', color: '#444', marginBottom: '15px' }}>GLOBAL INTELLIGENCE</h2>
          {m.news.map((n, i) => (
            <div key={i} style={{ marginBottom: '15px', padding: '15px', background: '#111', borderRadius: '10px', borderLeft: '2px solid #ff0000', fontSize: '12px', lineHeight: '1.6', color: '#aaa' }}>
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

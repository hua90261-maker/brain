import React, { useState, useEffect } from 'react';

export default function AlphaCommand() {
  const [m, setM] = useState({ a50: '--', oil: '--', dxy: '--', sectors: [], intel: [], time: '正在载入...' });

  useEffect(() => {
    const scout = async () => {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setM(data);
      } catch (e) { 
        console.log("信号重连中..."); 
      }
    };
    scout();
    const timer = setInterval(scout, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '30px', fontFamily: 'monospace' }}>
      {/* 头部：北京时间 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ color: '#f00', margin: 0 }}>自由之路 · 独立大脑</h1>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, color: '#f00', fontWeight: 'bold' }}>{m.time}</p>
          <p style={{ fontSize: '10px', color: '#666' }}>BEIJING REALTIME</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px' }}>
        {/* 左：核心宏观 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ background: '#111', padding: '20px', borderRadius: '15px' }}>
            <div style={{ color: '#666', fontSize: '12px' }}>A50 INDEX</div>
            <div style={{ fontSize: '30px', fontWeight: 'bold' }}>{m.a50}</div>
          </div>
          <div style={{ background: '#111', padding: '20px', borderRadius: '15px' }}>
            <div style={{ color: '#666', fontSize: '12px' }}>CRUDE OIL</div>
            <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#eab308' }}>{m.oil}</div>
          </div>
        </div>

        {/* 中：成交量雷达 */}
        <div style={{ background: '#0a0a0a', padding: '20px', borderRadius: '15px', border: '1px solid #222' }}>
          <h2 style={{ fontSize: '14px', color: '#f00', marginBottom: '20px' }}>行业热度雷达 (成交量/20日均量)</h2>
          {m.sectors && m.sectors.map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#111', marginBottom: '10px', borderRadius: '5px' }}>
              <span>{s.name}</span>
              <span style={{ color: '#f00', fontWeight: 'bold' }}>{s.heat}x</span>
            </div>
          ))}
        </div>

        {/* 右：全球快讯 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2 style={{ fontSize: '12px', color: '#666' }}>GLOBAL NEWS</h2>
          {m.intel && m.intel.map((n, i) => (
            <div key={i} style={{ fontSize: '11px', color: '#999', padding: '10px', borderLeft: '2px solid #333', background: '#050505' }}>{n}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

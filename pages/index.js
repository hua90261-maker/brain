import React, { useState, useEffect } from 'react';

export default function FreedomRoadAlpha() {
  const [data, setData] = useState({ a50: '--', oil: '--', dxy: '--', sectors: [], intel: [], time: '00:00:00' });

  useEffect(() => {
    const update = async () => {
      try {
        const res = await fetch('/api/data');
        const json = await res.json();
        setData(json);
      } catch (e) { console.error("信号丢失"); }
    };
    update();
    const heartbeat = setInterval(update, 5000); // 5秒心跳刷新
    return () => clearInterval(heartbeat);
  }, []);

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '30px', fontFamily: 'monospace' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#ff0000', fontSize: '28px', margin: 0, fontStyle: 'italic', fontWeight: '900' }}>自由之路 · ALPHA COMMAND</h1>
          <p style={{ color: '#666', fontSize: '12px' }}>DECODE THE MARKET / BEIJING: {data.time}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff0000', animation: 'pulse 1s infinite' }}></div>
            <span style={{ color: '#ff0000', fontWeight: 'bold' }}>LIVE SIGNAL</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 350px', gap: '30px' }}>
        
        {/* Left: Global Macro (天时) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#111', padding: '20px', borderRadius: '15px', borderLeft: '5px solid #fff' }}>
            <p style={{ color: '#666', fontSize: '12px' }}>A50 INDEX</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0' }}>{data.a50}</p>
          </div>
          <div style={{ background: '#111', padding: '20px', borderRadius: '15px', borderLeft: '5px solid #eab308' }}>
            <p style={{ color: '#666', fontSize: '12px' }}>CRUDE OIL</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0', color: '#eab308' }}>{data.oil}</p>
          </div>
          <div style={{ background: '#111', padding: '20px', borderRadius: '15px', borderLeft: '5px solid #3b82f6' }}>
            <p style={{ color: '#666', fontSize: '12px' }}>DXY 美元指数</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0', color: '#3b82f6' }}>{data.dxy}</p>
          </div>
        </div>

        {/* Center: Sector Heatmap (地利 - 成交量雷达) */}
        <div style={{ background: '#0a0a0a', padding: '25px', borderRadius: '20px', border: '1px solid #222' }}>
          <h2 style={{ fontSize: '14px', color: '#ff0000', borderBottom: '1px solid #222', paddingBottom: '10px', marginBottom: '20px' }}>全行业热度 (标准成交量以上)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {data.sectors.map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#151515', padding: '15px', borderRadius: '10px' }}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{s.name}</span>
                  <span style={{ marginLeft: '10px', fontSize: '10px', color: s.status === 'BURST' ? '#ff0000' : '#666' }}>[{s.trend}]</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: s.heat > 1.5 ? '#ff0000' : '#fff' }}>{s.heat}x</div>
                  <div style={{ fontSize: '10px', color: '#444' }}>VOL RATIO</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Intelligence (风声 - 全球快讯) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h2 style={{ fontSize: '12px', color: '#666' }}>GLOBAL INTELLIGENCE</h2>
          {data.intel.map((news, i) => (
            <div key={i} style={{ background: '#111', padding: '15px', borderRadius: '10px', fontSize: '11px', lineHeight: '1.6', borderLeft: '2px solid #333', color: '#aaa', fontStyle: 'italic' }}>
              {news}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

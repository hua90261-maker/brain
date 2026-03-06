import React, { useState, useEffect } from 'react';

export default function LibertyAlpha() {
  const [data, setData] = useState({ a50: {}, oil: {}, sectors: [], news: [], time: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data');
        const json = await res.json();
        if (json.sectors) setData(json);
      } catch (e) { console.error("数据链路中断"); }
    };
    fetchData();
    const interval = setInterval(fetchData, 3000); // 3秒强制刷新
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '15px', fontFamily: 'monospace' }}>
      {/* 顶部状态 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px' }}>
        <h1 style={{ color: '#f00', fontSize: '20px', margin: 0 }}>自由之路 · 全市场资金雷达</h1>
        <div style={{ color: '#f00', fontWeight: 'bold' }}>BEIJING: {data.time}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 280px', gap: '15px' }}>
        {/* 左侧：宏观 */}
        <div>
          <div style={{ background: '#0a0a0a', padding: '15px', border: '1px solid #222', marginBottom: '10px' }}>
            <p style={{ color: '#666', fontSize: '10px' }}>A50 INDEX</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.a50.val}</p>
          </div>
          <div style={{ background: '#0a0a0a', padding: '15px', border: '1px solid #222' }}>
            <p style={{ color: '#666', fontSize: '10px' }}>WTI OIL</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffd700' }}>{data.oil.val}</p>
          </div>
        </div>

        {/* 中间：行业审计 (这里是核心，必须让它铺开) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', alignContent: 'start' }}>
          {data.sectors.length > 0 ? data.sectors.map((s, i) => (
            <div key={i} style={{ 
              background: '#0a0a0a', padding: '10px', border: parseFloat(s.h) > 2.0 ? '1px solid #f00' : '1px solid #222',
              minHeight: '80px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>{s.n}</span>
                <span style={{ color: parseFloat(s.c) >= 0 ? '#f44' : '#0f4' }}>{s.c}%</span>
              </div>
              <div style={{ fontSize: '10px', color: '#444', marginTop: '5px' }}>{s.s}</div>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '10px', color: '#333' }}>成交量比</span>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: parseFloat(s.h) > 1.8 ? '#f44' : '#fff' }}>{s.h}x</span>
              </div>
            </div>
          )) : <p style={{ color: '#444' }}>等待全市场扫描信号...</p>}
        </div>

        {/* 右侧：情报 */}
        <div style={{ background: '#050505', border: '1px solid #222', padding: '15px' }}>
          <h2 style={{ fontSize: '12px', color: '#f00', marginBottom: '15px' }}>实战审计快讯</h2>
          {data.news.map((n, i) => (
            <p key={i} style={{ fontSize: '11px', color: '#888', borderBottom: '1px solid #111', paddingBottom: '8px', lineHeight: '1.4' }}>{n}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

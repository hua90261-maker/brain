import React, { useState, useEffect } from 'react';

export default function RealtimeCommand() {
  const [m, setM] = useState({ a50: {}, oil: {}, sectors: [], news: [], time: '...' });

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setM(data);
      } catch (e) { console.log("信号断连"); }
    };
    fetcher();
    const interval = setInterval(fetcher, 3000); // 3秒刷新一次，看数字跳不跳
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'system-ui' }}>
      {/* 顶部状态栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ color: '#f00', fontSize: '24px', margin: 0 }}>自由之路 · INDEPENDENT MIND</h1>
        <div style={{ textAlign: 'right', color: '#f00', fontSize: '18px', fontWeight: 'bold' }}>BEIJING: {m.time}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', gap: '20px' }}>
        {/* 左：核心数据 */}
        <div>
          <div style={{ background: '#111', padding: '20px', borderRadius: '15px', marginBottom: '15px' }}>
            <p style={{ color: '#666', margin: '0 0 5px 0' }}>FTSE A50</p>
            <p style={{ fontSize: '30px', fontWeight: '900', color: '#f44', margin: 0 }}>{m.a50.val}</p>
          </div>
          <div style={{ background: '#111', padding: '20px', borderRadius: '15px' }}>
            <p style={{ color: '#666', margin: '0 0 5px 0' }}>WTI OIL</p>
            <p style={{ fontSize: '30px', fontWeight: '900', color: '#0f8', margin: 0 }}>{m.oil.val}</p>
          </div>
        </div>

        {/* 中：全行业实时监控 & 自由之路卡审 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {m.sectors.map((s, i) => (
            <div key={i} style={{ background: '#111', padding: '15px', borderRadius: '12px', border: parseFloat(s.heat) > 2.0 ? '1px solid #f44' : '1px solid #222' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{s.name}</span>
                <span style={{ color: parseFloat(s.change) > 0 ? '#f44' : '#0f8', fontWeight: 'bold' }}>{parseFloat(s.change) > 0 ? '+' : ''}{s.change}%</span>
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>成交量比: <b style={{ color: '#fff' }}>{s.heat}x</b></div>
              
              {/* 自由之路卡审逻辑：成交量大于 1.5x 自动显示推荐个股 */}
              {parseFloat(s.heat) > 1.5 && (
                <div style={{ marginTop: '15px', background: '#200', padding: '10px', borderRadius: '8px', border: '1px solid #500' }}>
                  <div style={{ fontSize: '10px', color: '#f66' }}>● 自由之路 · 锁定个股</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{s.stock}</div>
                  <div style={{ fontSize: '11px', color: '#f66' }}>{s.sub}细分</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 右：实时情报流 */}
        <div>
          <h3 style={{ fontSize: '12px', color: '#444', marginBottom: '15px' }}>GLOBAL INTELLIGENCE</h3>
          {m.news.map((n, i) => (
            <div key={i} style={{ padding: '15px', background: '#111', borderRadius: '10px', marginBottom: '10px', fontSize: '12px', color: '#aaa', borderLeft: '3px solid #f00', lineHeight: '1.5' }}>
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

export default function InfiniteCommand() {
  const [m, setM] = useState({ a50: {}, oil: {}, sectors: [], news: [], time: '校准中' });

  useEffect(() => {
    const sync = async () => {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setM(data);
      } catch (e) { console.log("信号丢失"); }
    };
    sync();
    const timer = setInterval(sync, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '10px', fontFamily: 'monospace' }}>
      {/* 顶部：全球流动性观测站 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '5px', marginBottom: '15px' }}>
        <div>
          <span style={{ color: '#f00', fontWeight: 'bold' }}>LIBERTY ROAD / 自由之路 ALPHA</span>
          <span style={{ marginLeft: '20px', color: '#666', fontSize: '10px' }}>GLOBAL FLOW AUDIT SYSTEM</span>
        </div>
        <div style={{ color: '#f00', fontWeight: 'bold' }}>{m.time} <span style={{ color: '#444', fontSize: '10px' }}>BJ</span></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: '10px' }}>
        {/* 左侧：宏观锚点 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ background: '#0a0a0a', border: '1px solid #222', padding: '10px' }}>
            <div style={{ color: '#444', fontSize: '10px' }}>A50 INDEX</div>
            <div style={{ fontSize: '20px', fontWeight: '900', color: '#f44' }}>{m.a50.val} {m.a50.chg}</div>
          </div>
          <div style={{ background: '#0a0a0a', border: '1px solid #222', padding: '10px' }}>
            <div style={{ color: '#444', fontSize: '10px' }}>WTI OIL</div>
            <div style={{ fontSize: '20px', fontWeight: '900', color: '#ffd700' }}>{m.oil.val}</div>
          </div>
          <div style={{ background: '#050505', border: '1px solid #222', padding: '10px', flex: 1 }}>
            <div style={{ color: '#f00', fontSize: '10px', marginBottom: '10px' }}>NEWS_FEED</div>
            {m.news.map((n, i) => (
              <p key={i} style={{ fontSize: '10px', color: '#666', borderBottom: '1px solid #111', paddingBottom: '5px' }}>{n}</p>
            ))}
          </div>
        </div>

        {/* 中间：全市场行业审计 (你要的穿透力) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', alignContent: 'start' }}>
          {m.sectors.map((s, i) => (
            <div key={i} style={{ 
              background: '#0a0a0a', padding: '10px', border: parseFloat(s.h) > 2.0 ? '1px solid #f00' : '1px solid #222',
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ fontSize: '8px', color: '#444' }}>{s.g} | {s.s}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{s.n}</span>
                <span style={{ color: parseFloat(s.c) >= 0 ? '#f44' : '#0f4', fontSize: '12px', fontWeight: 'bold' }}>
                  {parseFloat(s.c) >= 0 ? '+' : ''}{s.c}%
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '9px', color: '#333' }}>HEAT</span>
                <span style={{ fontSize: '18px', fontWeight: '900', color: parseFloat(s.h) > 1.8 ? '#f44' : '#fff' }}>{s.h}x</span>
              </div>
              {parseFloat(s.h) > 2.0 && <div style={{ position: 'absolute', top: 0, right: 0, width: '0', height: '0', borderStyle: 'solid', borderWidth: '0 15px 15px 0', borderColor: `transparent #f00 transparent transparent` }}></div>}
            </div>
          ))}
        </div>

        {/* 右侧：补位逻辑审计 (待统帅指令) */}
        <div style={{ background: '#0a0a0a', border: '1px solid #222', padding: '15px' }}>
          <h2 style={{ fontSize: '11px', color: '#f00', marginBottom: '15px' }}>补位与筛选逻辑</h2>
          <div style={{ color: '#444', fontSize: '10px', fontStyle: 'italic' }}>
            <p>1. 监控成交量比 (Heat) 超过 1.8x 的板块。</p>
            <p>2. 若主攻板块涨幅 > 5%，自动寻找同链条低位个股。</p>
            <p>3. 剔除高换手、无量空涨的目标。</p>
            <div style={{ marginTop: '20px', color: '#666' }}>
              当前锁定优先级：<br/>
              <span style={{ color: '#fff' }}>{m.sectors[0]?.n} ＞ {m.sectors[1]?.n}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

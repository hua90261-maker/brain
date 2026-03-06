import React, { useState, useEffect } from 'react';

export default function LibertyCommand() {
  const [m, setM] = useState({ a50: {}, oil: {}, sectors: [], news: [], time: '...' });

  const sync = async () => {
    try {
      // 增加时间戳防止缓存导致界面静止
      const res = await fetch(`/api/data?t=${Date.now()}`);
      const data = await res.json();
      setM(data);
    } catch (e) { console.log("信号丢失"); }
  };

  useEffect(() => {
    sync();
    const timer = setInterval(sync, 2000); // 2秒高频刷新
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '15px', fontFamily: 'monospace' }}>
      {/* 顶部：指令中心 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #f00', paddingBottom: '10px', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '24px', margin: 0 }}>自由之路 · 全球热钱雷达</h1>
          <span style={{ fontSize: '10px', color: '#f00' }}>STATUS: COLD_MACHINE_ACTIVE | NO PREJUDICE</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f00' }}>{m.time}</div>
          <div style={{ fontSize: '9px', color: '#444' }}>REALTIME SYNC</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
        
        {/* 左：行业资金密度矩阵 */}
        <div>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <div style={{ flex: 1, background: '#111', padding: '15px', borderLeft: '5px solid #f00' }}>
              <span style={{ fontSize: '10px', color: '#444' }}>FTSE A50 INDEX</span>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{m.a50.val} <span style={{ fontSize: '12px', color: '#f00' }}>{m.a50.chg}</span></div>
            </div>
            <div style={{ flex: 1, background: '#111', padding: '15px', borderLeft: '5px solid #ffd700' }}>
              <span style={{ fontSize: '10px', color: '#444' }}>WTI CRUDE OIL</span>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffd700' }}>{m.oil.val}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {m.sectors.map((s, i) => (
              <div key={i} style={{ 
                background: '#0a0a0a', padding: '15px', border: parseFloat(s.h) > 2.0 ? '2px solid #f00' : '1px solid #222',
                borderRadius: '4px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{s.n}</span>
                  <span style={{ color: parseFloat(s.c) >= 0 ? '#f44' : '#0f4', fontWeight: 'bold' }}>{s.c}%</span>
                </div>
                <div style={{ fontSize: '10px', color: '#444', margin: '10px 0' }}>来源: {s.origin}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <span style={{ fontSize: '9px', color: '#f00' }}>流向状态</span>
                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{s.flow}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '9px', color: '#333' }}>成交量比</span>
                    <div style={{ fontSize: '24px', fontWeight: '900', color: parseFloat(s.h) > 2.0 ? '#f00' : '#fff' }}>{s.h}x</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右：真伪辩证情报窗 */}
        <div style={{ background: '#0a0a0a', border: '1px solid #222', padding: '20px' }}>
          <h2 style={{ fontSize: '14px', color: '#f00', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>全球信源交叉验证</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {m.news.map((n) => (
              <div key={n.id} style={{ borderLeft: '2px solid #444', paddingLeft: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '10px', color: '#f00', fontWeight: 'bold' }}>[{n.src}]</span>
                  <a href={n.url} target="_blank" rel="noreferrer" style={{ fontSize: '9px', color: '#0af', textDecoration: 'none' }}>点击查证原文 ↗</a>
                </div>
                <p style={{ fontSize: '12px', color: '#888', lineHeight: '1.6', margin: 0 }}>{n.text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '50px', padding: '15px', background: '#111', fontSize: '11px', color: '#444' }}>
            <p>● 指令：不迷信任何单点信息</p>
            <p>● 逻辑：寻找 3 个以上信源共振的板块</p>
            <p>● 状态：<span style={{ color: '#0f4' }}>DEBUNKING_MODE_ON</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}

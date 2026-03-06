import React, { useState, useEffect } from 'react';

export default function QuantCopyApp() {
  const [d, setD] = useState({ passed: [], macro: [], news: [], time: '' });

  useEffect(() => {
    const fetchLoop = async () => {
      const res = await fetch(`/api/data?t=${Date.now()}`);
      const json = await res.json();
      setD(json);
    };
    fetchLoop();
    const timer = setInterval(fetchLoop, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#e0e0e0', minHeight: '100vh', padding: '15px', fontFamily: 'monospace' }}>
      {/* 顶部：全球宏观闸门 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ color: '#f00', fontWeight: 'bold' }}>LIBERTY ROAD QUANT [抄作业版]</span>
          {d.macro.map((m, i) => (
            <span key={i} style={{ fontSize: '12px' }}>{m.name}: <b style={{ color: m.status === 'HOT' ? '#f00' : '#ffd700' }}>{m.val}</b></span>
          ))}
        </div>
        <div style={{ color: '#f00' }}>{d.time} BJ</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '15px' }}>
        {/* 中间：过审行业流 */}
        <div>
          <h2 style={{ fontSize: '12px', color: '#444', marginBottom: '10px' }}>● 通过量化审计的共振板块 (全维度穿透)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {d.passed.map((s, i) => (
              <div key={i} style={{ background: '#0a0a0a', padding: '15px', border: '1px solid #222', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{s.n}</span>
                  <span style={{ color: '#f33', fontSize: '20px', fontWeight: 'bold' }}>+{s.c}%</span>
                </div>
                <div style={{ fontSize: '11px', color: '#ffd700', marginTop: '5px' }}>联动逻辑: {s.link}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: '#444' }}>板块成交额</div>
                    <div style={{ fontSize: '14px' }}>{s.v}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '9px', color: '#f00' }}>成交量比 (HEAT)</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{s.h}x</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：审计日志 */}
        <div style={{ background: '#050505', border: '1px solid #222', padding: '15px' }}>
          <h3 style={{ fontSize: '12px', color: '#f00', marginBottom: '20px' }}>量化审计日志 (Audit Log)</h3>
          {d.news.map((n, i) => (
            <div key={i} style={{ fontSize: '12px', color: '#888', marginBottom: '15px', borderLeft: '2px solid #333', paddingLeft: '10px', lineHeight: '1.6' }}>
              {n}
            </div>
          ))}
          <div style={{ marginTop: '50px', background: '#111', padding: '10px', fontSize: '10px', color: '#444' }}>
            <p>抄作业指令集：</p>
            <p>1. 过滤噪音：Heat &lt; 1.8 绝不展示</p>
            <p>2. 关联审计：必须有宏观逻辑支撑</p>
            <p>3. 风险对冲：关注 A50 与汇率背离</p>
          </div>
        </div>
      </div>
    </div>
  );
}

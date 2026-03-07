import React, { useState, useEffect } from 'react';

export default function IntelligenceMaster() {
  const [data, setData] = useState({ intel: [], time: '' });

  useEffect(() => {
    const sync = async () => {
      const res = await fetch(`/api/data?t=${Date.now()}`);
      const json = await res.json();
      setData(json);
    };
    sync();
    const timer = setInterval(sync, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '10px' }}>
      
      {/* --- 第一层：巨幕实时情报区 --- */}
      <div style={{ border: '2px solid #333', borderRadius: '8px', padding: '15px', marginBottom: '20px', background: '#050505' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
          <h2 style={{ fontSize: '18px', color: '#f00', margin: 0 }}>● 全球实时情报中枢 (GLOBAL INTEL STREAM)</h2>
          <span style={{ color: '#666' }}>{data.time} | 信号源: 实时联网</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {data.intel.map((n) => (
            <div key={n.id} style={{ 
              background: '#111', padding: '15px', borderLeft: `6px solid ${n.level === 'URGENT' ? '#f00' : (n.level === 'IMPORTANT' ? '#ff8c00' : '#007bff')}`,
              borderRadius: '4px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#f00', fontWeight: 'bold' }}>SOURCE: {n.src}</span>
                <a href={n.url} target="_blank" style={{ color: '#0af', fontSize: '12px', textDecoration: 'none' }}>点击跳转验证原文 ↗</a>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#eee', marginBottom: '10px' }}>{n.title}</div>
              <div style={{ fontSize: '13px', color: '#888', background: '#000', padding: '8px', borderRadius: '4px' }}>
                <span style={{ color: '#ffd700' }}>[自由之路逻辑关联]：</span>{n.analysis}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 第二层：资金流与个股审计 (略，保持之前的精简结构) --- */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* 这里展示过线的行业和个股，面积让位于情报区 */}
      </div>

    </div>
  );
}

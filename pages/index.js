import React, { useState, useEffect } from 'react';

export default function CommandCenter() {
  const [m, setM] = useState({ a50: '--', oil: '--', sectors: [], intel: [], time: 'INIT...' });

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setM(data);
      } catch (e) { console.log("信号闪烁..."); }
    };
    fetcher();
    const timer = setInterval(fetcher, 3000); // 3秒强制刷新，让你看到数字动
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'serif' }}>
      <div style={{ borderBottom: '1px solid #f00', paddingBottom: '10px' }}>
        <h1 style={{ color: '#f00', fontSize: '30px' }}>THE ROAD TO FREEDOM: INDEPENDENT MIND</h1>
        <p style={{ fontSize: '12px', color: '#666' }}>SYNC TIME: {m.time}</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <div style={{ flex: 1, background: '#111', padding: '20px', borderRadius: '10px' }}>
          <p style={{ color: '#444' }}>A50 INDEX</p>
          <p style={{ fontSize: '40px', fontWeight: 'bold' }}>{m.a50}</p>
          <p style={{ color: '#444', marginTop: '20px' }}>CRUDE OIL</p>
          <p style={{ fontSize: '40px', fontWeight: 'bold', color: '#ffd700' }}>{m.oil}</p>
        </div>

        <div style={{ flex: 2, background: '#0a0a0a', padding: '20px', border: '1px solid #222' }}>
          <p style={{ color: '#f00', fontSize: '14px' }}>INDUSTRY HOTSPOT RADAR (VOL RATIO)</p>
          {m.sectors && m.sectors.map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #111' }}>
              <span>{s.name}</span>
              <span style={{ color: '#f00', fontWeight: 'bold' }}>{s.heat}x</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, color: '#888', fontSize: '12px' }}>
          <p>GLOBAL NEWS</p>
          {m.intel && m.intel.map((n, i) => (
            <p key={i} style={{ padding: '10px 0', borderBottom: '1px solid #222' }}>{n}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

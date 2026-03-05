
import React, { useState, useEffect } from 'react';

export default function CommandCenter() {
  const [m, setM] = useState({ a50: '--', oil: '--', dxy: '--', cnh: '--', time: 'SYNCING' });

  useEffect(() => {
    const scout = async () => {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setM(data);
      } catch (e) { console.log("重连中..."); }
    };
    scout();
    const timer = setInterval(scout, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '60px', fontFamily: 'monospace' }}>
      <div style={{ borderBottom: '2px solid #ff0000', paddingBottom: '20px', marginBottom: '50px' }}>
        <h1 style={{ color: '#ff0000', fontSize: '36px', fontStyle: 'italic' }}>自由之路 · 独立大脑</h1>
        <p style={{ color: '#444' }}>BEIJING TIME: {m.time} | STATUS: ACTIVE</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div style={{ background: '#111', padding: '40px', borderRadius: '30px' }}>
          <div style={{ color: '#666' }}>A50 INDEX</div>
          <div style={{ fontSize: '80px', fontWeight: 'bold' }}>{m.a50}</div>
        </div>
        <div style={{ background: '#111', padding: '40px', borderRadius: '30px' }}>
          <div style={{ color: '#666' }}>CRUDE OIL</div>
          <div style={{ fontSize: '80px', fontWeight: 'bold', color: '#ffd700' }}>{m.oil}</div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState({
    a50: 13522,
    cnh: 7.28,
    rating: 45,
    advice: "观望 - 震荡期"
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 font-sans">
      <div className={`rounded-2xl p-6 mb-4 ${data.rating > 60 ? 'bg-red-600' : 'bg-blue-800 shadow-lg'}`}>
        <h1 className="text-xl font-bold opacity-80">自由之路 · 独立大脑</h1>
        <div className="mt-4 flex justify-between items-end">
          <div>
            <span className="text-5xl font-black">{data.rating}</span>
            <span className="ml-2">综合分</span>
          </div>
          <p className="text-xl font-bold bg-black bg-opacity-20 px-3 py-1 rounded-lg">{data.advice}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-xs mb-1">A50 指数</p>
          <p className="text-2xl font-mono text-red-400">{data.a50}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-xs mb-1">汇率 (USD/CNH)</p>
          <p className="text-2xl font-mono text-green-400">{data.cnh}</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h2 className="text-xs font-bold text-slate-500 mb-4 tracking-widest uppercase">战略监测资产</h2>
        <div className="space-y-4">
          {[
            { name: '思源电气', pit: 213, status: '低吸观察' },
            { name: '天齐锂业', pit: '待定', status: '周期筑底' },
            { name: '赣锋锂业', pit: '待定', status: '关注弹性' }
          ].map(item => (
            <div key={item.name} className="flex justify-between items-center border-b border-slate-700 pb-2">
              <span className="font-medium text-lg">{item.name}</span>
              <div className="text-right">
                <p className="text-sm text-yellow-500 font-mono">坑位: {item.pit}</p>
                <p className="text-xs text-slate-400">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-[10px] text-slate-600 mt-8">指令中心：客观、独立、冷血执行</p>
    </div>
  );
}

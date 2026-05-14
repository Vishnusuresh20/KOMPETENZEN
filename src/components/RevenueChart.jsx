import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { revenueData } from '../data/mockData';
import { cn } from '../lib/utils';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/80 border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs font-medium text-slate-300 capitalize">{entry.name}:</span>
              </div>
              <span className="text-xs font-bold text-white">₹{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const tabs = ['Revenue', 'Fees', 'Expenses'];

export default function RevenueChart({ data }) {
  const [activeTab, setActiveTab] = useState('Revenue');
  const chartData = data || revenueData;

  // Get totals from current data
  const currentRevenue = chartData.reduce((acc, curr) => acc + (curr.revenue || 0), 0);
  const currentFees = chartData.reduce((acc, curr) => acc + (curr.fees || 0), 0);
  const currentExpenses = chartData.reduce((acc, curr) => acc + (curr.expenses || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-5 shadow-lg col-span-2"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-[rgb(var(--foreground))]">Revenue Overview</h3>
          <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">
            FY 2026 — Kompetenzen Technologies
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-[rgb(var(--muted))] rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                activeTab === tab
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Summary badges */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          <span className="text-xs text-[rgb(var(--muted-foreground))]">Revenue</span>
          <span className="text-xs font-bold text-indigo-400">₹{(currentRevenue / 1000).toFixed(1)}k</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-[rgb(var(--muted-foreground))]">Fees Pending</span>
          <span className="text-xs font-bold text-emerald-400">₹{(currentFees / 1000).toFixed(1)}k</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
          <span className="w-2 h-2 rounded-full bg-violet-400" />
          <span className="text-xs text-[rgb(var(--muted-foreground))]">Expenses</span>
          <span className="text-xs font-bold text-violet-400">₹{(currentExpenses / 1000).toFixed(1)}k</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradFees" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            strokeWidth={4}
            fill="url(#gradRevenue)"
            filter="drop-shadow(0px 0px 8px rgba(99, 102, 241, 0.4))"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="fees"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#gradFees)"
            strokeDasharray="5 5"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#f43f5e"
            strokeWidth={2}
            fill="url(#gradExpenses)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}


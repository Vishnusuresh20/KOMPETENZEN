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
      <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl p-3 shadow-2xl">
        <p className="text-xs font-semibold text-[rgb(var(--foreground))] mb-2">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-[rgb(var(--muted-foreground))] capitalize">{entry.name}:</span>
            <span className="font-semibold text-[rgb(var(--foreground))]">
              ₹{(entry.value / 1000).toFixed(0)}k
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const tabs = ['Revenue', 'Fees', 'Expenses'];

export default function RevenueChart() {
  const [activeTab, setActiveTab] = useState('Revenue');

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
            FY 2024 — Kompetenzen Technologies
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
          <span className="text-xs font-bold text-indigo-400">₹84.25L</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-[rgb(var(--muted-foreground))]">Fees Collected</span>
          <span className="text-xs font-bold text-emerald-400">₹73.0L</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
          <span className="w-2 h-2 rounded-full bg-violet-400" />
          <span className="text-xs text-[rgb(var(--muted-foreground))]">Expenses</span>
          <span className="text-xs font-bold text-violet-400">₹22.5L</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={revenueData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradFees" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: 'rgb(130,138,180)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'rgb(130,138,180)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${v / 1000}k`}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#gradRevenue)"
            dot={false}
            activeDot={{ r: 5, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
          />
          <Area
            type="monotone"
            dataKey="fees"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#gradFees)"
            dot={false}
            activeDot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#8b5cf6"
            strokeWidth={2}
            fill="url(#gradExpenses)"
            dot={false}
            activeDot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

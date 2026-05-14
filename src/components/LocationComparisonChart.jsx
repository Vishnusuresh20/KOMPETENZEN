import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/80 border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
        <p className="text-xs font-bold text-white mb-1">{payload[0].payload.name}</p>
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
          {payload[0].value} Enrolled Students
        </p>
      </div>
    );
  }
  return null;
};

const LOCATION_COLORS = ['#818cf8', '#f43f5e'];

export default function LocationComparisonChart({ data }) {
  const chartData = (data || []).map((item, index) => ({
    ...item,
    color: LOCATION_COLORS[index % LOCATION_COLORS.length]
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-5 shadow-lg h-full"
    >
      <div className="mb-6">
        <h3 className="text-base font-bold text-[rgb(var(--foreground))]">Campus Comparison</h3>
        <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">
          Student strength by geographic location
        </p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 600 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]} 
            barSize={45}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-6">
        {chartData.map((item, idx) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }}
            />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

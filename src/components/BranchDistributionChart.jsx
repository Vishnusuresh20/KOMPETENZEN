import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/80 border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
        <p className="text-xs font-bold text-white mb-1">{payload[0].name}</p>
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
          {payload[0].value} Enrolled Students
        </p>
      </div>
    );
  }
  return null;
};

const BRANCH_COLORS = {
  'KOMPETENZEN TECH': '#818cf8',
  'KOMPETENZEN B-SCHOOL': '#a78bfa',
  'KOMPETENZEN FINISHING SCHOOL': '#f43f5e'
};

const DEFAULT_COLORS = ['#818cf8', '#a78bfa', '#f43f5e', '#fbbf24', '#2dd4bf'];

export default function BranchDistributionChart({ data }) {
  const chartData = (data || []).map((item, index) => ({
    ...item,
    color: BRANCH_COLORS[item.name] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]
  }));
  
  const total = chartData.reduce((s, d) => s + d.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-5 shadow-lg h-full"
    >
      <div className="mb-4">
        <h3 className="text-base font-bold text-[rgb(var(--foreground))]">Branch Distribution</h3>
        <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">
          Student split across {chartData.length} divisions
        </p>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="space-y-3 mt-4 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
        {chartData.map((item) => (
          <div key={item.name} className="flex flex-col gap-1.5 p-2 rounded-xl bg-muted/20 border border-border/50 group hover:border-white/10 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }}
                />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider truncate max-w-[150px]">{item.name}</span>
              </div>
              <span className="text-xs font-black text-foreground">
                {item.value}
              </span>
            </div>
            <div className="w-full h-1 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${total > 0 ? (item.value / total) * 100 : 0}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: item.color,
                  boxShadow: `0 0 10px ${item.color}44`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

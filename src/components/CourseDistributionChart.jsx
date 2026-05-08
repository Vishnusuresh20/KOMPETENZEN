import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { courseDistribution } from '../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl px-3 py-2 shadow-2xl">
        <p className="text-xs font-semibold text-[rgb(var(--foreground))]">{payload[0].name}</p>
        <p className="text-xs text-[rgb(var(--muted-foreground))]">
          {payload[0].value} students
        </p>
      </div>
    );
  }
  return null;
};

export default function CourseDistributionChart() {
  const total = courseDistribution.reduce((s, d) => s + d.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-5 shadow-lg"
    >
      <div className="mb-4">
        <h3 className="text-base font-bold text-[rgb(var(--foreground))]">Course Distribution</h3>
        <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">
          {total} students across {courseDistribution.length} courses
        </p>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={courseDistribution}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {courseDistribution.map((entry, index) => (
              <Cell key={index} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="space-y-2 mt-2">
        {courseDistribution.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: item.color }}
              />
              <span className="text-xs text-[rgb(var(--muted-foreground))]">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-[rgb(var(--muted))] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(item.value / total) * 100}%`,
                    background: item.color,
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-[rgb(var(--foreground))] w-8 text-right">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

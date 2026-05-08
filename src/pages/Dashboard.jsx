import { motion } from 'framer-motion';
import { stats } from '../data/mockData';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/RevenueChart';
import CourseDistributionChart from '../components/CourseDistributionChart';
import RecentStudentsTable from '../components/RecentStudentsTable';
import { Calendar, TrendingUp, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function Dashboard() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6 animate-in">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Zap className="w-6 h-6 text-indigo-400" />
            Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome back, Admin · {dateStr}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-sm text-muted-foreground shadow-sm">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-medium">May 2024</span>
          </div>
          <Button className="gap-2 shadow-lg shadow-indigo-500/20 gradient-indigo text-white border-0">
            <TrendingUp className="w-3.5 h-3.5" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} index={i} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <CourseDistributionChart />
        </div>
      </div>

      {/* Recent Students */}
      <RecentStudentsTable />
    </div>
  );
}

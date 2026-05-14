import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { stats } from '../data/mockData';
import api from '../lib/axios';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/RevenueChart';
import CourseDistributionChart from '../components/CourseDistributionChart';
import BranchDistributionChart from '../components/BranchDistributionChart';
import LocationComparisonChart from '../components/LocationComparisonChart';
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

  const [statsData, setStatsData] = useState(stats);
  const [revenueChartData, setRevenueChartData] = useState(null);
  const [courseChartData, setCourseChartData] = useState(null);
  const [branchChartData, setBranchChartData] = useState(null);
  const [locationChartData, setLocationChartData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        const data = response.data;
        
        setStatsData([
          {
            ...stats[0],
            value: data.totalStudents.toLocaleString('en-IN')
          },
          {
            ...stats[1],
            title: 'Total Revenue',
            value: `₹${data.totalRevenue?.toLocaleString('en-IN') || 0}`
          },
          {
            ...stats[2],
            value: `₹${data.totalPendingFees?.toLocaleString('en-IN') || 0}`
          }
        ]);

        if (data.revenueData) setRevenueChartData(data.revenueData);
        if (data.courseData) setCourseChartData(data.courseData);
        if (data.branchData) setBranchChartData(data.branchData);
        if (data.locationData) setLocationChartData(data.locationData);
      } catch (err) {
        console.error("Failed to load backend stats.", err);
        setStatsData([
          { id: 1, title: 'Total Students', value: '0', icon: 'Users', color: 'indigo', desc: 'Real-time count' },
          { id: 2, title: 'Total Revenue', value: '₹0', icon: 'Wallet', color: 'violet', desc: 'Collected amount' },
          { id: 3, title: 'Pending Fees', value: '₹0', icon: 'AlertCircle', color: 'rose', desc: 'Outstanding dues' },
          { id: 4, title: 'Growth Rate', value: '0%', icon: 'Zap', color: 'amber', desc: 'Monthly performance' }
        ]);
      }
    };
    
    fetchStats();
  }, []);

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
            <span className="text-xs font-medium">
              {now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          <Button className="gap-2 shadow-lg shadow-indigo-500/20 gradient-indigo text-white border-0">
            <TrendingUp className="w-3.5 h-3.5" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsData.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} index={i} />
        ))}
      </div>

      {/* Charts Row 1: Revenue & Branch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueChartData} />
        </div>
        <div>
          <BranchDistributionChart data={branchChartData} />
        </div>
      </div>

      {/* Charts Row 2: Location & Course */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <LocationComparisonChart data={locationChartData} />
        </div>
        <div>
          <CourseDistributionChart data={courseChartData} />
        </div>
      </div>

      {/* Full Width Recent Students */}
      <div className="w-full">
        <RecentStudentsTable />
      </div>
    </div>
  );
}

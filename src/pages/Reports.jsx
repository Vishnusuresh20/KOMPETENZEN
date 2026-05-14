import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  ArrowUpRight, 
  Download, 
  Filter,
  Calendar,
  Loader2
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import api from '../lib/axios';
import { cn } from '../lib/utils';

const COLORS = ['#6366f1', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4'];

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
                <span className="text-xs font-medium text-slate-300">{entry.name}</span>
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

export default function Reports() {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await api.get('/reports/financial');
      setReportData(response.data);
    } catch (err) {
      console.error("Failed to fetch report", err);
    } finally {
      setIsLoading(false);
    }
  };

  const reportStats = [
    { label: 'Total Collection', value: `₹${reportData?.totalCollected?.toLocaleString('en-IN') || 0}`, change: '+12%', color: 'emerald' },
    { label: 'Pending Dues', value: `₹${reportData?.totalPending?.toLocaleString('en-IN') || 0}`, change: '-5%', color: 'rose' },
    { label: 'Active Students', value: reportData?.totalStudents?.toString() || '0', change: '+2', color: 'indigo' },
    { label: 'Overdue Cases', value: reportData?.overdueCount?.toString() || '0', change: '0', color: 'violet' },
  ];

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-muted-foreground font-medium text-sm tracking-wide">Generating institutional analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Institutional Analytics</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Performance insights based on live data
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-border/50 gap-2">
            <Filter className="w-4 h-4" />
            Filter Data
          </Button>
          <Button className="rounded-xl gradient-indigo text-white gap-2 shadow-lg shadow-indigo-500/20">
            <Download className="w-4 h-4" />
            Export Audit Report
          </Button>
        </div>
      </div>

      {/* Analytics Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-lg relative overflow-hidden group">
              <div className={cn("absolute top-0 left-0 w-1 h-full", 
                stat.color === 'indigo' ? 'bg-indigo-500' : 
                stat.color === 'emerald' ? 'bg-emerald-500' : 
                stat.color === 'rose' ? 'bg-rose-500' : 'bg-violet-500'
              )} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-foreground">{stat.value}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue Trajectory & Branch Dist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-foreground">Revenue Trajectory</h3>
                <p className="text-xs text-muted-foreground">Monthly breakdown of gross institutional income</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/50 border border-border text-xs">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Current Year</span>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={reportData?.monthlyIncome || []}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" name="Collected" stroke="#818cf8" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Branch Split */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-lg font-bold text-foreground mb-6">Division Revenue</h3>
            <div className="h-[220px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reportData?.branchPerformance || []}
                    innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="revenue"
                  >
                    {(reportData?.branchPerformance || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
               {(reportData?.branchPerformance || []).map((b, idx) => (
                 <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border text-xs">
                    <span className="font-bold text-muted-foreground">{b.name}</span>
                    <span className="font-bold text-foreground">₹{b.revenue?.toLocaleString()}</span>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campus & Course Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campus Location Performance */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-lg font-bold text-foreground mb-8 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              Campus Financial Audit
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportData?.locationPerformance || []}>
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={11} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                    {(reportData?.locationPerformance || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#818cf8' : '#f43f5e'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
               {(reportData?.locationPerformance || []).map((loc, idx) => (
                 <div key={idx} className="p-4 rounded-2xl bg-muted/20 border border-border text-center">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{loc.name}</p>
                    <p className="text-lg font-black text-foreground mt-1">₹{loc.revenue?.toLocaleString()}</p>
                    <p className="text-[10px] text-emerald-400 font-bold mt-1">{loc.students} Active Students</p>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>

        {/* Course Performance List */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl overflow-hidden">
          <div className="p-8 pb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              Academic Revenue Audit
            </h3>
          </div>
          <div className="p-2 space-y-2 overflow-y-auto max-h-[460px] custom-scrollbar">
             {(reportData?.coursePerformance || []).map((course, idx) => (
               <div key={idx} className="p-4 mx-4 rounded-2xl border border-border bg-muted/20 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm">
                        {course.name.charAt(0)}
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-foreground">{course.name}</h4>
                        <p className="text-[10px] text-muted-foreground">{course.students} Students</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-black text-foreground">₹{course.revenue?.toLocaleString()}</p>
                     <Badge variant="success" className="text-[9px] px-1.5 py-0 mt-1">Active</Badge>
                  </div>
               </div>
             ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

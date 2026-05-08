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
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  DollarSign, 
  ArrowUpRight, 
  Download, 
  Filter,
  Calendar,
  Wallet,
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  revenueData, 
  branchPerformance, 
  studentGrowthData, 
  categoryFinancials,
  feeStats 
} from '../data/mockData';
import { cn } from '../lib/utils';

const COLORS = ['#6366f1', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 border border-border p-3 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-xs font-bold text-foreground mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs font-medium" style={{ color: entry.color }}>
            {entry.name}: ₹{entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Reports() {
  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Institutional Analytics</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Performance insights for FY 2024-25
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
        {feeStats.map((stat, idx) => (
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

      {/* Revenue & Growth Row */}
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
                <span>Last 12 Months</span>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="fees" stroke="#10b981" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
          <CardContent className="p-8 text-center flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-foreground mb-6">Financial Distribution</h3>
            <div className="h-[220px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryFinancials}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="amount"
                    nameKey="category"
                  >
                    {categoryFinancials.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 w-full">
               {categoryFinancials.map((cat, idx) => (
                 <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                       <span className="text-[11px] font-bold text-muted-foreground">{cat.category}</span>
                    </div>
                    <span className="text-xs font-bold text-foreground">₹{(cat.amount/1000).toFixed(1)}k</span>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch & Enrollment Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-lg font-bold text-foreground mb-8 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              Branch Performance Audit
            </h3>
            <div className="space-y-5">
               {branchPerformance.map((branch, idx) => (
                 <div key={idx} className="p-6 rounded-2xl border border-border bg-muted/20 group hover:border-indigo-500/30 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                             {branch.name.charAt(0)}
                          </div>
                          <div>
                             <h4 className="text-base font-bold text-foreground">{branch.name}</h4>
                             <p className="text-xs text-muted-foreground">{branch.students} Active Students</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-8 text-right">
                          <div>
                             <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Gross Revenue</p>
                             <p className="text-base font-extrabold text-foreground mt-1">₹{(branch.revenue/100000).toFixed(1)}L</p>
                          </div>
                          <Badge variant="success" className="h-fit">{branch.growth}</Badge>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-lg font-bold text-foreground mb-8 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              Enrollment Growth Analytics
            </h3>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={studentGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 15, 35, 0.9)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '12px' }} />
                    <Bar dataKey="new" name="New Admissions" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                    <Bar dataKey="total" name="Total Population" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-center">
               <p className="text-xs text-muted-foreground italic">
                 New admissions peaked in <span className="font-bold text-indigo-400 underline">May 2024</span> with a 12% Month-on-Month growth.
               </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

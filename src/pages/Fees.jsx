import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Wallet,
  TrendingUp,
  AlertCircle,
  Search,
  Download,
  History,
  CreditCard,
  FileText,
  X,
  Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';
import api from '../lib/axios';
import { monthlyFeeTrend, branches, locations } from '../data/mockData';
import { Link } from 'react-router-dom';

// --- Modals ---
const UpdateFeeModal = ({ isOpen, onClose, feeRecord, onUpdate }) => {
  const [method, setMethod] = useState('UPI');
  const [enteredAmount, setEnteredAmount] = useState('');

  useEffect(() => {
    if (feeRecord) {
      const bal = feeRecord.balance ?? feeRecord.totalAmount ?? 0;
      setEnteredAmount(String(bal));
    }
  }, [feeRecord]);

  if (!isOpen || !feeRecord) return null;

  const balance = feeRecord?.balance ?? feeRecord?.totalAmount ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-card border border-border shadow-2xl rounded-3xl overflow-hidden"
      >
        <div className="p-6 border-b border-border flex items-center justify-between gradient-emerald text-white">
          <div>
            <h3 className="text-xl font-bold">Record Payment</h3>
            <p className="text-white/70 text-xs mt-1">Updating fee for {feeRecord.studentName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-8 space-y-6">
          <div className="p-4 rounded-2xl bg-muted/30 border border-border flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Total Fee</span>
            <span className="font-bold">₹{(feeRecord.totalAmount ?? 0).toLocaleString('en-IN')}</span>
          </div>
          <div className="p-4 rounded-2xl bg-muted/30 border border-border flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Balance Due</span>
            <span className="font-bold text-rose-400">₹{balance.toLocaleString('en-IN')}</span>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Payment Method</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none">
              <option>UPI</option><option>Cash</option><option>Bank Transfer</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Amount to Pay (₹)</label>
            <input
              type="number"
              value={enteredAmount}
              onChange={(e) => setEnteredAmount(e.target.value)}
              min="1"
              max={balance}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/30 outline-none text-lg font-bold transition-all"
              placeholder="Enter amount..."
            />
            <p className="text-[10px] text-muted-foreground italic">Enter partial or full amount (max ₹{balance.toLocaleString('en-IN')})</p>
          </div>
        </div>

        <div className="p-6 border-t border-border bg-muted/30 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="rounded-xl px-6">Cancel</Button>
          <Button onClick={() => onUpdate(parseFloat(enteredAmount) || 0)} className="rounded-xl px-8 gradient-emerald text-white shadow-lg shadow-emerald-500/20">Confirm Payment</Button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Custom Tooltip for Trend Graph ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f0f1e]/95 border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md min-w-[140px]">
        <p className="text-xs font-bold text-slate-400 mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <span className="text-[11px] font-medium text-slate-300 capitalize">
                {entry.name} :
              </span>
              <span className="text-xs font-bold" style={{ color: entry.color }}>
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// --- Main Page ---
export default function Fees() {
  const [feeRecords, setFeeRecords] = useState([]);
  const [stats, setStats] = useState({
    totalCollected: 0,
    totalPending: 0,
    overdueCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [trendData, setTrendData] = useState([]);
  const [selectedFee, setSelectedFee] = useState(null);

  useEffect(() => {
    fetchFeeData();
  }, []);

  const fetchFeeData = async () => {
    setIsLoading(true);
    try {
      const [feesRes, statsRes, reportsRes] = await Promise.all([
        api.get('/fees'),
        api.get('/dashboard/stats'),
        api.get('/reports/financial')
      ]);

      setFeeRecords(feesRes.data);
      setTrendData(reportsRes.data.monthlyIncome || []);
      setStats({
        totalCollected: statsRes.data.totalRevenue || 0,
        totalPending: statsRes.data.totalPendingFees || 0,
        overdueCount: feesRes.data.filter(f => f.status === 'OVERDUE').length
      });
    } catch (err) {
      console.error("Failed to load fees", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredFees = useMemo(() => {
    return (feeRecords || []).filter(f => {
      if (!f) return false;
      const searchStr = (search || '').toLowerCase();
      const matchesSearch = (f.studentName || '').toLowerCase().includes(searchStr) ||
                           String(f.id || '').toLowerCase().includes(searchStr);
      
      const bFilter = branchFilter || 'All';
      const lFilter = locationFilter || 'All';
      
      const matchesBranch = bFilter === 'All' || f.branch === bFilter;
      const matchesLocation = lFilter === 'All' || f.location === lFilter;
      
      return matchesSearch && matchesBranch && matchesLocation;
    });
  }, [search, feeRecords, branchFilter, locationFilter]);

  const handleUpdateClick = (fee) => {
    setSelectedFee(fee);
    setIsUpdateModalOpen(true);
  };

  const handleSavePayment = async (amount) => {
    if (!selectedFee || !amount || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    try {
      await api.put(`/fees/${selectedFee.id}/pay?amount=${amount}`);
      setIsUpdateModalOpen(false);
      fetchFeeData();
    } catch (err) {
      console.error("Payment failed", err);
      const msg = err.response?.data?.message || 'Please try again.';
      alert(`Failed to record payment: ${msg}`);
    }
  };

  const feeStatsCards = [
    { label: 'Total Collection', value: `₹${stats.totalCollected.toLocaleString('en-IN')}`, change: '+12%', color: 'emerald', icon: Wallet },
    { label: 'Pending Amount', value: `₹${stats.totalPending.toLocaleString('en-IN')}`, change: '-5%', color: 'rose', icon: AlertCircle },
    { label: 'Total Records', value: feeRecords.length.toString(), change: '+2', color: 'indigo', icon: TrendingUp },
    { label: 'Overdue Cases', value: stats.overdueCount.toString(), change: '0', color: 'violet', icon: History },
  ];

  const getStatColor = (color) => {
    switch (color) {
      case 'emerald': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'rose': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'indigo': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'violet': return 'text-violet-400 bg-violet-500/10 border-violet-500/20';
      default: return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
    }
  };

  if (isLoading && feeRecords.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-muted-foreground font-medium">Loading financial records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Fee Management</h1>
          <p className="text-muted-foreground mt-1">Track institutional revenue and student installments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-border/50 gap-2"><Download className="w-4 h-4" />Export</Button>
          <Button className="rounded-xl gradient-indigo text-white gap-2 shadow-lg shadow-indigo-500/20"><FileText className="w-4 h-4" />Settings</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {feeStatsCards.map((stat, idx) => {
          const colors = getStatColor(stat.color);
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colors.split(' ')[1])}>
                      <Icon className={cn("w-5 h-5", colors.split(' ')[0])} />
                    </div>
                    <Badge variant={stat.change.startsWith('+') ? 'success' : 'destructive'} className="rounded-full">{stat.change}</Badge>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl font-extrabold text-foreground mt-1">{stat.value}</h3>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-lg font-bold text-foreground mb-8">Collection Trend</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="rgba(255,255,255,0.2)" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.2)" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(v) => v === 0 ? '0' : v}
                    width={45}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={(d) => d.collected || d.revenue || 0} 
                    name="collected"
                    stroke="#6366f1" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorCollected)" 
                    dot={false}
                    activeDot={{ r: 4, fill: '#fff', stroke: '#6366f1', strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={(d) => d.pending || d.fees || 0} 
                    name="pending"
                    stroke="#f43f5e" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    fill="transparent"
                    dot={false}
                    activeDot={{ r: 4, fill: '#fff', stroke: '#f43f5e', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-lg font-bold text-foreground mb-6">Quick Insights</h3>
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                <div className="flex items-center gap-3 mb-2"><TrendingUp className="w-4 h-4 text-indigo-400" /><span className="text-xs font-bold text-indigo-400 uppercase">Growth</span></div>
                <p className="text-sm font-medium text-foreground leading-snug">Fee collection improved significantly after connecting to MySQL.</p>
              </div>
              <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                <div className="flex items-center gap-3 mb-2"><AlertCircle className="w-4 h-4 text-rose-400" /><span className="text-xs font-bold text-rose-400 uppercase">System Status</span></div>
                <p className="text-sm font-medium text-foreground leading-snug">All financial records are now being pulled from the live server.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl overflow-hidden">
        <CardContent className="p-0">
          {/* Table Header / Filters */}
          <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search by student name..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-background border border-border text-xs font-medium text-foreground outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
              >
                <option value="All">All Branches</option>
                {branches.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <select 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-background border border-border text-xs font-medium text-foreground outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
              >
                <option value="All">All Locations</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30 text-left">
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Student Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Paid</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredFees.map((f, idx) => (
                  <motion.tr key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="hover:bg-emerald-500/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-muted-foreground">
                          {(f.studentName || 'S').charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{f.studentName}</p>
                          <p className="text-[10px] text-muted-foreground">ID: {f.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm text-foreground">₹{(f.totalAmount ?? 0).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm text-emerald-400 font-bold">₹{(f.paidAmount ?? 0).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm font-bold text-rose-400">₹{(f.balance ?? 0).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-xs text-muted-foreground font-medium">{f.dueDate}</td>
                    <td className="px-6 py-4">
                      <Badge variant={f.status === 'PAID' ? 'success' : f.status === 'OVERDUE' ? 'destructive' : 'warning'}>
                        {f.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/students/${f.studentId}`}><Button variant="ghost" size="sm" className="h-9 px-3 rounded-xl gap-2 hover:bg-indigo-500/10 text-indigo-400"><History className="w-4 h-4" />Profile</Button></Link>
                        {f.status !== 'PAID' && (
                          <Button variant="outline" size="sm" onClick={() => handleUpdateClick(f)} className="h-9 px-4 rounded-xl gap-2 border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-500 font-bold">
                            <CreditCard className="w-4 h-4" />Record Payment
                          </Button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isUpdateModalOpen && (
          <UpdateFeeModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            feeRecord={selectedFee}
            onUpdate={handleSavePayment}
          />
        )}
      </AnimatePresence>
    </div>
  );
}


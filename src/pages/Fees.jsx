import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
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
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';
import { feeStats, studentFees, monthlyFeeTrend } from '../data/mockData';
import { Link } from 'react-router-dom';

// --- Modals ---
const UpdateFeeModal = ({ isOpen, onClose, student, onUpdate }) => {
  const [amount, setAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [method, setMethod] = useState('UPI');

  if (!isOpen || !student) return null;

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
            <p className="text-white/70 text-xs mt-1">Updating fees for {student.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Month</label>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none">
                {['January', 'February', 'March', 'April', 'May'].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Method</label>
              <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none">
                <option>UPI</option><option>Cash</option><option>Bank Transfer</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Amount (₹)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 15000" className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none text-lg font-bold" />
          </div>
        </div>

        <div className="p-6 border-t border-border bg-muted/30 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="rounded-xl px-6">Cancel</Button>
          <Button onClick={() => onUpdate(amount)} className="rounded-xl px-8 gradient-emerald text-white shadow-lg shadow-emerald-500/20">Confirm Payment</Button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Page ---
export default function Fees() {
  const [feeRecords, setFeeRecords] = useState(studentFees || []);
  const [search, setSearch] = useState('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredFees = useMemo(() => {
    return feeRecords.filter(s => 
      s.name.toLowerCase().includes(search.toLowerCase()) || 
      s.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, feeRecords]);

  const handleUpdateClick = (student) => {
    setSelectedStudent(student);
    setIsUpdateModalOpen(true);
  };

  const handleSavePayment = (paymentAmount) => {
    if (!selectedStudent || !paymentAmount) return;
    const amountNum = parseFloat(paymentAmount);
    
    setFeeRecords(prev => prev.map(s => {
      if (s.id === selectedStudent.id) {
        const newPaid = s.paidAmount + amountNum;
        const newPending = Math.max(0, s.totalFees - newPaid);
        return {
          ...s,
          paidAmount: newPaid,
          pendingAmount: newPending,
          status: newPending <= 0 ? 'Paid' : 'Partial'
        };
      }
      return s;
    }));
    setIsUpdateModalOpen(false);
  };

  const getStatColor = (color) => {
    switch(color) {
      case 'indigo': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'emerald': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'rose': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'violet': return 'text-violet-400 bg-violet-500/10 border-violet-500/20';
      default: return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Fee Management</h1>
          <p className="text-muted-foreground mt-1">Track institutional revenue and installments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-border/50 gap-2"><Download className="w-4 h-4" />Export</Button>
          <Button className="rounded-xl gradient-indigo text-white gap-2 shadow-lg shadow-indigo-500/20"><FileText className="w-4 h-4" />Settings</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {feeStats.map((stat, idx) => {
          const colors = getStatColor(stat.color);
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colors.split(' ')[1])}>
                      <Wallet className={cn("w-5 h-5", colors.split(' ')[0])} />
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
                <AreaChart data={monthlyFeeTrend}>
                  <defs><linearGradient id="colorColl" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 15, 35, 0.9)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="collected" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorColl)" />
                  <Area type="monotone" dataKey="pending" stroke="#f43f5e" strokeWidth={3} fill="transparent" strokeDasharray="5 5" />
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
                  <p className="text-sm font-medium text-foreground leading-snug">Fee collection improved by 12% compared to last month.</p>
               </div>
               <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                  <div className="flex items-center gap-3 mb-2"><AlertCircle className="w-4 h-4 text-rose-400" /><span className="text-xs font-bold text-rose-400 uppercase">Critical</span></div>
                  <p className="text-sm font-medium text-foreground leading-snug">14 students have overdue payments exceeding 30 days.</p>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 border-b border-border bg-muted/20">
             <div className="relative flex-1 max-w-md group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-emerald-400 transition-colors" />
               <input type="text" placeholder="Search student fee records..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border outline-none text-sm" />
             </div>
          </div>
          {/* Mobile Card View (Hidden on Desktop) */}
          <div className="md:hidden divide-y divide-border">
            {filteredFees.map((s, idx) => (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 space-y-4 bg-card/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{s.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{s.id}</p>
                    </div>
                  </div>
                  <Badge variant={s.status === 'Paid' ? 'success' : s.status === 'Overdue' ? 'destructive' : 'warning'}>
                    {s.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-emerald-500">Paid: ₹{s.paidAmount.toLocaleString()}</span>
                    <span className="text-rose-400">Due: ₹{s.pendingAmount.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${(s.paidAmount / s.totalFees) * 100}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-xs font-bold text-foreground">Total: ₹{s.totalFees.toLocaleString()}</span>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/fees/${s.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg gap-2 text-indigo-400">
                        <History className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase">History</span>
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleUpdateClick(s)}
                      className="h-8 px-3 rounded-lg gap-2 border-emerald-500/20 text-emerald-500"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase">Pay</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Table View (Hidden on Mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Student Details</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Fees</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Paid / Pending</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredFees.map((s, idx) => (
                  <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="hover:bg-emerald-500/5 transition-colors">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-muted-foreground">{s.name.charAt(0)}</div><div><p className="text-sm font-bold text-foreground">{s.name}</p><p className="text-xs text-muted-foreground">{s.id}</p></div></div></td>
                    <td className="px-6 py-4 font-bold text-sm">₹{s.totalFees?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold uppercase"><span className="text-emerald-500">Paid: ₹{s.paidAmount?.toLocaleString()}</span><span className="text-rose-400">Due: ₹{s.pendingAmount?.toLocaleString()}</span></div>
                        <div className="w-32 h-1 bg-muted rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${(s.paidAmount / s.totalFees) * 100}%` }} /></div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><Badge variant={s.status === 'Paid' ? 'success' : s.status === 'Overdue' ? 'destructive' : 'warning'}>{s.status}</Badge></td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <Link to={`/admin/fees/${s.id}`}><Button variant="ghost" size="sm" className="h-9 px-3 rounded-xl gap-2 hover:bg-indigo-500/10 text-indigo-400"><History className="w-4 h-4" />History</Button></Link>
                         <Button variant="outline" size="sm" onClick={() => handleUpdateClick(s)} className="h-9 px-4 rounded-xl gap-2 border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-500 font-bold"><CreditCard className="w-4 h-4" />Record Payment</Button>
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
        {isUpdateModalOpen && <UpdateFeeModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} student={selectedStudent} onUpdate={handleSavePayment} />}
      </AnimatePresence>
    </div>
  );
}

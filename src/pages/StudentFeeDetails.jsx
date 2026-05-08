import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  CreditCard, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Download, 
  History,
  Printer,
  AlertCircle,
  X,
  Plus
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { studentFees } from '../data/mockData';
import { cn } from '../lib/utils';

// --- Local Modal Component ---
const UpdateFeeModal = ({ isOpen, onClose, student, onUpdate }) => {
  const [amount, setAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [method, setMethod] = useState('UPI');

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-card border border-border shadow-2xl rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between gradient-emerald text-white">
          <div><h3 className="text-xl font-bold">Record Payment</h3><p className="text-white/70 text-xs mt-1">Updating fees for {student.name}</p></div>
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

export default function StudentFeeDetails() {
  const { id } = useParams();
  const [feeRecord, setFeeRecord] = useState(studentFees.find(f => f.id === id));
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!feeRecord) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4 opacity-20" />
        <h2 className="text-2xl font-bold text-foreground">Record Not Found</h2>
        <p className="text-muted-foreground mt-2">Financial records for this student ID could not be located.</p>
        <Link to="/admin/fees" className="mt-6">
          <Button variant="outline" className="rounded-xl">Back to Fee Dashboard</Button>
        </Link>
      </div>
    );
  }

  const handleUpdateFee = (amount) => {
    const amountNum = parseFloat(amount);
    const newPaid = feeRecord.paidAmount + amountNum;
    const newPending = Math.max(0, feeRecord.totalFees - newPaid);
    
    setFeeRecord({
      ...feeRecord,
      paidAmount: newPaid,
      pendingAmount: newPending,
      status: newPending <= 0 ? 'Paid' : 'Partial'
    });
    setIsModalOpen(false);
  };

  const completionPercentage = (feeRecord.paidAmount / feeRecord.totalFees) * 100;

  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link to="/admin/fees">
          <Button variant="ghost" className="rounded-xl gap-2 text-muted-foreground hover:text-indigo-400">
            <ArrowLeft className="w-4 h-4" />
            Back to Fees
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Button onClick={() => setIsModalOpen(true)} className="rounded-xl gradient-indigo text-white gap-2 shadow-lg shadow-indigo-500/20 px-6 h-11 font-bold">
            <Plus className="w-4 h-4" />
            Record Payment
          </Button>
          <Button variant="outline" className="rounded-xl gap-2 border-border/50 h-11">
            <Printer className="w-4 h-4" />
            Print Ledger
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-xl">
             <CardContent className="p-0">
                <div className="p-8 text-center border-b border-border bg-muted/20">
                   <div className="w-20 h-20 rounded-3xl gradient-emerald mx-auto flex items-center justify-center text-3xl font-extrabold text-white shadow-xl mb-6">
                     {feeRecord.name.charAt(0)}
                   </div>
                   <h2 className="text-2xl font-bold text-foreground">{feeRecord.name}</h2>
                   <p className="text-sm text-muted-foreground mt-1 font-medium">{feeRecord.id}</p>
                   <Badge variant={feeRecord.status === 'Paid' ? 'success' : 'warning'} className="mt-4 rounded-full px-4">
                     {feeRecord.status} Status
                   </Badge>
                </div>
                <div className="p-8 space-y-6">
                   <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                         <span>Payment Progress</span>
                         <span className="text-foreground">{Math.round(completionPercentage)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${completionPercentage}%` }} />
                      </div>
                   </div>
                   <div className="grid grid-cols-1 gap-4 pt-4">
                      <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Course Fee</p>
                         <p className="text-xl font-bold text-foreground mt-1">₹{feeRecord.totalFees.toLocaleString()}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                         <p className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest">Total Paid</p>
                         <p className="text-xl font-bold text-emerald-500 mt-1">₹{feeRecord.paidAmount.toLocaleString()}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                         <p className="text-[10px] font-bold text-rose-500/60 uppercase tracking-widest">Total Pending</p>
                         <p className="text-xl font-bold text-rose-500 mt-1">₹{feeRecord.pendingAmount.toLocaleString()}</p>
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
           <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
             <CardContent className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-8 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  Installment Tracking
                </h3>
                <div className="space-y-4">
                   {feeRecord.installments.map((inst, idx) => (
                     <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-border bg-muted/20 group hover:border-indigo-500/30 transition-all gap-4">
                        <div className="flex items-center gap-4">
                           <div className={cn(
                             "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm",
                             inst.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                           )}>
                             {inst.status === 'Paid' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                           </div>
                           <div>
                              <p className="text-base font-bold text-foreground">{inst.month} Installment</p>
                              <p className="text-xs text-muted-foreground">Due Date: {inst.date}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6 justify-between sm:justify-end">
                           <div className="text-right">
                              <p className="text-lg font-bold text-foreground">₹{inst.amount.toLocaleString()}</p>
                              <Badge variant={inst.status === 'Paid' ? 'success' : 'warning'} className="mt-1">
                                {inst.status}
                              </Badge>
                           </div>
                           <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-indigo-500/10 hover:text-indigo-400">
                              <Download className="w-5 h-5" />
                           </Button>
                        </div>
                     </div>
                   ))}
                </div>
             </CardContent>
           </Card>

           <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
             <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <History className="w-5 h-5 text-emerald-400" />
                    Transaction History
                  </h3>
                </div>
                <div className="overflow-hidden rounded-2xl border border-border">
                   <table className="w-full">
                      <thead>
                         <tr className="bg-muted/50 border-b border-border">
                            <th className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase">Receipt ID</th>
                            <th className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase">Date</th>
                            <th className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase">Method</th>
                            <th className="px-6 py-4 text-right text-[10px] font-bold text-muted-foreground uppercase">Amount</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                         {feeRecord.history.map((tx) => (
                           <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                              <td className="px-6 py-4 text-sm font-bold text-indigo-400">{tx.id}</td>
                              <td className="px-6 py-4 text-sm text-foreground">{tx.date}</td>
                              <td className="px-6 py-4">
                                 <Badge variant="secondary" className="rounded-lg font-medium">{tx.method}</Badge>
                              </td>
                              <td className="px-6 py-4 text-right font-bold text-sm text-emerald-500">₹{tx.amount.toLocaleString()}</td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && <UpdateFeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} student={feeRecord} onUpdate={handleUpdateFee} />}
      </AnimatePresence>
    </div>
  );
}

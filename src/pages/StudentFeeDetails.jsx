import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';
import api from '../lib/axios';

export default function StudentFeeDetails() {
  const [feeRecords, setFeeRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userRole = localStorage.getItem('role');
  const isStudent = userRole === 'STUDENT';

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      // Students fetch their own fees, Admins fetch specific student fees
      const endpoint = isStudent ? '/fees/my-fees' : `/fees`; 
      const response = await api.get(endpoint);
      setFeeRecords(response.data);
    } catch (err) {
      console.error("Failed to fetch fee details", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-muted-foreground font-medium text-sm">Accessing financial records...</p>
      </div>
    );
  }

  const primaryRecord = feeRecords[0] || null;

  if (!primaryRecord && isStudent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="w-16 h-16 text-indigo-500 mb-4 opacity-20" />
        <h2 className="text-2xl font-bold text-foreground">No Fee Records Found</h2>
        <p className="text-muted-foreground mt-2 text-sm">Your financial profile is currently being initialized by the administration.</p>
      </div>
    );
  }

  const completionPercentage = primaryRecord ? (primaryRecord.paidAmount / primaryRecord.totalAmount) * 100 : 0;

  return (
    <div className="space-y-8 animate-in pb-10">
      {!isStudent && (
        <div className="flex items-center justify-between">
          <Link to="/admin/fees">
            <Button variant="ghost" className="rounded-xl gap-2 text-muted-foreground hover:text-indigo-400">
              <ArrowLeft className="w-4 h-4" />
              Back to Fee Dashboard
            </Button>
          </Link>
        </div>
      )}

      {isStudent && (
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Financial Ledger</h1>
          <p className="text-muted-foreground mt-1 text-sm">Detailed overview of your course fees and payment history</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Summary */}
        <div className="lg:col-span-1">
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-xl sticky top-24">
             <CardContent className="p-0">
                <div className="p-8 text-center border-b border-border bg-muted/20">
                   <div className="w-20 h-20 rounded-[2rem] gradient-indigo mx-auto flex items-center justify-center text-3xl font-extrabold text-white shadow-xl mb-6">
                     {primaryRecord?.studentName?.charAt(0)}
                   </div>
                   <h2 className="text-2xl font-bold text-foreground">{primaryRecord?.studentName}</h2>
                   <p className="text-xs text-muted-foreground mt-2 font-bold uppercase tracking-widest">Enrollment Status</p>
                   <Badge variant="success" className="mt-2 rounded-full px-4">Active Student</Badge>
                </div>
                <div className="p-8 space-y-8">
                   <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                         <span>Payment Progress</span>
                         <span className="text-indigo-400">{Math.round(completionPercentage)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden shadow-inner">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${completionPercentage}%` }}
                           transition={{ duration: 1 }}
                           className="h-full bg-indigo-500 rounded-full" 
                         />
                      </div>
                   </div>
                   <div className="space-y-4 pt-2">
                      <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Course Fee</p>
                         <p className="text-xl font-bold text-foreground mt-1">₹{primaryRecord?.totalAmount?.toLocaleString()}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                         <p className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest">Total Paid</p>
                         <p className="text-xl font-bold text-emerald-500 mt-1">₹{primaryRecord?.paidAmount?.toLocaleString()}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                         <p className="text-[10px] font-bold text-rose-500/60 uppercase tracking-widest">Outstanding Balance</p>
                         <p className="text-xl font-bold text-rose-500 mt-1">₹{primaryRecord?.balance?.toLocaleString()}</p>
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>

        {/* Right Column: Records */}
        <div className="lg:col-span-2 space-y-8">
           <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
             <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-3">
                    <History className="w-5 h-5 text-indigo-400" />
                    Statement of Account
                  </h3>
                  <Button variant="outline" className="rounded-xl border-border/50 gap-2 h-10 px-4">
                     <Printer className="w-4 h-4" />
                     Print Statement
                  </Button>
                </div>
                
                <div className="space-y-4">
                   {feeRecords.map((fee, idx) => (
                     <div key={fee.id} className="p-6 rounded-2xl border border-border bg-muted/20 hover:border-indigo-500/30 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                           <div className="flex items-center gap-5">
                              <div className={cn(
                                "w-12 h-12 rounded-[1.25rem] flex items-center justify-center shadow-lg",
                                fee.status === 'PAID' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                              )}>
                                {fee.status === 'PAID' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                              </div>
                              <div>
                                 <p className="text-base font-bold text-foreground">Standard Installment</p>
                                 {fee.status !== 'PAID' ? (
                                   <p className="text-xs text-rose-400 mt-1 flex items-center gap-1.5 font-bold">
                                      <Calendar className="w-3 h-3" />
                                      Due on: {new Date(fee.dueDate).toLocaleDateString()}
                                   </p>
                                 ) : (
                                   <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1.5 font-bold">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Payment Successfully Verified
                                   </p>
                                 )}
                              </div>
                           </div>
                           <div className="flex items-center gap-6 justify-between sm:justify-end">
                              <div className="text-right">
                                 <p className="text-lg font-extrabold text-foreground">₹{fee.totalAmount.toLocaleString()}</p>
                                 <Badge variant={fee.status === 'PAID' ? 'success' : 'warning'} className="mt-1 rounded-full">
                                   {fee.status}
                                 </Badge>
                              </div>
                              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-400">
                                 <Download className="w-5 h-5" />
                              </Button>
                           </div>
                        </div>
                        {fee.paymentDate && (
                           <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              Last Payment: {new Date(fee.paymentDate).toLocaleDateString()}
                           </div>
                        )}
                     </div>
                   ))}
                </div>
             </CardContent>
           </Card>

           <Card className="border-border/50 bg-indigo-500/5 backdrop-blur-xl shadow-xl">
             <CardContent className="p-8 flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                   <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                   <h4 className="text-sm font-bold text-foreground">Payment Information</h4>
                   <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                     Payments are recorded by the institution administration. If you have made a payment and it's not reflected here, please submit your transaction ID to the office.
                   </p>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  CreditCard, 
  Trophy, 
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  AlertCircle,
  Loader
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import api from '../lib/axios';
import { cn } from '../lib/utils';

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [fees, setFees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, feesRes] = await Promise.all([
        api.get('/students/me'),
        api.get('/fees/my-fees')
      ]);
      setProfile(profileRes.data);
      setFees(feesRes.data);
    } catch (err) {
      console.error("Failed to fetch student dashboard data", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-background text-foreground">
        <Loader className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-sm font-medium opacity-70">Synchronizing Portal...</p>
      </div>
    );
  }

  const latestFee = fees && fees.length > 0 ? fees[0] : null;
  const isPaid = latestFee?.status === 'PAID';

  return (
    <div className="space-y-8 animate-in pb-10">
      {/* Welcome Header */}
      <div className="relative rounded-[2.5rem] overflow-hidden gradient-emerald p-8 md:p-12 text-white shadow-2xl shadow-emerald-500/20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-grid opacity-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/10 backdrop-blur-md px-4 py-1">
              <Trophy className="w-3.5 h-3.5 mr-2 text-amber-300" />
              Student Portal — Active
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Welcome back, {profile?.firstName || 'Student'}!</h1>
            <p className="mt-4 text-white/80 text-xl font-medium">You are enrolled in <span className="text-white font-bold underline decoration-white/30 underline-offset-4">{profile?.course || 'Your Course'}</span></p>
          </div>
          <Button variant="ghost" size="lg" className="bg-white text-emerald-600 hover:bg-white/90 hover:scale-105 rounded-2xl font-bold px-10 h-16 shadow-2xl text-lg group transition-all duration-300">
            Resume Learning
            <PlayCircle className="ml-2 w-6 h-6 group-hover:rotate-12 transition-transform" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Course Card */}
        <Card className="border-border/50 bg-card backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover-lift group">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-emerald-400" />
              </div>
              <Badge variant="success" className="rounded-full px-4 py-1 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">In Progress</Badge>
            </div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Academic Path</h3>
            <p className="text-2xl font-extrabold text-foreground mt-2">{profile?.course || 'Loading...'}</p>
            <div className="mt-6 h-2 bg-muted rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '45%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" 
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
               <span className="font-bold text-emerald-400">45%</span> course completed
            </p>
          </CardContent>
        </Card>

        {/* Fee Card */}
        <Card className={cn(
          "border-border/50 bg-card backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group hover-lift",
          !isPaid && "border-rose-500/20 shadow-rose-500/10"
        )}>
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm",
                isPaid ? "bg-emerald-500/10" : "bg-rose-500/10"
              )}>
                <CreditCard className={cn("w-7 h-7", isPaid ? "text-emerald-400" : "text-rose-400")} />
              </div>
              {isPaid ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-rose-500 animate-pulse" />
              )}
            </div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Fee Management</h3>
            <div className="mt-2">
               <p className="text-3xl font-extrabold text-foreground">
                 {isPaid ? "Fully Paid" : `₹${latestFee?.balance?.toLocaleString() || '0'}`}
               </p>
               <p className={cn("text-xs mt-1 font-bold", isPaid ? "text-emerald-500" : "text-rose-400")}>
                 {isPaid ? "No outstanding dues" : "Balance Amount Pending"}
               </p>
            </div>
            {!isPaid && (
              <div className="mt-6 p-4 rounded-xl bg-rose-500/5 border border-rose-500/10">
                 <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Action Required</p>
                 <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Please contact office to settle your pending dues.</p>
              </div>
            )}
            {isPaid && (
              <button className="text-xs text-emerald-400 font-bold hover:underline mt-6 flex items-center gap-1 group">
                View Payment Receipt <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </CardContent>
        </Card>

        {/* Institution Card */}
        <Card className="border-border/50 bg-card backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover-lift group">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-indigo-400" />
              </div>
              <Badge variant="outline" className="rounded-full px-4 py-1 border-indigo-500/20 text-indigo-400 bg-indigo-500/5">Regular</Badge>
            </div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Campus Info</h3>
            <p className="text-2xl font-extrabold text-foreground mt-2">{profile?.branch || 'Vyttila Campus'}</p>
            <div className="mt-6 pt-6 border-t border-border/50">
               <div className="flex items-center justify-between text-xs font-bold">
                 <span className="text-muted-foreground uppercase">Enrollment ID</span>
                 <span className="text-indigo-400 font-extrabold">{profile?.id || 'ID-PENDING'}</span>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

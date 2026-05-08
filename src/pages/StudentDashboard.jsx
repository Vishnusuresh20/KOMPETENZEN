import { motion } from 'framer-motion';
import { 
  BookOpen, 
  CreditCard, 
  Trophy, 
  ChevronRight,
  PlayCircle,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

export default function StudentDashboard() {
  const studentName = localStorage.getItem('studentName') || "Arjun Menon";
  const studentCourse = localStorage.getItem('studentCourse') || "Full Stack Development";
  const currentModule = localStorage.getItem('studentModule') || "Backend with Spring Boot";
  
  return (
    <div className="space-y-8 animate-in">
      {/* Welcome Header */}
      <div className="relative rounded-[2rem] overflow-hidden gradient-indigo p-8 md:p-12 text-white shadow-2xl shadow-indigo-500/20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-grid opacity-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/10 backdrop-blur-md">
              <Trophy className="w-3 h-3 mr-2 text-amber-300" />
              Top Performer — May 2024
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Welcome back, {studentName}!</h1>
            <p className="mt-2 text-white/80 text-lg">You are enrolled in the "{studentCourse}" course.</p>
          </div>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-2xl font-bold px-8 h-14 shadow-xl">
            Resume Learning
            <PlayCircle className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-400" />
              </div>
              <Badge variant="success" className="rounded-full">In Progress</Badge>
            </div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Current Module</h3>
            <p className="text-xl font-bold text-foreground mt-1">{currentModule}</p>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[65%] rounded-full" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Active Module Progress</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-emerald-400" />
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Fee Status</h3>
            <p className="text-xl font-bold text-foreground mt-1">All Fees Paid</p>
            <p className="text-xs text-emerald-500 mt-2 font-medium">Receipt: KT-INV-8829</p>
            <button className="text-xs text-indigo-400 font-bold hover:underline mt-4 flex items-center">
              Download Invoice <ChevronRight className="w-3 h-3 ml-1" />
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

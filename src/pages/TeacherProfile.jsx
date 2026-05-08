import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  GraduationCap, 
  Calendar, 
  Clock, 
  Star, 
  Briefcase, 
  BookOpen, 
  Users,
  Award,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Linkedin,
  Github,
  Wallet
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { teachers } from '../data/mockData';
import { cn } from '../lib/utils';

export default function TeacherProfile() {
  const { id } = useParams();
  const teacher = (teachers || []).find(t => t.id === id);

  if (!teacher) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <ShieldCheck className="w-10 h-10 text-muted-foreground opacity-20" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Teacher Not Found</h2>
        <p className="text-muted-foreground mt-2">The record you are looking for does not exist or has been moved.</p>
        <Link to="/dashboard/teachers" className="mt-6">
          <Button variant="outline" className="rounded-xl px-8">Back to Directory</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link to="/dashboard/teachers">
          <Button variant="ghost" className="rounded-xl gap-2 text-muted-foreground hover:text-indigo-400">
            <ArrowLeft className="w-4 h-4" />
            Back to Faculty List
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 border-border/50">
            Export Resume
          </Button>
          <Button className="rounded-xl gradient-indigo text-white gap-2 shadow-lg shadow-indigo-500/20">
            Edit Full Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Basic Info */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-xl text-center">
             <CardContent className="p-0">
                <div className="p-8 border-b border-border bg-muted/20 relative">
                   <div className="absolute top-4 right-4">
                     <Badge variant={teacher.status === 'Active' ? 'success' : 'secondary'} className="rounded-full">
                       {teacher.status}
                     </Badge>
                   </div>
                   <div className={cn(
                     "w-24 h-24 rounded-3xl mx-auto flex items-center justify-center text-4xl font-extrabold text-white shadow-xl mb-6",
                     teacher.avatarColor
                   )}>
                     {teacher.avatar}
                   </div>
                   <h2 className="text-2xl font-bold text-foreground">{teacher.name}</h2>
                   <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mt-1">{teacher.department}</p>
                </div>
                <div className="p-6 space-y-4 text-left">
                   <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-foreground truncate">{teacher.email}</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-foreground">{teacher.phone}</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-foreground">Bangalore, India</span>
                   </div>
                </div>
                <div className="p-6 border-t border-border bg-muted/20 flex items-center justify-center gap-4">
                   <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-indigo-500/10 text-indigo-400">
                     <Linkedin className="w-4 h-4" />
                   </Button>
                   <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-slate-800 text-white">
                     <Github className="w-4 h-4" />
                   </Button>
                </div>
             </CardContent>
          </Card>

          <Card className="border-border/50 bg-indigo-500/5 backdrop-blur-xl shadow-xl">
             <CardContent className="p-6">
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                   <Award className="w-4 h-4 text-indigo-400" />
                   Professional Stats
                </h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Experience</span>
                      <span className="text-xs font-bold text-foreground">{teacher.experience}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Faculty Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-foreground">{teacher.rating} / 5.0</span>
                      </div>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Joined Date</span>
                      <span className="text-xs font-bold text-foreground">{teacher.joiningDate}</span>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>

        {/* Right Column: Academic & Salary Info */}
        <div className="lg:col-span-3 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border/50 bg-emerald-500/5 backdrop-blur-xl shadow-xl border-l-4 border-l-emerald-500">
                 <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Monthly Remuneration</p>
                          <h3 className="text-3xl font-extrabold text-foreground mt-2">{teacher.salary}</h3>
                       </div>
                       <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                          <Wallet className="w-6 h-6" />
                       </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                       Including performance bonuses and HRA. Next appraisal scheduled for June 2024.
                    </p>
                 </CardContent>
              </Card>

              <Card className="border-border/50 bg-violet-500/5 backdrop-blur-xl shadow-xl border-l-4 border-l-violet-500">
                 <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">Active Engagements</p>
                          <h3 className="text-3xl font-extrabold text-foreground mt-2">{teacher.assignedBatches.length} Batches</h3>
                       </div>
                       <div className="w-12 h-12 rounded-2xl bg-violet-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
                          <Users className="w-6 h-6" />
                       </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {teacher.assignedBatches.map(b => (
                         <Badge key={b} variant="outline" className="rounded-lg bg-white/5">{b}</Badge>
                       ))}
                    </div>
                 </CardContent>
              </Card>
           </div>

           <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
              <CardContent className="p-8">
                 <h3 className="text-lg font-bold text-foreground mb-8 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                    Subject Assignments & Expertise
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {teacher.subjects.map((sub, idx) => (
                      <div key={sub} className="p-5 rounded-2xl border border-border bg-muted/20 group hover:border-indigo-500/30 transition-all flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                               0{idx + 1}
                            </div>
                            <div>
                               <p className="text-base font-bold text-foreground">{sub}</p>
                               <p className="text-xs text-muted-foreground">Primary Curriculum</p>
                            </div>
                         </div>
                         <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                         </Button>
                      </div>
                    ))}
                    <div className="p-5 rounded-2xl border border-dashed border-border flex items-center justify-center group cursor-pointer hover:bg-muted/30 transition-all">
                       <p className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Assign New Subject
                       </p>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl overflow-hidden">
              <CardContent className="p-8">
                 <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" />
                    Teaching Schedule
                 </h3>
                 <div className="p-12 text-center border border-dashed border-border rounded-2xl bg-muted/10">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <p className="text-sm text-muted-foreground font-medium italic">Schedule visualization is being updated for May 2024</p>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

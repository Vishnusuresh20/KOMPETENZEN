import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  BookOpen, 
  Calendar, 
  CreditCard,
  User,
  ShieldCheck,
  Edit2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  History
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { students } from '../data/mockData';
import { cn } from '../lib/utils';

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = students.find(s => s.id === id);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4 opacity-20" />
        <h2 className="text-2xl font-bold text-foreground">Student Not Found</h2>
        <p className="text-muted-foreground mt-2">The record you are looking for does not exist or has been removed.</p>
        <Link to="/dashboard/students" className="mt-6">
          <Button variant="outline" className="rounded-xl">Back to Students</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/dashboard/students">
          <Button variant="ghost" className="rounded-xl gap-2 text-muted-foreground hover:text-indigo-400">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 border-border/50">
            <History className="w-4 h-4" />
            View Logs
          </Button>
          <Button className="rounded-xl gradient-indigo text-white gap-2 shadow-lg shadow-indigo-500/20">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col - Info Card */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <div className="h-32 gradient-indigo relative">
                 <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                   <div className="w-24 h-24 rounded-3xl bg-card border-4 border-card shadow-2xl flex items-center justify-center text-3xl font-extrabold text-indigo-400">
                     {student.name.charAt(0)}
                   </div>
                 </div>
              </div>
              <div className="pt-16 pb-8 px-6 text-center">
                <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
                <p className="text-sm text-muted-foreground mt-1 font-medium">{student.id}</p>
                <div className="mt-4 flex justify-center">
                  <Badge variant={student.status === 'Active' ? 'success' : 'secondary'} className="px-4 py-1 rounded-full text-xs">
                    {student.status}
                  </Badge>
                </div>
              </div>
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-foreground">{student.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-foreground">{student.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-foreground">Vyttila, Ernakulam</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Auth Credentials
              </h3>
              <div className="space-y-3 pt-2">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Portal Username</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{student.username}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Access Role</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">Student</p>
                </div>
                <Button variant="outline" className="w-full rounded-xl text-xs font-bold border-border/50">
                  Reset Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col - Details & Timeline */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Current Course</p>
                    <p className="text-base font-semibold text-foreground mt-1">{student.course}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Institutional Branch</p>
                    <p className="text-base font-semibold text-foreground mt-1">{student.branch}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Enrollment Date</p>
                    <p className="text-base font-semibold text-foreground mt-1">{student.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Academic Year</p>
                    <p className="text-base font-semibold text-foreground mt-1">2024 - 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                Financial Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Fees</p>
                  <p className="text-xl font-bold text-foreground mt-1">₹{student.feeAmount.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                  <p className="text-xs font-bold text-emerald-500/60 uppercase tracking-widest">Paid Amount</p>
                  <p className="text-xl font-bold text-emerald-500 mt-1">₹{student.feeAmount.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Balance</p>
                  <p className="text-xl font-bold text-foreground mt-1">₹0</p>
                </div>
              </div>
              
              <div className="space-y-4">
                 <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Payment History</h4>
                 {[
                   { date: 'Apr 12, 2024', amount: student.feeAmount, method: 'Online / UPI', status: 'Success' }
                 ].map((p, idx) => (
                   <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-border bg-background/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">₹{p.amount.toLocaleString()} — Full Payment</p>
                          <p className="text-xs text-muted-foreground">{p.date} • {p.method}</p>
                        </div>
                      </div>
                      <Badge variant="success" className="rounded-full">{p.status}</Badge>
                   </div>
                 ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

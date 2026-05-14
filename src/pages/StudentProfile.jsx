import { useState, useEffect } from 'react';
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
  History,
  Loader2,
  Save,
  X,
  KeyRound
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';
import api from '../lib/axios';

export default function StudentProfile() {
  const { id } = useParams(); // For Admin
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    phone: '',
    address: ''
  });

  const userRole = localStorage.getItem('role');
  const isStudent = userRole === 'STUDENT';

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      // Students fetch their own profile, Admins fetch specific ID
      const endpoint = isStudent ? '/students/me' : `/students/${id}`;
      const response = await api.get(endpoint);
      setStudent(response.data);
      setEditForm({
        phone: response.data.phone || '',
        address: response.data.address || ''
      });
    } catch (err) {
      console.error("Failed to fetch student profile", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const newPassword = prompt(`Enter new password for ${student.firstName}:`);
    if (!newPassword || newPassword.length < 4) {
      if (newPassword) alert("Password must be at least 4 characters.");
      return;
    }
    
    try {
      await api.post(`/students/reset-password-admin/${student.id}`, { newPassword });
      alert("Password reset successfully! The student can now login with the new password.");
    } catch (err) {
      console.error("Failed to reset password", err);
      const errorMsg = err.response?.data?.message || err.message;
      alert(`Failed to reset password: ${errorMsg}`);
    }
  };

  const handleSave = async () => {
    try {
      // Logic for saving (Add backend endpoint later if needed)
      // For now, we simulate success or use existing student update if it works for students
      await api.put(`/students/${student.id}`, {
        ...student,
        phone: editForm.phone,
        address: editForm.address
      });
      setStudent({ ...student, ...editForm });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-muted-foreground font-medium text-sm tracking-wide">Retrieving profile information...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4 opacity-20" />
        <h2 className="text-2xl font-bold text-foreground">Profile Not Found</h2>
        <p className="text-muted-foreground mt-2">The requested student profile could not be retrieved.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in pb-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        {!isStudent ? (
          <Link to="/admin/students">
            <Button variant="ghost" className="rounded-xl gap-2 text-muted-foreground hover:text-indigo-400">
              <ArrowLeft className="w-4 h-4" />
              Back to Students
            </Button>
          </Link>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">My Profile</h1>
            <p className="text-muted-foreground mt-1 text-sm">Manage your personal information</p>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          {!isStudent && (
            <Button 
              onClick={handleResetPassword} 
              variant="outline"
              className="rounded-xl gap-2 h-11 px-6 font-bold border-rose-500/20 text-rose-500 hover:bg-rose-500/10"
            >
              <KeyRound className="w-4 h-4" />
              Reset Password
            </Button>
          )}
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-xl gap-2 h-11 px-6 border-border/50">
                <X className="w-4 h-4" /> Cancel
              </Button>
              <Button onClick={handleSave} className="rounded-xl gradient-emerald text-white gap-2 shadow-lg shadow-emerald-500/20 h-11 px-6 font-bold">
                <Save className="w-4 h-4" /> Save Profile
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="rounded-xl gradient-indigo text-white gap-2 shadow-lg shadow-indigo-500/20 h-11 px-6 font-bold">
              <Edit2 className="w-4 h-4" />
              {isStudent ? 'Edit Contact Info' : 'Edit Student'}
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Identity */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="border-border/50 bg-card backdrop-blur-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover-lift">
            <CardContent className="p-0">
              <div className="h-32 gradient-indigo relative shadow-inner">
                 <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                   <div className="w-24 h-24 rounded-[2rem] bg-card border-4 border-card shadow-2xl flex items-center justify-center text-3xl font-extrabold text-indigo-400">
                     {student.firstName?.charAt(0)}
                   </div>
                 </div>
              </div>
              <div className="pt-16 pb-8 px-6 text-center">
                <h2 className="text-2xl font-bold text-foreground">{student.firstName} {student.lastName}</h2>
                <p className="text-xs text-muted-foreground mt-2 font-bold uppercase tracking-[0.2em]">{student.id}</p>
                <div className="mt-4 flex justify-center">
                  <Badge variant="success" className="px-6 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                    Active Student
                  </Badge>
                </div>
              </div>
              <div className="border-t border-border/50 p-8 space-y-6 bg-muted/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shadow-sm">
                    <Mail className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Primary Email</p>
                    <p className="text-sm font-semibold text-foreground truncate">{student.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shadow-sm">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Phone Number</p>
                    {isEditing ? (
                      <input 
                        value={editForm.phone} 
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="w-full text-sm font-semibold bg-background px-2 py-1 rounded-lg border border-border focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                      />
                    ) : (
                      <p className="text-sm font-semibold text-foreground">{student.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Permanent Address</p>
                    {isEditing ? (
                      <textarea 
                        value={editForm.address} 
                        onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                        className="w-full text-sm font-semibold bg-background px-2 py-1 rounded-lg border border-border focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none" 
                      />
                    ) : (
                      <p className="text-sm font-semibold text-foreground leading-relaxed">{student.address}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Academic & Finance */}
        <div className="lg:col-span-2 space-y-8">
           <Card className="border-border/50 bg-card backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover-lift">
             <CardContent className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-8 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  Course Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Enrolled Course</p>
                        <p className="text-lg font-extrabold text-foreground">{student.course}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Assigned Branch</p>
                        <p className="text-lg font-bold text-foreground">{student.branch}</p>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Admission Date</p>
                        <p className="text-lg font-bold text-foreground">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Academic Cycle</p>
                        <p className="text-lg font-bold text-foreground">2026 - 2027</p>
                      </div>
                   </div>
                </div>
             </CardContent>
           </Card>

           <Card className="border-border/50 bg-card backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover-lift">
             <CardContent className="p-0">
                <div className="p-8 border-b border-border flex items-center justify-between bg-muted/5">
                   <h3 className="text-lg font-bold text-foreground flex items-center gap-3">
                     <CreditCard className="w-5 h-5 text-emerald-400" />
                     Financial Standing
                   </h3>
                   <Link to={isStudent ? "/student/fees" : `/admin/fees/${student.id}`}>
                     <Button variant="outline" className="rounded-xl h-10 px-4 text-xs font-bold gap-2 bg-background">
                       Full Financial History <ArrowRight className="w-3 h-3" />
                     </Button>
                   </Link>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 shadow-sm">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Total Course Value</p>
                      <p className="text-3xl font-extrabold text-foreground mt-2">₹{student.feeAmount?.toLocaleString()}</p>
                   </div>
                   <div className="p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 shadow-sm">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Status Verification</p>
                      <div className="flex items-center gap-3 mt-2">
                         <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                         <span className="text-lg font-bold text-foreground">Account Verified</span>
                      </div>
                   </div>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function ArrowRight({ className }) {
  return <path d="M5 12h14M12 5l7 7-7 7" className={className} />;
}

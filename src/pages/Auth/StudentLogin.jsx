import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles,
  AlertCircle,
  Loader2,
  Building2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

export default function StudentLogin() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    studentId: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call to Spring Boot backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // More flexible validation for demo purposes
      if (formData.studentId && formData.password.length >= 6) {
        localStorage.setItem('role', 'student');
        localStorage.setItem('token', 'mock-student-jwt');
        
        // Simulating finding the student in a database
        // In a real app, the backend would return this info
        let displayName = formData.studentId;
        let displayCourse = 'Full Stack Development';
        let displayModule = 'Backend with Spring Boot';

        if (formData.studentId.toLowerCase().includes('harsha')) {
          displayName = 'Harsha';
          displayCourse = 'JAVA';
          displayModule = 'Java Basics';
        } else if (formData.studentId.toLowerCase().includes('ponnu')) {
          displayName = 'Ponnu';
          displayCourse = 'BCOM';
          displayModule = 'Financial Accounting';
        } else if (formData.studentId.toLowerCase().includes('vishnu')) {
          displayName = 'Vishnu';
        } else if (formData.studentId.length < 10) {
          // Capitalize first letter of any short ID to use as name
          displayName = formData.studentId.charAt(0).toUpperCase() + formData.studentId.slice(1);
        } else {
          displayName = 'Arjun Menon';
        }
        
        localStorage.setItem('studentName', displayName);
        localStorage.setItem('studentCourse', displayCourse);
        localStorage.setItem('studentModule', displayModule);
        
        navigate('/student/dashboard'); 
      } else {
        setError('Invalid Student ID or password. Password must be at least 6 characters.');
      }
    } catch (err) {
      setError('System unavailable. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 shadow-xl mb-6 shadow-emerald-500/20">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Student Portal</h1>
          <p className="text-muted-foreground text-sm">Access your learning dashboard</p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400 leading-relaxed">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Student ID</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-emerald-500 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all placeholder:text-muted-foreground/50"
                    placeholder="e.g. STU-2024-001"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Password</label>
                  <Link to="/auth/forgot-password" size="sm" className="text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
                    Reset Password
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-emerald-500 transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all placeholder:text-muted-foreground/50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 relative overflow-hidden group"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Enter Student Portal</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <div className="px-8 py-4 bg-muted/30 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              Are you an Admin? {' '}
              <Link to="/auth/admin-login" className="font-bold text-emerald-500 hover:text-emerald-400 transition-colors">
                Admin Login
              </Link>
            </p>
          </div>
        </Card>
        
        <div className="mt-8 text-center flex items-center justify-center gap-2">
           <Sparkles className="w-4 h-4 text-emerald-400" />
           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Learning Excellence with Kompetenzen</p>
        </div>
      </motion.div>
    </div>
  );
}

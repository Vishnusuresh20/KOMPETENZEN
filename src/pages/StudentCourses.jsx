import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, PlayCircle, FileText, Lock, Clock, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';
import api from '../lib/axios';

export default function StudentCourses() {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        // 1. Get student profile to find their course
        const profileRes = await api.get('/students/me');
        const courseTitle = profileRes.data.course;
        
        // 2. Fetch all courses and find the one that matches this title
        // Note: In a real app we'd use courseId, but this is a safe bridge
        const coursesRes = await api.get('/courses');
        const matchedCourse = coursesRes.data.find(c => c.title === courseTitle);
        
        if (matchedCourse) {
          // 3. Fetch full details (with modules)
          const detailRes = await api.get(`/courses/${matchedCourse.id}`);
          setCourse(detailRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch syllabus", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSyllabus();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-sm text-muted-foreground font-medium">Loading your syllabus...</p>
      </div>
    );
  }

  const modules = course?.modules || [];
  const courseName = course?.title || "No Course Assigned";

  return (
    <div className="space-y-8 animate-in">
      <div className="pl-6">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">My Courses</h1>
        <p className="text-muted-foreground mt-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          Enrolled in: <span className="font-bold text-foreground">{courseName}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {modules.map((mod, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className={cn(
              "border-border/50 bg-card backdrop-blur-xl shadow-lg hover:shadow-xl group hover:border-indigo-500/20 transition-all",
              idx > 2 && "opacity-85"
            )}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm",
                      idx <= 1 ? "bg-emerald-500/10 text-emerald-500" :
                      idx === 2 ? "bg-indigo-500/10 text-indigo-500" : "bg-slate-500/10 text-slate-400"
                    )}>
                      {idx > 2 ? <Lock className="w-5 h-5 opacity-70" /> : <BookOpen className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base font-bold text-foreground">{mod.title}</h4>
                        <Badge variant={
                          idx <= 1 ? 'success' : 
                          idx === 2 ? 'indigo' : 'secondary'
                        } className="text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest">
                          {idx <= 1 ? 'Completed' : idx === 2 ? 'In Progress' : 'Locked'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium line-clamp-1">
                        {mod.description || "Module documentation and resources available."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="text-xs font-bold gap-2 hover:bg-indigo-500/10 text-indigo-500 rounded-xl px-4">
                      <FileText className="w-4 h-4" />
                      Materials
                    </Button>
                    <Button 
                      disabled={idx > 2}
                      className={cn(
                        "rounded-xl font-bold gap-2 px-6 h-10 shadow-sm transition-all",
                        idx === 2 ? "gradient-indigo text-white shadow-indigo-500/20 hover:scale-105" : 
                        idx <= 1 ? "gradient-emerald text-white shadow-emerald-500/20 hover:scale-105" :
                        "bg-slate-400 text-white opacity-90 cursor-not-allowed"
                      )}
                    >
                      {idx <= 1 ? 'Review' : idx === 2 ? 'Continue' : 'Locked'}
                      {idx <= 2 && <PlayCircle className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-6 h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: idx <= 1 ? '100%' : idx === 2 ? '45%' : '0%' }}
                    transition={{ duration: 1, delay: idx * 0.1 + 0.5 }}
                    className={cn(
                      "h-full rounded-full",
                      idx <= 1 ? "bg-emerald-500" : "bg-indigo-500"
                    )} 
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

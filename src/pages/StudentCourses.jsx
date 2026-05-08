import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, PlayCircle, FileText, Lock, Clock } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

export default function StudentCourses() {
  const courseName = localStorage.getItem('studentCourse') || "Full Stack Development";
  
  const modules = [
    { title: 'Introduction to Programming', status: 'Completed', lessons: 12, totalLessons: 12, color: 'emerald' },
    { title: 'Database Design & SQL', status: 'Completed', lessons: 8, totalLessons: 8, color: 'emerald' },
    { title: 'Backend with Spring Boot', status: 'In Progress', lessons: 12, totalLessons: 18, color: 'indigo' },
    { title: 'Frontend with React', status: 'Locked', lessons: 0, totalLessons: 20, color: 'slate' },
    { title: 'Project Management & Deployment', status: 'Locked', lessons: 0, totalLessons: 10, color: 'slate' },
  ];

  return (
    <div className="space-y-8 animate-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">My Courses</h1>
        <p className="text-muted-foreground mt-1 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          Enrolled in: <span className="font-bold text-foreground">{courseName}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {modules.map((mod, idx) => (
          <motion.div
            key={mod.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className={cn(
              "border-border/50 bg-card/50 backdrop-blur-xl shadow-xl group hover:border-emerald-500/20 transition-all",
              mod.status === 'Locked' && "opacity-60"
            )}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                      mod.status === 'Completed' ? "bg-emerald-500/10 text-emerald-400" :
                      mod.status === 'In Progress' ? "bg-indigo-500/10 text-indigo-400" : "bg-slate-500/10 text-slate-400"
                    )}>
                      {mod.status === 'Locked' ? <Lock className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-foreground">{mod.title}</h3>
                        <Badge variant={
                          mod.status === 'Completed' ? 'success' : 
                          mod.status === 'In Progress' ? 'indigo' : 'secondary'
                        } className="text-[10px]">
                          {mod.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {mod.lessons} of {mod.totalLessons} lessons completed · {((mod.lessons/mod.totalLessons)*100).toFixed(0)}% Overall Progress
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="text-xs font-bold gap-2 hover:bg-emerald-500/10 text-emerald-400">
                      <FileText className="w-4 h-4" />
                      Materials
                    </Button>
                    <Button 
                      disabled={mod.status === 'Locked'}
                      className={cn(
                        "rounded-xl font-bold gap-2 px-6",
                        mod.status === 'In Progress' ? "gradient-indigo text-white shadow-lg shadow-indigo-500/20" : "bg-muted/50 text-muted-foreground"
                      )}
                    >
                      {mod.status === 'Completed' ? 'Review' : mod.status === 'In Progress' ? 'Continue' : 'Locked'}
                      {mod.status !== 'Locked' && <PlayCircle className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-6 h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(mod.lessons/mod.totalLessons)*100}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 + 0.5 }}
                    className={cn(
                      "h-full rounded-full",
                      mod.status === 'Completed' ? "bg-emerald-500" : "bg-indigo-500"
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

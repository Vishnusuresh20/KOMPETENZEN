import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Video, Users } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function StudentSchedule() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const currentCourse = localStorage.getItem('studentCourse') || "Full Stack Development";

  return (
    <div className="space-y-8 animate-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Academic Schedule</h1>
        <p className="text-muted-foreground mt-1 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          Standard Session Time: <span className="font-bold text-foreground">11:00 AM - 01:00 PM</span>
        </p>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden border-l-4 border-l-emerald-500">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-foreground">Current Weekly Timetable</h3>
              <p className="text-sm text-muted-foreground">Main Institution · Batch 2024-A</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-bold">
               <CalendarIcon className="w-4 h-4" />
               Mon - Fri Active
            </div>
          </div>

          <div className="space-y-4">
            {days.map((day, idx) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-muted/20 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all cursor-default"
              >
                <div className="flex items-center gap-6">
                  <div className="w-32">
                    <span className="text-sm font-extrabold text-foreground tracking-wider uppercase">{day}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                       {currentCourse} - Live Session
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                       <Users className="w-3.5 h-3.5" />
                       Instructor: Dr. Renu Das
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-right">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground">11:00 AM - 01:00 PM</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Duration: 2 Hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Badge variant="outline" className="rounded-lg gap-1.5 border-border py-1.5 px-3">
                        <Video className="w-3.5 h-3.5 text-indigo-400" />
                        Online Zoom
                     </Badge>
                     <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 py-1.5 px-4 rounded-xl font-bold shadow-lg shadow-emerald-500/20">
                        Join Class
                     </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

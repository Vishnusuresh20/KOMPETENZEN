import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Video, Users, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import api from '../lib/axios';

export default function StudentSchedule() {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/students/me');
        setStudent(response.data);
      } catch (err) {
        console.error("Failed to fetch schedule profile", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-muted-foreground font-medium text-sm tracking-wide">Loading schedule...</p>
      </div>
    );
  }

  const currentCourse = student?.course || "Full Stack Development";
  const timeSlot = student?.timeSlot || "11:00 AM - 01:00 PM";

  const getInstructor = (courseName) => {
    const course = courseName?.toLowerCase() || "";
    if (course.includes('java') || course.includes('python')) return "Nafia Shefin";
    if (course.includes('science') || course.includes('design') || course.includes('ui') || course.includes('ux')) return "Akhil";
    return "Ananthu"; 
  };

  const instructorName = getInstructor(currentCourse);

  return (
    <div className="space-y-8 animate-in">
      <div className="pl-6 md:pl-7 lg:pl-9">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Academic Schedule</h1>
        <p className="text-muted-foreground mt-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          Standard Session Time: <span className="font-bold text-foreground">{timeSlot}</span>
        </p>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden border-l-4 border-l-emerald-500">
        <CardContent className="p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-foreground">Current Weekly Timetable</h3>
              <p className="text-sm text-muted-foreground">Main Institution · Batch 2026-A</p>
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
                <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-6">
                  <div className="md:w-24 lg:w-32 shrink-0">
                    <span className="text-xs md:text-sm font-black text-emerald-400 md:text-foreground tracking-widest uppercase">
                      {day}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg md:text-base font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                       {currentCourse} - Live Session
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                       <Users className="w-3.5 h-3.5" />
                       Instructor: {instructorName}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-6 md:text-right">
                  <div className="flex flex-col md:items-end shrink-0">
                    <span className="text-sm font-bold text-foreground">{timeSlot}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Duration: 2 Hours</span>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                     <Badge variant="outline" className="flex-1 md:flex-none justify-center rounded-lg gap-1.5 border-border py-1.5 px-3">
                        <Video className="w-3.5 h-3.5 text-emerald-400" />
                        Google Meet
                     </Badge>
                     <a 
                       href="https://meet.google.com/xmh-skxv-uav" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex-1 md:flex-none"
                     >
                       <Badge className="w-full justify-center bg-emerald-500 hover:bg-emerald-600 text-white border-0 py-1.5 px-4 rounded-xl font-bold shadow-lg shadow-emerald-500/20 cursor-pointer transition-transform hover:scale-105 active:scale-95">
                          Join Class
                       </Badge>
                     </a>
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

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  GraduationCap, 
  UserPlus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  X,
  ChevronRight,
  UserCheck,
  BookOpen,
  IndianRupee,
  Star
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';
import { teachers } from '../data/mockData';
import { Link } from 'react-router-dom';

// --- Modals ---

const TeacherModal = ({ isOpen, onClose, teacher, mode = 'add' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-3xl overflow-hidden"
      >
        <div className={cn(
          "p-6 border-b border-border flex items-center justify-between",
          mode === 'add' ? 'gradient-indigo' : 'gradient-emerald'
        )}>
          <div>
            <h3 className="text-xl font-bold text-white">
              {mode === 'add' ? 'Register New Faculty' : 'Edit Teacher Profile'}
            </h3>
            <p className="text-white/70 text-xs mt-1">
              {mode === 'add' ? 'Onboard a new educator to the institution' : `Modifying records for ${teacher?.name}`}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
            <input 
              type="text" 
              defaultValue={teacher?.name}
              placeholder="Dr. John Doe"
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Department</label>
            <select className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all appearance-none">
              <option>Software Engineering</option>
              <option>Digital Arts</option>
              <option>Marketing</option>
              <option>Management</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              defaultValue={teacher?.email}
              placeholder="john@kompetenzen.tech"
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Phone Number</label>
            <input 
              type="tel" 
              defaultValue={teacher?.phone}
              placeholder="+91 00000 00000"
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Monthly Salary (₹)</label>
            <input 
              type="text" 
              defaultValue={teacher?.salary}
              placeholder="75000"
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Experience</label>
            <input 
              type="text" 
              defaultValue={teacher?.experience}
              placeholder="5 Years"
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all"
            />
          </div>
        </div>

        <div className="p-6 border-t border-border bg-muted/30 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="rounded-xl px-6">Cancel</Button>
          <Button className={cn(
            "rounded-xl px-8 text-white shadow-lg",
            mode === 'add' ? 'gradient-indigo shadow-indigo-500/20' : 'gradient-emerald shadow-emerald-500/20'
          )}>
            {mode === 'add' ? 'Onboard Teacher' : 'Save Changes'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const DeleteModal = ({ isOpen, onClose, teacher }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-card border border-border shadow-2xl rounded-3xl overflow-hidden p-8 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-6">
          <Trash2 className="w-10 h-10 text-rose-500" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Offboard Teacher?</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Are you sure you want to remove <span className="font-bold text-foreground">{teacher?.name}</span> from the system? This action will unassign all current batches.
        </p>
        <div className="flex flex-col gap-3">
           <Button variant="destructive" className="w-full rounded-xl py-6 font-bold shadow-lg shadow-rose-500/20">
             Yes, Remove Permanently
           </Button>
           <Button variant="ghost" onClick={onClose} className="w-full rounded-xl py-6">
             No, Keep Record
           </Button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Page ---

export default function Teachers() {
  const [search, setSearch] = useState('');
  const [modalMode, setModalMode] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const filteredTeachers = useMemo(() => {
    return (teachers || []).filter(t => 
      t.name.toLowerCase().includes(search.toLowerCase()) || 
      t.department.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleAction = (teacher, mode) => {
    setSelectedTeacher(teacher);
    setModalMode(mode);
    if (mode === 'delete') {
      setIsDeleteOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Faculty Management</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            Managing {teachers.length} professional educators
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Button variant="outline" className="rounded-xl border-border/50 gap-2">
            <BookOpen className="w-4 h-4" />
            Curriculum Map
          </Button>
          <Button 
            onClick={() => handleAction(null, 'add')}
            className="rounded-xl gradient-indigo text-white gap-2 shadow-lg shadow-indigo-500/20"
          >
            <UserPlus className="w-4 h-4" />
            Add New Teacher
          </Button>
        </motion.div>
      </div>

      {/* Faculty Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-border/50 bg-indigo-500/5 backdrop-blur-xl">
           <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Active Faculty</p>
                 <h3 className="text-2xl font-bold text-foreground">24 Educators</h3>
              </div>
           </CardContent>
         </Card>
         <Card className="border-border/50 bg-emerald-500/5 backdrop-blur-xl">
           <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Star className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Avg. Rating</p>
                 <h3 className="text-2xl font-bold text-foreground">4.8 / 5.0</h3>
              </div>
           </CardContent>
         </Card>
         <Card className="border-border/50 bg-violet-500/5 backdrop-blur-xl">
           <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
                <IndianRupee className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">Payroll Outflow</p>
                 <h3 className="text-2xl font-bold text-foreground">₹3.2L / Mo</h3>
              </div>
           </CardContent>
         </Card>
      </div>

      {/* Main Listing */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
             <div className="relative flex-1 max-w-md group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search by name, department or subject..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all text-sm"
               />
             </div>
             <div className="flex items-center gap-2">
                <Button variant="ghost" className="rounded-xl gap-2 text-muted-foreground hover:text-indigo-400">
                  <Filter className="w-4 h-4" />
                  Filter Dept.
                </Button>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Educator Details</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Expertise</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTeachers.map((t, idx) => (
                  <motion.tr 
                    key={t.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-indigo-500/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-md", t.avatarColor)}>
                          {t.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground group-hover:text-indigo-400 transition-colors">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                        {t.subjects.map(s => (
                          <span key={s} className="px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-[10px] font-bold">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col">
                         <span className="text-sm font-bold text-foreground">{t.experience}</span>
                         <span className="text-[10px] text-muted-foreground">Joined {new Date(t.joiningDate).getFullYear()}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <Badge variant={t.status === 'Active' ? 'success' : 'secondary'} className="rounded-full">
                         {t.status}
                       </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <Link to={`/dashboard/teachers/${t.id}`}>
                           <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:text-indigo-400">
                             <ChevronRight className="w-4 h-4" />
                           </Button>
                         </Link>
                         <Button 
                           variant="ghost" 
                           size="icon" 
                           onClick={() => handleAction(t, 'edit')}
                           className="w-8 h-8 rounded-lg hover:text-emerald-400"
                         >
                           <Edit2 className="w-4 h-4" />
                         </Button>
                         <Button 
                           variant="ghost" 
                           size="icon" 
                           onClick={() => handleAction(t, 'delete')}
                           className="w-8 h-8 rounded-lg hover:text-rose-400"
                         >
                           <Trash2 className="w-4 h-4" />
                         </Button>
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isModalOpen && (
          <TeacherModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            teacher={selectedTeacher}
            mode={modalMode}
          />
        )}
        {isDeleteOpen && (
          <DeleteModal 
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            teacher={selectedTeacher}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

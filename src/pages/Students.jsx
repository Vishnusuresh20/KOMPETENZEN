import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Building,
  CheckCircle2,
  XCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';
import { students as initialStudents, branches } from '../data/mockData';
import { Link } from 'react-router-dom';

// --- Student Form Modal ---
const StudentModal = ({ isOpen, onClose, student, onSave }) => {
  const [formData, setFormData] = useState(student || {
    name: '',
    email: '',
    phone: '',
    course: '',
    branch: branches[0],
    username: '',
    password: '',
    confirmPassword: '',
    feeAmount: '',
    status: 'Active'
  });

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
        <div className="p-6 border-b border-border flex items-center justify-between gradient-indigo">
          <h3 className="text-xl font-bold text-white">{student ? 'Edit Student' : 'Add New Student'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Phone Number</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+91 0000000000"
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Course</label>
              <input 
                type="text" 
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                placeholder="e.g. Full Stack Dev"
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Institution Branch</label>
              <select 
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all appearance-none"
              >
                {branches.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Fee Amount (₹)</label>
              <input 
                type="number" 
                value={formData.feeAmount}
                onChange={(e) => setFormData({...formData, feeAmount: e.target.value})}
                placeholder="45000"
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all"
              />
            </div>
            
            <div className="md:col-span-2 border-t border-border pt-6 mt-2">
              <h4 className="text-sm font-bold text-foreground mb-4">Credentials</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Username</label>
                  <input 
                    type="text" 
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    placeholder="john_doe"
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all"
                  />
                </div>
                {!student && (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Password</label>
                      <input 
                        type="password" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Confirm Password</label>
                      <input 
                        type="password" 
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border bg-muted/30 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="rounded-xl px-6">Cancel</Button>
          <Button onClick={() => onSave(formData)} className="rounded-xl px-8 gradient-indigo text-white shadow-lg shadow-indigo-500/20">
            {student ? 'Save Changes' : 'Create Student'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Page ---
export default function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                           s.email.toLowerCase().includes(search.toLowerCase()) ||
                           s.id.toLowerCase().includes(search.toLowerCase());
      const matchesBranch = branchFilter === 'All' || s.branch === branchFilter;
      return matchesSearch && matchesBranch;
    });
  }, [students, search, branchFilter]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAdd = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSave = (data) => {
    if (selectedStudent) {
      setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, ...data } : s));
    } else {
      const newStudent = {
        ...data,
        id: `STU-2024-00${students.length + 1}`,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setStudents([...students, newStudent]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Student Management</h1>
          <p className="text-muted-foreground mt-1">Manage enrollments, branches and student credentials</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-border/50 gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button onClick={handleAdd} className="rounded-xl gradient-indigo text-white gap-2 shadow-lg shadow-indigo-500/20">
            <Plus className="w-4 h-4" />
            Add Student
          </Button>
        </div>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-xl">
        <CardContent className="p-0">
          {/* Table Header / Filters */}
          <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search by name, ID or email..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background border border-border">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select 
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-medium text-foreground pr-4"
                >
                  <option value="All">All Branches</option>
                  {branches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Card View (Hidden on Desktop) */}
          <div className="md:hidden divide-y divide-border">
            {paginatedStudents.map((s, idx) => (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 space-y-4 bg-card/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-indigo flex items-center justify-center text-white font-bold">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{s.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{s.id}</p>
                    </div>
                  </div>
                  <Badge variant={s.status === 'Active' ? 'success' : 'secondary'}>{s.status}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-2">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Course</p>
                    <p className="text-xs font-medium text-foreground">{s.course}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Branch</p>
                    <p className="text-xs font-medium text-foreground">{s.branch}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-[10px] text-muted-foreground">Joined: {s.joinDate}</span>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/students/${s.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-indigo-400">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(s)} className="h-8 w-8 p-0 rounded-lg text-emerald-400">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(s.id)} className="h-8 w-8 p-0 rounded-lg text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Table View (Hidden on Mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Course & Branch</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Joined Date</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <AnimatePresence>
                  {paginatedStudents.map((s, idx) => (
                    <motion.tr 
                      key={s.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group hover:bg-indigo-500/5 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl gradient-indigo flex items-center justify-center text-white font-bold shadow-md">
                            {s.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-foreground">{s.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                              <Mail className="w-3 h-3" />
                              {s.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-foreground">{s.course}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                          <Building className="w-3 h-3 text-indigo-400" />
                          {s.branch}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={s.status === 'Active' ? 'success' : 'secondary'} className="rounded-full">
                          {s.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {s.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/admin/students/${s.id}`}>
                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-muted-foreground hover:text-indigo-400">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit(s)}
                            className="w-8 h-8 rounded-lg text-muted-foreground hover:text-emerald-400"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(s.id)}
                            className="w-8 h-8 rounded-lg text-muted-foreground hover:text-rose-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {paginatedStudents.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-4">
                        <Search className="w-12 h-12 opacity-10" />
                        <p>No students found matching your search.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/10">
            <p className="text-xs text-muted-foreground font-medium">
              Showing <span className="text-foreground">{paginatedStudents.length}</span> of <span className="text-foreground">{filteredStudents.length}</span> students
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="w-9 h-9 rounded-xl disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                      currentPage === i + 1 
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" 
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="w-9 h-9 rounded-xl disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isModalOpen && (
          <StudentModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            student={selectedStudent}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

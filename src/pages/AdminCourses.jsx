import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ChevronRight,
  Loader2,
  PlusCircle,
  GripVertical,
  X,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import api from '../lib/axios';
import { cn } from '../lib/utils';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    feeAmount: '',
    credits: '',
    timeSlot: '',
    modules: []
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddModule = () => {
    setFormData({
      ...formData,
      modules: [...formData.modules, { title: '', description: '', orderIndex: formData.modules.length }]
    });
  };

  const handleModuleChange = (index, field, value) => {
    const newModules = [...formData.modules];
    newModules[index][field] = value;
    setFormData({ ...formData, modules: newModules });
  };

  const handleRemoveModule = (index) => {
    const newModules = formData.modules.filter((_, i) => i !== index);
    setFormData({ ...formData, modules: newModules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        feeAmount: parseFloat(formData.feeAmount) || 0,
        credits: parseInt(formData.credits) || 0,
        modules: formData.modules.map((m, idx) => ({
          ...m,
          orderIndex: m.orderIndex || idx
        }))
      };

      if (editingCourse) {
        await api.put(`/courses/${editingCourse.id}`, payload);
      } else {
        await api.post('/courses', payload);
      }
      setIsModalOpen(false);
      fetchCourses();
      resetForm();
    } catch (err) {
      console.error("Failed to save course", err);
      const message = err.response?.data?.message || "Failed to connect to the server. Please check your connection.";
      alert(`Error: ${message}`);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', feeAmount: '', credits: '', modules: [] });
    setEditingCourse(null);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description || '',
      feeAmount: course.feeAmount,
      credits: course.credits || '',
      timeSlot: course.timeSlot || '',
      modules: course.modules || []
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete(`/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.error("Failed to delete course", err);
    }
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Course Management</h1>
          <p className="text-muted-foreground mt-1">Manage institutional curriculum and syllabus modules</p>
        </div>
        <Button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="gradient-indigo text-white rounded-xl gap-2 h-12 px-6 shadow-lg shadow-indigo-500/20 font-bold border-0"
        >
          <Plus className="w-5 h-5" />
          Create New Course
        </Button>
      </div>

      {/* Search & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-indigo-400 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input 
            type="text"
            placeholder="Search courses by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
          />
        </div>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
               </div>
               <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Courses</p>
                  <p className="text-xl font-bold text-foreground">{courses.length}</p>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Grid */}
      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
          <p className="text-sm text-muted-foreground font-medium">Loading curriculum...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="group border-border/50 bg-card hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 overflow-hidden rounded-[2rem]">
                <CardContent className="p-0">
                   <div className="h-24 gradient-indigo opacity-80" />
                   <div className="p-8 -mt-12 relative">
                      <div className="w-16 h-16 rounded-2xl bg-card border-4 border-card shadow-xl flex items-center justify-center mb-4">
                        <BookOpen className="w-8 h-8 text-indigo-400" />
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-indigo-400 transition-colors">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(course)} className="rounded-lg h-8 w-8 hover:bg-indigo-500/10 text-indigo-400">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)} className="rounded-lg h-8 w-8 hover:bg-rose-500/10 text-rose-500">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-6">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Fee</span>
                           <span className="text-lg font-bold text-foreground">₹{course.feeAmount?.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col text-right">
                           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Schedule</span>
                           <span className="text-sm font-bold text-indigo-400">{course.timeSlot || '11:00 AM - 01:00 PM'}</span>
                        </div>
                      </div>
                   </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-3xl bg-card border border-border shadow-2xl rounded-[2.5rem] relative z-10 overflow-hidden"
            >
              <div className="p-8 border-b border-border flex items-center justify-between bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <Edit2 className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">
                    {editingCourse ? 'Edit Course Curriculum' : 'Create New Course'}
                  </h2>
                </div>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-full h-10 w-10 p-0">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-8 overflow-y-auto max-h-[70vh]">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Course Title</label>
                      <input 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium"
                        placeholder="e.g. Full Stack Web Development"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Course Fee (₹)</label>
                      <input 
                        required
                        type="number"
                        value={formData.feeAmount}
                        onChange={(e) => setFormData({...formData, feeAmount: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium"
                        placeholder="e.g. 45000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Course Credits</label>
                      <input 
                        required
                        type="number"
                        value={formData.credits}
                        onChange={(e) => setFormData({...formData, credits: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium"
                        placeholder="e.g. 12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Time Slot</label>
                      <input 
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium"
                        placeholder="e.g. 11:00 AM - 01:00 PM"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Course Description</label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium resize-none h-24"
                      placeholder="Briefly describe what students will learn..."
                    />
                  </div>

                  {/* Module Management */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-indigo-400" />
                        Syllabus Modules
                      </h3>
                      <Button type="button" onClick={handleAddModule} variant="outline" className="rounded-lg h-8 text-xs font-bold gap-2">
                        <PlusCircle className="w-3.5 h-3.5" /> Add Module
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {formData.modules.map((mod, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-muted/10 border border-border/50 group">
                           <div className="flex items-center gap-4 mb-3">
                              <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                                {idx + 1}
                              </div>
                              <input 
                                placeholder="Module Title (e.g. React.js Fundamentals)"
                                value={mod.title}
                                onChange={(e) => handleModuleChange(idx, 'title', e.target.value)}
                                className="flex-1 bg-transparent border-none text-sm font-bold focus:ring-0 p-0 outline-none"
                              />
                              <Button type="button" variant="ghost" onClick={() => handleRemoveModule(idx)} className="h-6 w-6 p-0 text-muted-foreground hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <X className="w-3.5 h-3.5" />
                              </Button>
                           </div>
                           <textarea 
                             placeholder="Short summary of module contents..."
                             value={mod.description}
                             onChange={(e) => handleModuleChange(idx, 'description', e.target.value)}
                             className="w-full bg-transparent border-none text-xs text-muted-foreground focus:ring-0 p-0 outline-none resize-none h-12"
                           />
                        </div>
                      ))}
                      {formData.modules.length === 0 && (
                        <div className="py-8 text-center border-2 border-dashed border-border rounded-3xl">
                           <p className="text-xs text-muted-foreground">No modules added yet. Start building your syllabus!</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-6">
                    <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-xl px-6 h-11">
                      Cancel
                    </Button>
                    <Button type="submit" className="gradient-indigo text-white rounded-xl px-8 h-11 font-bold gap-2 shadow-lg shadow-indigo-500/20 border-0">
                      <Save className="w-4 h-4" />
                      {editingCourse ? 'Save Changes' : 'Create Course'}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

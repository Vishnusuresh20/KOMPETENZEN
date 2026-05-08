import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, CreditCard, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { students } from '../data/mockData';
import { cn } from '../lib/utils';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 1) {
      const filtered = students.filter(s => 
        s.name.toLowerCase().includes(val.toLowerCase()) || 
        s.id.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1 max-w-md" ref={searchRef}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        onFocus={() => query.length > 1 && setIsOpen(true)}
        placeholder="Search students (e.g. Arjun)..."
        className="w-full pl-9 pr-4 py-2 rounded-xl bg-muted border border-border focus:ring-2 focus:ring-indigo-500/40 outline-none text-sm transition-all"
      />
      
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border shadow-2xl rounded-2xl overflow-hidden z-50 backdrop-blur-xl"
          >
            <div className="p-2 border-b border-border bg-muted/30">
               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2">Top Results</span>
            </div>
            <div className="py-1">
              {results.map((s) => (
                <div key={s.id} className="p-1">
                   <div className="flex items-center justify-between group rounded-xl hover:bg-indigo-500/10 p-2 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3" onClick={() => navigateTo(`/admin/students/${s.id}`)}>
                         <div className="w-8 h-8 rounded-lg gradient-indigo flex items-center justify-center text-white text-[10px] font-bold">
                           {s.name.charAt(0)}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-foreground group-hover:text-indigo-400">{s.name}</p>
                            <p className="text-[10px] text-muted-foreground">{s.id} · {s.course}</p>
                         </div>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigateTo(`/admin/fees/${s.id}`); }}
                        className="p-2 opacity-0 group-hover:opacity-100 hover:bg-emerald-500/10 text-emerald-500 rounded-lg transition-all"
                        title="View Fees"
                      >
                         <CreditCard className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

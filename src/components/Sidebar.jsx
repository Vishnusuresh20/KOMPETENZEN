import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  CreditCard,
  LogOut,
  BookOpen
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard', end: true },
  { label: 'Students', icon: Users, path: '/admin/students' },
  { label: 'Courses', icon: BookOpen, path: '/admin/courses' },
  { label: 'Fees', icon: CreditCard, path: '/admin/fees' },
  { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function Sidebar({ collapsed, setCollapsed, onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all session data
    navigate('/');
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'h-screen flex flex-col',
        'bg-[rgb(var(--sidebar-bg))] border-r border-[rgb(var(--sidebar-border))] shadow-[4px_0_24px_rgba(0,0,0,0.02)] overflow-hidden'
      )}
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar min-h-[72px]">
        <div className="relative flex-shrink-0 w-9 h-9 rounded-xl gradient-indigo flex items-center justify-center shadow-lg">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col overflow-hidden"
            >
              <span className="font-bold text-sm leading-tight gradient-text whitespace-nowrap">
                Kompetenzen
              </span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                Technologies
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item, index) => {
          const isActive = item.end
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={onNavigate}
              className={cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                isActive ? 'bg-indigo-500/15 text-indigo-600 shadow-sm' : 'text-muted-foreground hover:bg-indigo-500/5 hover:text-indigo-500'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive ? 'text-indigo-400' : 'group-hover:text-indigo-400')} />
              {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border space-y-1">
        {!collapsed && (
          <div className="px-3 py-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 mb-2">
             <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  A
                </div>
                <div className="min-w-0 flex-1">
                   <p className="text-xs font-bold text-foreground truncate">Administrator</p>
                   <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">Master Access</p>
                </div>
             </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-all duration-200",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>

        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-indigo-500/10 hover:text-indigo-400 transition-all border border-transparent hover:border-indigo-500/20"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
}

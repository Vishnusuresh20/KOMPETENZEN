import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  CreditCard
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard', end: true },
  { label: 'Students', icon: Users, path: '/admin/students' },
  { label: 'Fees', icon: CreditCard, path: '/admin/fees' },
  { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function Sidebar({ collapsed, setCollapsed, onNavigate }) {
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'h-screen flex flex-col',
        'bg-sidebar border-r border-sidebar shadow-xl overflow-hidden'
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
                isActive ? 'bg-indigo-500/10 text-indigo-400' : 'text-muted-foreground hover:bg-muted'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive ? 'text-indigo-400' : 'group-hover:text-indigo-400')} />
              {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar">
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

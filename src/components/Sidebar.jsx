import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Wallet,
  GraduationCap,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  Sparkles,
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

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'fixed left-0 top-0 h-screen z-40 flex flex-col',
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
              className={cn(
                'group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                isActive ? 'sidebar-item-active' : 'sidebar-text sidebar-item-hover hover:text-white'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive ? 'text-white' : 'opacity-60 group-hover:opacity-100')} />
              {!collapsed && <span className="font-semibold text-sm tracking-wide">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/5">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-sm font-medium sidebar-text sidebar-item-hover hover:text-white transition-all"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Collapse View</span>}
        </button>
      </div>
    </motion.aside>
  );
}

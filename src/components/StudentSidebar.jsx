import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  GraduationCap, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Calendar,
  Award
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { useState } from 'react';

const navItems = [
  { label: 'My Dashboard', icon: LayoutDashboard, path: '/student/dashboard', end: true },
  { label: 'Courses', icon: BookOpen, path: '/student/courses' },
  { label: 'Fees & Payments', icon: CreditCard, path: '/student/fees' },
  { label: 'Schedule', icon: Calendar, path: '/student/schedule' },
];

export default function StudentSidebar({ collapsed, setCollapsed, onNavigate }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <aside className={cn(
      "h-screen bg-[rgb(var(--sidebar))] border-r border-[rgb(var(--border))] flex flex-col transition-all duration-300 sticky top-0",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-[rgb(var(--foreground))] tracking-tight leading-none text-sm">Kompetenzen</span>
            <span className="text-[10px] text-[rgb(var(--muted-foreground))] font-medium uppercase tracking-wider mt-1">Student Portal</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              isActive 
                ? "bg-emerald-500/10 text-emerald-500" 
                : "text-[rgb(var(--muted-foreground))] hover:text-emerald-400 hover:bg-emerald-500/5"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-[rgb(var(--border))] space-y-2">
        {!collapsed && (
          <div className="px-2 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 mb-4">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                  AM
                </div>
                <div>
                   <p className="text-xs font-bold text-foreground">Arjun Menon</p>
                   <p className="text-[10px] text-muted-foreground">Full Stack Dev</p>
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
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] transition-all duration-200 mt-2"
        >
          {collapsed ? <ChevronRight className="w-5 h-5 mx-auto" /> : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse View</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

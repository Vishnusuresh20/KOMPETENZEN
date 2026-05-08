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

export default function StudentSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <aside className={cn(
      "h-screen bg-sidebar border-r border-white/5 flex flex-col transition-all duration-300 sticky top-0",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight leading-none text-sm">Kompetenzen</span>
            <span className="text-[10px] sidebar-text font-medium uppercase tracking-wider mt-1">Student Portal</span>
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
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200",
              isActive 
                ? "sidebar-item-active" 
                : "sidebar-text hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "opacity-60")} />
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-white/5 space-y-2">
        {!isCollapsed && (
          <div className="px-2 py-3 rounded-2xl bg-white/5 border border-white/10 mb-4">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                   AM
                </div>
                <div>
                   <p className="text-xs font-bold text-white">Arjun Menon</p>
                   <p className="text-[10px] sidebar-text">Full Stack Dev</p>
                </div>
             </div>
          </div>
        )}
        
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all duration-200",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium sidebar-text sidebar-item-hover hover:text-white transition-all duration-200 mt-2"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5 mx-auto" /> : (
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

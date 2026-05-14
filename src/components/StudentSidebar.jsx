import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  GraduationCap, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Calendar,
  User
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function StudentSidebar({ collapsed, setCollapsed, onNavigate }) {
  const navigate = useNavigate();
  const studentName = localStorage.getItem('studentName') || 'Student';
  const studentCourse = localStorage.getItem('studentCourse') || 'Enrolled Course';

  const navItems = [
    { label: 'My Dashboard', icon: LayoutDashboard, path: '/student/dashboard', end: true },
    { label: 'My Profile', icon: User, path: '/student/profile' },
    { label: 'Courses', icon: BookOpen, path: '/student/courses' },
    { label: 'Fees & Payments', icon: CreditCard, path: '/student/fees' },
    { label: 'Schedule', icon: Calendar, path: '/student/schedule' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('studentName');
    localStorage.removeItem('studentCourse');
    navigate('/');
  };

  return (
    <aside className={cn(
      "h-screen bg-[rgb(var(--sidebar-bg))] border-r border-[rgb(var(--sidebar-border))] flex flex-col transition-all duration-300 sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-foreground tracking-tight leading-none text-sm">Kompetenzen</span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-1">Student Portal</span>
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
                ? "bg-emerald-500/15 text-emerald-600 shadow-sm" 
                : "text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/5"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-border space-y-2">
        {!collapsed && (
          <div className="px-2 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 mb-4">
             <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {studentName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                   <p className="text-xs font-bold text-foreground truncate">{studentName}</p>
                   <p className="text-[10px] text-muted-foreground truncate">{studentCourse}</p>
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
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition-all duration-200 mt-2"
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

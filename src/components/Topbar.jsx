import { useLocation } from 'react-router-dom';
import { Bell, Sun, Moon, ChevronDown, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { notifications } from '../data/mockData';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import GlobalSearch from './GlobalSearch';

export default function Topbar({ sidebarCollapsed, onToggleSidebar }) {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const unread = (notifications || []).filter((n) => !n.read).length;

  const isStudent = location.pathname.startsWith('/student');
  const roleLabel = isStudent ? 'Student' : 'Admin';
  const roleInitials = isStudent ? 'AM' : 'AD';
  const roleGradient = isStudent ? 'gradient-emerald' : 'gradient-indigo';

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-30 h-[72px] flex items-center px-4 md:px-6 gap-4',
        'bg-card/80 border-b border-border backdrop-blur-xl transition-all duration-300',
        'left-0 md:left-auto',
        sidebarCollapsed ? 'md:left-[72px]' : 'md:left-[260px]'
      )}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onToggleSidebar}
        className="md:hidden rounded-xl"
      >
        <Menu className="w-5 h-5" />
      </Button>
      <GlobalSearch />

      <div className="flex items-center gap-3 ml-auto">
        <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-xl">
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </Button>

        <Button variant="outline" size="icon" className="relative rounded-xl">
          <Bell className="w-4 h-4" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
        </Button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted border border-border">
          <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold", roleGradient)}>
            {roleInitials}
          </div>
          <span className="text-xs font-semibold hidden sm:block">{roleLabel}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}

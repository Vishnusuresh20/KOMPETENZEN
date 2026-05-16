import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Sun, Moon, ChevronDown, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import GlobalSearch from './GlobalSearch';
import NotificationPanel from './NotificationPanel';
import { AnimatePresence } from 'framer-motion';
import api from '../lib/axios';

export default function Topbar({ sidebarCollapsed, onToggleSidebar }) {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const isStudent = location.pathname.startsWith('/student');

  useEffect(() => {
    if (!isStudent) {
      fetchUnreadCount();
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [isStudent]);

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get('/notifications/unread-count');
      setUnreadCount(response.data);
    } catch (err) {
      console.error("Failed to fetch unread count", err);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const roleLabel = isStudent ? 'Student' : 'Admin';
  
  // Dynamic Initials Logic
  const [userName, setUserName] = useState(localStorage.getItem('userName') || (isStudent ? 'Student' : 'Admin'));
  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const roleGradient = isStudent ? 'gradient-emerald' : 'gradient-indigo';

  return (
    <header
      className={cn(
        'sticky top-0 z-30 h-[72px] flex items-center px-4 md:px-6 lg:px-8 gap-4',
        'bg-card/80 border-b border-border backdrop-blur-xl transition-all duration-300 w-full'
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

      <div className="flex items-center gap-3 ml-auto relative">
        <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-xl">
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </Button>

        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleNotificationClick}
          className={cn("relative rounded-xl", showNotifications && "bg-muted")}
        >
          {showNotifications ? <X className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
          {unreadCount > 0 && !showNotifications && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>

        <AnimatePresence>
          {showNotifications && (
            <NotificationPanel 
              isStudent={isStudent}
              onClose={() => setShowNotifications(false)} 
              onMarkRead={() => setUnreadCount(0)}
            />
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted border border-border">
          <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold", roleGradient)}>
            {initials}
          </div>
          <span className="text-xs font-semibold hidden sm:block">{roleLabel}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}

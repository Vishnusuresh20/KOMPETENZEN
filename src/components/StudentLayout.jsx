import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import Topbar from './Topbar';
import { cn } from '../lib/utils';

export default function StudentLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background bg-grid">
      {/* Sidebar Overlay for Mobile */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      />

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 md:sticky md:top-0 md:h-screen transition-transform duration-300 md:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <StudentSidebar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          onNavigate={() => setMobileOpen(false)} 
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          sidebarCollapsed={collapsed}
          onToggleSidebar={() => setMobileOpen(!mobileOpen)} 
        />
        <main className="flex-1 overflow-y-auto min-h-screen">
          <div className="px-4 md:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

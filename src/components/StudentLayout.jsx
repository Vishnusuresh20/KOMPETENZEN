import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import Topbar from './Topbar';
import { cn } from '../lib/utils';

export default function StudentLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
        "transition-transform duration-300 md:translate-x-0 z-50 fixed md:relative",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <StudentSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          onToggleSidebar={() => setMobileOpen(!mobileOpen)} 
        />
        <main className="flex-1 p-4 md:p-8 pt-[88px] md:pt-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { cn } from '../lib/utils';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background bg-grid">
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
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <Topbar 
        sidebarCollapsed={collapsed} 
        onToggleSidebar={() => setMobileOpen(!mobileOpen)} 
      />

      <motion.main
        animate={{ 
          marginLeft: collapsed ? (window.innerWidth < 768 ? 0 : 72) : (window.innerWidth < 768 ? 0 : 260) 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="min-h-screen pt-[72px]"
      >
        <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { cn } from '../lib/utils';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Topbar sidebarCollapsed={collapsed} />

      <motion.main
        animate={{ marginLeft: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="min-h-screen pt-[72px]"
      >
        <div className="p-6 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}

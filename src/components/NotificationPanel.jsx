import { motion } from 'framer-motion';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  FileText,
  GraduationCap,
  Bell,
} from 'lucide-react';
import { notifications } from '../data/mockData';
import { cn } from '../lib/utils';

const iconMap = {
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  FileText,
  GraduationCap,
};

export default function NotificationPanel({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 top-full mt-2 w-80 bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] shadow-2xl overflow-hidden z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgb(var(--border))]">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-sm text-[rgb(var(--foreground))]">
            Notifications
          </span>
          <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-medium">
            {notifications.filter((n) => !n.read).length} new
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-[rgb(var(--muted))] transition-colors"
        >
          <X className="w-3.5 h-3.5 text-[rgb(var(--muted-foreground))]" />
        </button>
      </div>

      {/* Notification List */}
      <div className="max-h-[380px] overflow-y-auto divide-y divide-[rgb(var(--border))]">
        {notifications.map((notif, i) => {
          const Icon = iconMap[notif.icon] || Bell;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                'flex gap-3 px-4 py-3 hover:bg-[rgb(var(--muted))]/50 transition-colors cursor-pointer',
                !notif.read && 'bg-indigo-500/5'
              )}
            >
              <div className={cn('w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center', notif.bg)}>
                <Icon className={cn('w-4 h-4', notif.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn('text-xs font-semibold leading-tight', notif.read ? 'text-[rgb(var(--muted-foreground))]' : 'text-[rgb(var(--foreground))]')}>
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-[11px] text-[rgb(var(--muted-foreground))] mt-0.5 leading-relaxed">
                  {notif.message}
                </p>
                <p className="text-[10px] text-[rgb(var(--muted-foreground))]/60 mt-1">
                  {notif.time}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[rgb(var(--border))]">
        <button className="w-full text-center text-xs text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
          View all notifications
        </button>
      </div>
    </motion.div>
  );
}

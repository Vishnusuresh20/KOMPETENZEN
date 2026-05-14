import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  FileText,
  GraduationCap,
  Bell,
  Clock,
  CreditCard,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';
import api from '../lib/axios';

const iconMap = {
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  FileText,
  GraduationCap,
};

// ─── Student notification panel (fee-based) ──────────────────────────────────
function StudentNotificationPanel({ onClose }) {
  const [fees, setFees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyFees = async () => {
      try {
        const res = await api.get('/fees/my-fees');
        setFees(res.data);
      } catch (err) {
        console.error('Failed to fetch student fees', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyFees();
  }, []);

  const getStatusIcon = (status) => {
    if (status === 'PAID') return { Icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
    if (status === 'OVERDUE') return { Icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10' };
    if (status === 'PARTIAL') return { Icon: CreditCard, color: 'text-blue-400', bg: 'bg-blue-500/10' };
    return { Icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10' };
  };

  const getStatusMessage = (fee) => {
    if (fee.status === 'PAID') return `Your fee of ₹${(fee.totalAmount ?? 0).toLocaleString('en-IN')} has been fully paid.`;
    if (fee.status === 'PARTIAL') return `Paid ₹${(fee.paidAmount ?? 0).toLocaleString('en-IN')} — Balance ₹${(fee.balance ?? 0).toLocaleString('en-IN')} remaining.`;
    if (fee.status === 'OVERDUE') return `Your fee of ₹${(fee.balance ?? 0).toLocaleString('en-IN')} is overdue! Please pay immediately.`;
    return `Fee of ₹${(fee.totalAmount ?? 0).toLocaleString('en-IN')} is pending. Due: ${fee.dueDate ?? 'N/A'}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 top-full mt-4 w-80 bg-card/95 rounded-3xl border border-border shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-sm text-foreground">My Notifications</span>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto divide-y divide-border custom-scrollbar">
        {isLoading ? (
          <div className="p-10 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Loading...</p>
          </div>
        ) : fees.length === 0 ? (
          <div className="p-10 text-center">
            <Bell className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
            <p className="text-xs text-muted-foreground">No fee records found</p>
          </div>
        ) : (
          fees.map((fee, i) => {
            const { Icon, color, bg } = getStatusIcon(fee.status);
            return (
              <motion.div
                key={fee.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  'flex gap-4 px-6 py-4 hover:bg-muted/30 transition-colors',
                  fee.status !== 'PAID' && 'bg-amber-500/5'
                )}
              >
                <div className={cn('w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm', bg)}>
                  <Icon className={cn('w-5 h-5', color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold leading-tight text-foreground">
                      Fee — {fee.status}
                    </p>
                    {fee.status !== 'PAID' && (
                      <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    {getStatusMessage(fee)}
                  </p>
                  {fee.dueDate && (
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60 mt-2">
                      <Clock className="w-3 h-3" />
                      Due: {fee.dueDate}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <div className="px-6 py-4 border-t border-border bg-muted/10">
        <button onClick={onClose} className="w-full text-center text-xs text-emerald-400 font-bold hover:text-emerald-300 transition-colors uppercase tracking-widest">
          Close
        </button>
      </div>
    </motion.div>
  );
}

// ─── Admin notification panel (activity feed) ─────────────────────────────────
function AdminNotificationPanel({ onClose, onMarkRead }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data);
      await api.post('/notifications/read-all');
      if (onMarkRead) onMarkRead();
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInMins = Math.floor((now - date) / 60000);
    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInMins < 1440) return `${Math.floor(diffInMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 top-full mt-4 w-80 bg-card/95 rounded-3xl border border-border shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-sm text-foreground">Activity Feed</span>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto divide-y divide-border custom-scrollbar">
        {isLoading ? (
          <div className="p-10 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Checking alerts...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-10 text-center">
            <Bell className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
            <p className="text-xs text-muted-foreground">No new notifications</p>
          </div>
        ) : (
          notifications.map((notif, i) => {
            const Icon = iconMap[notif.icon] || Bell;
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  'flex gap-4 px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer group',
                  !notif.read && 'bg-indigo-500/5'
                )}
              >
                <div className={cn('w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm', notif.bg)}>
                  <Icon className={cn('w-5 h-5', notif.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn('text-xs font-bold leading-tight', notif.read ? 'text-muted-foreground' : 'text-foreground')}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 mt-1 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{notif.message}</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60 mt-2">
                    <Clock className="w-3 h-3" />
                    {formatTime(notif.createdAt)}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <div className="px-6 py-4 border-t border-border bg-muted/10">
        <button onClick={onClose} className="w-full text-center text-xs text-indigo-400 font-bold hover:text-indigo-300 transition-colors uppercase tracking-widest">
          Close Panel
        </button>
      </div>
    </motion.div>
  );
}

// ─── Root export — picks the right panel based on role ────────────────────────
export default function NotificationPanel({ isStudent, onClose, onMarkRead }) {
  if (isStudent) {
    return <StudentNotificationPanel onClose={onClose} />;
  }
  return <AdminNotificationPanel onClose={onClose} onMarkRead={onMarkRead} />;
}

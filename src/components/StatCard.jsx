import { motion } from 'framer-motion';
import {
  Users,
  GraduationCap,
  Wallet,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { cn } from '../lib/utils';

const iconMap = { Users, GraduationCap, Wallet, AlertCircle };

const colorMap = {
  indigo: {
    icon: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    glow: 'shadow-indigo-500/20',
    badge: 'bg-indigo-500/10 text-indigo-400',
    border: 'border-indigo-500/20',
    bar: 'from-indigo-500 to-indigo-600',
  },
  emerald: {
    icon: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    glow: 'shadow-emerald-500/20',
    badge: 'bg-emerald-500/10 text-emerald-400',
    border: 'border-emerald-500/20',
    bar: 'from-emerald-500 to-emerald-600',
  },
  violet: {
    icon: 'text-violet-400',
    bg: 'bg-violet-500/10',
    glow: 'shadow-violet-500/20',
    badge: 'bg-violet-500/10 text-violet-400',
    border: 'border-violet-500/20',
    bar: 'from-violet-500 to-violet-600',
  },
  rose: {
    icon: 'text-rose-400',
    bg: 'bg-rose-500/10',
    glow: 'shadow-rose-500/20',
    badge: 'bg-rose-500/10 text-rose-400',
    border: 'border-rose-500/20',
    bar: 'from-rose-500 to-rose-600',
  },
};

export default function StatCard({ stat, index }) {
  const Icon = iconMap[stat.icon];
  const colors = colorMap[stat.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        'relative overflow-hidden rounded-2xl p-5',
        'bg-card border',
        colors.border,
        'shadow-lg',
        colors.glow,
        'cursor-default group transition-shadow duration-300',
        'hover:shadow-xl'
      )}
    >
      {/* Glow orb background */}
      <div
        className={cn(
          'absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40',
          colors.bg.replace('/10', '')
        )}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shadow-md', colors.bg)}>
          <Icon className={cn('w-5 h-5', colors.icon)} />
        </div>
        <div
          className={cn(
            'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold',
            colors.badge
          )}
        >
          {stat.positive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {stat.change}
        </div>
      </div>

      {/* Value */}
      <div className="mb-1">
        <motion.p
          className="text-2xl font-bold text-foreground tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          {stat.value}
        </motion.p>
      </div>

      {/* Label */}
      <p className="text-sm font-medium text-[rgb(var(--muted-foreground))] mb-3">
        {stat.title}
      </p>

      {/* Description + bar */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[rgb(var(--muted-foreground))]">{stat.desc}</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className={cn('h-full rounded-full bg-gradient-to-r', colors.bar)}
            initial={{ width: 0 }}
            animate={{ width: stat.positive ? '72%' : '35%' }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

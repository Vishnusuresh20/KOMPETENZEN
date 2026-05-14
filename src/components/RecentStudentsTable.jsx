import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronUp, ChevronDown, Eye, MoreHorizontal, Loader2 } from 'lucide-react';
import api from '../lib/axios';
import { cn } from '../lib/utils';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const statusMap = {
  Active: 'success',
  Inactive: 'destructive',
};

const feesMap = {
  Paid: 'success',
  Pending: 'warning',
  Overdue: 'destructive',
};

const avatarColors = [
  'bg-indigo-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-sky-500',
  'bg-violet-500'
];

export default function RecentStudentsTable() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => {
    const fetchRecentStudents = async () => {
      try {
        const response = await api.get('/students');
        const mapped = response.data.map((dto, idx) => {
          // Format fee status: PAID -> Paid, PENDING -> Pending
          const formattedFees = dto.feeStatus 
            ? dto.feeStatus.charAt(0).toUpperCase() + dto.feeStatus.slice(1).toLowerCase()
            : 'Paid';

          return {
            id: String(dto.id),
            name: `${dto.firstName} ${dto.lastName}`,
            course: dto.course || 'Unassigned',
            batch: 'Morning', // Mock for now
            status: dto.active !== false ? 'Active' : 'Inactive',
            fees: formattedFees,
            joinDate: dto.enrollmentDate || '2026-05-11',
            avatar: dto.firstName.charAt(0),
            avatarColor: avatarColors[idx % avatarColors.length]
          };
        });
        // Show only latest 5
        setStudents(mapped.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch recent students", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentStudents();
  }, []);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = sortField
    ? [...filtered].sort((a, b) => {
        const av = String(a[sortField]);
        const bv = String(b[sortField]);
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      })
    : filtered;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronUp className="w-3 h-3 opacity-30" />;
    return sortDir === 'asc' ? (
      <ChevronUp className="w-3 h-3 text-indigo-400" />
    ) : (
      <ChevronDown className="w-3 h-3 text-indigo-400" />
    );
  };

  if (isLoading) {
    return (
      <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
        <p className="text-sm text-muted-foreground font-medium">Loading recent data...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.4 }}
      className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-[rgb(var(--border))]">
        <div>
          <h3 className="text-base font-bold text-[rgb(var(--foreground))]">Recent Students</h3>
          <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">
            {sorted.length} students shown from database
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[rgb(var(--muted-foreground))]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className={cn(
                'pl-8 pr-3 py-2 rounded-xl text-xs w-48',
                'bg-[rgb(var(--muted))] border border-[rgb(var(--border))]',
                'text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]',
                'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/40',
                'transition-all duration-200'
              )}
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[rgb(var(--muted))] border border-[rgb(var(--border))] text-xs text-[rgb(var(--muted-foreground))] hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-200">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgb(var(--border))] bg-[rgb(var(--muted))]/50">
              {[
                { label: 'Student', field: 'name' },
                { label: 'Course', field: 'course' },
                { label: 'Batch', field: 'batch' },
                { label: 'Status', field: 'status' },
                { label: 'Fees', field: 'fees' },
                { label: 'Joined', field: 'joinDate' },
                { label: '', field: null },
              ].map((col) => (
                <th
                  key={col.label}
                  onClick={() => col.field && handleSort(col.field)}
                  className={cn(
                    'text-left px-4 py-3 text-xs font-semibold text-[rgb(var(--muted-foreground))] uppercase tracking-wider',
                    col.field && 'cursor-pointer hover:text-indigo-400 select-none'
                  )}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.field && <SortIcon field={col.field} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgb(var(--border))]">
            {sorted.map((student, i) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="hover:bg-indigo-500/5 transition-colors duration-150 group"
              >
                {/* Student */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0',
                        student.avatarColor
                      )}
                    >
                      {student.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                        {student.name}
                      </p>
                      <p className="text-[11px] text-[rgb(var(--muted-foreground))]">
                        {student.id}
                      </p>
                    </div>
                  </div>
                </td>
                {/* Course */}
                <td className="px-4 py-3.5">
                  <p className="text-sm text-[rgb(var(--foreground))] font-medium">{student.course}</p>
                </td>
                {/* Batch */}
                <td className="px-4 py-3.5">
                  <Badge variant="secondary">
                    {student.batch}
                  </Badge>
                </td>
                {/* Status */}
                <td className="px-4 py-3.5">
                  <Badge variant={statusMap[student.status]}>
                    {student.status}
                  </Badge>
                </td>
                {/* Fees */}
                <td className="px-4 py-3.5">
                  <Badge variant={feesMap[student.fees]}>
                    {student.fees}
                  </Badge>
                </td>
                {/* Joined */}
                <td className="px-4 py-3.5">
                  <p className="text-xs text-[rgb(var(--muted-foreground))]">{student.joinDate}</p>
                </td>
                {/* Actions */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Link to={`/admin/students/${student.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[rgb(var(--border))] flex items-center justify-between">
        <p className="text-xs text-[rgb(var(--muted-foreground))]">
          Showing {sorted.length} of {students.length} database records
        </p>
        <Link to="/admin/students" className="text-xs text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
          View all students →
        </Link>
      </div>
    </motion.div>
  );
}


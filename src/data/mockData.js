export const stats = [
  {
    id: 1,
    title: 'Total Students',
    value: '1,284',
    change: '+12%',
    positive: true,
    icon: 'Users',
    color: 'indigo',
    gradient: 'from-indigo-500 to-indigo-700',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    desc: 'Enrolled this term',
  },
  {
    id: 2,
    title: 'Monthly Revenue',
    value: '₹8,42,500',
    change: '+18%',
    positive: true,
    icon: 'Wallet',
    color: 'violet',
    gradient: 'from-violet-500 to-violet-700',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    desc: 'Collected this month',
  },
  {
    id: 3,
    title: 'Pending Fees',
    value: '₹1,23,800',
    change: '-8%',
    positive: false,
    icon: 'AlertCircle',
    color: 'rose',
    gradient: 'from-rose-500 to-rose-700',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    desc: 'Due this month',
  },
];

export const revenueData = [
  { month: 'Jan', revenue: 620000, fees: 540000, expenses: 180000 },
  { month: 'Feb', revenue: 710000, fees: 620000, expenses: 200000 },
  { month: 'Mar', revenue: 680000, fees: 590000, expenses: 190000 },
  { month: 'Apr', revenue: 760000, fees: 680000, expenses: 210000 },
  { month: 'May', revenue: 842500, fees: 730000, expenses: 220000 },
  { month: 'Jun', revenue: 790000, fees: 700000, expenses: 215000 },
  { month: 'Jul', revenue: 850000, fees: 760000, expenses: 230000 },
  { month: 'Aug', revenue: 900000, fees: 800000, expenses: 240000 },
  { month: 'Sep', revenue: 870000, fees: 780000, expenses: 235000 },
  { month: 'Oct', revenue: 920000, fees: 830000, expenses: 245000 },
  { month: 'Nov', revenue: 880000, fees: 790000, expenses: 238000 },
  { month: 'Dec', revenue: 950000, fees: 860000, expenses: 250000 },
];

export const branchPerformance = [
  { name: 'Main Institution', revenue: 4500000, students: 650, growth: '+12.5%' },
  { name: 'Business School', revenue: 2800000, students: 420, growth: '+8.2%' },
  { name: 'Upskill Program', revenue: 1125000, students: 214, growth: '+24.1%' },
];

export const studentGrowthData = [
  { month: 'Jan', total: 1100, new: 85 },
  { month: 'Feb', total: 1150, new: 92 },
  { month: 'Mar', total: 1180, new: 78 },
  { month: 'Apr', total: 1240, new: 110 },
  { month: 'May', total: 1284, new: 125 },
];

export const categoryFinancials = [
  { category: 'Tuition Fees', amount: 720000, color: '#6366f1' },
  { category: 'Course Materials', amount: 85000, color: '#10b981' },
  { category: 'Registrations', amount: 37500, color: '#8b5cf6' },
];

export const enrollmentData = [
  { month: 'Jan', students: 1100 },
  { month: 'Feb', students: 1150 },
  { month: 'Mar', students: 1180 },
  { month: 'Apr', students: 1240 },
  { month: 'May', students: 1284 },
];

export const branches = [
  'Main Institution',
  'Kompetenzan Business School',
  'Kompetenzan Upskill Program',
];

export const students = [
  { id: 'STU-2024-001', name: 'Arjun Menon', course: 'Full Stack', status: 'Active', joinDate: '2024-01-12' },
  { id: 'STU-2024-002', name: 'Priya Nair', course: 'Digital Marketing', status: 'Active', joinDate: '2024-01-18' },
];

export const feeStats = [
  { label: 'Total Revenue', value: '₹12,45,000', change: '+14%', color: 'indigo' },
  { label: 'Total Collected', value: '₹9,80,500', change: '+18%', color: 'emerald' },
  { label: 'Pending Fees', value: '₹2,64,500', change: '-5%', color: 'rose' },
  { label: 'Collection Rate', value: '78.5%', change: '+2.4%', color: 'violet' },
];

export const studentFees = [
  {
    id: 'STU-2024-001',
    name: 'Arjun Menon',
    totalFees: 45000,
    paidAmount: 30000,
    pendingAmount: 15000,
    status: 'Pending',
    installments: [
      { month: 'January', amount: 15000, status: 'Paid', date: '2024-01-15' },
    ],
    history: [
      { id: 'REC-101', date: '2024-01-15', amount: 15000, method: 'UPI' },
    ]
  },
  {
    id: 'STU-2024-002',
    name: 'Priya Nair',
    totalFees: 35000,
    paidAmount: 35000,
    pendingAmount: 0,
    status: 'Paid',
    installments: [
      { month: 'January', amount: 17500, status: 'Paid', date: '2024-01-20' },
      { month: 'February', amount: 17500, status: 'Paid', date: '2024-02-20' },
    ],
    history: [
      { id: 'REC-102', date: '2024-01-20', amount: 17500, method: 'Bank Transfer' },
      { id: 'REC-103', date: '2024-02-20', amount: 17500, method: 'UPI' },
    ]
  }
];

export const monthlyFeeTrend = [
  { month: 'Jan', collected: 240000, pending: 45000 },
  { month: 'Feb', collected: 210000, pending: 85000 },
  { month: 'Mar', collected: 280000, pending: 30000 },
  { month: 'Apr', collected: 250000, pending: 60000 },
  { month: 'May', collected: 310000, pending: 20000 },
];

export const notifications = [
  { id: 1, type: 'fee', title: 'Payment Received', message: 'Arjun Menon paid ₹45,000', time: '2 min ago', read: false },
];

export const courseDistribution = [
  { name: 'Full Stack', value: 380, color: '#6366f1' },
  { name: 'Data Science', value: 245, color: '#10b981' },
  { name: 'UI/UX Design', value: 198, color: '#8b5cf6' },
];

export const recentStudents = [
  { id: 'STU-2024-001', name: 'Arjun Menon', avatar: 'AM', avatarColor: 'bg-indigo-500', course: 'Full Stack', batch: 'Batch 12', status: 'Active', fees: 'Paid', joinDate: '2024-01-12' },
];

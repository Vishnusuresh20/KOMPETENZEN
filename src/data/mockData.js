// This file now contains only structural defaults for the UI.
// Real data is fetched dynamically from the Spring Boot backend.

export const stats = [
  {
    id: 1,
    title: 'Total Students',
    value: '0',
    change: '0%',
    positive: true,
    icon: 'Users',
    color: 'indigo',
    gradient: 'from-indigo-500 to-indigo-700',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    desc: 'Live enrollment count',
  },
  {
    id: 2,
    title: 'Total Revenue',
    value: '₹0',
    change: '0%',
    positive: true,
    icon: 'Wallet',
    color: 'violet',
    gradient: 'from-violet-500 to-violet-700',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    desc: 'Total collection',
  },
  {
    id: 3,
    title: 'Pending Fees',
    value: '₹0',
    change: '0%',
    positive: false,
    icon: 'AlertCircle',
    color: 'rose',
    gradient: 'from-rose-500 to-rose-700',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    desc: 'Awaiting payment',
  },
];

export const revenueData = [];
export const branchPerformance = [];
export const studentGrowthData = [];
export const categoryFinancials = [];
export const enrollmentData = [];
export const branches = [
  'KOMPETENZEN TECH', 
  'KOMPETENZEN B-SCHOOL', 
  'KOMPETENZEN FINISHING SCHOOL'
];
export const locations = ['TRIVANDRUM', 'ERNAKULAM'];
export const students = [];
export const feeStats = [];
export const studentFees = [];
export const monthlyFeeTrend = [];
export const notifications = [];
export const courseDistribution = [];
export const recentStudents = [];

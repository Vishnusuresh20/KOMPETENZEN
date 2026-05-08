import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import StudentLayout from './components/StudentLayout';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import Students from './pages/Students';
import Fees from './pages/Fees';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import AdminLogin from './pages/Auth/AdminLogin';
import StudentLogin from './pages/Auth/StudentLogin';
import ForgotPassword from './pages/Auth/ForgotPassword';
import StudentProfile from './pages/StudentProfile';
import StudentFeeDetails from './pages/StudentFeeDetails';
import StudentCourses from './pages/StudentCourses';
import StudentSchedule from './pages/StudentSchedule';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/admin-login" element={<AdminLogin />} />
          <Route path="/auth/student-login" element={<StudentLogin />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="students/:id" element={<StudentProfile />} />
            <Route path="fees" element={<Fees />} />
            <Route path="fees/:id" element={<StudentFeeDetails />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Student Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="schedule" element={<StudentSchedule />} />
            <Route path="fees" element={<StudentFeeDetails />} />
          </Route>
          
          {/* Compatibility Redirect for old dashboard link */}
          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

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
import AdminCourses from './pages/AdminCourses';
import AdminLogin from './pages/Auth/AdminLogin';
import StudentLogin from './pages/Auth/StudentLogin';
import ForgotPassword from './pages/Auth/ForgotPassword';
import StudentProfile from './pages/StudentProfile';
import StudentFeeDetails from './pages/StudentFeeDetails';
import StudentCourses from './pages/StudentCourses';
import StudentSchedule from './pages/StudentSchedule';
import Unauthorized from './pages/Unauthorized';

import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/admin-login" element={<AdminLogin />} />
          <Route path="/auth/student-login" element={<StudentLogin />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="students/:id" element={<StudentProfile />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="fees" element={<Fees />} />
            <Route path="fees/:id" element={<StudentFeeDetails />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Student Routes */}
          <Route 
            path="/student" 
            element={
              <ProtectedRoute allowedRole="STUDENT">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
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

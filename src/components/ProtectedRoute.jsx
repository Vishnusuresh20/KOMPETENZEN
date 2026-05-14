import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Strict check: must have a real token and it shouldn't be the string "null"
  const isAuthenticated = token && token !== 'null' && token !== 'undefined';

  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.tipo)) return <Navigate to="/" replace />;

  return <Outlet />;
}

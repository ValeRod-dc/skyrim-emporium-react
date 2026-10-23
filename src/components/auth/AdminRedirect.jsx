import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminRedirect() {
  const { user } = useAuth();
  return <Navigate to={user?.tipo === "Vendedor" ? "/admin/productos" : "/admin/inicio"} replace />;
}

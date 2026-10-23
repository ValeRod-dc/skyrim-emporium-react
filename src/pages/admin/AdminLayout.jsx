import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import "./admin.css";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const esAdministrador = user?.tipo === "Administrador";

  function cerrarSesion() {
    navigate("/", { replace: true });
    logout();
  }

  return (
    <div className="admin-app">
      <header className="admin-topbar">
        <Link className="admin-brand" to={esAdministrador ? "/admin/inicio" : "/admin/productos"}>
          Skyrim Emporium <span>· {esAdministrador ? "Administración" : "Vista vendedor"}</span>
        </Link>
        <div className="admin-topbar-user">
          <span>{user?.nombre} · {user?.tipo}</span>
          <Link className="admin-button admin-button-primary" to="/">Ir a la tienda</Link>
          <button className="admin-button admin-button-danger" onClick={cerrarSesion} type="button">Salir</button>
        </div>
      </header>

      <div className="admin-shell">
        <aside aria-label="Menú de administración" className="admin-sidebar">
          {esAdministrador && <NavLink end to="/admin/inicio">Inicio</NavLink>}
          <NavLink to="/admin/productos">Productos</NavLink>
          {esAdministrador && <NavLink to="/admin/stock-critico">Stock crítico</NavLink>}
          <NavLink to="/admin/ordenes">Órdenes / boletas</NavLink>
          {esAdministrador && <NavLink to="/admin/usuarios">Usuarios</NavLink>}
          {esAdministrador && <NavLink to="/admin/categorias">Categorías</NavLink>}
          {esAdministrador && <NavLink to="/admin/reportes">Reportes</NavLink>}
          {esAdministrador && <NavLink to="/admin/perfil">Perfil</NavLink>}
          {esAdministrador && <NavLink to="/admin/nuevo-producto">Nuevo producto</NavLink>}
          {esAdministrador && <NavLink to="/admin/nuevo-usuario">Nuevo usuario</NavLink>}
        </aside>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

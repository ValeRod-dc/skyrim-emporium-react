import { Link, NavLink, useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { configuracionGremios } from "../../data/gremios";

export default function Navbar({ onOpenCart }) {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function cerrarSesion() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top border-bottom border-secondary">
      <div className="container">
        <Link className="navbar-brand text-warning font-cinzel d-flex align-items-center" to="/">
          <img src="/assets/img/skyrim-logo.png" alt="Skyrim Emporium" style={{ height: "34px", marginRight: "8px" }} />
          Skyrim Emporium
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownGremios" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Gremios
              </a>
              <ul className="dropdown-menu dropdown-menu-dark border-secondary" aria-labelledby="navbarDropdownGremios">
                {Object.entries(configuracionGremios).map(([slug, config]) => (
                  <li key={slug}>
                    <Link className="dropdown-item d-flex align-items-center" to={`/gremios/${slug}`}>
                      <img src={`/assets/img/Iconos/${config.icono}`} alt="" style={{ height: "20px", marginRight: "10px" }} />
                      {config.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blogs">Blogs</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
            
            <li className="nav-item ms-lg-3">
              {user ? (
                <div className="d-flex align-items-center gap-2">
                  <span className="text-warning small">{user.tipo}</span>
                  {user.tipo !== "Cliente" && (
                    <Link className="btn btn-outline-warning btn-sm" to="/admin">
                      {user.tipo === "Vendedor" ? "Vista vendedor" : "Panel admin"}
                    </Link>
                  )}
                  <button className="btn btn-outline-danger btn-sm" onClick={cerrarSesion} type="button">Salir</button>
                </div>
              ) : (
                <NavLink className="nav-link text-warning" to="/login">Iniciar sesión</NavLink>
              )}
            </li>
            
            <li className="nav-item ms-2">
              <button className="btn btn-outline-warning d-flex align-items-center" onClick={onOpenCart}>
                <img src="/assets/img/Iconos/Shipwreck.png" alt="Carrito" style={{ height: "20px", marginRight: "8px" }} />
                Carrito <span className="badge bg-warning text-dark ms-2">{count()}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
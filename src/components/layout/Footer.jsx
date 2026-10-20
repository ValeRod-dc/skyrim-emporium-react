import { Link } from "react-router";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <img 
            src="/assets/img/skyrim-logo.png" 
            alt="Skyrim Emporium" 
            className="footer-logo" 
          />
          <div>
            <h2>Skyrim Emporium</h2>
            <p>Fus Ro Dah • Página ficticia con fines educativos, sin afiliación con Bethesda</p>
          </div>
        </div>

        <div className="footer-links">
          <h3>Enlaces</h3>
          <ul>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/#direcciones">Direcciones</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Skyrim Emporium</p>
      </div>
    </footer>
  );
}
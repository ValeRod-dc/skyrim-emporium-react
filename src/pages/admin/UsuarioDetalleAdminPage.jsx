import { Link, useParams } from "react-router";
import { usuarios } from "../../data/datos-usuarios.js";

export default function UsuarioDetalleAdminPage() {
  const { run } = useParams();
  const usuario = usuarios.find((item) => item.run.toUpperCase() === run?.toUpperCase());

  if (!usuario) {
    return <section><h1 className="admin-page-title">Usuario no encontrado</h1><Link to="/admin/usuarios">Volver a usuarios</Link></section>;
  }

  return (
    <section>
      <Link className="admin-back-link" to="/admin/usuarios">← Volver a usuarios</Link>
      <p className="admin-eyebrow">Cuenta</p>
      <h1 className="admin-page-title">{usuario.nombre} {usuario.apellidos}</h1>
      <div className="admin-detail-card">
        <p><strong>RUN:</strong> {usuario.run}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Tipo:</strong> {usuario.tipo}</p>
        <p><strong>Fecha de nacimiento:</strong> {usuario.fechaNacimiento || "No informada"}</p>
        <p><strong>Dirección:</strong> {[usuario.direccion, usuario.comuna, usuario.region].filter(Boolean).join(", ") || "No informada"}</p>
      </div>
      <div className="admin-detail-actions">
        <Link className="admin-button admin-button-primary" to={`/admin/nuevo-usuario?run=${encodeURIComponent(usuario.run)}`}>Editar usuario</Link>
        {usuario.tipo === "Cliente" && <Link className="admin-button admin-button-secondary" to={`/admin/usuarios/${encodeURIComponent(usuario.run)}/historial`}>Historial de compras</Link>}
      </div>
    </section>
  );
}

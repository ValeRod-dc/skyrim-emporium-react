import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usuarios } from "../../data/datos-usuarios.js";
import { asegurarOrdenDemostracion } from "./ordenes.js";

export default function UsuarioDetalleAdminPage() {
  const { run } = useParams();
  const usuario = usuarios.find((item) => item.run.toUpperCase() === run?.toUpperCase());
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function abrirHistorial() {
    if (usuario?.tipo === "Vendedor" && !asegurarOrdenDemostracion(usuario)) {
      setError("No se pudo guardar la compra de ejemplo del vendedor.");
      return;
    }
    navigate(`/admin/usuarios/${encodeURIComponent(usuario.run)}/historial`);
  }

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
        <button className="admin-button admin-button-secondary" onClick={abrirHistorial} type="button">Historial de compras</button>
      </div>
      {error && <p className="admin-form-error" role="alert">{error}</p>}
    </section>
  );
}

import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import { actualizarUsuario, usuarios } from "../../data/datos-usuarios.js";

export default function PerfilAdminPage() {
  const { user, actualizarSesion } = useAuth();
  const cuenta = usuarios.find((item) => item.run === user?.run || item.correo === user?.correo);
  const [nombre, setNombre] = useState(cuenta?.nombre || "");
  const [apellidos, setApellidos] = useState(cuenta?.apellidos || "");
  const [correo, setCorreo] = useState(cuenta?.correo || "");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  function guardar(event) {
    event.preventDefault();
    if (!cuenta || !nombre.trim() || !apellidos.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      setError("Ingresa un nombre, apellidos y correo válido.");
      setMensaje("");
      return;
    }

    const usuarioActualizado = {
      ...cuenta,
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      correo: correo.trim().toLowerCase(),
    };
    if (!actualizarUsuario(usuarioActualizado)) {
      setError("Ese correo ya pertenece a otra cuenta o no se pudo guardar el perfil.");
      setMensaje("");
      return;
    }
    actualizarSesion(usuarioActualizado);
    setError("");
    setMensaje("Perfil actualizado correctamente.");
  }

  if (!cuenta) {
    return <section><h1 className="admin-page-title">Perfil no disponible</h1><p className="admin-muted">No se encontró la cuenta asociada a esta sesión.</p></section>;
  }

  return (
    <section>
      <p className="admin-eyebrow">Cuenta</p>
      <h1 className="admin-page-title">Mi perfil</h1>
      <p className="admin-muted">Administra tus datos personales y preferencias de cuenta.</p>
      <div className="admin-form-card">
        <form onSubmit={guardar}>
          <div className="admin-form-grid">
            <div className="admin-field"><label htmlFor="profile-run">RUN</label><input id="profile-run" readOnly value={cuenta.run} /></div>
            <div className="admin-field"><label htmlFor="profile-role">Tipo de cuenta</label><input id="profile-role" readOnly value={cuenta.tipo} /></div>
            <div className="admin-field"><label htmlFor="profile-name">Nombre</label><input id="profile-name" maxLength={50} onChange={(event) => setNombre(event.target.value)} placeholder="Ej.: Valeria" required value={nombre} /></div>
            <div className="admin-field"><label htmlFor="profile-last-name">Apellidos</label><input id="profile-last-name" maxLength={100} onChange={(event) => setApellidos(event.target.value)} placeholder="Ej.: Rodríguez" required value={apellidos} /></div>
            <div className="admin-field"><label htmlFor="profile-email">Correo</label><input autoComplete="email" id="profile-email" maxLength={100} onChange={(event) => setCorreo(event.target.value)} placeholder="correo@example.com" required type="email" value={correo} /></div>
          </div>
          {error && <p className="admin-form-error" role="alert">{error}</p>}
          {mensaje && <p className="admin-form-success" role="status">{mensaje}</p>}
          <div className="admin-form-actions">
            <Link className="admin-button admin-button-danger" to="/admin/inicio">Cancelar</Link>
            <button className="admin-button admin-button-primary" type="submit">Guardar cambios</button>
          </div>
        </form>
      </div>
    </section>
  );
}

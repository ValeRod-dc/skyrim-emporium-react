import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import { eliminarUsuario, usuarios } from "../../data/datos-usuarios.js";

export default function UsuariosAdminPage() {
  const { user } = useAuth();
  const [, setActualizacion] = useState(0);
  const [mensaje, setMensaje] = useState("");

  function eliminar(usuario) {
    if (usuario.run === user?.run) {
      setMensaje("No puedes eliminar la cuenta con la que tienes la sesión iniciada.");
      return;
    }
    if (!window.confirm(`¿Eliminar la cuenta de ${usuario.nombre} ${usuario.apellidos}?`)) return;
    if (!eliminarUsuario(usuario.run)) {
      setMensaje("No se pudo eliminar la cuenta. Debe quedar al menos un administrador.");
      return;
    }
    setActualizacion((actual) => actual + 1);
    setMensaje("Usuario eliminado.");
  }

  return (
    <section>
      <p className="admin-eyebrow">Mantenedor</p>
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-page-title">Usuarios</h1>
          <p className="admin-muted">Cuentas de clientes, vendedores y administradores.</p>
        </div>
        <Link className="admin-button admin-button-primary" to="/admin/nuevo-usuario">Nuevo usuario</Link>
      </div>
      {mensaje && <p className="admin-form-success" role="status">{mensaje}</p>}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>RUN</th><th>Nombre</th><th>Apellidos</th><th>Correo</th><th>Tipo</th><th>Acciones</th></tr></thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.run}>
                <td>{usuario.run}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellidos}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.tipo}</td>
                <td className="admin-actions-cell">
                  <Link to={`/admin/usuarios/${encodeURIComponent(usuario.run)}`}>Ver</Link>
                  {" · "}
                  <Link to={`/admin/nuevo-usuario?run=${encodeURIComponent(usuario.run)}`}>Editar</Link>
                  {" · "}
                  <button className="admin-link-button admin-link-danger" disabled={usuario.run === user?.run} onClick={() => eliminar(usuario)} type="button">Eliminar</button>
                </td>
              </tr>
            ))}
            {!usuarios.length && <tr><td className="admin-empty" colSpan="6">No hay usuarios registrados.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

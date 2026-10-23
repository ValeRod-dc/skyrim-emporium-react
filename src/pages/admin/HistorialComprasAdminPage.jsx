import { Link, useParams } from "react-router";
import { usuarios } from "../../data/datos-usuarios.js";
import { formatoFecha, leerOrdenes } from "./ordenes.js";

export default function HistorialComprasAdminPage() {
  const { run } = useParams();
  const usuario = usuarios.find((item) => item.run.toUpperCase() === run?.toUpperCase());

  if (!usuario) {
    return <section><h1 className="admin-page-title">Usuario no encontrado</h1><Link to="/admin/usuarios">Volver a usuarios</Link></section>;
  }

  const ordenes = leerOrdenes()
    .filter((orden) =>
      orden.clienteRun === usuario.run ||
      (!orden.clienteRun && orden.correo?.toLowerCase() === usuario.correo.toLowerCase())
    )
    .slice()
    .reverse();

  return (
    <section>
      <Link className="admin-back-link" to={`/admin/usuarios/${encodeURIComponent(usuario.run)}`}>← Volver al usuario</Link>
      <p className="admin-eyebrow">Historial de compras</p>
      <h1 className="admin-page-title">{usuario.nombre} {usuario.apellidos}</h1>
      <p className="admin-muted">{usuario.correo}</p>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Número</th><th>Fecha</th><th>Estado</th><th>Productos</th><th>Total</th><th>Boleta</th></tr></thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id}>
                <td>#{orden.id}</td><td>{formatoFecha(orden.fecha)}</td><td>{orden.estado || "Sin estado"}</td>
                <td>{(orden.items || []).reduce((total, item) => total + Number(item.cantidad ?? item.qty ?? 0), 0)}</td>
                <td>{Number(orden.total || 0).toLocaleString("es-CL")} Oro</td>
                <td><Link to={`/admin/ordenes/${encodeURIComponent(orden.id)}`}>Mostrar boleta</Link></td>
              </tr>
            ))}
            {!ordenes.length && <tr><td className="admin-empty" colSpan="6">Este usuario no tiene compras registradas.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

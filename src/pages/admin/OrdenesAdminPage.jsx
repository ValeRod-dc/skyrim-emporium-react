import { Link } from "react-router";
import { formatoFecha, leerOrdenes } from "./ordenes.js";

export default function OrdenesAdminPage() {
  const ordenes = leerOrdenes().slice().reverse();

  return (
    <section>
      <p className="admin-eyebrow">Panel</p>
      <h1 className="admin-page-title">Órdenes / boletas</h1>
      <p className="admin-muted">Consulta las órdenes y muestra la boleta de cada compra.</p>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Número</th><th>Cliente</th><th>Fecha</th><th>Estado</th><th>Boleta</th></tr></thead>
          <tbody>
            {ordenes.length ? ordenes.map((orden) => (
              <tr key={orden.id}>
                <td>#{orden.id}</td>
                <td>{orden.cliente || "Viajero"}</td>
                <td>{formatoFecha(orden.fecha)}</td>
                <td>{orden.estado || "Sin estado"}</td>
                <td><Link to={`/admin/ordenes/${encodeURIComponent(orden.id)}`}>Mostrar boleta</Link></td>
              </tr>
            )) : <tr><td className="admin-empty" colSpan="5">No hay órdenes registradas.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

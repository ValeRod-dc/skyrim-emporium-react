import { Link, useParams } from "react-router";
import { formatoFecha, leerOrdenes } from "./ordenes.js";

export default function OrdenDetalleAdminPage() {
  const { id } = useParams();
  const orden = leerOrdenes().find((item) => String(item.id) === id);

  if (!orden) {
    return (
      <section>
        <h1 className="admin-page-title">Orden no encontrada</h1>
        <Link to="/admin/ordenes">Volver a órdenes</Link>
      </section>
    );
  }

  return (
    <section>
      <Link className="admin-back-link" to="/admin/ordenes">← Volver a órdenes</Link>
      <p className="admin-eyebrow">Boleta de compra</p>
      <h1 className="admin-page-title">Boleta #{orden.id}</h1>
      <div className="admin-detail-grid">
        <p><strong>Cliente:</strong> {orden.cliente || "Viajero"}</p>
        <p><strong>Correo:</strong> {orden.correo || "No disponible"}</p>
        <p><strong>Fecha:</strong> {formatoFecha(orden.fecha)}</p>
        <p><strong>Estado:</strong> {orden.estado || "Sin estado"}</p>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Total</th></tr></thead>
          <tbody>
            {(orden.items || []).map((item, index) => (
              <tr key={`${item.id || item.nombre}-${index}`}>
                <td>{item.nombre || item.name}</td>
                <td>{item.cantidad ?? item.qty ?? 0}</td>
                <td>{Number(item.precio ?? item.price ?? 0).toLocaleString("es-CL")} Oro</td>
                <td>{Number(item.total ?? (item.precio ?? item.price ?? 0) * (item.cantidad ?? item.qty ?? 0)).toLocaleString("es-CL")} Oro</td>
              </tr>
            ))}
            {(!orden.items || orden.items.length === 0) && <tr><td className="admin-empty" colSpan="4">Esta orden no contiene productos.</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="admin-order-total">Total: {Number(orden.total || 0).toLocaleString("es-CL")} Oro</p>
    </section>
  );
}

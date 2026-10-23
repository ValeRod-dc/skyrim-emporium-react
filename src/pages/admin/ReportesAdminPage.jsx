import { Link } from "react-router";
import { obtenerTodosLosProductos } from "../../data/inventario.js";
import { leerOrdenes, formatoFecha } from "./ordenes.js";

export default function ReportesAdminPage() {
  const ordenes = leerOrdenes().slice().reverse();
  const ordenesReales = ordenes.filter((orden) => !orden.demostracion);
  const productos = obtenerTodosLosProductos();
  const ingresos = ordenesReales.reduce((total, orden) => total + Number(orden.total || 0), 0);
  const unidadesVendidas = new Map();

  ordenesReales.forEach((orden) => (orden.items || []).forEach((item) => {
    const nombre = item.nombre || item.name || item.id || "Producto";
    const venta = unidadesVendidas.get(nombre) || { nombre, unidades: 0, ingresos: 0 };
    venta.unidades += Number(item.cantidad ?? item.qty ?? 0);
    venta.ingresos += Number(item.total ?? (item.precio ?? item.price ?? 0) * (item.cantidad ?? item.qty ?? 0));
    unidadesVendidas.set(nombre, venta);
  }));

  const masVendidos = [...unidadesVendidas.values()].sort((a, b) => b.unidades - a.unidades).slice(0, 10);
  const criticos = productos.filter((producto) =>
    Number(producto.stock ?? 0) <= Number(producto.stockCritico ?? 0)
  ).length;

  return (
    <section>
      <p className="admin-eyebrow">Análisis</p>
      <h1 className="admin-page-title">Reportes</h1>
      <p className="admin-muted">Resumen de ventas registradas y estado del inventario.</p>
      <div className="admin-card-grid">
        <article className="admin-stat-card"><span>Ingresos registrados</span><strong>{ingresos.toLocaleString("es-CL")} Oro</strong><small>Basado en órdenes guardadas</small></article>
        <article className="admin-stat-card"><span>Órdenes</span><strong>{ordenesReales.length}</strong><small>Compras registradas</small></article>
        <Link className="admin-stat-card" to="/admin/stock-critico">
          <span>Stock crítico</span>
          <strong>{criticos}</strong>
          <small>Ver productos críticos →</small>
        </Link>
      </div>
      <h2 className="admin-section-title">Productos más vendidos</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Producto</th><th>Unidades</th><th>Ingresos</th></tr></thead>
          <tbody>
            {masVendidos.map((item) => <tr key={item.nombre}><td>{item.nombre}</td><td>{item.unidades}</td><td>{item.ingresos.toLocaleString("es-CL")} Oro</td></tr>)}
            {!masVendidos.length && <tr><td className="admin-empty" colSpan="3">Todavía no hay compras para generar este reporte.</td></tr>}
          </tbody>
        </table>
      </div>
      <h2 className="admin-section-title">Órdenes recientes</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Número</th><th>Cliente</th><th>Fecha</th><th>Total</th></tr></thead>
          <tbody>
            {ordenesReales.slice(0, 5).map((orden) => (
              <tr key={orden.id}><td><Link to={`/admin/ordenes/${encodeURIComponent(orden.id)}`}>#{orden.id}</Link></td><td>{orden.cliente || "Viajero"}</td><td>{formatoFecha(orden.fecha)}</td><td>{Number(orden.total || 0).toLocaleString("es-CL")} Oro</td></tr>
            ))}
            {!ordenesReales.length && <tr><td className="admin-empty" colSpan="4">No hay órdenes registradas.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

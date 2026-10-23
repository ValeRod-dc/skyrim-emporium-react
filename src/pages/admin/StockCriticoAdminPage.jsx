import { Link } from "react-router";
import { obtenerTodosLosProductos } from "../../data/inventario.js";

export default function StockCriticoAdminPage() {
  const productos = obtenerTodosLosProductos()
    .filter((producto) => Number(producto.stock ?? 0) <= Number(producto.stockCritico ?? 0))
    .sort((a, b) => Number(a.stock ?? 0) - Number(b.stock ?? 0));

  return (
    <section>
      <p className="admin-eyebrow">Inventario</p>
      <h1 className="admin-page-title">Listado de productos críticos</h1>
      <p className="admin-muted">Mínimo crítico: 1 unidad para stocks de 0 a 4, 3 unidades de 5 a 19 y 5 unidades desde 20. Se incluyen ejemplos para cada nivel.</p>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Producto</th><th>Gremio</th><th>Categoría</th><th>Stock actual</th><th>Mínimo</th><th>Acción</th></tr></thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={`${producto.gremio}-${producto.id}`}>
                <td>{producto.name}</td><td>{producto.gremio}</td><td>{producto.categoria}</td>
                <td><strong className="admin-stock-alert">{producto.stock ?? 0}</strong></td>
                <td>{producto.stockCritico ?? 0}</td>
                <td><Link to={`/admin/nuevo-producto?id=${encodeURIComponent(producto.id)}&gremio=${encodeURIComponent(producto.gremio)}`}>Actualizar</Link></td>
              </tr>
            ))}
            {!productos.length && <tr><td className="admin-empty" colSpan="6">No hay productos con stock crítico.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

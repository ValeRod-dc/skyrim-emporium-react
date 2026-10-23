import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import { eliminarProductoAdmin, inventario, obtenerTodosLosProductos } from "../../data/inventario.js";

const nombresGremios = {
  herreria: "Herrería",
  alquimia: "Alquimia",
  bienesGenerales: "Bienes generales",
  ropaFina: "Ropa fina",
  comida: "Comida y taberna",
  magia: "Magia",
};

export default function ProductosAdminPage() {
  const { user } = useAuth();
  const [, setActualizacion] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [gremioFiltro, setGremioFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const productos = obtenerTodosLosProductos();
  const categorias = useMemo(() => {
    const secciones = gremioFiltro ? inventario[gremioFiltro] || [] : [];
    return secciones.length
      ? secciones.map((seccion) => seccion.titulo)
      : [...new Set(productos.map((producto) => producto.categoria))].sort();
  }, [gremioFiltro, productos]);

  const filtrados = productos.filter((producto) =>
    (!gremioFiltro || producto.gremio === gremioFiltro) &&
    (!categoriaFiltro || producto.categoria === categoriaFiltro)
  );

  function cambiarGremio(event) {
    setGremioFiltro(event.target.value);
    setCategoriaFiltro("");
  }

  function eliminar(producto) {
    if (!window.confirm(`¿Eliminar "${producto.name}" del inventario?`)) return;
    if (!eliminarProductoAdmin(producto.id, producto.gremio)) {
      setMensaje("No se pudo eliminar el producto.");
      return;
    }
    setActualizacion((actual) => actual + 1);
    setMensaje("Producto eliminado.");
  }

  return (
    <section>
      <p className="admin-eyebrow">Mantenedor</p>
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-page-title">Productos</h1>
          <p className="admin-muted">Inventario de los gremios y estado de stock.</p>
        </div>
        {user?.tipo === "Administrador" && <div className="admin-detail-actions">
          <Link className="admin-button admin-button-secondary" to="/admin/stock-critico">Stock crítico</Link>
          <Link className="admin-button admin-button-primary" to="/admin/nuevo-producto">Nuevo producto</Link>
        </div>}
      </div>
      {mensaje && <p className="admin-form-success" role="status">{mensaje}</p>}

      <div className="admin-filters">
        <div className="admin-field">
          <label htmlFor="product-guild-filter">Gremio</label>
          <select className="admin-filter-select" id="product-guild-filter" onChange={cambiarGremio} value={gremioFiltro}>
            <option value="">Todos los gremios</option>
            {Object.entries(nombresGremios).map(([id, nombre]) => <option key={id} value={id}>{nombre}</option>)}
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="product-category-filter">Tipo de producto</label>
          <select
            className="admin-filter-select"
            id="product-category-filter"
            onChange={(event) => setCategoriaFiltro(event.target.value)}
            value={categoriaFiltro}
          >
            <option value="">Todos los tipos</option>
            {categorias.map((categoria) => <option key={categoria} value={categoria}>{categoria}</option>)}
          </select>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Código</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Categoría</th><th>Acciones</th></tr></thead>
          <tbody>
            {filtrados.map((producto) => {
              const stock = Number(producto.stock ?? 0);
              const critico = Number(producto.stockCritico ?? 0);
              return (
                <tr key={`${producto.gremio}-${producto.id}`}>
                  <td>{producto.codigo || producto.id}</td>
                  <td>{producto.name}</td>
                  <td>{Number(producto.price).toLocaleString("es-CL")} Oro</td>
                  <td>{stock}{stock <= critico && <span className="admin-stock-alert"> · Stock crítico</span>}</td>
                  <td>{nombresGremios[producto.gremio] || producto.gremio} · {producto.categoria}</td>
                  <td>{user?.tipo === "Administrador"
                    ? <>
                      <Link to={`/admin/nuevo-producto?id=${encodeURIComponent(producto.id)}&gremio=${encodeURIComponent(producto.gremio)}`}>Editar</Link>
                      {" · "}
                      <button className="admin-link-button admin-link-danger" onClick={() => eliminar(producto)} type="button">Eliminar</button>
                    </>
                    : "Solo lectura"}</td>
                </tr>
              );
            })}
            {!filtrados.length && <tr><td className="admin-empty" colSpan="6">No hay productos para estos filtros.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

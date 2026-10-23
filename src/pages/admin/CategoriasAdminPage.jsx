import { useState } from "react";
import { Link } from "react-router";
import { actualizarCategoriaAdmin, eliminarCategoriaAdmin, obtenerCategoriasAdmin } from "../../data/inventario.js";

export default function CategoriasAdminPage() {
  const [categorias, setCategorias] = useState(obtenerCategoriasAdmin);
  const [editando, setEditando] = useState(null);
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  function iniciarEdicion(categoria) {
    setEditando(categoria.id);
    setNombre(categoria.titulo);
    setMensaje("");
  }

  function guardarEdicion(event) {
    event.preventDefault();
    if (!actualizarCategoriaAdmin(editando, nombre)) {
      setMensaje("No se pudo guardar: revisa el nombre y que no exista en ese gremio.");
      return;
    }
    setCategorias(obtenerCategoriasAdmin());
    setEditando(null);
    setMensaje("Categoría actualizada.");
  }

  function eliminar(categoria) {
    if (categoria.productos > 0) {
      setMensaje("No se puede eliminar una categoría que todavía tiene productos.");
      return;
    }
    if (!window.confirm(`¿Eliminar la categoría "${categoria.titulo}"?`)) return;
    if (!eliminarCategoriaAdmin(categoria.id)) {
      setMensaje("No se pudo eliminar la categoría.");
      return;
    }
    setCategorias(obtenerCategoriasAdmin());
    setMensaje("Categoría eliminada.");
  }

  return (
    <section>
      <p className="admin-eyebrow">Mantenedor</p>
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-page-title">Categorías</h1>
          <p className="admin-muted">Organiza el catálogo por gremio. Solo se eliminan categorías vacías.</p>
        </div>
        <Link className="admin-button admin-button-primary" to="/admin/nueva-categoria">Nueva categoría</Link>
      </div>
      {mensaje && <p className="admin-form-success" role="status">{mensaje}</p>}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Gremio</th><th>Categoría</th><th>Productos</th><th>Acciones</th></tr></thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.gremio}</td>
                <td>{editando === categoria.id ? (
                  <form className="admin-inline-form" onSubmit={guardarEdicion}>
                    <input aria-label="Nombre de categoría" maxLength={80} onChange={(event) => setNombre(event.target.value)} required value={nombre} />
                    <button className="admin-button admin-button-primary" type="submit">Guardar</button>
                    <button className="admin-button admin-button-secondary" onClick={() => setEditando(null)} type="button">Cancelar</button>
                  </form>
                ) : categoria.titulo}</td>
                <td>{categoria.productos}</td>
                <td>
                  {editando !== categoria.id && <button className="admin-link-button" onClick={() => iniciarEdicion(categoria)} type="button">Editar</button>}
                  {" "}
                  <button className="admin-link-button admin-link-danger" disabled={categoria.productos > 0} onClick={() => eliminar(categoria)} type="button">Eliminar</button>
                </td>
              </tr>
            ))}
            {!categorias.length && <tr><td className="admin-empty" colSpan="4">No hay categorías disponibles.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

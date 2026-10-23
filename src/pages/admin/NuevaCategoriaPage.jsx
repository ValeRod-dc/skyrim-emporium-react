import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { guardarCategoriaAdmin } from "../../data/inventario.js";

const gremios = [
  ["herreria", "Herrería"],
  ["alquimia", "Alquimia"],
  ["bienesGenerales", "Bienes generales"],
  ["ropaFina", "Ropa fina"],
  ["comida", "Comida y taberna"],
  ["magia", "Magia"],
];

export default function NuevaCategoriaPage() {
  const navigate = useNavigate();
  const [gremio, setGremio] = useState("");
  const [titulo, setTitulo] = useState("");
  const [error, setError] = useState("");

  function guardar(event) {
    event.preventDefault();
    if (!gremio || !titulo.trim()) {
      setError("Selecciona un gremio e ingresa el nombre de la categoría.");
      return;
    }
    if (!guardarCategoriaAdmin(gremio, titulo)) {
      setError("Ya existe una categoría con ese nombre en el gremio seleccionado.");
      return;
    }
    navigate("/admin/categorias", { replace: true });
  }

  return (
    <section>
      <Link className="admin-back-link" to="/admin/categorias">← Volver a categorías</Link>
      <div className="admin-form-card">
        <p className="admin-eyebrow">Mantenedor</p>
        <h1 className="admin-page-title">Nueva categoría</h1>
        <form onSubmit={guardar}>
          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="category-guild">Gremio</label>
              <select id="category-guild" onChange={(event) => setGremio(event.target.value)} required value={gremio}>
                <option value="">Selecciona un gremio</option>
                {gremios.map(([id, nombre]) => <option key={id} value={id}>{nombre}</option>)}
              </select>
            </div>
            <div className="admin-field">
              <label htmlFor="category-name">Nombre</label>
              <input id="category-name" maxLength={80} onChange={(event) => setTitulo(event.target.value)} placeholder="Ej.: Espadas y armas" required value={titulo} />
            </div>
          </div>
          {error && <p className="admin-form-error" role="alert">{error}</p>}
          <div className="admin-form-actions">
            <Link className="admin-button admin-button-secondary" to="/admin/categorias">Cancelar</Link>
            <button className="admin-button admin-button-primary" type="submit">Guardar categoría</button>
          </div>
        </form>
      </div>
    </section>
  );
}

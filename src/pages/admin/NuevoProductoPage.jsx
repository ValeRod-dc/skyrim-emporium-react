import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  actualizarProductoAdmin,
  buscarProductoPorId,
  guardarProductoAdmin,
  inventario,
  obtenerStockCritico,
  obtenerTodosLosProductos,
} from "../../data/inventario.js";

const gremiosDisponibles = [
  ["herreria", "Herrería"],
  ["alquimia", "Alquimia"],
  ["bienesGenerales", "Bienes generales"],
  ["ropaFina", "Ropa fina"],
  ["comida", "Comida y taberna"],
  ["magia", "Magia"],
];

function crearFormulario(producto) {
  return {
    codigo: producto?.codigo || producto?.id || "",
    nombre: producto?.name || "",
    descripcion: producto?.description || "",
    precio: producto?.price ?? "",
    stock: producto?.stock ?? 0,
    stockCritico: producto?.stockCritico ?? obtenerStockCritico(producto?.stock ?? 0),
    gremio: producto?.gremio || "",
    categoria: producto?.categoria || "",
    imagen: producto?.image || "",
  };
}

export default function NuevoProductoPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const idEdicion = searchParams.get("id");
  const gremioOriginal = searchParams.get("gremio") || undefined;
  const productoExistente = idEdicion ? buscarProductoPorId(idEdicion, gremioOriginal) : null;
  const [form, setForm] = useState(() => crearFormulario(productoExistente));
  const [error, setError] = useState("");
  const [categorias, setCategorias] = useState(inventario[form.gremio] || []);

  function actualizarCampo(event) {
    const { name, value } = event.target;
    if (name === "gremio") {
      setCategorias(inventario[value] || []);
      setForm((actual) => ({ ...actual, gremio: value, categoria: "" }));
      return;
    }
    if (name === "stock") {
      setForm((actual) => ({ ...actual, stock: value, stockCritico: obtenerStockCritico(value) }));
      return;
    }
    setForm((actual) => ({ ...actual, [name]: value }));
  }

  function guardar(event) {
    event.preventDefault();
    if (
      form.codigo.trim().length < 3 ||
      !form.nombre.trim() ||
      form.nombre.trim().length > 100 ||
      Number(form.precio) < 0 ||
      form.precio === "" ||
      !Number.isInteger(Number(form.stock)) ||
      Number(form.stock) < 0 ||
      !Number.isInteger(Number(form.stockCritico)) ||
      Number(form.stockCritico) < 0 ||
      !form.gremio ||
      !form.categoria
    ) {
      setError("Revisa los campos: código, nombre, precio, stock, gremio y categoría son obligatorios y deben ser válidos.");
      return;
    }

    const codigo = form.codigo.trim();
    const duplicado = obtenerTodosLosProductos().some((producto) =>
      String(producto.codigo || producto.id).toLowerCase() === codigo.toLowerCase() &&
      producto.id !== idEdicion
    );
    if (duplicado) {
      setError("Ese código ya está registrado.");
      return;
    }

    const producto = {
      ...(productoExistente || {}),
      id: idEdicion || `${codigo.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      codigo,
      name: form.nombre.trim(),
      description: form.descripcion.trim(),
      price: Number(form.precio),
      stock: Number(form.stock),
      stockCritico: Number(form.stockCritico),
      gremio: form.gremio,
      categoria: form.categoria,
      image: form.imagen.trim() || productoExistente?.image || "assets/img/Iconos/Whiterun.png",
    };

    const guardado = idEdicion
      ? actualizarProductoAdmin(producto, gremioOriginal || productoExistente?.gremio)
      : guardarProductoAdmin(producto);
    if (!guardado) {
      setError(idEdicion ? "No se pudo actualizar el producto." : "No se pudo guardar. Revisa que el código sea único y la categoría exista.");
      return;
    }

    navigate("/admin/productos", { replace: true });
  }

  function cargarImagen(event) {
    const archivo = event.target.files?.[0];
    if (!archivo) return;
    const lector = new FileReader();
    lector.onload = () => setForm((actual) => ({ ...actual, imagen: String(lector.result) }));
    lector.onerror = () => {
      console.error("No se pudo leer el archivo de imagen.", lector.error);
      setError("No se pudo leer la imagen seleccionada.");
    };
    lector.readAsDataURL(archivo);
  }

  return (
    <section>
      <Link className="admin-back-link" to="/admin/productos">← Volver a productos</Link>
      <div className="admin-form-card">
        <p className="admin-eyebrow">Mantenedor</p>
        <h1 className="admin-page-title">{idEdicion ? "Editar producto" : "Nuevo producto"}</h1>
        <form onSubmit={guardar}>
          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="product-code">Código</label>
              <input id="product-code" maxLength={80} name="codigo" onChange={actualizarCampo} placeholder="Ej.: ESP-001" required value={form.codigo} />
            </div>
            <div className="admin-field">
              <label htmlFor="product-name">Nombre</label>
              <input id="product-name" maxLength={100} name="nombre" onChange={actualizarCampo} placeholder="Ej.: Espada de hierro" required value={form.nombre} />
            </div>
            <div className="admin-field">
              <label htmlFor="product-price">Precio en oro</label>
              <input id="product-price" min="0" name="precio" onChange={actualizarCampo} placeholder="Ej.: 250" required type="number" value={form.precio} />
            </div>
            <div className="admin-field">
              <label htmlFor="product-stock">Stock</label>
              <input id="product-stock" min="0" name="stock" onChange={actualizarCampo} placeholder="Ej.: 10" required type="number" value={form.stock} />
            </div>
            <div className="admin-field">
              <label htmlFor="product-critical-stock">Stock crítico</label>
              <input id="product-critical-stock" min="0" name="stockCritico" onChange={actualizarCampo} placeholder="Ej.: 3" required type="number" value={form.stockCritico} />
            </div>
            <div className="admin-field">
              <label htmlFor="product-guild">Gremio</label>
              <select id="product-guild" name="gremio" onChange={actualizarCampo} required value={form.gremio}>
                <option value="">Selecciona un gremio</option>
                {gremiosDisponibles.map(([id, nombre]) => <option key={id} value={id}>{nombre}</option>)}
              </select>
            </div>
            <div className="admin-field">
              <label htmlFor="product-category">Categoría</label>
              <select id="product-category" name="categoria" onChange={actualizarCampo} required value={form.categoria}>
                <option value="">Selecciona una categoría</option>
                {categorias.map((seccion) => <option key={seccion.titulo} value={seccion.titulo}>{seccion.titulo}</option>)}
              </select>
            </div>
            <div className="admin-field">
              <label htmlFor="product-image">Ruta de imagen</label>
              <input id="product-image" maxLength={500} name="imagen" onChange={actualizarCampo} placeholder="Ej.: assets/img/Herreria/Espada.png" value={form.imagen} />
            </div>
            <div className="admin-field">
              <label htmlFor="product-image-file">O seleccionar imagen</label>
              <input accept="image/*" id="product-image-file" onChange={cargarImagen} type="file" />
            </div>
            <div className="admin-field admin-field-wide">
              <label htmlFor="product-description">Descripción</label>
              <textarea id="product-description" maxLength={500} name="descripcion" onChange={actualizarCampo} placeholder="Describe brevemente el producto" value={form.descripcion} />
            </div>
          </div>
          {error && <p className="admin-form-error" role="alert">{error}</p>}
          <div className="admin-form-actions">
            <Link className="admin-button admin-button-secondary" to="/admin/productos">Cancelar</Link>
            <button className="admin-button admin-button-primary" type="submit">{idEdicion ? "Actualizar producto" : "Guardar producto"}</button>
          </div>
        </form>
      </div>
    </section>
  );
}

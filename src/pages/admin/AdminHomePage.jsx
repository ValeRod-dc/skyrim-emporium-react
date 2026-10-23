import { Link } from "react-router";
import { obtenerTodosLosProductos } from "../../data/inventario.js";
import { usuarios } from "../../data/datos-usuarios.js";
import { leerOrdenes } from "./ordenes.js";

export default function AdminHomePage() {
  const productos = obtenerTodosLosProductos();
  const ordenes = leerOrdenes();
  const ordenesReales = ordenes.filter((orden) => !orden.demostracion);
  const ingresos = ordenesReales.reduce((total, orden) => total + Number(orden.total || 0), 0);

  const tarjetas = [
    { titulo: "Órdenes / boletas", valor: `${ingresos.toLocaleString("es-CL")} Oro`, detalle: `${ordenesReales.length} órdenes registradas`, ruta: "/admin/ordenes" },
    { titulo: "Productos", valor: productos.length, detalle: "Revisar inventario", ruta: "/admin/productos" },
    { titulo: "Usuarios", valor: usuarios.length, detalle: "Administrar cuentas", ruta: "/admin/usuarios" },
  ];

  return (
    <section>
      <p className="admin-eyebrow">Panel</p>
      <h1 className="admin-page-title">Inicio administrador</h1>
      <p className="admin-muted">Gestiona el inventario, las cuentas y las órdenes de la tienda.</p>
      <div className="admin-card-grid">
        {tarjetas.map((tarjeta) => (
          <Link className="admin-stat-card" key={tarjeta.titulo} to={tarjeta.ruta}>
            <span>{tarjeta.titulo}</span>
            <strong>{tarjeta.valor}</strong>
            <small>{tarjeta.detalle} →</small>
          </Link>
        ))}
      </div>
      <div className="admin-module-grid">
        <Link className="admin-module-card" to="/admin/ordenes"><strong>Órdenes / boletas</strong><span>Revisar compras y mostrar sus boletas.</span></Link>
        <Link className="admin-module-card" to="/admin/productos"><strong>Productos</strong><span>Crear, editar y administrar inventario.</span></Link>
        <Link className="admin-module-card" to="/admin/categorias"><strong>Categorías</strong><span>Organizar los productos por gremio.</span></Link>
        <Link className="admin-module-card" to="/admin/usuarios"><strong>Usuarios</strong><span>Administrar cuentas e historial de compras.</span></Link>
        <Link className="admin-module-card" to="/admin/reportes"><strong>Reportes</strong><span>Consultar ventas y productos.</span></Link>
        <Link className="admin-module-card" to="/admin/perfil"><strong>Perfil</strong><span>Actualizar tus datos personales.</span></Link>
      </div>
    </section>
  );
}

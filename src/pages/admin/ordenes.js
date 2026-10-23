const ORDENES_KEY = "skyrimOrdenes";

export function leerOrdenes() {
  const ordenes = JSON.parse(localStorage.getItem(ORDENES_KEY) || "[]");
  if (!Array.isArray(ordenes)) throw new Error("El formato guardado de órdenes no es válido.");
  return ordenes;
}

export function guardarOrden(orden) {
  const ordenes = leerOrdenes();
  if (!orden?.id || ordenes.some((item) => String(item.id) === String(orden.id))) return false;

  try {
    localStorage.setItem(ORDENES_KEY, JSON.stringify([...ordenes, orden]));
  } catch (error) {
    console.error("No se pudo guardar la orden.", error);
    return false;
  }
  return true;
}

export function asegurarOrdenDemostracion(usuario) {
  if (!usuario?.run || !usuario?.correo) return false;

  const ordenes = leerOrdenes();
  if (ordenes.some((orden) =>
    orden.clienteRun === usuario.run ||
    (!orden.clienteRun && orden.correo?.toLowerCase() === usuario.correo.toLowerCase())
  )) return true;

  const orden = {
    id: `DEMO-${usuario.run}`,
    cliente: `${usuario.nombre} ${usuario.apellidos}`.trim(),
    clienteRun: usuario.run,
    correo: usuario.correo,
    fecha: new Date().toISOString(),
    estado: "Compra de ejemplo",
    demostracion: true,
    items: [{ id: "espada-hierro", nombre: "Espada Hierro", cantidad: 1, precio: 40, total: 40 }],
    total: 40,
  };

  return guardarOrden(orden);
}

export function eliminarOrden(id) {
  const ordenes = leerOrdenes();
  const restantes = ordenes.filter((orden) => String(orden.id) !== String(id));
  if (restantes.length === ordenes.length) return false;

  try {
    localStorage.setItem(ORDENES_KEY, JSON.stringify(restantes));
  } catch (error) {
    console.error("No se pudo revertir la orden.", error);
    return false;
  }
  return true;
}

export function formatoFecha(fecha) {
  const valor = new Date(fecha);
  return Number.isNaN(valor.getTime()) ? "Fecha no disponible" : valor.toLocaleString("es-CL");
}

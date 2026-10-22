// id en oferta y % de descuento
export const ofertas = {
  "armadura-acero": 20,
  "pocion-salud": 20,
  "baston-destruccion": 20,
  "rollo-dulce": 20
};

// calcular el precio final
export const obtenerPrecioConDescuento = (producto) => {
  if (ofertas[producto.id]) {
    const descuento = ofertas[producto.id];
    return Math.round(producto.price * (1 - descuento / 100));
  }
  return producto.price;
};

// función x si un producto está en oferta
export const esOferta = (producto) => {
  return !!ofertas[producto.id];
};
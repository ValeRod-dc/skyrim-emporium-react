import { imagenCatalogo } from '../utils/imagenes';
import { obtenerPrecioConDescuento, esOferta } from '../utils/ofertas';

describe('Utilidades (imagenes y ofertas)', () => {
  // 9. Prueba de tu función imagenCatalogo (Reemplaza la de RUN)
  it('debe corregir la ruta de la imagen de Alquimia', () => {
    const rutaMal = 'assets/img/Alquimia/Ingredients/Abeja.png';
    const rutaEsperada = '/assets/img/Alquimia/Ingredientes/Abeja.png';
    expect(imagenCatalogo(rutaMal)).toBe(rutaEsperada);
  });

  // 10. Prueba de tu función de ofertas
  it('debe aplicar el 20% de descuento a un producto en oferta', () => {
    const producto = { id: 'armadura-acero', price: 200 };
    expect(obtenerPrecioConDescuento(producto)).toBe(160); // 200 - 20% = 160
    expect(esOferta(producto)).toBe(true);
  });
});
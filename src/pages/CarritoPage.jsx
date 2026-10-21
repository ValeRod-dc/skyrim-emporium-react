import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { imagenCatalogo } from "../utils/imagenes";

const formatoOro = (n) => Number(n).toLocaleString("es-CL");

export default function CarritoPage() {
  const { cart, total, changeQty, remove, clear } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container compra-page">
      <h1 className="compra-h1">Carrito de Compras</h1>
      <p className="subtitulo">Revisa tu bolsa antes de cerrar el trato, viajero.</p>

      <section className="panel-compra">
        {cart.length === 0 ? (
          <div className="compra-vacio">
            <p>Tu bolsa está vacía, viajero.</p>
            <Link to="/" className="btn-compra">Explorar el catálogo</Link>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="tabla-compra">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th className="text-end">Precio</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Subtotal</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="compra-img">
                          <img
                            src={imagenCatalogo(item.image)}
                            alt={item.name}
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        </div>
                      </td>
                      <td className="compra-nombre">{item.name}</td>
                      <td className="text-end text-nowrap">{formatoOro(item.price)} Oro</td>
                      <td>
                        <div className="cant-control">
                          <button
                            type="button"
                            aria-label={`Quitar una unidad de ${item.name}`}
                            disabled={item.qty <= 1}
                            onClick={() => changeQty(item.id, -1)}
                          >
                            −
                          </button>
                          <span>{item.qty}</span>
                          <button
                            type="button"
                            aria-label={`Agregar una unidad de ${item.name}`}
                            disabled={item.qty >= item.stock}
                            onClick={() => changeQty(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-end text-nowrap compra-subtotal">
                        {formatoOro(item.price * item.qty)} Oro
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn-compra-peligro"
                          onClick={() => remove(item.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="compra-total">
              <span>Total</span>
              <strong>{formatoOro(total())} Oro</strong>
            </div>

            <div className="compra-acciones">
              <button type="button" className="btn-compra-sec" onClick={clear}>
                Vaciar bolsa
              </button>
              <button type="button" className="btn-compra" onClick={() => navigate("/checkout")}>
                Comprar ahora
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
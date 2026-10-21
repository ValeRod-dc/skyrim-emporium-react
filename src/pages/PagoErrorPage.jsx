import { Link, Navigate } from "react-router";
import { imagenCatalogo } from "../utils/imagenes";

const formatoOro = (n) => Number(n).toLocaleString("es-CL");

function leerPedido() {
  try {
    return JSON.parse(sessionStorage.getItem("skyrim_pedido"));
  } catch {
    return null;
  }
}

export default function PagoErrorPage() {
  const pedido = leerPedido();

  // Si entran directo a la URL sin pedido, no hay nada que mostrar
  if (!pedido) return <Navigate to="/carrito" replace />;

  const { numero, cliente, items, total } = pedido;

  return (
    <div className="container compra-page">
      <section className="panel-compra">
        <div className="pago-estado">
          <span className="pago-icono pago-icono-error" aria-hidden="true">✕</span>
          <h1 className="pago-titulo">No se pudo realizar el pago. Pedido #{numero}</h1>
        </div>

        <p className="pago-aviso" role="alert">
          Tu bolsa sigue intacta y no se ha cobrado nada. Revisa tus datos e inténtalo de nuevo.
        </p>

        <div className="text-center mb-4">
          <Link to="/checkout" className="btn-compra">Volver a realizar el pago</Link>
        </div>

        <h2 className="compra-h3">Información del cliente</h2>
        <dl className="pago-datos">
          <div><dt>Nombre</dt><dd>{cliente.nombre}</dd></div>
          <div><dt>Apellidos</dt><dd>{cliente.apellidos}</dd></div>
          <div className="ancho"><dt>Correo</dt><dd>{cliente.correo}</dd></div>
        </dl>

        <h2 className="compra-h3">Dirección de entrega</h2>
        <dl className="pago-datos">
          <div>
            <dt>Calle</dt>
            <dd>{cliente.calle}{cliente.departamento && `, Depto ${cliente.departamento}`}</dd>
          </div>
          <div><dt>Comuna</dt><dd>{cliente.comuna}</dd></div>
          <div className="ancho"><dt>Región</dt><dd>{cliente.region}</dd></div>
          {cliente.indicaciones && (
            <div className="ancho"><dt>Indicaciones</dt><dd>{cliente.indicaciones}</dd></div>
          )}
        </dl>

        <h2 className="compra-h3">Detalle de la compra</h2>
        <div className="table-responsive">
          <table className="tabla-compra">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th className="text-end">Precio</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="compra-img compra-img-sm">
                      <img
                        src={imagenCatalogo(item.image)}
                        alt={item.name}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    </div>
                  </td>
                  <td className="compra-nombre">{item.name}</td>
                  <td className="text-end text-nowrap">{formatoOro(item.price)} Oro</td>
                  <td className="text-center">{item.qty}</td>
                  <td className="text-end text-nowrap compra-subtotal">
                    {formatoOro(item.price * item.qty)} Oro
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="compra-total">
          <span>Total a pagar</span>
          <strong>{formatoOro(total)} Oro</strong>
        </div>
      </section>
    </div>
  );
}
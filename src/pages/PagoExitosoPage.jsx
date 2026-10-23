import { Link, Navigate } from "react-router";
import { useEffect } from "react";
import { imagenCatalogo } from "../utils/imagenes";

const formatoOro = (n) => Number(n).toLocaleString("es-CL");

function leerPedido() {
  try {
    return JSON.parse(sessionStorage.getItem("skyrim_pedido"));
  } catch {
    return null;
  }
}

export default function PagoExitosoPage() {
  const pedido = leerPedido();

  //Limpia el pedido de la sesión al mostrar la página para que no se pueda recargar y duplicar
  useEffect(() => {
    return () => sessionStorage.removeItem("skyrim_pedido");
  }, []);

  if (!pedido) return <Navigate to="/" replace />;

  const { numero, cliente, items, total } = pedido;

  return (
    <div className="container compra-page">
      <section className="panel-compra">
        <div className="pago-estado">
          <span className="pago-icono pago-icono-exito" aria-hidden="true">✓</span>
          <h1 className="pago-titulo">¡Se ha realizado la compra! Pedido #{numero}</h1>
        </div>

        <p className="pago-aviso pago-aviso-exito" role="alert">
          Los cuervos mensajeros ya van en camino con tu pedido. Revisa tu correo para más detalles.
        </p>

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
          <span>Total pagado</span>
          <strong>{formatoOro(total)} Oro</strong>
        </div>

        <div className="compra-acciones">
          <Link to="/" className="btn-compra">Volver a la tienda</Link>
        </div>
      </section>
    </div>
  );
}
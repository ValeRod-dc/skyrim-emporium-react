import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { regionesChile } from "../data/datos-usuarios";
import { imagenCatalogo } from "../utils/imagenes";
import { actualizarStockProducto } from "../data/inventario";

const CORREO_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const formatoOro = (n) => Number(n).toLocaleString("es-CL");

// Revisa los datos y devuelve un objeto solo con los campos que tienen error
function validar(datos) {
  const errores = {};
  if (datos.nombre.trim().length < 2) errores.nombre = "Ingresa tu nombre.";
  if (datos.apellidos.trim().length < 2) errores.apellidos = "Ingresa tus apellidos.";
  if (!CORREO_REGEX.test(datos.correo.trim())) errores.correo = "Ingresa un correo válido.";
  if (datos.calle.trim().length < 3) errores.calle = "Ingresa la calle y el número.";
  if (!datos.region) errores.region = "Selecciona una región.";
  if (!datos.comuna) errores.comuna = "Selecciona una comuna.";
  return errores;
}

export default function CheckoutPage() {
  const { cart, total, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Si hay sesión iniciada, los datos del cliente se completan solos
  const [datos, setDatos] = useState({
    nombre: user?.nombre ?? "",
    apellidos: user?.apellidos ?? "",
    correo: user?.correo ?? "",
    calle: "",
    departamento: "",
    region: "",
    comuna: "",
    indicaciones: "",
  });
  const [errores, setErrores] = useState({});
  const [procesando, setProcesando] = useState(false);

  // Un solo manejador para todos los campos, usando el atributo name.
  // Si cambia la región, se borra la comuna anterior.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "region" ? { comuna: "" } : {}),
    }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("1. Botón presionado. Validando formulario...");

    const nuevos = validar(datos);
    setErrores(nuevos);

    if (Object.keys(nuevos).length > 0) {
      console.log("2. Errores de validación encontrados: ", nuevos);
      window.scrollTo({top: 0, behavior:'smooth'});
      return;
    }

    console.log("3. Formulario válido. Procesando pago...");
    setProcesando(true);
    

    const pedido = {
      numero: Date.now().toString().slice(-8),
      cliente: datos,
      items: cart,
      total: total(),
    };
    sessionStorage.setItem("skyrim_pedido", JSON.stringify(pedido));

    //Se simula la pasarela de pago (80% de éxito y un 20% de error)
    setTimeout(() => {
      const pagoExitoso = Math.random() > 0.2;
      console.log("4. Resultado del pago:", pagoExitoso ? "ÉXITO" : "ERROR");

      if (pagoExitoso) {
        cart.forEach((item) => {
          actualizarStockProducto(item.id, item.qty); //Descuenta el stock al pagar
        });
        clear(); //Vacía el carrito
        navigate("/pago-exitoso");
      } else {
        navigate("/pago-error");
      }
    }, 1000);
  };

  // Comunas de la región elegida (arreglo vacío si aún no hay región)
  const comunas = datos.region ? regionesChile[datos.region] : [];

  // Este return va DESPUÉS de los hooks (useState), nunca antes
  if (cart.length === 0) {
    return (
      <div className="container compra-page">
        <section className="panel-compra">
          <div className="compra-vacio">
            <p>No hay productos en tu bolsa para pagar.</p>
            <Link to="/carrito" className="btn-compra">Volver al carrito</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="container compra-page">
      <form className="panel-compra" onSubmit={handleSubmit} noValidate>
        {/* Cabecera con el total */}
        <div className="checkout-cabecera">
          <div>
            <h1 className="compra-h2">Carrito de compra</h1>
            <p className="compra-sub">Completa la siguiente información</p>
          </div>
          <span className="badge-total">Total a pagar: {formatoOro(total())} Oro</span>
        </div>

        {/* Resumen del carrito */}
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
              {cart.map((item) => (
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

        {/* Información del cliente */}
        <h2 className="compra-h3">Información del cliente</h2>
        <p className="compra-sub">Completa la siguiente información</p>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div className="form-compra-campo">
              <label htmlFor="nombre">Nombre<span className="req">*</span></label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                className={errores.nombre ? "input-error" : ""}
                value={datos.nombre}
                onChange={handleChange}
              />
              {errores.nombre && <span className="error" role="alert">{errores.nombre}</span>}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-compra-campo">
              <label htmlFor="apellidos">Apellidos<span className="req">*</span></label>
              <input
                id="apellidos"
                name="apellidos"
                type="text"
                className={errores.apellidos ? "input-error" : ""}
                value={datos.apellidos}
                onChange={handleChange}
              />
              {errores.apellidos && <span className="error" role="alert">{errores.apellidos}</span>}
            </div>
          </div>
          <div className="col-12">
            <div className="form-compra-campo">
              <label htmlFor="correo">Correo<span className="req">*</span></label>
              <input
                id="correo"
                name="correo"
                type="email"
                className={errores.correo ? "input-error" : ""}
                value={datos.correo}
                onChange={handleChange}
              />
              {errores.correo && <span className="error" role="alert">{errores.correo}</span>}
            </div>
          </div>
        </div>

        {/* Dirección de entrega */}
        <h2 className="compra-h3">Dirección de entrega de los productos</h2>
        <p className="compra-sub">Ingresa la dirección de forma detallada</p>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div className="form-compra-campo">
              <label htmlFor="calle">Calle<span className="req">*</span></label>
              <input
                id="calle"
                name="calle"
                type="text"
                className={errores.calle ? "input-error" : ""}
                value={datos.calle}
                onChange={handleChange}
              />
              {errores.calle && <span className="error" role="alert">{errores.calle}</span>}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-compra-campo">
              <label htmlFor="departamento">Departamento (opcional)</label>
              <input
                id="departamento"
                name="departamento"
                type="text"
                placeholder="Ej: 603"
                value={datos.departamento}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-compra-campo">
              <label htmlFor="region">Región<span className="req">*</span></label>
              <select
                id="region"
                name="region"
                className={errores.region ? "input-error" : ""}
                value={datos.region}
                onChange={handleChange}
              >
                <option value="">Selecciona una región</option>
                {Object.keys(regionesChile).map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              {errores.region && <span className="error" role="alert">{errores.region}</span>}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-compra-campo">
              <label htmlFor="comuna">Comuna<span className="req">*</span></label>
              <select
                id="comuna"
                name="comuna"
                className={errores.comuna ? "input-error" : ""}
                value={datos.comuna}
                onChange={handleChange}
                disabled={!datos.region}
              >
                <option value="">
                  {datos.region ? "Selecciona una comuna" : "Primero elige una región"}
                </option>
                {comunas.map((comuna) => (
                  <option key={comuna} value={comuna}>{comuna}</option>
                ))}
              </select>
              {errores.comuna && <span className="error" role="alert">{errores.comuna}</span>}
            </div>
          </div>
          <div className="col-12">
            <div className="form-compra-campo">
              <label htmlFor="indicaciones">Indicaciones para la entrega (opcional)</label>
              <textarea
                id="indicaciones"
                name="indicaciones"
                rows={3}
                placeholder="Ej: Entre calles, color de la casa, no tiene timbre."
                value={datos.indicaciones}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="compra-acciones">
          <Link to="/carrito" className="btn-compra-sec">Volver al carrito</Link>
          <button type="submit" className="btn-compra">
            Pagar ahora {formatoOro(total())} Oro
          </button>
        </div>
      </form>
    </div>
  );
}
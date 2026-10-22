import { useParams, Link } from "react-router";
import { buscarProductoPorId } from "../data/inventario";
import { configuracionGremios } from "../data/gremios";
import { useCart } from "../context/CartContext";
import { imagenCatalogo } from "../utils/imagenes";

export default function ProductoDetallePage() {
  const { id } = useParams();
  const producto = buscarProductoPorId(id);
  const { add } = useCart();

  if (!producto) {
    return (
      <div className="container py-5 text-center text-danger">
        <h2>Producto no encontrado</h2>
        <Link to="/" className="btn btn-outline-warning mt-3">Volver al inicio</Link>
      </div>
    );
  }

  // botón de volver => gremio
  const slugGremio = Object.keys(configuracionGremios).find(
    key => configuracionGremios[key].categoria === producto.gremio
  );
  const nombreGremio = slugGremio ? configuracionGremios[slugGremio].titulo : "la tienda";
  const stock = Number(producto.stock ?? 0);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card bg-dark border-secondary text-light p-4">
            <div className="row g-4 align-items-center">
              
              {/* Imagen */}
              <div className="col-md-5 d-flex justify-content-center p-4 rounded" style={{ backgroundColor: "#0a0a0a" }}>
                <img 
                  src={imagenCatalogo(producto.image)} 
                  alt={producto.name} 
                  className="img-fluid" 
                  style={{ maxHeight: "400px", objectFit: "contain" }} 
                />
              </div>

              {/* Detalles */}
              <div className="col-md-7">
                <span className="badge bg-secondary mb-2">{producto.categoria}</span>
                <h1 className="font-cinzel text-warning mb-3">{producto.name}</h1>
                <p className="fs-5 text-light mb-4">{producto.description}</p>
                
                <p className="text-muted mb-4">Stock disponible: {stock}</p>
                
                <h3 className="text-warning fw-bold mb-4">{producto.price} Oro</h3>
                
                <div className="d-flex gap-3">
                  <button 
                    className="btn btn-warning btn-lg fw-bold px-5"
                    disabled={stock <= 0}
                    onClick={() => add(producto)}
                  >
                    {stock > 0 ? "Añadir al carrito" : "Sin stock"}
                  </button>
                  
                  <Link to={`/gremios/${slugGremio}`} className="btn btn-outline-warning btn-lg">
                    Volver a {nombreGremio}
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
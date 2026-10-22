import { useCart } from "../../context/CartContext";
import { Link } from "react-router";
import { imagenCatalogo } from "../../utils/imagenes";
import { configuracionGremios } from "../../data/gremios";
import { esOferta, obtenerPrecioConDescuento } from "../../utils/ofertas";

const clasesCategoria = {
  herreria: "cat-herreria",
  alquimia: "cat-alquimia",
  bienesGenerales: "cat-general",
  ropaFina: "cat-ropa",
  comida: "cat-comida",
  magia: "cat-magia"
};

export default function ProductCard({ producto, onVerDetalle }) {
  const { add } = useCart();
  const stock = Number(producto.stock ?? 0);

  const slugGremio = Object.keys(configuracionGremios).find(
    (key) => configuracionGremios[key].categoria === producto.gremio
  ) || "";

  const claseBadge = clasesCategoria[producto.gremio] || "bg-secondary";

  //Parte de las ofertas
  const tieneOferta = esOferta(producto);
  const precioFinal = obtenerPrecioConDescuento(producto);

  const handleDetalleClick = (e) => {
    e.stopPropagation();
    if (onVerDetalle) onVerDetalle();
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    //Precio con dscto
    add({...producto, price: precioFinal});
  };

  return (
    <div className="card h-100 text-light">
      <div className="d-flex align-items-center justify-content-center p-3" style={{ height: "180px", backgroundColor: "#0a0a0a" }}>
        <img
          src={imagenCatalogo(producto.image)}
          alt={producto.name}
          className="img-fluid"
          style={{ maxHeight: "100%", objectFit: "contain" }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>
      
      <div className="card-body d-flex flex-column">
        <span className={`badge align-self-start mb-2 ${claseBadge}`}>
          {producto.categoriaSeccion || configuracionGremios[slugGremio]?.tipo || producto.gremio}
        </span>
        
        <h5 className="card-title text-warning font-cinzel">{producto.name}</h5>
        <p className="card-text small flex-grow-1">{producto.description}</p>

        {/* aki se muestra tachado */}
        <div className="d-flex align-items-center gap-2 mb-3">
          {tieneOferta && (
            <span className="text-secundario text-decoration-line-through small">
              ${producto.price}
            </span>
          )}
          <p className="producto-precio m-0">$ {precioFinal} Oro</p>
        </div>
        
        <div className="d-flex gap-2 mt-auto">
          {onVerDetalle ? (
            <button onClick={handleDetalleClick} className="btn btn-outline-warning btn-sm flex-grow-1">
              Ver detalle
            </button>
          ) : (
            <Link to={`/gremios/${slugGremio}`} className="btn btn-outline-warning btn-sm flex-grow-1">
              Ir al gremio
            </Link>
          )}
          
          <button
            className="btn btn-warning btn-sm flex-grow-1 fw-bold"
            disabled={stock <= 0}
            onClick={handleAddClick}
          >
            {stock > 0 ? "Añadir" : "Sin stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
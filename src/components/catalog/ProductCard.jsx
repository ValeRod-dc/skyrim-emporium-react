import { useCart } from "../../context/CartContext";
import { imagenCatalogo } from "../../utils/imagenes";
import { Link } from "react-router";

export default function ProductCard({ producto }) {
  const { add } = useCart();
  const stock = Number(producto.stock ?? 0);

  return (
    <div className="card h-100 text-light border-secondary shadow-sm">
      <div className="d-flex align-items-center justify-content-center p-3" style={{ height: "180px", backgroundColor: "#0a0a0a" }}>
        <img
          src={imagenCatalogo(producto.image)}
          alt={producto.name}
          className="img-fluid"
          style={{ maxHeight: "100%", objectFit: "contain" }}
          onError={(e) => { e.target.style.display = "none"; }} // Por si alguna imagen falta
        />
      </div>
      
      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary align-self-start mb-2">{producto.categoria}</span>
        <h5 className="card-title text-warning font-cinzel">{producto.name}</h5>
        <p className="card-text small flex-grow-1">{producto.description}</p>
        <p className="fw-bold mb-3">{producto.price} Oro</p>
        
        <div className="d-flex gap-2 mt-auto">
          <Link 
            to={`/gremios/${producto.gremio}`} 
            className="btn btn-outline-warning btn-sm flex-grow-1"
          >
            Ir al gremio
          </Link>
          <button
            className="btn btn-warning btn-sm flex-grow-1 fw-bold"
            disabled={stock <= 0}
            onClick={() => add(producto)}
          >
            {stock > 0 ? "Añadir" : "Sin stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
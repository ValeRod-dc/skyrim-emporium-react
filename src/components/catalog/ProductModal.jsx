import { useCart } from "../../context/CartContext.jsx";
import { imagenCatalogo, esProductoLegendario } from "../../utils/imagenes";

export default function ProductModal({ producto, config, onClose }) {
  const { add } = useCart();
  if (!producto) return null;

  const esLegendario = esProductoLegendario(producto, config);
  const stock = Number(producto.stock ?? 0);

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
         style={{ backgroundColor: "rgba(0,0,0,0.8)", zIndex: 1050 }} 
         onClick={onClose}>
      
      <div className="bg-dark border border-secondary rounded p-0 overflow-hidden d-flex flex-column flex-md-row" 
           style={{ maxWidth: "800px", width: "90%" }} 
           onClick={(e) => e.stopPropagation()}>
        
        <div className="d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: "#0a0a0a", flex: 1, minHeight: "300px" }}>
          <img src={imagenCatalogo(producto.image)} alt={producto.name} className="img-fluid" style={{ maxHeight: "300px", objectFit: "contain" }} />
        </div>

        <div className="p-4 d-flex flex-column" style={{ flex: 1.2 }}>
          <button className="btn-close btn-close-white ms-auto" onClick={onClose}></button>
          
          <p className="text-muted small mb-1">{config.titulo}</p>
          <h2 className={`font-cinzel mb-3 ${esLegendario ? 'text-warning' : 'text-white'}`}>{producto.name}</h2>
          <p className="text-light">{producto.description || "Sin descripción disponible."}</p>
          <p className="text-muted">Stock: {stock}</p>
          
          <div className="mt-auto pt-3">
            <p className="fs-4 text-warning fw-bold mb-3">$ {Number(producto.price).toLocaleString("es-CL")} Oro</p>
            <button 
              className="btn btn-warning fw-bold w-100 py-2" 
              disabled={stock <= 0}
              onClick={() => add(producto)}
            >
              {stock > 0 ? "Añadir al carrito" : "Sin stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
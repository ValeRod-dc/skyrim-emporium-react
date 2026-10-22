import { useState, useMemo } from "react";
import { useParams } from "react-router";
import { inventario } from "../data/inventario";
import { configuracionGremios } from "../data/gremios";
import ProductCard from "../components/catalog/ProductCard";
import ProductModal from "../components/catalog/ProductModal";
import { esProductoLegendario } from "../utils/imagenes";

export default function GremioPage() {
  const { slug } = useParams();
  const config = configuracionGremios[slug];
  
  const [filtro, setFiltro] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  if (!config) {
    return <div className="container py-5 text-center text-danger"><h2>Gremio no encontrado</h2></div>;
  }

  const catalogo = inventario[config.categoria] || [];

  const productosFiltrados = useMemo(() => {
    const todos = catalogo.flatMap(seccion => 
      seccion.items.map(item => ({ ...item, categoriaSeccion: seccion.titulo }))
    );

    return todos.filter((producto) => {
      const cumpleFiltro = filtro === "Todas" 
        || (filtro === "Legendarias" && esProductoLegendario(producto, config))
        || (filtro === producto.categoriaSeccion);

      const texto = busqueda.toLowerCase();
      const cumpleBusqueda = `${producto.name} ${producto.description}`.toLowerCase().includes(texto);

      return cumpleFiltro && cumpleBusqueda;
    });
  }, [catalogo, filtro, busqueda, config]);

  const totalProductos = catalogo.reduce((total, seccion) => total + seccion.items.length, 0);

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="font-cinzel text-warning d-flex justify-content-center align-items-center gap-3">
          <img src={`/assets/img/Iconos/${config.icono}`} alt="Icono" style={{ height: "60px", width: "auto", objectFit: "contain" }} />
          {config.titulo}
        </h1>
        <p className="fst-italic fs-5">{config.subtitulo}</p>
        
        <div className="d-flex justify-content-center gap-3 mt-3">
          <span className="badge border border-secondary text-light py-2 px-3 fs-6">{totalProductos} productos</span>
          <span className="badge border border-secondary text-light py-2 px-3 fs-6">{config.tipo}</span>
        </div>
      </div>

      <div className="bg-dark p-3 rounded border border-secondary mb-4 d-flex flex-wrap gap-3 align-items-center">
        <input 
          type="text" 
          className="form-control bg-black text-light border-secondary flex-grow-1" 
          placeholder="Buscar producto..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ maxWidth: "400px" }}
        />
        
        <div className="d-flex flex-wrap gap-2">
          <button className={`btn btn-sm ${filtro === "Todas" ? "btn-warning text-dark" : "btn-outline-warning"}`} onClick={() => setFiltro("Todas")}>Todos</button>
          
          {config.categoria === "herreria" && (
            <button className={`btn btn-sm ${filtro === "Legendarias" ? "btn-warning text-dark" : "btn-outline-warning"}`} onClick={() => setFiltro("Legendarias")}>Legendarias</button>
          )}

          {catalogo.map((seccion, index) => (
            <button 
              key={index}
              className={`btn btn-sm ${filtro === seccion.titulo ? "btn-warning text-dark" : "btn-outline-warning"}`} 
              onClick={() => setFiltro(seccion.titulo)}
            >
              {seccion.titulo}
            </button>
          ))}
        </div>
      </div>

      {productosFiltrados.length > 0 ? (
        <div className="row g-4">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard 
                producto={producto} 
                onVerDetalle={() => setProductoSeleccionado(producto)} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted py-5 border border-secondary rounded bg-dark">
          <h3>No se encontraron productos.</h3>
        </div>
      )}

      {productoSeleccionado && (
        <ProductModal 
          producto={productoSeleccionado} 
          config={config} 
          onClose={() => setProductoSeleccionado(null)} 
        />
      )}
    </div>
  );
}
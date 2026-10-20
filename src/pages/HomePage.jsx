import { Link } from "react-router";
import { obtenerTodosLosProductos } from "../data/inventario.js";
import { gremios } from "../data/gremios.js";
import ProductCard from "../components/catalog/ProductCard.jsx";

export default function HomePage() {
  const productosDestacados = obtenerTodosLosProductos().slice(0, 4);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Gremios y Mercaderes de Skyrim</h1>
            <p className="hero-sub">Bienvenido, viajero. Equípate para la aventura.</p>
            <p>
              Has llegado al lugar indicado si buscas buen equipo para continuar tu viaje por Skyrim. 
              Aquí podrás encontrar armas, armaduras, pociones y otros artículos útiles para cualquier aventurero que se atreva a recorrer las tierras del norte.
            </p>
            <a href="#catalogo" className="btn-hero">Ver Catálogo</a>
          </div>
        </div>
      </section>

      <section id="catalogo" className="container py-5">
        <div className="text-center mb-5">
          <h2 className="font-cinzel text-white">Abalorios, bagatelas, esa clase de cosas...</h2>
          <hr className="border-warning mx-auto" style={{ width: "80px", borderWidth: "2px" }} />
        </div>
        
        <h4 className="text-warning mb-4">Productos destacados</h4>
        <div className="row g-4">
          {productosDestacados.map((producto) => (
            <div key={producto.id} className="col-12 col-sm-6 col-md-3">
              <ProductCard producto={producto} />
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5 border-top border-secondary">
        <div className="text-center mb-5">
          <h2 className="font-cinzel text-white">Direcciones</h2>
          <hr className="border-warning mx-auto" style={{ width: "80px", borderWidth: "2px" }} />
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="card bg-dark text-light h-100 border-secondary">
              <div className="card-body">
                <h5 className="text-warning mb-3 d-flex align-items-center">
                  <img src="/assets/img/Iconos/Whiterun.png" alt="Whiterun" style={{ height: "24px", marginRight: "10px" }} />
                  Whiterun
                </h5>
                <ul className="list-unstyled mb-0">
                  {gremios.filter(g => g.region === "Whiterun").map(g => (
                    <li key={g.slug} className="mb-2">
                      <Link to={`/gremios/${g.slug}`} className="text-light text-decoration-none hover-warning">
                        – {g.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card bg-dark text-light h-100 border-secondary">
              <div className="card-body">
                <h5 className="text-warning mb-3 d-flex align-items-center">
                  <img src="/assets/img/Iconos/Solitude.png" alt="Solitude" style={{ height: "24px", marginRight: "10px" }} />
                  Solitude
                </h5>
                <ul className="list-unstyled mb-0">
                  {gremios.filter(g => g.region === "Solitude").map(g => (
                    <li key={g.slug} className="mb-2">
                      <Link to={`/gremios/${g.slug}`} className="text-light text-decoration-none hover-warning">
                        – {g.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card bg-dark text-light h-100 border-secondary">
              <div className="card-body">
                <h5 className="text-warning mb-3 d-flex align-items-center">
                  <img src="/assets/img/Iconos/Winterhold.png" alt="Winterhold" style={{ height: "24px", marginRight: "10px" }} />
                  Winterhold
                </h5>
                <ul className="list-unstyled mb-0">
                  {gremios.filter(g => g.region === "Winterhold").map(g => (
                    <li key={g.slug} className="mb-2">
                      <Link to={`/gremios/${g.slug}`} className="text-light text-decoration-none hover-warning">
                        – {g.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
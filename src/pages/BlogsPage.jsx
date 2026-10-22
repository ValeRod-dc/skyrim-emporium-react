import { Link } from "react-router";

export default function BlogsPage() {
  return (
    <main>
      <section className="page-header">
        <div className="container">
          <p className="eyebrow">Noticias de Tamriel</p>
          <h1>Blogs</h1>
          <p>Noticias, curiosidades y pensamientos de un aventurero que todavía sigue esperando su próxima gran aventura.</p>
        </div>
      </section>

      <section className="section">
        <div className="container blog-grid">
          
          <article className="card featured">
            <img src="/assets/img/blog-tes6-meme.png" alt="Esqueleto sentado" />
            <div className="card-body">
              <div className="card-tags">
                <span className="tipo">Actualidad</span>
                <span className="card-meta">The Elder Scrolls VI · 2026 · 4 min de lectura</span>
              </div>
              <h2>Seguimos esperando... pero al menos ya respira</h2>
              <p>Durante años los fans de The Elder Scrolls hemos aprendido una habilidad que no aparece en ningún árbol de habilidades: esperar.</p>
              <p>El teaser de The Elder Scrolls VI apareció en 2018 y durante muchísimo tiempo Bethesda apenas mostró información concreta. Pero en 2026 llegó una señal bastante más interesante: Bethesda confirmó que TES VI es actualmente su principal foco de desarrollo y que la mayoría del equipo está trabajando en él.</p>
              <p>¿Tenemos fecha de lanzamiento? No. ¿Tenemos gameplay público? Tampoco. ¿Seguimos mirando el horizonte como ese esqueleto? Absolutamente.</p>
            </div>
          </article>

          <article className="card">
            <div className="image-placeholder">
              <img className="image-placeholder" src="/assets/img/bg-TESVI.jpg" alt="Paisaje TES VI" />
            </div>
            <div className="card-body">
              <div className="card-tags">
                <span className="tipo">Desarrollo</span>
                <span className="card-meta">3 min de lectura</span>
              </div>
              <h2>¿Qué sabemos realmente de TES VI?</h2>
              <p>La información oficial sigue siendo escasa, pero ya hay algo importante confirmado: Bethesda afirma que The Elder Scrolls VI es su principal proyecto de desarrollo actual.</p>
              <p>El estudio también señaló que el juego está siendo desarrollado sobre Creation Engine 3, la plataforma tecnológica que Bethesda está utilizando para su nueva generación de RPG.</p>
              <p>Todo lo demás sigue envuelto en misterio. El nombre completo, la fecha de lanzamiento y buena parte de los detalles del juego todavía no han sido anunciados oficialmente.</p>
              <a className="button secondary" href="https://bethesda.net/es-ES/news/a-note-from-bethesda-game-studios" target="_blank" rel="noopener noreferrer">
                Ver anuncio de Bethesda
              </a>
            </div>
          </article>

          <article className="card">
            <div className="image-placeholder">
              <img className="image-placeholder" src="/assets/img/bg-TES-blog.jpg" alt="Paisaje TES" />
            </div>
            <div className="card-body">
              <div className="card-tags">
                <span className="tipo">Retrospectiva</span>
                <span className="card-meta">3 min de lectura</span>
              </div>
              <h2>Quince años después, seguimos volviendo a Skyrim</h2>
              <p>Mientras esperamos la siguiente entrega, Skyrim continúa siendo uno de los rincones más visitados de Tamriel. Dragones, gremios, mazmorras, mods y cientos de horas de aventuras siguen manteniendo vivo el juego.</p>
              <p>Quizás esa sea la verdadera razón por la que la espera por TES VI se siente tan larga: todavía no hemos terminado de explorar Skyrim.</p>
              <p>Y siendo sinceros... siempre queda una misión secundaria que hacer.</p>
              <Link className="button secondary" to="/">
                Volver a Skyrim Emporium
              </Link>
            </div>
          </article>

        </div>
      </section>
    </main>
  );
}
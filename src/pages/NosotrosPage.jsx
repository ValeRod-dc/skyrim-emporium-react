import { useEffect } from "react";

export default function NosotrosPage() {
  useEffect(() => {
    document.body.classList.add("pagina-nosotros");
    return () => document.body.classList.remove("pagina-nosotros");
  }, []);

  return (
    <main className="main-nosotros">
      <div className="nosotros-overlay">
        <div className="nosotros-header">
          <h1>Nuestro equipo</h1>
          <div className="seccion-linea"></div>
        </div>

        <div className="equipo-grid">
          <section className="miembro equipo-lysara">
            <div className="miembro-contenido">
              <div className="miembro-icono">✦</div>
              <h2 className="miembro-nombre">Valeria Rodríguez</h2>
              <div className="miembro-linea"></div>
              <p className="miembro-descripcion">
                Crecí rodeada de conocimiento y me dediqué a estudiar el arte del desarrollo FullStack en tiempos difíciles.
                Con el tiempo descubrí que el conocimiento por sí solo no era suficiente, así que llegué al Colegio de Hibernalia en busca de nuevas oportunidades.
                Allí continué fortaleciendo mi poder, entre la confianza de no tener que poner a prueba lo que ya sabía que funcionaría sin fallas,
                y otras veces enfrentandome a desafíos sin saber mucho, resolviendo errores en ese mismo momento cuando el código parecía no querer obedecerme... solo con lógica.
                Y cómo no honrar a Talos por iluminar mis sueños con respuestas a los problemas que durante el día se me escapaban.
                Ahora combino el conocimiento previo con las artes que aprendí en Hibernalia.
              </p>
            </div>
          </section>

          <section className="miembro equipo-kaelthor">
            <div className="miembro-contenido">
              <div className="miembro-icono">♜</div>
              <h2 className="miembro-nombre">Cristóbal Zúñiga</h2>
              <div className="miembro-linea"></div>
              <p className="miembro-descripcion">
                Durante años, este guerrero orco estudió las místicas artes de la informática con la esperanza de construir un futuro lejos de la violencia. Pero entre códigos que fallaban, 
                variables rebeldes y programas que se rompían sin explicación, su sangre orca comenzó a hervir. Todo terminó el fatídico día en que, por un misterioso "error", 
                una bola de cristal del colegio de programación se reinició y borró horas de sudor, lágrimas y código. 
                Poco se habla de aquel día. Desde entonces abandonó la programación para dedicarse a lo que realmente sabía hacer: 
                proteger con un escudo, dominar toda clase de armas y, cuando la furia despierta, empuñar un arma de dos manos recordando aquel día de furia. 
                Así emprendió su camino como guerrero vagabundo, siguiendo el rastro de su antiguo grupo hasta las lejanas tierras de Tamriel, donde Skyrim sería su próximo destino.
              </p>
            </div>
          </section>

          <section className="miembro equipo-thalen">
            <div className="miembro-contenido">
              <div className="miembro-icono">♢</div>
              <h2 className="miembro-nombre">Arturo Ayala</h2>
              <div className="miembro-linea"></div>
              <p className="miembro-descripcion">
                Llegué a Skyrim buscando una vida mejor. Había estudiado durante años para convertirme en programador, pero en cada ciudad donde preguntaba por trabajo me decían lo mismo: «Necesitamos experiencia».
                Sin monedas y con el estómago vacío, intenté ganarme la vida como pude. Reparé computadoras, ofrecí mis servicios a los comerciantes e incluso intenté enseñar a usar la magia de los números... pero nadie quiso contratarme.
                Una noche, mientras caminaba por las calles de Riften, vi una bolsa de oro sobre una mesa. La tomé.
                No me enorgullece decirlo, pero cuando el mundo no te da trabajo, a veces tienes que encontrar otra forma de sobrevivir.
                Ahora dicen que soy un ladrón. Yo prefiero pensar que simplemente cambié de profesión.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
import { useEffect, useState } from "react";

export default function ContactoPage() {
  useEffect(() => {
    document.body.classList.add("pagina-contacto");
    return () => document.body.classList.remove("pagina-contacto");
  }, []);

  const [formData, setFormData] = useState({ nombre: "", correo: "", mensaje: "" });
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (!formData.nombre.trim()) return setError("El nombre es obligatorio.");
    if (!formData.mensaje.trim()) return setError("El mensaje es obligatorio.");
    if (formData.mensaje.length > 500) return setError("El mensaje no puede superar los 500 caracteres.");

    //Simular envío
    setExito("¡Mensaje enviado! Un cuervo mensajero lo llevará pronto.");
    setFormData({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <main className="main-contacto">
      <div className="contacto-container">
        <div className="contacto-grid">
          
          <div className="contacto-formulario">
            <div className="contacto-header">
              <h1 className="contacto-titulo">Contacto</h1>
              <div className="seccion-linea"></div>
              <p className="contacto-intro">Envíe un mensaje a la tienda.</p>
            </div>

            <form onSubmit={handleSubmit} className="form-contacto" noValidate>
              <div className="form-group">
                <label htmlFor="nombre-contacto">Nombre</label>
                <input 
                  type="text" 
                  id="nombre-contacto" 
                  placeholder="Tu nombre y apellido"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label htmlFor="correo-contacto">Correo electrónico</label>
                <input 
                  type="email" 
                  id="correo-contacto" 
                  placeholder="ejemplo@correo.cl"
                  value={formData.correo}
                  onChange={(e) => setFormData({...formData, correo: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mensaje-contacto-input">Comentario</label>
                <textarea 
                  id="mensaje-contacto-input" 
                  rows="5" 
                  maxLength="500" 
                  placeholder="Escribe tu mensaje..."
                  value={formData.mensaje}
                  onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                ></textarea>
              </div>

              {error && <div className="error-msg" style={{display: "block"}}>{error}</div>}
              
              <button type="submit">Enviar mensaje</button>
              {exito && <div id="mensaje-contacto" style={{display: "block"}}>{exito}</div>}
            </form>
          </div>

          <div className="contacto-info">
            <h3>
              <img style={{ height: "40px", width: "auto", marginRight: "8px", verticalAlign: "middle" }} src="/assets/img/Iconos/Landmark.png" alt="Landmark" />
              Encuéntranos
            </h3>
            
            <div className="info-item">
              <img className="info-icon" src="/assets/img/Iconos/To_Solstheim.png" alt="Correo" />
              <div>
                <strong>Correo</strong>
                <p>tienda@skyrim-emporium.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <img className="info-icon" src="/assets/img/Iconos/Town.png" alt="Dirección" />
              <div>
                <strong>Dirección</strong>
                <p>Centro del Mercado, Whiterun, Skyrim</p>
              </div>
            </div>
            
            <div className="info-item">
              <img className="info-icon" src="/assets/img/Iconos/Clearing.png" alt="Horario" />
              <div>
                <strong>Horario</strong>
                <p>Lunes a sábado, 8:00 - 20:00</p>
              </div>
            </div>
            
            <div className="info-item">
              <img className="info-icon" src="/assets/img/Iconos/Palace.png" alt="Redes" />
              <div>
                <strong>Redes</strong>
                <p>@SkyrimEmporium en todas las plataformas</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
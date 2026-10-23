import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { guardarUsuario, regionesChile } from "../data/datos-usuarios.js";
import "./admin/admin.css";

function validarRun(run) {
  const valor = run.replace(/[.-]/g, "").toUpperCase();
  if (!/^\d{7,8}[0-9K]$/.test(valor)) return false;

  const cuerpo = valor.slice(0, -1);
  let suma = 0;
  let multiplicador = 2;
  for (let index = cuerpo.length - 1; index >= 0; index -= 1) {
    suma += Number(cuerpo[index]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const digito = 11 - (suma % 11);
  const verificador = digito === 11 ? "0" : digito === 10 ? "K" : String(digito);
  return valor.at(-1) === verificador;
}

export default function RegistroPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    run: "",
    nombre: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    fechaNacimiento: "",
    region: "",
    comuna: "",
    direccion: "",
  });
  const [error, setError] = useState("");

  function actualizarCampo(event) {
    const { name, value } = event.target;
    setForm((actual) => ({
      ...actual,
      [name]: value,
      ...(name === "region" ? { comuna: "" } : {}),
    }));
    setError("");
  }

  function registrar(event) {
    event.preventDefault();
    const run = form.run.replace(/[.-]/g, "").toUpperCase();
    const correo = form.correo.trim().toLowerCase();
    const valido =
      validarRun(form.run) &&
      form.nombre.trim().length > 0 &&
      form.nombre.trim().length <= 50 &&
      form.apellidos.trim().length > 0 &&
      form.apellidos.trim().length <= 100 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) &&
      form.contrasena.length >= 4 &&
      form.contrasena.length <= 10 &&
      Boolean(form.region) &&
      (regionesChile[form.region] || []).includes(form.comuna) &&
      form.direccion.trim().length > 0 &&
      form.direccion.trim().length <= 300;

    if (!valido) {
      setError("Revisa los datos ingresados. El RUN debe ser válido y la región debe coincidir con la comuna.");
      return;
    }

    const usuario = {
      ...form,
      run,
      nombre: form.nombre.trim(),
      apellidos: form.apellidos.trim(),
      correo,
      contrasena: form.contrasena,
      direccion: form.direccion.trim(),
      tipo: "Cliente",
    };

    if (!guardarUsuario(usuario)) {
      setError("Ese RUN o correo ya está registrado, o no se pudo guardar la cuenta.");
      return;
    }
    navigate("/login?registro=ok", { replace: true });
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card admin-register-card">
        <Link className="admin-back-link" to="/">← Volver a la tienda</Link>
        <img src="/assets/img/skyrim-logo.png" alt="Skyrim Emporium" />
        <h1>Crear cuenta</h1>
        <p>Regístrate como cliente de Skyrim Emporium</p>

        <form onSubmit={registrar} noValidate>
          <div className="admin-register-grid">
            <div>
              <label htmlFor="register-run">RUN</label>
              <input
                autoComplete="off"
                id="register-run"
                maxLength={12}
                onChange={actualizarCampo}
                placeholder="Ej.: 12345678-5"
                required
                name="run"
                value={form.run}
              />
            </div>
            <div>
              <label htmlFor="register-name">Nombre</label>
              <input
                autoComplete="given-name"
                id="register-name"
                maxLength={50}
                name="nombre"
                onChange={actualizarCampo}
                placeholder="Ej.: Juan"
                required
                value={form.nombre}
              />
            </div>
            <div>
              <label htmlFor="register-last-name">Apellidos</label>
              <input
                autoComplete="family-name"
                id="register-last-name"
                maxLength={100}
                name="apellidos"
                onChange={actualizarCampo}
                placeholder="Ej.: Pérez"
                required
                value={form.apellidos}
              />
            </div>
            <div>
              <label htmlFor="register-email">Correo electrónico</label>
              <input
                autoComplete="email"
                id="register-email"
                maxLength={100}
                name="correo"
                onChange={actualizarCampo}
                placeholder="correo@example.com"
                required
                type="email"
                value={form.correo}
              />
            </div>
            <div>
              <label htmlFor="register-password">Contraseña</label>
              <input
                autoComplete="new-password"
                id="register-password"
                maxLength={10}
                minLength={4}
                name="contrasena"
                onChange={actualizarCampo}
                placeholder="Entre 4 y 10 caracteres"
                required
                type="password"
                value={form.contrasena}
              />
            </div>
            <div>
              <label htmlFor="register-birth-date">Fecha de nacimiento (opcional)</label>
              <input
                id="register-birth-date"
                name="fechaNacimiento"
                onChange={actualizarCampo}
                type="date"
                value={form.fechaNacimiento}
              />
            </div>
            <div>
              <label htmlFor="register-region">Región</label>
              <select id="register-region" name="region" onChange={actualizarCampo} required value={form.region}>
                <option value="">Selecciona una región</option>
                {Object.keys(regionesChile).map((region) => <option key={region} value={region}>{region}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="register-comuna">Comuna</label>
              <select
                disabled={!form.region}
                id="register-comuna"
                name="comuna"
                onChange={actualizarCampo}
                required
                value={form.comuna}
              >
                <option value="">Selecciona una comuna</option>
                {(regionesChile[form.region] || []).map((comuna) => <option key={comuna} value={comuna}>{comuna}</option>)}
              </select>
            </div>
            <div className="admin-register-wide">
              <label htmlFor="register-address">Dirección</label>
              <textarea
                autoComplete="street-address"
                id="register-address"
                maxLength={300}
                name="direccion"
                onChange={actualizarCampo}
                placeholder="Ej.: Avenida Skyrim 123"
                required
                value={form.direccion}
              />
            </div>
          </div>

          {error && <p className="admin-form-error" role="alert">{error}</p>}
          <button className="admin-button admin-button-primary w-100" type="submit">Registrarme</button>
        </form>
        <p className="admin-login-register">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </main>
  );
}

import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { actualizarUsuario, guardarUsuario, regionesChile, usuarios } from "../../data/datos-usuarios.js";

function validarRun(run) {
  const valor = run.toUpperCase();
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

function obtenerUsuario(run) {
  return usuarios.find((usuario) => usuario.run.toUpperCase() === run?.toUpperCase());
}

function crearFormulario(usuario) {
  return {
    run: usuario?.run || "",
    nombre: usuario?.nombre || "",
    apellidos: usuario?.apellidos || "",
    correo: usuario?.correo || "",
    contrasena: usuario?.contrasena || "",
    fechaNacimiento: usuario?.fechaNacimiento || "",
    tipo: usuario?.tipo || "Cliente",
    region: usuario?.region || "",
    comuna: usuario?.comuna || "",
    direccion: usuario?.direccion || "",
  };
}

export default function NuevoUsuarioPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const runOriginal = searchParams.get("run");
  const usuarioOriginal = obtenerUsuario(runOriginal);
  const [form, setForm] = useState(() => crearFormulario(usuarioOriginal));
  const [error, setError] = useState("");

  function actualizarCampo(event) {
    const { name, value } = event.target;
    setForm((actual) => ({ ...actual, [name]: value, ...(name === "region" ? { comuna: "" } : {}) }));
  }

  function guardar(event) {
    event.preventDefault();
    const run = form.run.trim().toUpperCase();
    const correo = form.correo.trim().toLowerCase();
    const camposValidos =
      (usuarioOriginal || validarRun(run)) &&
      form.nombre.trim().length > 0 && form.nombre.trim().length <= 50 &&
      form.apellidos.trim().length > 0 && form.apellidos.trim().length <= 100 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) &&
      form.contrasena.length >= 4 && form.contrasena.length <= 10 &&
      Boolean(form.tipo) &&
      (usuarioOriginal && !usuarioOriginal.region && !usuarioOriginal.comuna && !usuarioOriginal.direccion
        ? true
        : Boolean(form.region) && Boolean(form.comuna) &&
          form.direccion.trim().length > 0 && form.direccion.trim().length <= 300);

    if (!camposValidos) {
      setError("Completa los campos requeridos con datos válidos. El RUN debe ser válido y sin puntos ni guion.");
      return;
    }

    const usuario = {
      ...form,
      run: usuarioOriginal ? usuarioOriginal.run : run,
      nombre: form.nombre.trim(),
      apellidos: form.apellidos.trim(),
      correo,
      direccion: form.direccion.trim(),
    };
    const guardado = usuarioOriginal ? actualizarUsuario(usuario) : guardarUsuario(usuario);
    if (!guardado) {
      setError("El RUN o el correo ya está registrado.");
      return;
    }
    navigate("/admin/usuarios", { replace: true });
  }

  return (
    <section>
      <Link className="admin-back-link" to="/admin/usuarios">← Volver a usuarios</Link>
      <div className="admin-form-card">
        <p className="admin-eyebrow">Mantenedor</p>
        <h1 className="admin-page-title">{usuarioOriginal ? "Editar usuario" : "Nuevo usuario"}</h1>
        <form onSubmit={guardar}>
          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="user-run">RUN</label>
              <input autoComplete="off" id="user-run" maxLength={9} minLength={8} name="run" onChange={actualizarCampo} readOnly={Boolean(usuarioOriginal)} required value={form.run} />
            </div>
            <div className="admin-field">
              <label htmlFor="user-name">Nombre</label>
              <input id="user-name" maxLength={50} name="nombre" onChange={actualizarCampo} required value={form.nombre} />
            </div>
            <div className="admin-field">
              <label htmlFor="user-last-name">Apellidos</label>
              <input id="user-last-name" maxLength={100} name="apellidos" onChange={actualizarCampo} required value={form.apellidos} />
            </div>
            <div className="admin-field">
              <label htmlFor="user-email">Correo</label>
              <input autoComplete="email" id="user-email" maxLength={100} name="correo" onChange={actualizarCampo} required type="email" value={form.correo} />
            </div>
            <div className="admin-field">
              <label htmlFor="user-password">Contraseña</label>
              <input autoComplete="new-password" id="user-password" maxLength={10} minLength={4} name="contrasena" onChange={actualizarCampo} required type="password" value={form.contrasena} />
            </div>
            <div className="admin-field">
              <label htmlFor="user-birth-date">Fecha de nacimiento</label>
              <input id="user-birth-date" name="fechaNacimiento" onChange={actualizarCampo} type="date" value={form.fechaNacimiento} />
            </div>
            <div className="admin-field">
              <label htmlFor="user-type">Tipo de usuario</label>
              <select id="user-type" name="tipo" onChange={actualizarCampo} value={form.tipo}>
                <option>Administrador</option><option>Cliente</option><option>Vendedor</option>
              </select>
            </div>
            <div className="admin-field">
              <label htmlFor="user-region">Región</label>
              <select id="user-region" name="region" onChange={actualizarCampo} required={!usuarioOriginal} value={form.region}>
                <option value="">Selecciona una región</option>
                {Object.keys(regionesChile).map((region) => <option key={region}>{region}</option>)}
              </select>
            </div>
            <div className="admin-field">
              <label htmlFor="user-comuna">Comuna</label>
              <select disabled={!form.region} id="user-comuna" name="comuna" onChange={actualizarCampo} required={!usuarioOriginal} value={form.comuna}>
                <option value="">Selecciona una comuna</option>
                {(regionesChile[form.region] || []).map((comuna) => <option key={comuna}>{comuna}</option>)}
              </select>
            </div>
            <div className="admin-field admin-field-wide">
              <label htmlFor="user-address">Dirección</label>
              <textarea id="user-address" maxLength={300} name="direccion" onChange={actualizarCampo} required={!usuarioOriginal} value={form.direccion} />
            </div>
          </div>
          {error && <p className="admin-form-error" role="alert">{error}</p>}
          <div className="admin-form-actions">
            <Link className="admin-button admin-button-secondary" to="/admin/usuarios">Cancelar</Link>
            <button className="admin-button admin-button-primary" type="submit">{usuarioOriginal ? "Actualizar usuario" : "Guardar usuario"}</button>
          </div>
        </form>
      </div>
    </section>
  );
}

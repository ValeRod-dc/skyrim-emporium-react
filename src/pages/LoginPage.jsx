import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import "./admin/admin.css";

function destinoPorRol(tipo) {
  if (tipo === "Administrador") return "/admin/inicio";
  if (tipo === "Vendedor") return "/admin/productos";
  return "/";
}

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to={destinoPorRol(user.tipo)} replace />;

  function manejarEnvio(event) {
    event.preventDefault();
    if (!correo.trim() || !contrasena) {
      setError("Ingresa tu correo y contraseña.");
      return;
    }

    if (!login(correo, contrasena)) {
      setError("El correo o la contraseña no son correctos.");
      return;
    }

    const usuario = JSON.parse(sessionStorage.getItem("skyrimSesion"));
    navigate(destinoPorRol(usuario.tipo), { replace: true });
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <Link className="admin-back-link" to="/">← Volver a la tienda</Link>
        <img src="/assets/img/skyrim-logo.png" alt="Skyrim Emporium" />
        <h1>Inicio de sesión</h1>
        <p>Gremios y Mercaderes de Skyrim</p>

        <form onSubmit={manejarEnvio} noValidate>
          <label htmlFor="login-email">Correo electrónico</label>
          <input
            autoComplete="username"
            id="login-email"
            maxLength={100}
            onChange={(event) => setCorreo(event.target.value)}
            type="email"
            value={correo}
          />

          <label htmlFor="login-password">Contraseña</label>
          <input
            autoComplete="current-password"
            id="login-password"
            maxLength={10}
            onChange={(event) => setContrasena(event.target.value)}
            type="password"
            value={contrasena}
          />

          {error && <p className="admin-form-error" role="alert">{error}</p>}
          <button className="admin-button admin-button-primary w-100" type="submit">Entrar a Skyrim</button>
        </form>
      </section>
    </main>
  );
}

import { createContext, useContext, useState } from "react";
import { usuarios } from "../data/datos-usuarios.js";

const AuthContext = createContext();
const AUTH_KEY = "skyrimSesion";

function leerSesion() {
  try {
    const saved = sessionStorage.getItem(AUTH_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("No se pudo recuperar la sesión guardada.", error);
    sessionStorage.removeItem(AUTH_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(leerSesion);

  const login = (correo, password) => {
    const found = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.contrasena === password
    );
    if (found) {
      const sessionUser = {
        run: found.run,
        nombre: found.nombre,
        apellidos: found.apellidos,
        correo: found.correo,
        tipo: found.tipo,
      };
      setUser(sessionUser);
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(sessionUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(AUTH_KEY);
  };

  const actualizarSesion = (usuario) => {
    const sessionUser = {
      run: usuario.run,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      tipo: usuario.tipo,
    };
    setUser(sessionUser);
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(sessionUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, actualizarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
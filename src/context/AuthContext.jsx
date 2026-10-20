import { createContext, useContext, useState } from "react";
import { usuarios } from "../data/datos-usuarios.js";

const AuthContext = createContext();
const AUTH_KEY = "skyrimSesion";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem(AUTH_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const login = (correo, password) => {
    const found = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.contrasena === password
    );
    if (found) {
      const sessionUser = { nombre: found.nombre, correo: found.correo, tipo: found.tipo };
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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
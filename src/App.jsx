import { Routes, Route, Navigate } from "react-router";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import GremioPage from "./pages/GremioPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistroPage from "./pages/RegistroPage.jsx";
import CarritoPage from "./pages/CarritoPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import PagoErrorPage from "./pages/PagoErrorPage.jsx";
import PagoExitosoPage from "./pages/PagoExitosoPage.jsx";
import NosotrosPage from "./pages/NosotrosPage.jsx";
import BlogsPage from "./pages/BlogsPage.jsx";
import ContactoPage from "./pages/ContactoPage.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminHomePage from "./pages/admin/AdminHomePage.jsx";
import ProductosAdminPage from "./pages/admin/ProductosAdminPage.jsx";
import UsuariosAdminPage from "./pages/admin/UsuariosAdminPage.jsx";
import OrdenesAdminPage from "./pages/admin/OrdenesAdminPage.jsx";
import NuevoProductoPage from "./pages/admin/NuevoProductoPage.jsx";
import NuevoUsuarioPage from "./pages/admin/NuevoUsuarioPage.jsx";
import OrdenDetalleAdminPage from "./pages/admin/OrdenDetalleAdminPage.jsx";
import CategoriasAdminPage from "./pages/admin/CategoriasAdminPage.jsx";
import NuevaCategoriaPage from "./pages/admin/NuevaCategoriaPage.jsx";
import StockCriticoAdminPage from "./pages/admin/StockCriticoAdminPage.jsx";
import ReportesAdminPage from "./pages/admin/ReportesAdminPage.jsx";
import PerfilAdminPage from "./pages/admin/PerfilAdminPage.jsx";
import UsuarioDetalleAdminPage from "./pages/admin/UsuarioDetalleAdminPage.jsx";
import HistorialComprasAdminPage from "./pages/admin/HistorialComprasAdminPage.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AdminRedirect from "./components/auth/AdminRedirect.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />

      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gremios/:slug" element={<GremioPage />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/pago-error" element={<PagoErrorPage />} />
        <Route path="/pago-exitoso" element={<PagoExitosoPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route element={<ProtectedRoute allowedRoles={["Administrador", "Vendedor", "Cliente"]} />}>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["Administrador", "Vendedor"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminRedirect />} />
          <Route path="productos" element={<ProductosAdminPage />} />
          <Route path="ordenes" element={<OrdenesAdminPage />} />
          <Route path="ordenes/:id" element={<OrdenDetalleAdminPage />} />

          <Route element={<ProtectedRoute allowedRoles={["Administrador"]} />}>
            <Route path="usuarios" element={<UsuariosAdminPage />} />
            <Route path="nuevo-usuario" element={<NuevoUsuarioPage />} />
            <Route path="nuevo-producto" element={<NuevoProductoPage />} />
            <Route path="categorias" element={<CategoriasAdminPage />} />
            <Route path="nueva-categoria" element={<NuevaCategoriaPage />} />
            <Route path="stock-critico" element={<StockCriticoAdminPage />} />
            <Route path="reportes" element={<ReportesAdminPage />} />
            <Route path="perfil" element={<PerfilAdminPage />} />
            <Route path="usuarios/:run" element={<UsuarioDetalleAdminPage />} />
            <Route path="usuarios/:run/historial" element={<HistorialComprasAdminPage />} />
            <Route path="inicio" element={<AdminHomePage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

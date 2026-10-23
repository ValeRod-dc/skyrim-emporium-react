import { Routes, Route, Navigate } from "react-router";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import GremioPage from "./pages/GremioPage.jsx";
import CarritoPage from "./pages/CarritoPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import PagoErrorPage from "./pages/PagoErrorPage.jsx";
import PagoExitosoPage from "./pages/PagoExitosoPage.jsx";
/*import LoginPage from "./pages/LoginPage.jsx";
import RegistroPage from "./pages/RegistroPage.jsx";*/
import NosotrosPage from "./pages/NosotrosPage.jsx";
import BlogsPage from "./pages/BlogsPage.jsx";
import ContactoPage from "./pages/ContactoPage.jsx";
/*import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminHomePage from "./pages/admin/AdminHomePage.jsx";
import ProductosAdminPage from "./pages/admin/ProductosAdminPage.jsx";
import UsuariosAdminPage from "./pages/admin/UsuariosAdminPage.jsx";
import OrdenesAdminPage from "./pages/admin/OrdenesAdminPage.jsx";
import NuevoProductoPage from "./pages/admin/NuevoProductoPage.jsx";*/

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gremios/:slug" element={<GremioPage />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/pago-error" element={<PagoErrorPage />} />
        <Route path="/pago-exitoso" element={<PagoExitosoPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        {/*<Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        */}
      </Route>

      {/*<Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHomePage />} />
        <Route path="productos" element={<ProductosAdminPage />} />
        <Route path="usuarios" element={<UsuariosAdminPage />} />
        <Route path="ordenes" element={<OrdenesAdminPage />} />
        <Route path="nuevo-producto" element={<NuevoProductoPage />} />
      </Route>*/}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
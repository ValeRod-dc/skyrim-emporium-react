import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";

export default function Layout() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100 text-light">
      <Navbar onOpenCart={() => setCartOpen(true)} />
      <main className="flex-grow-1" style={{ paddingTop: "80px" }}>
        <Outlet /> {/* Aquí se renderizan las páginas */}
      </main>
      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
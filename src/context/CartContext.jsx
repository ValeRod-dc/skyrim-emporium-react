import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const CART_KEY = "skyrim_cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en localStorage automáticamente cuando cambie el carrito
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const add = (producto) => {
    if (Number(producto.stock ?? 0) <= 0) {
      alert("Este producto no tiene stock disponible.");
      return;
    }
    setCart((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        if (existente.qty >= producto.stock) {
          alert("No puedes agregar más unidades que el stock disponible.");
          return prev;
        }
        return prev.map((item) =>
          item.id === producto.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...producto, qty: 1 }];
    });
  };

  const remove = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            if (newQty > item.stock) return item; // No superar stock
            return { ...item, qty: newQty };
          }
          return item;
        })
        .filter((item) => item.qty > 0)
    );
  };

  const clear = () => setCart([]);

  const total = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = () => cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, add, remove, changeQty, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
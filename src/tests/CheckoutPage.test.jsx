import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import CheckoutPage from '../pages/CheckoutPage';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';

// Mockeamos el localStorage para simular que hay un producto en el carrito
// antes de que el Checkout se renderice (si no, muestra "No hay productos")
beforeEach(() => {
  const mockCart = [{ id: '1', name: 'Espada', price: 100, qty: 1, stock: 5, image: 'assets/img/test.png' }];
  localStorage.setItem('skyrim_cart', JSON.stringify(mockCart));
});

afterEach(() => {
  localStorage.clear();
});

describe('CheckoutPage', () => {
  // 7. Renderizado inicial
  it('debe mostrar el resumen del carrito y el formulario', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider><CheckoutPage /></CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Carrito de compra')).toBeInTheDocument();
    expect(screen.getByText('Información del cliente')).toBeInTheDocument();
  });

  // 8. Estado y Eventos (Inputs)
  it('debe actualizar el estado del formulario al escribir en el input de nombre', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider><CheckoutPage /></CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    const inputNombre = screen.getByLabelText(/Nombre/i);
    fireEvent.change(inputNombre, { target: { value: 'Valeria' } });
    expect(inputNombre.value).toBe('Valeria');
  });
});
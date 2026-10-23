import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ProductCard from '../components/catalog/ProductCard';
import { CartProvider } from '../context/CartContext';

// 1. Agregamos 'image' para que no salga la advertencia del src vacío
const producto = { 
  id: '1', 
  name: 'Espada Acero', 
  price: 100, 
  description: 'Espada filosa', 
  stock: 5, 
  gremio: 'herreria',
  image: 'assets/img/test.png' 
};

const productoAgotado = { ...producto, stock: 0 };

describe('ProductCard', () => {
  // 1. Renderizado correcto
  it('debe renderizar el nombre, descripción y precio del producto', () => {
    render(
      <MemoryRouter>
        <CartProvider><ProductCard producto={producto} /></CartProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Espada Acero')).toBeInTheDocument();
    expect(screen.getByText('Espada filosa')).toBeInTheDocument();
    
    // 2. Usamos una expresión regular más flexible para encontrar el precio
    // (Busca que el texto contenga "100 Oro" sin importar los espacios o el símbolo $)
    expect(screen.getByText(/100 Oro/)).toBeInTheDocument();
  });

  // 2. Renderizado condicional (Stock 0)
  it('debe deshabilitar el botón de Añadir si el stock es 0', () => {
    render(
      <MemoryRouter>
        <CartProvider><ProductCard producto={productoAgotado} /></CartProvider>
      </MemoryRouter>
    );
    const boton = screen.getByRole('button', { name: /sin stock/i });
    expect(boton).toBeDisabled();
  });

  // 3. Eventos y Mocks
  it('debe llamar a la función onVerDetalle al hacer clic en Ver detalle', () => {
    const mockVerDetalle = vi.fn(); 
    render(
      <MemoryRouter>
        <CartProvider>
          <ProductCard producto={producto} onVerDetalle={mockVerDetalle} />
        </CartProvider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Ver detalle'));
    expect(mockVerDetalle).toHaveBeenCalledTimes(1); 
  });
});
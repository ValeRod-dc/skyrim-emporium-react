import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

describe('CartContext', () => {
  const producto = { id: '1', name: 'Poción', price: 50, stock: 10 };

  // 4. Añadir producto
  it('debe agregar un producto al carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    
    act(() => {
      result.current.add(producto);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].name).toBe('Poción');
    expect(result.current.total()).toBe(50);
  });

  // 5. Eliminar producto
  it('debe eliminar un producto del carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    
    act(() => {
      result.current.add(producto);
      result.current.remove('1');
    });

    expect(result.current.cart).toHaveLength(0);
  });

  // 6. Lógica de negocio (No superar stock)
  it('no debe agregar más unidades que el stock disponible', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    const productoLimitado = { ...producto, stock: 1 };

    act(() => {
      result.current.add(productoLimitado);
      result.current.add(productoLimitado); // Intento doble
    });

    expect(result.current.cart[0].qty).toBe(1);
  });
});
import { useCart } from "../../context/CartContext";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, remove, changeQty, clear, total } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="position-fixed top-0 start-0 w-100 h-100 bg-black opacity-50" style={{ zIndex: 1040 }} onClick={onClose}></div>
      <div className="position-fixed top-0 end-0 h-100 bg-dark text-light p-4 shadow-lg" style={{ width: "350px", zIndex: 1050, overflowY: "auto" }}>
        
        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
          <h4 className="mb-0 font-cinzel">Tu Bolsa</h4>
          <button className="btn-close btn-close-white" onClick={onClose}></button>
        </div>
        
        {cart.length === 0 ? (
          <p className="text-muted fst-italic text-center my-4">Tu bolsa está vacía, viajero.</p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {cart.map((item) => (
              <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2">
                <div className="flex-grow-1">
                  <div className="fw-bold small">{item.name}</div>
                  <div className="text-warning small">{item.price} Oro c/u</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-sm btn-outline-light" onClick={() => changeQty(item.id, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button className="btn btn-sm btn-outline-light" onClick={() => changeQty(item.id, 1)}>+</button>
                  <button className="btn btn-sm btn-danger ms-1" onClick={() => remove(item.id)}>×</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="d-flex justify-content-between mt-4 mb-3 fw-bold fs-5 border-top border-secondary pt-3">
          <span>Total:</span>
          <span className="text-warning">{total()} Oro</span>
        </div>
        
        <button className="btn btn-warning w-100 mb-2 fw-bold" disabled={cart.length === 0}>Cerrar Trato</button>
        <button className="btn btn-outline-secondary w-100" onClick={clear}>Vaciar bolsa</button>
      </div>
    </>
  );
}
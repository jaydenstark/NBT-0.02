import React from 'react';

const Cart = ({ isOpen, onClose, cartItems, onRemove }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  if (!isOpen) return null;

  return (
    <div className="cart-drawer" style={{
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{ padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Your Order</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '2rem' }}>
        {cartItems.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: 0 }}>{item.name}</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 600 }}>Size: {item.size}</p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>GH₵ {item.price.toLocaleString()}</p>
              </div>
              <button 
                onClick={() => onRemove(index)}
                style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ padding: '2rem', background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.2rem' }}>
          <span>Total:</span>
          <span>GH₵ {total.toLocaleString()}</span>
        </div>
        <button className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;

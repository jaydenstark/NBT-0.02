import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>SELECT SIZE</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {product.sizes.map((s) => (
              <button
                key={s.size}
                onClick={() => setSelectedSize(s)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${selectedSize.size === s.size ? 'var(--secondary)' : 'var(--border)'}`,
                  background: selectedSize.size === s.size ? 'var(--accent)' : 'transparent',
                  color: selectedSize.size === s.size ? 'white' : 'var(--text-main)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>

        <div className="product-footer">
          <div className="product-price">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>Starting from</span>
            <br />
            GH₵ {selectedSize.price.toLocaleString()}
          </div>
          <button 
            className="btn btn-primary" 
            style={{ padding: '10px 20px', fontSize: '0.8rem' }}
            onClick={() => onAddToCart(product, selectedSize)}
          >
            Add to Cart
          </button>
        </div>
        
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600 }}>
          {product.specs}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

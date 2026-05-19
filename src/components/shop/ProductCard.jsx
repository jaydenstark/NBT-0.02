'use client';
import { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.1)' : 'var(--shadow-sm)',
        background: 'var(--white)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <div className="product-image" style={{ 
        position: 'relative', 
        overflow: 'hidden',
        backgroundColor: '#f8fafc',
        padding: '1rem',
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ 
            transition: 'transform 0.6s ease',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }} 
        />
        {/* Subtle overlay gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.03), transparent)',
          pointerEvents: 'none'
        }}></div>
      </div>
      <div className="product-info" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span className="product-brand" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
          {product.brand}
        </span>
        <h3 className="product-name" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)', fontWeight: 700, lineHeight: 1.3 }}>
          {product.name}
        </h3>
        <p className="product-desc" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', flexGrow: 1, lineHeight: 1.5 }}>
          {product.description}
        </p>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.8rem', color: 'var(--text-main)', opacity: 0.8 }}>SELECT SIZE</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {product.sizes.map((s) => (
              <button
                key={s.size}
                onClick={() => setSelectedSize(s)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: `1px solid ${selectedSize.size === s.size ? 'var(--secondary)' : 'var(--border)'}`,
                  background: selectedSize.size === s.size ? 'var(--secondary)' : 'transparent',
                  color: selectedSize.size === s.size ? 'white' : 'var(--text-main)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedSize.size === s.size ? '0 4px 12px rgba(45, 140, 255, 0.2)' : 'none'
                }}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>

        <div className="product-footer" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div className="product-price">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>Starting from</span>
            <br />
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>GH₵ {selectedSize.price.toLocaleString('en-US')}</span>
            {selectedSize.qtyInBox > 1 && (
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--secondary)', marginTop: '4px', fontWeight: 600 }}>
                ({selectedSize.qtyInBox} pieces / box)
              </span>
            )}
          </div>
          <button 
            className="btn btn-primary" 
            style={{ 
              padding: '12px 24px', 
              fontSize: '0.85rem',
              borderRadius: '10px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: isHovered ? '0 6px 16px rgba(11, 35, 57, 0.2)' : 'none'
            }}
            onClick={() => onAddToCart(product, selectedSize)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

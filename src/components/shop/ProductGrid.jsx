'use client';
import { useState } from 'react';
import ProductCard from './ProductCard';
import { brands } from '../../data/products';

const ProductGrid = ({ onAddToCart, products = [] }) => {
  const [catalogType, setCatalogType] = useState('retail');
  const [filterBrand, setFilterBrand] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredProducts = products.filter(p => {
    const matchesType = p.type === catalogType;
    const matchesBrand = filterBrand === 'All' || p.brand === filterBrand;
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    return matchesType && matchesBrand && matchesCategory;
  });

  return (
    <section id="products" className="section" style={{ background: '#f8fafc' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Product Catalog</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Choose between our premium retail products or heavy-duty industrial solutions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '3rem',
          padding: '0.5rem',
          background: '#f1f5f9',
          borderRadius: '12px',
          width: 'fit-content',
          margin: '0 auto 3rem'
        }}>
          <button 
            onClick={() => { setCatalogType('retail'); setFilterBrand('All'); setFilterCategory('All'); }}
            className={catalogType === 'retail' ? 'btn btn-primary' : 'btn'}
            style={{ 
              borderRadius: '8px', 
              padding: '10px 30px',
              boxShadow: catalogType === 'retail' ? '0 4px 12px rgba(11, 35, 57, 0.2)' : 'none',
              background: catalogType === 'retail' ? 'var(--primary)' : 'transparent',
              color: catalogType === 'retail' ? 'white' : 'var(--text-muted)'
            }}
          >
            🛍️ Retail Products
          </button>
          <button 
            onClick={() => { setCatalogType('industrial'); setFilterBrand('All'); setFilterCategory('All'); }}
            className={catalogType === 'industrial' ? 'btn btn-primary' : 'btn'}
            style={{ 
              borderRadius: '8px', 
              padding: '10px 30px',
              boxShadow: catalogType === 'industrial' ? '0 4px 12px rgba(11, 35, 57, 0.2)' : 'none',
              background: catalogType === 'industrial' ? 'var(--primary)' : 'transparent',
              color: catalogType === 'industrial' ? 'white' : 'var(--text-muted)'
            }}
          >
            🏗️ Industrial Solutions
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontWeight: 700, fontSize: '0.7rem', opacity: 0.6, width: '100%', textAlign: 'center' }}>FILTER BY BRAND</span>
            {['All', ...brands].map(b => (
              <button 
                key={b} 
                onClick={() => setFilterBrand(b)}
                className={filterBrand === b ? 'btn btn-primary' : 'btn btn-outline'}
                style={{ padding: '6px 16px', fontSize: '0.75rem', width: 'auto', border: filterBrand === b ? 'none' : '1px solid #e2e8f0' }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

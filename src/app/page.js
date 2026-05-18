'use client';
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';
import ProductGrid from '../components/shop/ProductGrid';
import Cart from '../components/shop/Cart';
import CatalogPage from '../components/shop/CatalogPage';
import FloatingContact from '../components/layout/FloatingContact';
import { useProducts } from '../hooks/useProducts';

export default function Home() {
  const { products, isLoaded } = useProducts();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const handleAddToCart = (product, selectedSize) => {
    const newItem = {
      id: product.id,
      name: product.name,
      size: selectedSize.size,
      price: selectedSize.price,
      brand: product.brand
    };
    setCartItems([...cartItems, newItem]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  return (
    <div className="App">
      <Navbar 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)} 
        onCatalogClick={() => setIsCatalogOpen(true)}
        onHomeClick={() => { setIsCatalogOpen(false); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />
      
      <main>
        <Hero />
        
        <div style={{ background: 'var(--white)', padding: '60px 0', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', opacity: 0.6 }}>
            <h3 style={{ margin: 0, letterSpacing: '4px' }}>NEAT</h3>
            <h3 style={{ margin: 0, letterSpacing: '4px' }}>DEVA</h3>
            <h3 style={{ margin: 0, letterSpacing: '4px' }}>NBT GLOBAL</h3>
          </div>
        </div>

        {isLoaded ? (
          <ProductGrid onAddToCart={handleAddToCart} products={products} />
        ) : (
          <div style={{ padding: '60px', textAlign: 'center' }}>Loading products...</div>
        )}
        
        <section id="about" className="section" style={{ background: 'var(--primary)', color: 'white' }}>
          <div className="container">
            <div className="about-grid">
              <div>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '1.5rem' }}>Precision Chemical Engineering</h2>
                <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>
                  At Neat Brand Trade, we don't just distribute; we optimize. Our chemical ratios are calculated for maximum efficiency, ensuring you get the best cleaning power and sanitization for every drop.
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ color: 'var(--secondary)', fontSize: '1.5rem' }}>✓</span>
                    <span>Best-in-market manufacturing prices direct to industry.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ color: 'var(--secondary)', fontSize: '1.5rem' }}>✓</span>
                    <span>Food-grade certified chemicals for sensitive environments.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ color: 'var(--secondary)', fontSize: '1.5rem' }}>✓</span>
                    <span>Scalable supply from 5L containers to bulk ton shipments.</span>
                  </li>
                </ul>
              </div>
              <div style={{ padding: '2rem', border: '2px dashed var(--secondary)', borderRadius: '20px' }}>
                <h3 style={{ marginBottom: '1rem' }}>Quality Assurance</h3>
                <p style={{ opacity: 0.8 }}>
                  Our laboratory testing ensures that every batch meets the strict requirements of industrial and food processing standards.
                </p>
                <div style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '12px' }}>
                  <p style={{ margin: 0, fontWeight: 700 }}>ISO 9001:2015 COMPLIANT</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>Manufacturing Standards</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready for Bulk Procurement?</h2>
            <p style={{ marginBottom: '3rem', color: 'var(--text-muted)' }}>Contact our distribution experts for custom quotes on ton-level orders.</p>
            <button className="btn btn-primary" style={{ padding: '15px 50px', fontSize: '1.1rem' }}>Contact Distribution Team</button>
          </div>
        </section>
      </main>

      <footer style={{ background: 'var(--bg-surface)', padding: '4rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '4rem' }}>
          <div>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>NEAT BRAND TRADE</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Your global partner in chemical distribution and manufacturing. 
              Specializing in high-efficiency ratios and food-grade industrial solutions.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Brands</h4>
            <ul style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Neat Product</li>
              <li>Deva Products</li>
              <li>Upcoming Brands</li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Solutions</h4>
            <ul style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Hygiene & Sanitization</li>
              <li>Industrial Cleaning</li>
              <li>Food Grade Chemicals</li>
              <li>Bulk Distribution</li>
              <li style={{ marginTop: '1rem' }}>
                <a href="/admin" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600 }}>Admin Login</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          © 2024 Neat Brand Trade (NBT). All Rights Reserved.
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
      />

      {isCatalogOpen && (
        <CatalogPage onClose={() => setIsCatalogOpen(false)} products={products} />
      )}

      <FloatingContact />
    </div>
  );
}

'use client';

const Navbar = ({ cartCount, onCartClick, onCatalogClick, onHomeClick }) => {
  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '0.75rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }} style={{ display: 'block' }}>
            <img 
              src="/NBT Logo_.png" 
              alt="Neat Brand Trade Logo" 
              style={{ height: '70px', width: 'auto', display: 'block', transition: 'transform 0.3s ease' }} 
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </a>
        </div>
        
        <div className="nav-links mobile-hide" style={{ gap: '2rem', fontWeight: 500, alignItems: 'center' }}>
          <a href="#products">Products</a>
          <button 
            onClick={onCatalogClick}
            style={{ 
              background: 'var(--secondary)', 
              color: 'white', 
              border: 'none', 
              padding: '6px 15px', 
              borderRadius: '6px', 
              fontWeight: 600, 
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            📋 View Catalog
          </button>
          <a href="#about">Quality Control</a>
          <a href="#contact">Industrial Inquiry</a>
        </div>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={onCatalogClick}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
            title="View Catalog"
          >
            📋
          </button>
          <button 
            onClick={onCartClick}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer', 
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🛒</span>
            {cartCount > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '-5px', 
                right: '20px', 
                background: 'var(--secondary)', 
                color: 'white', 
                borderRadius: '50%', 
                width: '16px', 
                height: '16px', 
                fontSize: '0.6rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }} className="mobile-hide">Cart</span>
          </button>
          <button className="btn btn-primary mobile-hide" style={{ padding: '8px 20px' }}>Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

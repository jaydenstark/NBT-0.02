

const Hero = () => {
  return (
    <section className="section" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
      <div className="container hero-grid">
        <style>{`
          .hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
          }
          .hero-title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            line-height: 1.1;
            margin-bottom: 1.5rem;
            color: var(--primary);
            animation: slideUp 0.8s ease-out;
          }
          .hero-content {
            animation: slideUp 1s ease-out;
          }
          .hero-actions .btn {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hero-actions .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr;
              gap: 2rem;
              text-align: center;
            }
            .hero-actions {
              flex-direction: column;
            }
            .stats-row {
              justify-content: center;
            }
          }
        `}</style>
        <div className="hero-content">
          <span style={{ 
            color: 'var(--secondary)', 
            fontWeight: 800, 
            letterSpacing: '4px', 
            textTransform: 'uppercase', 
            fontSize: '0.85rem',
            display: 'block',
            marginBottom: '1.2rem',
            animation: 'slideUp 0.6s ease-out'
          }}>
            Industrial Grade Excellence
          </span>
          <h1 className="hero-title">
            Premium Chemical <span style={{ color: 'var(--secondary)' }}>Distribution</span> & Ratios.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Supplying top-tier hygiene, cleaning, and food-grade chemicals. 
            Engineered for precision, manufactured for value.
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem', borderRadius: '12px' }}>Explore Catalog</button>
            <button className="btn btn-outline" style={{ padding: '16px 40px', fontSize: '1.1rem', borderRadius: '12px', background: 'white' }}>Request Bulk Quote</button>
          </div>
          
          <div className="stats-row glass-card" style={{ marginTop: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', padding: '1.5rem 2rem' }}>
            <div style={{ borderLeft: '3px solid var(--secondary)', paddingLeft: '1rem' }}>
              <h4 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--primary)' }}>100%</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Quality Assured</p>
            </div>
            <div style={{ borderLeft: '3px solid var(--secondary)', paddingLeft: '1rem' }}>
              <h4 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--primary)' }}>Food Grade</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Certified Safe</p>
            </div>
            <div style={{ borderLeft: '3px solid var(--secondary)', paddingLeft: '1rem' }}>
              <h4 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--primary)' }}>Bulk</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Logistics</p>
            </div>
          </div>
        </div>
        
        <div className="hero-image" style={{ position: 'relative', animation: 'slideUp 1.2s ease-out' }}>
          <div style={{ 
            width: '100%', 
            height: 'clamp(400px, 60vw, 600px)', 
            borderRadius: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img 
              src="/images/hero.png" 
              alt="Premium Industrial Chemical Storage Facility" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Subtle overlay gradient to make it look even more premium */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)' }}></div>
          </div>
          
          <div className="glass-card" style={{ 
            position: 'absolute', 
            bottom: '-20px', 
            left: '-20px', 
            padding: '1.5rem 2rem', 
          }}>
            <p style={{ fontWeight: 800, margin: 0, color: 'var(--primary)', fontSize: '1.1rem' }}>Optimized Ratios</p>
            <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--secondary)', fontWeight: 600 }}>Maximum Efficiency</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

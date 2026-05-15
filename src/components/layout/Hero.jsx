

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
            font-size: 3.5rem;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            color: var(--primary);
          }
          @media (max-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr;
              gap: 2rem;
              text-align: center;
            }
            .hero-title {
              font-size: 2.5rem;
            }
            .hero-actions {
              flex-direction: column;
            }
            .stats-row {
              justify-content: center;
            }
          }
        `}</style>
        <div className="hero-content fade-in">
          <span style={{ 
            color: 'var(--secondary)', 
            fontWeight: 700, 
            letterSpacing: '3px', 
            textTransform: 'uppercase', 
            fontSize: '0.8rem',
            display: 'block',
            marginBottom: '1rem'
          }}>
            Industrial Grade Excellence
          </span>
          <h1 className="hero-title">
            Premium Chemical <span style={{ color: 'var(--secondary)' }}>Distribution</span> & Ratios.
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Supplying top-tier hygiene, cleaning, and food-grade chemicals. 
            Engineered for precision, manufactured for value.
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary" style={{ padding: '15px 40px' }}>Explore Catalog</button>
            <button className="btn btn-outline" style={{ padding: '15px 40px' }}>Request Bulk Quote</button>
          </div>
          
          <div className="stats-row" style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ borderLeft: '3px solid var(--secondary)', paddingLeft: '1rem' }}>
              <h4 style={{ margin: 0, fontSize: '1.2rem' }}>100%</h4>
              <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quality Assured</p>
            </div>
            <div style={{ borderLeft: '3px solid var(--secondary)', paddingLeft: '1rem' }}>
              <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Food Grade</h4>
              <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>Certified Safe</p>
            </div>
            <div style={{ borderLeft: '3px solid var(--secondary)', paddingLeft: '1rem' }}>
              <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Bulk</h4>
              <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>Logistics</p>
            </div>
          </div>
        </div>
        
        <div className="hero-image" style={{ position: 'relative' }}>
          <div style={{ 
            width: '100%', 
            height: 'clamp(300px, 50vw, 500px)', 
            borderRadius: '30px',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden'
          }}>
            <img 
              src="/images/hero.png" 
              alt="Industrial Chemical Laboratory" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          
          <div className="glass" style={{ 
            position: 'absolute', 
            bottom: '-30px', 
            left: '-30px', 
            padding: '1.5rem', 
            borderRadius: '16px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <p style={{ fontWeight: 700, margin: 0, color: 'var(--primary)' }}>Optimized Ratios</p>
            <p style={{ fontSize: '0.8rem', margin: 0, color: 'var(--secondary)' }}>Maximum Efficiency</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

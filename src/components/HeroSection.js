import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section-modern">
      <div className="hero-background-image">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80" 
          alt="Personnes travaillant ensemble"
          loading="lazy"
        />
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <h2 className="hero-subtitle">Passez en douceur vers la retraite</h2>
          <p className="hero-description">
            La retraite progressive vous permet de travailler à temps partiel tout en percevant une partie de votre retraite. Comprenez, vérifiez, simulez et agissez.
          </p>
          <div className="hero-logo-container">
            <img src="/logo-retraiteclair.svg" alt="RetraiteClair" className="hero-logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


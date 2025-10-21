import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section-modern">
      <div className="hero-background-image">
        <img 
          src="/retraite-progressive-hero.png" 
          alt="Femme faisant du yoga pour la retraite progressive"
          loading="lazy"
        />
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <h2 className="hero-subtitle">Passez en douceur vers la retraite</h2>
          <p className="hero-description">
            La retraite progressive vous permet de travailler à temps partiel tout en percevant une partie de votre retraite. Comprenez, vérifiez, simulez et agissez.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


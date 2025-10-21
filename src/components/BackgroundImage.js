import React from 'react';

const BackgroundImage = () => {
  return (
    <div 
      className="background-image"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/retraite-progressive-hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        zIndex: -2,
        pointerEvents: 'none'
      }}
    />
  );
};

export default BackgroundImage;

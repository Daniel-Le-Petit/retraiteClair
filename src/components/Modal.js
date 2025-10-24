import React from 'react';

const Modal = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        padding: '20px',
        boxSizing: 'border-box',
        margin: 0,
        overflow: 'hidden'
      }}
      onClick={onClose}
    >
      <div
        className={className}
        style={{
          background: 'white',
          borderRadius: '24px',
          maxWidth: '800px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          zIndex: 1000000,
          margin: 0,
          padding: 0,
          transform: 'none',
          top: 'auto',
          left: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

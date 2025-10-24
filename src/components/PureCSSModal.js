import React from 'react';

const PureCSSModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="pure-modal-overlay" onClick={onClose}>
      <div className="pure-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="pure-modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default PureCSSModal;

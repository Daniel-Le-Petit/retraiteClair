import React from 'react';
import './PageHeader.css';

const PageHeader = ({ title, subtitle = '', backgroundImage = '' }) => {
  return (
    <div className="page-header">
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;

import React from 'react';
import { Info, AlertCircle, CheckCircle, Calculator } from 'lucide-react';
import styles from './InfoBox.module.css';

const InfoBox = ({ 
  type = 'info', 
  title, 
  children, 
  icon: CustomIcon,
  className = '',
  onClick 
}) => {
  const getIcon = () => {
    if (CustomIcon) return <CustomIcon size={16} />;
    
    switch (type) {
      case 'success':
        return <CheckCircle size={16} />;
      case 'warning':
        return <AlertCircle size={16} />;
      case 'calculator':
        return <Calculator size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  const getClassName = () => {
    const baseClass = styles.infoBox;
    const typeClass = styles[type];
    return `${baseClass} ${typeClass} ${className}`.trim();
  };

  return (
    <div className={getClassName()} onClick={onClick}>
      <div className={styles.icon}>
        {getIcon()}
      </div>
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.text}>{children}</div>
      </div>
    </div>
  );
};

export default InfoBox;

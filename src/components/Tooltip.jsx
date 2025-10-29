import React, { useState } from 'react';
import { Info } from 'lucide-react';
import styles from './Tooltip.module.css';

const Tooltip = ({ content, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.tooltipContainer}>
      <div
        className={styles.trigger}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children || <Info size={16} />}
      </div>
      {isVisible && (
        <div className={`${styles.tooltip} ${styles[position]}`}>
          <div className={styles.tooltipContent}>
            {content}
          </div>
          <div className={`${styles.arrow} ${styles[`arrow-${position}`]}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;

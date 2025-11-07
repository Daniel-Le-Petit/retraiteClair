import React from 'react';
import useCounterUp from '../hooks/useCounterUp';
import styles from './AnimatedAmount.module.css';

const AnimatedAmount = ({ 
  value, 
  duration = 1500, 
  formatCurrency = true,
  className = '',
  prefix = '',
  suffix = '' 
}) => {
  const animatedValue = useCounterUp(value, duration, formatCurrency);

  return (
    <span className={`${styles.animatedAmount} ${className}`}>
      {prefix}{animatedValue}{suffix}
    </span>
  );
};

export default AnimatedAmount;




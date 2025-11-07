import { useState, useEffect } from 'react';

const useCounterUp = (targetValue, duration = 1500, formatCurrency = false) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!targetValue || targetValue === 0) {
      setCurrentValue(0);
      return;
    }

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const newValue = startValue + (targetValue - startValue) * easeOut;
      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, duration]);

  const formatValue = (value) => {
    if (formatCurrency) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(Math.round(value));
    }
    return Math.round(value).toLocaleString('fr-FR');
  };

  return formatCurrency ? formatValue(currentValue) : Math.round(currentValue);
};

export default useCounterUp;




import React, { useState } from 'react';
import Tooltip from './Tooltip';
import InfoBox from './InfoBox';
import SamCalculator from './SamCalculator';
import styles from './InputField.module.css';

const InputField = ({
  label,
  icon,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  success,
  helpText,
  tooltipContent,
  showCalculator = false,
  onCalculatorResult,
  calculatorProps = {},
  className = '',
  ...props
}) => {
  const [showSamCalculator, setShowSamCalculator] = useState(false);

  const handleCalculatorResult = (result) => {
    if (onCalculatorResult) {
      onCalculatorResult(result);
    }
    setShowSamCalculator(false);
  };

  const getInputClassName = () => {
    let classes = styles.input;
    if (error) classes += ` ${styles.error}`;
    if (success) classes += ` ${styles.success}`;
    if (className) classes += ` ${className}`;
    return classes;
  };

  const renderInput = () => {
    if (type === 'range') {
      return (
        <div className={styles.sliderContainer}>
          <input
            type="range"
            name={name}
            value={value}
            onChange={onChange}
            className={styles.slider}
            min={props.min || 40}
            max={props.max || 80}
            step={props.step || 10}
            {...props}
          />
          <div className={styles.sliderLabels}>
            <span>40%</span>
            <span>50%</span>
            <span>60%</span>
            <span>70%</span>
            <span>80%</span>
          </div>
          <div className={styles.sliderValue}>{value}%</div>
        </div>
      );
    }

    return (
      <div className={styles.inputContainer}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={getInputClassName()}
          placeholder={placeholder}
          {...props}
        />
        {tooltipContent && (
          <div className={styles.inputTooltip}>
            <Tooltip content={tooltipContent}>
              <span className={styles.tooltipIcon}>🛈</span>
            </Tooltip>
          </div>
        )}
        {showCalculator && (
          <button
            type="button"
            className={styles.calculatorButton}
            onClick={() => setShowSamCalculator(true)}
            title="Calculateur SAM"
          >
            🧮
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label}>
        {icon && <span className={styles.labelIcon}>{icon}</span>}
        {label}
        {tooltipContent && (
          <span className={styles.labelTooltip}>
            <Tooltip content={tooltipContent} />
          </span>
        )}
      </label>
      
      {renderInput()}
      
      {/* Messages d'état */}
      {error && (
        <InfoBox type="warning" className={styles.statusMessage}>
          {error}
        </InfoBox>
      )}
      
      {success && (
        <InfoBox type="success" className={styles.statusMessage}>
          {success}
        </InfoBox>
      )}
      
      {/* Texte d'aide */}
      {helpText && (
        <InfoBox type="info" className={styles.helpMessage}>
          {helpText}
        </InfoBox>
      )}
      
      {/* Calculateur SAM */}
      {showCalculator && (
        <SamCalculator
          isOpen={showSamCalculator}
          onClose={() => setShowSamCalculator(false)}
          onUseEstimation={handleCalculatorResult}
          currentSalary={value}
          {...calculatorProps}
        />
      )}
    </div>
  );
};

export default InputField;

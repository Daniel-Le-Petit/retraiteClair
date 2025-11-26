# Task 4: Explicit "Simulation indicative" Disclaimer

## Files to create/modify

### 1. src/components/SimulationDisclaimer.tsx - Create component

Create `src/components/SimulationDisclaimer.tsx`:

```typescript
import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import styles from './SimulationDisclaimer.module.css';

export const SimulationDisclaimer = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('rcl_simulation_disclaimer_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('rcl_simulation_disclaimer_dismissed', 'true');
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div className={styles.disclaimer}>
      <div className={styles.content}>
        <AlertTriangle className={styles.icon} size={20} />
        <p className={styles.text}>
          Résultat fourni à titre indicatif. Seul l'extrait de compte de l'Assurance Retraite fait foi.
        </p>
        <button
          className={styles.closeButton}
          onClick={handleDismiss}
          aria-label="Fermer l'alerte"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default SimulationDisclaimer;
```

### 2. src/components/SimulationDisclaimer.module.css - Create styles

Create `src/components/SimulationDisclaimer.module.css`:

```css
.disclaimer {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
}

.content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 1200px;
  margin: 0 auto;
}

.icon {
  color: #f59e0b;
  flex-shrink: 0;
}

.text {
  flex: 1;
  margin: 0;
  color: #92400e;
  font-size: 0.9rem;
  line-height: 1.5;
}

.closeButton {
  background: none;
  border: none;
  cursor: pointer;
  color: #92400e;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: opacity 0.2s;
}

.closeButton:hover {
  opacity: 0.7;
}

.closeButton:focus {
  outline: 2px solid #f59e0b;
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .content {
    flex-wrap: wrap;
  }

  .text {
    font-size: 0.85rem;
  }
}
```

### 3. src/components/Simulateurs.jsx - Add disclaimer

```diff
import React, { useState, useEffect } from 'react';
import SimplifieForm from './SimplifieForm';
import AvanceFormMultiStep from './AvanceFormMultiStep';
import ResultsTabs from './ResultsTabs';
import CalculProgress from './CalculProgress';
+import SimulationDisclaimer from './SimulationDisclaimer';
import styles from './Simulateurs.module.css';

const Simulateurs = () => {
  // ... existing code ...

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          {/* ... existing header ... */}
        </header>

+       <SimulationDisclaimer />

        {/* Barre de sélection de mode */}
        <div className={styles.modeToggleBar}>
          {/* ... existing code ... */}
        </div>

        {/* ... rest of component ... */}
      </div>
    </div>
  );
};

export default Simulateurs;
```








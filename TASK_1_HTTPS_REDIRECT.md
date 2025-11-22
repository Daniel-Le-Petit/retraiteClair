# Task 1: Force HTTPS Everywhere

## Files to create/modify

### 1. render.yaml - Add headers and HTTPS redirect

```diff
services:
  - type: static
    name: retraiteclair
    buildCommand: npm run build
    staticPublishPath: build
+   headers:
+     - path: /*
+       Strict-Transport-Security: max-age=31536000; includeSubDomains
+       X-Content-Type-Options: nosniff
+       X-Frame-Options: DENY
+       Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.retraiteclair.onrender.com; object-src 'none'; base-uri 'self'; form-action 'self'
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
+     - type: redirect
+       source: /*
+       destination: https://retraiteclair.onrender.com$request_uri
+       condition: $http_x_forwarded_proto != 'https'
```

### 2. public/_redirects (for Render static site)

Create `public/_redirects`:

```
# Force HTTPS
http://retraiteclair.onrender.com/* https://retraiteclair.onrender.com/:splat 301!
http://www.retraiteclair.onrender.com/* https://retraiteclair.onrender.com/:splat 301!
```

### 3. src/utils/forceHttps.js - Client-side redirect fallback

Create `src/utils/forceHttps.js`:

```javascript
export const forceHttps = () => {
  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'http:' &&
    window.location.hostname !== 'localhost' &&
    !window.location.hostname.includes('127.0.0.1')
  ) {
    window.location.replace(
      `https://${window.location.hostname}${window.location.pathname}${window.location.search}${window.location.hash}`
    );
  }
};
```

### 4. src/index.js - Import forceHttps

```diff
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/design-system.css';
import App from './App';
+import { forceHttps } from './utils/forceHttps';

+forceHttps();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 5. Update internal links to HTTPS

Search and replace in all components:
- `http://retraiteclair.onrender.com` → `https://retraiteclair.onrender.com`
- `http://www.retraiteclair.onrender.com` → `https://retraiteclair.onrender.com`



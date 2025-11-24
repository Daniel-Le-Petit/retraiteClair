# Task 2: Security & CSP Headers

## Files to modify

### 1. render.yaml - Add security headers

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
+       Referrer-Policy: strict-origin-when-cross-origin
+       Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.retraiteclair.onrender.com; object-src 'none'; base-uri 'self'; form-action 'self'
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### 2. public/_headers (alternative if render.yaml doesn't support headers)

Create `public/_headers`:

```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.retraiteclair.onrender.com; object-src 'none'; base-uri 'self'; form-action 'self'
```





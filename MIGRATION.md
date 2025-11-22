# Migration Guide - Security & Compliance Updates

## Overview

This guide covers the implementation of HTTPS enforcement, security headers, GDPR compliance, and transparency improvements for retraiteclair.onrender.com.

## Tasks Summary

1. **Force HTTPS everywhere** - Redirects and headers
2. **Security & CSP headers** - Server-side headers configuration
3. **Cookie banner & GDPR** - Consent management
4. **Simulation disclaimer** - Dismissible alert banner
5. **Open-source formulas** - Transparent calculation methods
6. **Footer clarifications** - Service transparency

## Local Testing

### Prerequisites

No additional dependencies required. All components are lightweight and use only React.

### Test HTTPS Redirect (Local)

1. Start dev server: `npm start`
2. Test client-side redirect in `src/utils/forceHttps.js`:
   - Temporarily change condition to test redirect
   - Open `http://localhost:3000` - should redirect to `https://localhost:3000` (will fail in dev, expected)

### Test Cookie Banner

1. Clear localStorage: `localStorage.clear()`
2. Reload page - banner should appear
3. Click "J'accepte" - banner disappears, cookie set
4. Reload - banner should not reappear
5. Click "Gestion des cookies" in footer - banner should reopen

### Test Simulation Disclaimer

1. Navigate to `/simulateur` or `/simulateurs`
2. Yellow alert banner should appear
3. Click X button - banner dismisses
4. Reload page - banner should not reappear
5. Clear localStorage: `localStorage.removeItem('rcl_simulation_disclaimer_dismissed')`
6. Reload - banner should reappear

### Test Security Headers (Local)

Headers are configured in `render.yaml` and will only apply on Render. For local testing:

1. Use browser DevTools → Network tab
2. Check response headers (will not show in local dev)
3. Deploy to Render staging to verify headers

### Test Formulas

1. Import in any component:
   ```javascript
   import { calculerTauxLiquidation, calculerPensionBase } from './utils/retraiteFormulas';
   ```
2. Test calculations match expected values
3. Verify formulas are documented with comments

## Render Deployment Testing

### 1. HTTPS Redirect

1. Deploy to Render
2. Access `http://retraiteclair.onrender.com` (without https)
3. Should redirect to `https://retraiteclair.onrender.com`
4. Verify redirect is 301 permanent

### 2. Security Headers

1. Deploy with updated `render.yaml`
2. Use online tool: https://securityheaders.com
3. Enter `https://retraiteclair.onrender.com`
4. Verify all headers are present:
   - Strict-Transport-Security
   - X-Content-Type-Options
   - X-Frame-Options
   - Content-Security-Policy
   - Referrer-Policy

### 3. CSP Validation

1. Open browser console on deployed site
2. Check for CSP violations
3. Adjust CSP in `render.yaml` if needed
4. Test all features work (forms, scripts, images)

### 4. Cookie Consent

1. Clear cookies for domain
2. Visit site - banner should appear
3. Accept cookies - verify `rcl_cookie_consent` cookie set
4. Check localStorage has `rcl_cookie_consent: 'accepted'`
5. Test "Gestion des cookies" link reopens banner

### 5. Internal Links

1. Search codebase for `http://retraiteclair.onrender.com`
2. Verify all changed to `https://`
3. Test all internal navigation works

## Verification Checklist

- [ ] HTTPS redirect works (http → https)
- [ ] All security headers present in response
- [ ] CSP allows required resources (no violations)
- [ ] Cookie banner appears on first visit
- [ ] Cookie consent stored in localStorage + cookie
- [ ] "Gestion des cookies" link works
- [ ] Simulation disclaimer appears on `/simulateur`
- [ ] Disclaimer dismissible and persists
- [ ] Footer shows service clarification
- [ ] Footer has "Code source & méthodologie" link
- [ ] Formulas file exists and is documented
- [ ] All internal links use HTTPS

## Rollback Plan

If issues occur:

1. **HTTPS redirect**: Remove redirect rule from `render.yaml`
2. **Headers**: Comment out headers section in `render.yaml`
3. **Cookie banner**: Remove `<CookieBanner />` from `App.js`
4. **Disclaimer**: Remove `<SimulationDisclaimer />` from `Simulateurs.jsx`
5. **Footer**: Revert `Footer.tsx` to previous version

## Files Modified

- `render.yaml` - Headers and redirects
- `public/_redirects` - Fallback redirects
- `src/utils/forceHttps.js` - Client-side redirect
- `src/index.js` - Import forceHttps
- `src/App.js` - Add CookieBanner
- `src/components/CookieBanner.tsx` - New component
- `src/components/CookieBanner.module.css` - New styles
- `src/components/Footer.tsx` - Add links and clarification
- `src/components/Footer.module.css` - Add service info styles
- `src/components/SimulationDisclaimer.tsx` - New component
- `src/components/SimulationDisclaimer.module.css` - New styles
- `src/components/Simulateurs.jsx` - Add disclaimer
- `src/utils/retraiteFormulas.js` - New formulas file

## Notes

- Render static sites may require `_redirects` file in `public/` folder
- CSP may need adjustment based on actual third-party scripts used
- Cookie consent must be implemented before any analytics/tracking scripts
- Formulas should be reviewed annually for regulatory updates


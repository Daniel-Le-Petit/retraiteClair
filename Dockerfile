# Multi-stage build for RetraiteClair

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for version info
ARG REACT_APP_VERSION=1.0.0
ARG REACT_APP_FORMULA_VERSION=1.0.0
ARG REACT_APP_BUILD_DATE

# Set environment variables
ENV REACT_APP_VERSION=$REACT_APP_VERSION
ENV REACT_APP_FORMULA_VERSION=$REACT_APP_FORMULA_VERSION
ENV REACT_APP_BUILD_DATE=$REACT_APP_BUILD_DATE
ENV NODE_ENV=production

# Build the app
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration with security headers and HTTPS redirect
RUN echo 'server { \
    listen 80; \
    server_name _; \
    \
    # Redirect HTTP to HTTPS in production \
    if ($http_x_forwarded_proto != "https") { \
        return 301 https://$host$request_uri; \
    } \
    \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Health check endpoint \
    location /api/health { \
        access_log off; \
        return 200 "{\"status\":\"ok\",\"timestamp\":\"$time_iso8601\"}\n"; \
        add_header Content-Type application/json; \
    } \
    \
    # SPA routing \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Security headers \
    add_header X-Frame-Options "DENY" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header Referrer-Policy "strict-origin-when-cross-origin" always; \
    add_header Content-Security-Policy "default-src '\''self'\''; script-src '\''self'\'' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net; style-src '\''self'\'' https://fonts.googleapis.com; font-src '\''self'\'' https://fonts.gstatic.com; img-src '\''self'\'' data: https:; connect-src '\''self'\'' https://www.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net; frame-ancestors '\''none'\''; base-uri '\''self'\''; form-action '\''self'\'';" always; \
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always; \
}' > /etc/nginx/conf.d/default.conf

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



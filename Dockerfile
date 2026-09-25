# ─────────────────────────────────────────────
# Stage 1: Build
# ─────────────────────────────────────────────
FROM node:22-slim AS builder

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy package manifests and workspace configs for layer caching
COPY package.json pnpm-lock.yaml* package-lock.json* pnpm-workspace.yaml* .npmrc* ./

# Copy local file dependencies declared in package.json (Firebase Data Connect SDKs)
COPY src/dataconnect-admin-generated ./src/dataconnect-admin-generated
COPY src/dataconnect-generated ./src/dataconnect-generated

# Install all dependencies (dev + prod), respecting lockfile if present
RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm install --frozen-lockfile; \
    else \
      pnpm install; \
    fi

# Copy application source code
COPY . .

# Build frontend (Vite) and backend (esbuild bundle via scripts/build-server.js)
RUN pnpm run build

# ─────────────────────────────────────────────
# Stage 2: Production runtime
# ─────────────────────────────────────────────
FROM node:22-slim AS runtime

# Install pnpm (needed to install prod-only deps)
RUN npm install -g pnpm

WORKDIR /app

# Copy manifests and local package dependencies
COPY package.json pnpm-workspace.yaml* .npmrc* ./
COPY --from=builder /app/pnpm-lock.yaml* ./
COPY src/dataconnect-admin-generated ./src/dataconnect-admin-generated
COPY src/dataconnect-generated ./src/dataconnect-generated

# Install only production dependencies
RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm install --prod --frozen-lockfile; \
    else \
      pnpm install --prod; \
    fi

# Copy built artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Copy static assets and required config
COPY --from=builder /app/firebase-applet-config.json ./firebase-applet-config.json

# Create uploads directory and set permissions for node user
RUN mkdir -p /app/uploads && chown -R node:node /app

# Run as non-root node user for container security
USER node

# Cloud Run injects $PORT (default 8080). The server reads it from process.env.PORT.
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Run the compiled server bundle
CMD ["node", "dist/server.cjs"]

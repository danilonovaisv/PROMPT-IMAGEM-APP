# ─────────────────────────────────────────────
# Stage 1: Build
# ─────────────────────────────────────────────
FROM node:22-slim AS builder

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy manifests first for layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Install all dependencies (dev + prod) for the build
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build frontend (Vite) and backend (esbuild via scripts/build-server.js)
RUN pnpm run build

# ─────────────────────────────────────────────
# Stage 2: Production runtime
# ─────────────────────────────────────────────
FROM node:22-slim AS runtime

# Install pnpm (needed to install prod-only deps)
RUN npm install -g pnpm

WORKDIR /app

# Copy manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Copy static assets and required config
COPY --from=builder /app/firebase-applet-config.json ./firebase-applet-config.json

# Cloud Run injects $PORT (default 8080). The server reads it from process.env.PORT.
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Run the compiled server bundle
CMD ["node", "dist/server.cjs"]

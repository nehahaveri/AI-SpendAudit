# syntax=docker/dockerfile:1
# Engine service — bundle to a single file with esbuild, then ship a tiny
# runtime image with no node_modules. Build context is the repo root.

FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/shared/package.json ./packages/shared/
COPY frontend/package.json ./frontend/
COPY backend/engine/package.json ./backend/engine/
COPY backend/summary/package.json ./backend/summary/
COPY backend/leads/package.json ./backend/leads/
RUN npm ci
COPY packages/shared ./packages/shared
COPY backend/engine ./backend/engine
RUN npm run build -w backend/engine

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/backend/engine/dist ./dist
EXPOSE 4001
CMD ["node", "dist/index.cjs"]

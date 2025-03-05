# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install PNPM
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Generate Prisma Client
RUN pnpm run generate

# Build application
RUN pnpm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Install required dependencies
RUN apk add --no-cache \
  libc6-compat \
  openssl

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Set ENV
ENV PWD="/app"

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/main.js"]
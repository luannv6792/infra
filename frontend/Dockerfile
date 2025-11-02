# Stage 1: Build React App
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (allow missing lockfile)
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Explicitly ensure framer-motion & lucide-react installed
RUN npm install framer-motion lucide-react --legacy-peer-deps

# Build production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 5173

# Default command
CMD ["nginx", "-g", "daemon off;"]

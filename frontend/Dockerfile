# ==============================
# Stage 1: Build React App
# ==============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Cài dependencies (không cần package-lock.json)
RUN npm install --legacy-peer-deps

# Cài thêm thư viện cần thiết cho giao diện
RUN npm install framer-motion lucide-react --legacy-peer-deps

# Copy toàn bộ source code
COPY . .

# Build production
RUN npm run build

# ==============================
# Stage 2: Serve bằng Nginx
# ==============================
FROM nginx:alpine

# Xoá default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Thêm cấu hình Nginx custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy file build từ stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 để service NodePort map ra ngoài
EXPOSE 80

# Chạy nginx ở foreground
CMD ["nginx", "-g", "daemon off;"]

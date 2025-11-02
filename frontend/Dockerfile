# ===============================
# ✅ Stage 1: Build React + Vite App
# ===============================
FROM node:20-alpine AS build

# Làm việc trong thư mục /app
WORKDIR /app

# Copy file cấu hình package
COPY package*.json ./

# Cài đặt dependency (bao gồm framer-motion)
RUN npm install framer-motion --save && npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build project Vite (xuất ra thư mục /app/dist)
RUN npm run build

# ===============================
# ✅ Stage 2: Serve bằng Nginx
# ===============================
FROM nginx:alpine

# Copy file build ra Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# (Tùy chọn) Thêm cấu hình Nginx riêng nếu có
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở port 80 cho container
EXPOSE 80

# Lệnh chạy mặc định
CMD ["nginx", "-g", "daemon off;"]

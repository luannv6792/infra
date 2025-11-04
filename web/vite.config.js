import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Cấu hình Vite cho Vue + Nginx build static
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      // Proxy backend API (backend NodePort 32001)
      '/api': {
        target: 'http://infraback-service.app.svc.cluster.local:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})

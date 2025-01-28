import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Port untuk frontend
    host: true, // Mengaktifkan akses melalui localhost
    strictPort: true, // Pastikan port tidak berubah
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Alamat backend
        changeOrigin: true, // Mengubah origin sesuai target
      },
    },
    hmr: {
      host: 'localhost', // Gunakan localhost untuk HMR
      port: 3000, // Port frontend
    },
  },
});

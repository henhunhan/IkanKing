import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Port server
    host: true,
    strictPort: true, // Gunakan port ini atau gagal
    origin: 'https://lai24b-k10.tekomits.my.id', // Alamat frontend yang diakses browser
    proxy: {
      '/api': {
        target: 'http://localhost:5050', // Alamat backend
        changeOrigin: true,
      },
    },
    hmr: {
      host: 'lai24b-k10.tekomits.my.id', // Sesuaikan dengan host yang dapat diakses oleh browser
      port: 3000, // Gunakan port server
    },
  },
});

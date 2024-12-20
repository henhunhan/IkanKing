import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-refresh/runtime': require.resolve('node_modules/react-refresh/cjs/react-refresh-runtime.development.js'),
    },
  },
  preview:{
    port: 3000,
    strictPort: true,
  },
  server: {
    port: 3000, 
    strictPort: true,
    host: true,
    origin: "http://localhost:3000",
    proxy: {
      '/api': 'http://localhost:5000/api',
      "rules": {
}
    },
    
  },
})

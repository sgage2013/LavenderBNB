import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import eslint from 'eslint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    // eslint({
    //   lintOnStart: true,
    //   failOnError: mode === 'production'
    // })
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})

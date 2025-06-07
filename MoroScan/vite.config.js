import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/', // Asegura que los assets se resuelvan correctamente
  ...(mode === 'development' && {
    server: {
      proxy: {
        '/production': 'http://localhost:8080',
      },
    },
  }),
}))
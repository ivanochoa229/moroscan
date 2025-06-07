import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración MÍNIMA para producción
export default defineConfig({
  plugins: [react()],
  base: '/',  // Asegura que los assets se carguen correctamente
  build: {
    outDir: 'dist'  // Carpeta donde se generarán los archivos estáticos
  }
});
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Esto permite que 'crypto', 'stream', 'path', etc. funcionen en el navegador
      include: ['crypto', 'stream', 'util', 'path', 'fs'], 
      globals: {
        Buffer: true, 
        global: true,
        process: true,
      },
    }),
  ],
  resolve: {
    alias: {
      // Engañamos al sistema para que 'fs' (File System) no rompa la compilación
      // En el navegador no podemos escribir en disco real, así que lo mapeamos a memoria o vacío
      fs: 'memfs', 
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})

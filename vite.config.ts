import { defineConfig } from 'vitest/config'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Suppress EPIPE / ECONNRESET from the proxy — these occur when the backend
// closes a WebSocket connection (unauthenticated upgrade, backend restart, etc.)
// and are not bugs.
function suppressPipeErrors(proxy: import('http-proxy').Server) {
  proxy.on('error', (err: NodeJS.ErrnoException, _req, _res) => {
    if (err.code === 'EPIPE' || err.code === 'ECONNRESET') return;
    console.error('[proxy error]', err.message);
  });
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    https: false,
    proxy: {
      // All proxied paths target the plain-HTTP Quarkus port (8081).
      // Quarkus now has insecure-requests=enabled so both HTTP and HTTPS
      // are served.  Using HTTP here avoids TLS entirely on the
      // Vite-proxy → backend leg, which eliminates the random WebSocket
      // disconnects that http-proxy produces when tunnelling through a
      // wss:// target with a self-signed certificate.
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        ws: true,
        configure: suppressPipeErrors,
      },
      '/graphql': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        configure: suppressPipeErrors,
      },
      '/ws': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        ws: true,
        configure: suppressPipeErrors,
      },
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
  },
})

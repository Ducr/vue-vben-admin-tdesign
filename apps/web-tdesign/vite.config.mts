import { defineConfig } from '@vben/vite-config';
import path from 'node:path';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      resolve: {
        alias: {
          '@vben/tailwind-config': path.resolve(__dirname, '../../internal/tailwind-config/src/index.ts'),
        },
      },
      optimizeDeps: {
        exclude: ['jiti'],
      },
      ssr: {
        noExternal: [],
        external: ['jiti'],
      },
      build: {
        target: 'es2022',
        commonjsOptions: {
          transformMixedEsModules: true,
        },
        rollupOptions: {
          external: (id) => {
            // Exclude jiti and related Node.js modules from build
            if (id.includes('jiti') || id.startsWith('node:')) {
              return true;
            }
            return false;
          },
        },
      },
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5320/api',
            ws: true,
          },
        },
      },
    },
  };
});

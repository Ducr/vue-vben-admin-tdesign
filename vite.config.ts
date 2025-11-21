import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import { NodePackageImporter } from 'sass';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createHtmlPlugin } from 'vite-plugin-html';

import { viteInjectAppLoadingPlugin } from './internal/vite-config/src/plugins/inject-app-loading';
import { viteMetadataPlugin } from './internal/vite-config/src/plugins/inject-metadata';
import { viteNitroMockPlugin } from './vite-plugin-nitro-mock';

export default defineConfig(async ({ mode, command }): Promise<import('vite').UserConfig> => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxyTarget = env.VITE_PROXY_TARGET ?? 'http://localhost:5320/api';
  const parsedPort = Number.parseInt(env.VITE_PORT ?? '', 10);
  const port = Number.isNaN(parsedPort) ? 5173 : parsedPort;
  const isBuild = command === 'build';

  // 设置应用标题（中文）
  const appTitle = env.VITE_APP_TITLE || 'Vben Admin TDesign';
  
  // 设置环境变量默认值（用于 loading 插件）
  const envWithDefaults = {
    ...env,
    VITE_APP_NAMESPACE: env.VITE_APP_NAMESPACE || 'vue-vben-admin-tdesign',
    VITE_APP_VERSION: env.VITE_APP_VERSION || '5.5.9',
  };

  const plugins = [
    vue(),
    vueJsx(),
    createHtmlPlugin({
      inject: {
        data: {
          VITE_APP_TITLE: appTitle,
        },
      },
      minify: isBuild,
    }),
  ];

  // 开发模式下启用 mock 服务
  if (!isBuild) {
    plugins.push(viteNitroMockPlugin() as import('vite').Plugin);
  }

  // 注入应用加载页面（避免白屏）
  const loadingPlugin = await viteInjectAppLoadingPlugin(isBuild, envWithDefaults, 'loading.html', appTitle);
  if (loadingPlugin) {
    plugins.push(loadingPlugin as import('vite').Plugin);
  }

  // 注入项目元数据（用于关于页面）
  const metadataPlugin = await viteMetadataPlugin();
  if (metadataPlugin) {
    plugins.push(metadataPlugin as import('vite').Plugin);
  }

  return {
    define: {
      'import.meta.env.VITE_APP_TITLE': JSON.stringify(appTitle),
      'import.meta.env.VITE_APP_NAMESPACE': JSON.stringify(envWithDefaults.VITE_APP_NAMESPACE),
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(envWithDefaults.VITE_APP_VERSION),
    },
    plugins,
    resolve: {
      alias: [
        {
          find: '#/',
          replacement: fileURLToPath(new URL('./src/', import.meta.url)),
        },
        {
          find: '#',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
        {
          find: /^@vben-core\/shared\/(.*)$/,
          replacement: fileURLToPath(new URL('./packages/@core/base/shared/src/$1', import.meta.url)),
        },
        {
          find: /^@vben-core\/design(\/.*)?$/,
          replacement: fileURLToPath(new URL('./packages/@core/base/design/src$1', import.meta.url)),
        },
        {
          find: /^@vben-core\/icons(\/.*)?$/,
          replacement: fileURLToPath(new URL('./packages/@core/base/icons/src$1', import.meta.url)),
        },
        {
          find: /^@vben-core\/(typings|composables)(\/.*)?$/,
          replacement: fileURLToPath(new URL('./packages/@core/$1/src$2', import.meta.url)),
        },
        {
          find: /^@vben-core\/(form-ui|shadcn-ui|layout-ui|menu-ui|popup-ui|tabs-ui)(\/.*)?$/,
          replacement: fileURLToPath(new URL('./packages/@core/ui-kit/$1/src$2', import.meta.url)),
        },
      ],
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: (content: string, filepath: string) => {
            const root = process.cwd();
            const relativePath = path.relative(root, filepath);
            // src 目录下的文件注入全局样式
            if (relativePath.startsWith('src')) {
              return `@use "@vben/styles/global" as *;\n${content}`;
            }
            return content;
          },
          importers: [new NodePackageImporter()],
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port,
      watch: {
        // 忽略 Nitro Mock Server 生成的文件，避免触发重新加载
        ignored: ['**/backend-mock/.nitro/**', '**/backend-mock/.output/**'],
      },
      warmup: {
        // 预热文件，加快开发环境启动速度
        clientFiles: [
          './index.html',
          './src/bootstrap.ts',
          './src/{views,layouts,router,store,api,adapter}/*',
        ],
      },
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    preview: {
      port,
    },
    optimizeDeps: {
      // 强制预构建这些依赖，加快首次加载速度
      include: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        'dayjs',
      ],
      // 排除不需要预构建的依赖（通常是 ESM 格式的包）
      exclude: [],
      // 预构建的依赖会缓存到 node_modules/.vite
      // 如果依赖发生变化，可以删除此目录后重新启动
    },
    build: {
      target: 'es2015',
      sourcemap: false,
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/index-[name]-[hash].js',
        },
      },
    },
    esbuild: {
      drop: isBuild
        ? [
            // 'console',
            'debugger',
          ]
        : [],
      legalComments: 'none',
    },
  };
});


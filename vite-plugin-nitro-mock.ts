import type { PluginOption } from 'vite';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import getPort from 'get-port';
import { build, createDevServer, createNitro, prepare } from 'nitropack';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hmrKeyRe = /^runtimeConfig\.|routeRules\./;

export const viteNitroMockPlugin = ({
  mockServerDir = path.resolve(__dirname, './backend-mock'),
  port = 5320,
  verbose = true,
}: {
  mockServerDir?: string;
  port?: number;
  verbose?: boolean;
} = {}): PluginOption => {
  return {
    async configureServer(server) {
      const availablePort = await getPort({ port });
      if (availablePort !== port) {
        console.warn(`Port ${port} is not available, skipping mock server`);
        return;
      }

      const fs = await import('node:fs');
      if (!fs.existsSync(mockServerDir)) {
        if (verbose) {
          console.log(`Mock server directory not found: ${mockServerDir}. Skip mock server.`);
        }
        return;
      }

      // 检查是否有 nitro.config.ts
      const nitroConfigPath = path.join(mockServerDir, 'nitro.config.ts');
      if (!fs.existsSync(nitroConfigPath)) {
        if (verbose) {
          console.log(`Nitro config not found: ${nitroConfigPath}. Skip mock server.`);
        }
        return;
      }

      runNitroServer(mockServerDir, port, verbose);

      const _printUrls = server.printUrls;
      server.printUrls = () => {
        _printUrls();

        console.log(
          `  ${'\u001b[32m➜\u001b[0m'}  ${'\u001b[1mNitro Mock Server\u001b[0m'}: ${`\u001b[36mhttp://localhost:${port}/api\u001b[0m`}`,
        );
        console.log(
          `  ${'\u001b[32m➜\u001b[0m'}  ${'\u001b[1mVben Admin Docs\u001b[0m'}: ${'\u001b[36mhttps://ducrong.com/vue-vben-admin-tdesign\u001b[0m'}`,
        );
      };
    },
    enforce: 'pre',
    name: 'vite:mock-server',
  };
};

async function runNitroServer(rootDir: string, port: number, verbose: boolean) {
  let nitro: any;
  const reload = async () => {
    if (nitro) {
      if (verbose) console.info('Restarting dev server...');
      if ('unwatch' in nitro.options._c12) {
        await nitro.options._c12.unwatch();
      }
      await nitro.close();
    }
    nitro = await createNitro(
      {
        dev: true,
        preset: 'nitro-dev',
        rootDir,
      },
      {
        c12: {
          async onUpdate({ getDiff, newConfig }) {
            const diff = getDiff();
            if (diff.length === 0) {
              return;
            }
            verbose &&
              console.info(
                `Nitro config updated:\n${diff
                  .map((entry) => `  ${entry.toString()}`)
                  .join('\n')}`,
              );
            await (diff.every((e) => hmrKeyRe.test(e.key))
              ? nitro.updateConfig(newConfig.config)
              : reload());
          },
        },
        watch: true,
      },
    );
    nitro.hooks.hookOnce('restart', reload);

    const server = createDevServer(nitro);
    await server.listen(port, { showURL: false });
    await prepare(nitro);
    await build(nitro);

    if (verbose) {
      console.log('');
      console.log(`✔ Nitro Mock Server started.`);
    }
  };
  return await reload();
}


import type { PluginOption } from 'vite';

import dayjs from 'dayjs';
import { dirname } from 'node:path';
import { getPackagesSync } from '@manypkg/get-packages';
import { readPackageJSON } from 'pkg-types';
import { findUpSync } from 'find-up';
import { readWorkspaceManifest } from '@pnpm/workspace.read-manifest';

// 查找 monorepo 根目录
function findMonorepoRoot(cwd: string = process.cwd()) {
  try {
    const workspaceFile = findUpSync('pnpm-workspace.yaml', {
      cwd,
      type: 'file',
    });
    if (workspaceFile) {
      return dirname(workspaceFile);
    }
    
    const lockFile = findUpSync('pnpm-lock.yaml', {
      cwd,
      type: 'file',
    });
    if (lockFile) {
      return dirname(lockFile);
    }
    
    // 如果都找不到，返回当前目录
    return cwd;
  } catch (error) {
    // 出错时返回当前目录
    return cwd;
  }
}

function resolvePackageVersion(
  pkgsMeta: Record<string, string>,
  name: string,
  value: string,
  catalog: Record<string, string>,
) {
  if (value.includes('catalog:')) {
    return catalog[name];
  }

  if (value.includes('workspace')) {
    return pkgsMeta[name];
  }

  return value;
}

function resolveMonorepoDependencies() {
  const root = findMonorepoRoot();
  const { packages } = getPackagesSync(root);
  const manifest = readWorkspaceManifest(root);
  const catalog = manifest?.catalog || {};

  const resultDevDependencies: Record<string, string | undefined> = {};
  const resultDependencies: Record<string, string | undefined> = {};
  const pkgsMeta: Record<string, string> = {};

  for (const { packageJson } of packages) {
    pkgsMeta[packageJson.name] = packageJson.version;
  }

  for (const { packageJson } of packages) {
    const { dependencies = {}, devDependencies = {} } = packageJson;
    for (const [key, value] of Object.entries(dependencies)) {
      resultDependencies[key] = resolvePackageVersion(
        pkgsMeta,
        key,
        value,
        catalog,
      );
    }
    for (const [key, value] of Object.entries(devDependencies)) {
      resultDevDependencies[key] = resolvePackageVersion(
        pkgsMeta,
        key,
        value,
        catalog,
      );
    }
  }
  return {
    dependencies: resultDependencies,
    devDependencies: resultDevDependencies,
  };
}

/**
 * 用于注入项目信息
 */
async function viteMetadataPlugin(
  root = process.cwd(),
): Promise<PluginOption | undefined> {
  const { author, description, homepage, license, version } =
    await readPackageJSON(root);

  const buildTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

  return {
    async config() {
      const { dependencies, devDependencies } =
        await resolveMonorepoDependencies();

      const isAuthorObject = typeof author === 'object';
      const authorName = isAuthorObject ? author.name : author;
      const authorEmail = isAuthorObject ? author.email : null;
      const authorUrl = isAuthorObject ? author.url : null;

      return {
        define: {
          __VBEN_ADMIN_METADATA__: JSON.stringify({
            authorEmail,
            authorName,
            authorUrl,
            buildTime,
            dependencies,
            description,
            devDependencies,
            homepage,
            license,
            version,
          }),
          'import.meta.env.VITE_APP_VERSION': JSON.stringify(version),
        },
      };
    },
    enforce: 'post',
    name: 'vite:inject-metadata',
  };
}

export { viteMetadataPlugin };

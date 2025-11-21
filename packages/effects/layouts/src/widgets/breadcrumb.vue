<script lang="ts" setup>
import type { BreadcrumbStyleType } from '@vben/types';

import type { IBreadcrumb } from '@vben-core/shadcn-ui';

import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { $t } from '@vben/locales';

import { VbenBreadcrumbView } from '@vben-core/shadcn-ui';

interface Props {
  hideWhenOnlyOne?: boolean;
  showHome?: boolean;
  showIcon?: boolean;
  type?: BreadcrumbStyleType;
}

const props = withDefaults(defineProps<Props>(), {
  showHome: false,
  showIcon: false,
  type: 'normal',
});

const route = useRoute();
const router = useRouter();

const breadcrumbs = computed((): IBreadcrumb[] => {
  const matched = route.matched;

  const resultBreadcrumb: IBreadcrumb[] = [];

  for (const match of matched) {
    const { meta, path, name } = match;
    const { hideChildrenInMenu, hideInBreadcrumb, icon, title } =
      meta || {};
    if (hideInBreadcrumb || hideChildrenInMenu || !path) {
      continue;
    }

    // 处理动态路由参数：使用 router.resolve 或手动替换参数
    let resolvedPath = path;
    
    // 如果路径包含动态参数（如 :id），需要替换为实际值
    if (path.includes(':')) {
      try {
        // 方法1: 尝试使用 router.resolve 解析（如果路由有 name）
        if (name) {
          const resolved = router.resolve({ 
            name: name as string, 
            params: route.params 
          });
          if (resolved.path && !resolved.path.includes(':')) {
            resolvedPath = resolved.path;
          }
        }
        
        // 方法2: 如果 resolve 失败或仍然包含 :，手动替换参数
        if (resolvedPath.includes(':') && route.params) {
          resolvedPath = path.replace(/:(\w+)/g, (_, param) => {
            const paramValue = route.params[param];
            return paramValue ? String(paramValue) : `:${param}`;
          });
        }
        
        // 方法3: 如果仍然包含 :，使用当前路由路径中对应的部分
        if (resolvedPath.includes(':')) {
          const currentPath = route.path;
          const pathPattern = path;
          const pathSegments = currentPath.split('/').filter(Boolean);
          const patternSegments = pathPattern.split('/').filter(Boolean);
          
          // 找到匹配的路径段并替换
          let actualPathSegments: string[] = [];
          let pathIndex = 0;
          
          for (let i = 0; i < patternSegments.length && pathIndex < pathSegments.length; i++) {
            if (patternSegments[i].startsWith(':')) {
              // 动态参数段，使用实际路径中的对应段
              actualPathSegments.push(pathSegments[pathIndex] || patternSegments[i]);
              pathIndex++;
            } else {
              // 静态路径段，直接使用
              actualPathSegments.push(patternSegments[i]);
              // 如果当前路径段匹配，索引前进
              if (pathSegments[pathIndex] === patternSegments[i]) {
                pathIndex++;
              }
            }
          }
          
          if (actualPathSegments.length > 0) {
            resolvedPath = '/' + actualPathSegments.join('/');
          } else {
            // 最后备选：使用原始路径但至少替换已知的参数
            resolvedPath = path;
          }
        }
      } catch (error) {
        // 解析失败，保持原始路径
        resolvedPath = path;
      }
    }

    resultBreadcrumb.push({
      icon,
      path: resolvedPath || route.path,
      title: title ? $t((title || name) as string) : '',
    });
  }
  if (props.showHome) {
    resultBreadcrumb.unshift({
      icon: 'mdi:home-outline',
      isHome: true,
      path: '/',
    });
  }
  if (props.hideWhenOnlyOne && resultBreadcrumb.length === 1) {
    return [];
  }

  return resultBreadcrumb;
});

function handleSelect(path: string) {
  router.push(path);
}
</script>
<template>
  <VbenBreadcrumbView
    :breadcrumbs="breadcrumbs"
    :show-icon="showIcon"
    :style-type="type"
    class="ml-2"
    @select="handleSelect"
  />
</template>

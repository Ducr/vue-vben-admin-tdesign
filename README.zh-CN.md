# vue-vben-admin-tdesign

基于 **Vue Vben Admin v5.5.9** 独立拆分而来的 TDesign 版本单页应用（SPA）。

## 📖 项目简介

`vue-vben-admin-tdesign` 是从原始 [Vue Vben Admin](https://github.com/vbenjs/vue-vben-admin) monorepo 架构中独立拆分出来的 **TDesign** 版本。本项目保留了 Vue Vben Admin 的所有核心功能特性，但完全脱离 pnpm workspace 和 monorepo 依赖，可作为独立项目单独部署、测试和发布。

### 与原始 Vue Vben Admin 的关系

- **基于版本**: Vue Vben Admin v5.5.9
- **架构变化**: 从 monorepo 架构重构为独立 SPA 项目
- **功能保留**: 保留了所有核心功能，包括权限管理、路由系统、国际化、主题配置、Mock 服务等
- **依赖管理**: 完全脱离 pnpm workspace，内部 `@vben/*` 包通过本地 `packages/` 目录管理
- **部署方式**: 可独立部署，无需依赖其他 monorepo 模块

## ✨ 特性

- 🎨 **基于 TDesign Vue Next 1.x** - 使用 TDesign 作为 UI 组件库
- ⚡️ **Vite 7.x** - 极速的开发体验和构建速度
- 🔥 **Vue 3 + TypeScript** - 使用最新的 Vue 3 Composition API 和完整的 TypeScript 支持
- 📦 **完整的功能体系** - 权限管理、路由、国际化、主题切换、Mock 服务等
- 🎯 **独立项目结构** - 无 monorepo 依赖，可单独开发、测试、部署
- 📱 **响应式布局** - 支持多种布局模式，适配移动端和桌面端

## 🚀 快速开始

### 环境要求

- Node.js >= 18.x
- pnpm >= 8.x

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
pnpm dev          # 开发模式
pnpm dev:docs     # 启动文档服务
pnpm dev:all      # 同时启动应用和文档服务
```

### 构建

```bash
pnpm build        # 生产构建
pnpm build:analyze # 构建并分析包大小
pnpm preview      # 预览生产构建结果
```

### 其他命令

```bash
pnpm lint         # 代码检查
pnpm typecheck    # TypeScript 类型检查
pnpm test         # 运行测试
pnpm test:watch   # 监听模式运行测试
```

## 📁 项目结构

```
vue-vben-admin-tdesign/
├── src/                 # 业务源码
│   ├── adapter/        # 组件适配器（TDesign）
│   ├── api/            # API 接口
│   ├── layouts/        # 布局组件
│   ├── locales/        # 国际化配置
│   ├── router/         # 路由配置
│   ├── store/          # 状态管理
│   └── views/          # 页面组件
├── packages/           # 内部 @vben/* 包（从原 monorepo 复制）
├── internal/           # 内部工具包（lint、tsconfig、vite-config 等）
├── backend-mock/       # Mock 服务（Nitro）
├── docs/              # 文档站点
├── public/            # 静态资源
├── vite.config.ts     # Vite 配置
├── tailwind.config.mjs # Tailwind CSS 配置
└── postcss.config.mjs  # PostCSS 配置
```

## ⚙️ 环境变量

在项目根目录创建 `.env` 文件：

```bash
# 开发/预览端口
VITE_PORT=5173

# API 代理目标地址（默认指向本地 Mock 服务）
VITE_PROXY_TARGET=http://localhost:5320/api

# 应用标题
VITE_APP_TITLE=Vben Admin TDesign

# 应用命名空间
VITE_APP_NAMESPACE=vue-vben-admin-tdesign

# 应用版本
VITE_APP_VERSION=5.5.9
```

## 🔧 技术栈

- **框架**: Vue 3.5+ (Composition API)
- **UI 组件库**: TDesign Vue Next 1.x
- **构建工具**: Vite 7.x
- **类型系统**: TypeScript 5.8+
- **路由**: Vue Router 4.x
- **状态管理**: Pinia 3.x
- **样式方案**: Tailwind CSS 3.x + PostCSS
- **国际化**: Vue I18n
- **Mock 服务**: Nitro
- **测试框架**: Vitest

## 📚 相关资源

- **原始项目**: [Vue Vben Admin](https://github.com/vbenjs/vue-vben-admin)
- **文档**: [Vue Vben Admin 文档](https://doc.vben.pro)
- **TDesign**: [TDesign 文档](https://tdesign.tencent.com/vue-next/overview)

## 📝 与 Monorepo 版本的区别

| 特性 | Monorepo 版本 | 独立 SPA 版本 |
|------|--------------|--------------|
| 项目结构 | 多个子项目（apps/web-*） | 单个独立项目 |
| 依赖管理 | pnpm workspace | 本地 packages 目录 |
| 部署方式 | 需要整个 monorepo | 可单独部署 |
| 版本管理 | 统一版本管理 | 独立版本管理 |
| CI/CD | 需要 monorepo 配置 | 独立 CI/CD 配置 |

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 👤 作者

- **Ducr** - [GitHub](https://github.com/Ducr) - ducrong@126.com

## 🙏 致谢

感谢 [Vue Vben Admin](https://github.com/vbenjs/vue-vben-admin) 项目提供的优秀架构和功能实现。

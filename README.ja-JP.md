# vue-vben-admin-tdesign

**Vue Vben Admin v5.5.9** から独立して分離された TDesign バージョンのシングルページアプリケーション（SPA）。

## 📖 プロジェクト概要

`vue-vben-admin-tdesign` は、元の [Vue Vben Admin](https://github.com/vbenjs/vue-vben-admin) monorepo アーキテクチャから独立して分離された **TDesign** バージョンです。このプロジェクトは Vue Vben Admin のすべてのコア機能を保持していますが、pnpm workspace と monorepo の依存関係を完全に切り離し、独立したプロジェクトとして単独でデプロイ、テスト、リリースできます。

### 元の Vue Vben Admin との関係

- **ベースバージョン**: Vue Vben Admin v5.5.9
- **アーキテクチャの変更**: monorepo アーキテクチャから独立 SPA プロジェクトへ再構築
- **機能の保持**: 権限管理、ルーティングシステム、国際化、テーマ設定、Mock サービスなど、すべてのコア機能を保持
- **依存関係の管理**: pnpm workspace を完全に切り離し、内部 `@vben/*` パッケージはローカル `packages/` ディレクトリで管理
- **デプロイ方法**: 他の monorepo モジュールに依存せず、独立してデプロイ可能

## ✨ 特徴

- 🎨 **TDesign Vue Next 1.x ベース** - TDesign を UI コンポーネントライブラリとして使用
- ⚡️ **Vite 7.x** - 超高速の開発体験とビルド速度
- 🔥 **Vue 3 + TypeScript** - 最新の Vue 3 Composition API と完全な TypeScript サポート
- 📦 **完全な機能体系** - 権限管理、ルーティング、国際化、テーマ切り替え、Mock サービスなど
- 🎯 **独立プロジェクト構造** - monorepo 依存なし、単独で開発、テスト、デプロイ可能
- 📱 **レスポンシブレイアウト** - 複数のレイアウトモードをサポート、モバイルとデスクトップに対応

## 🚀 クイックスタート

### 環境要件

- Node.js >= 18.x
- pnpm >= 8.x

### 依存関係のインストール

```bash
pnpm install
```

### 開発

```bash
pnpm dev          # 開発モード
pnpm dev:docs     # ドキュメントサービスを起動
pnpm dev:all      # アプリケーションとドキュメントサービスを同時起動
```

### ビルド

```bash
pnpm build        # 本番ビルド
pnpm build:analyze # ビルドしてパッケージサイズを分析
pnpm preview      # 本番ビルド結果をプレビュー
```

### その他のコマンド

```bash
pnpm lint         # コードチェック
pnpm typecheck    # TypeScript 型チェック
pnpm test         # テストを実行
pnpm test:watch   # 監視モードでテストを実行
```

## 📁 プロジェクト構造

```
vue-vben-admin-tdesign/
├── src/                 # ビジネスソースコード
│   ├── adapter/        # コンポーネントアダプター（TDesign）
│   ├── api/            # API インターフェース
│   ├── layouts/        # レイアウトコンポーネント
│   ├── locales/        # 国際化設定
│   ├── router/         # ルーティング設定
│   ├── store/          # 状態管理
│   └── views/          # ページコンポーネント
├── packages/           # 内部 @vben/* パッケージ（元の monorepo からコピー）
├── internal/           # 内部ツールパッケージ（lint、tsconfig、vite-config など）
├── backend-mock/       # Mock サービス（Nitro）
├── docs/              # ドキュメントサイト
├── public/            # 静的リソース
├── vite.config.ts     # Vite 設定
├── tailwind.config.mjs # Tailwind CSS 設定
└── postcss.config.mjs  # PostCSS 設定
```

## ⚙️ 環境変数

プロジェクトルートディレクトリに `.env` ファイルを作成：

```bash
# 開発/プレビューポート
VITE_PORT=5173

# API プロキシターゲットアドレス（デフォルトはローカル Mock サービス）
VITE_PROXY_TARGET=http://localhost:5320/api

# アプリケーションタイトル
VITE_APP_TITLE=Vben Admin TDesign

# アプリケーション名前空間
VITE_APP_NAMESPACE=vue-vben-admin-tdesign

# アプリケーションバージョン
VITE_APP_VERSION=5.5.9
```

## 🔧 技術スタック

- **フレームワーク**: Vue 3.5+ (Composition API)
- **UI コンポーネントライブラリ**: TDesign Vue Next 1.x
- **ビルドツール**: Vite 7.x
- **型システム**: TypeScript 5.8+
- **ルーティング**: Vue Router 4.x
- **状態管理**: Pinia 3.x
- **スタイルソリューション**: Tailwind CSS 3.x + PostCSS
- **国際化**: Vue I18n
- **Mock サービス**: Nitro
- **テストフレームワーク**: Vitest

## 📚 関連リソース

- **元のプロジェクト**: [Vue Vben Admin](https://github.com/vbenjs/vue-vben-admin)
- **ドキュメント**: [Vue Vben Admin ドキュメント](https://doc.vben.pro)
- **TDesign**: [TDesign ドキュメント](https://tdesign.tencent.com/vue-next/overview)

## 📝 Monorepo バージョンとの違い

| 特性 | Monorepo バージョン | 独立 SPA バージョン |
|------|---------------------|---------------------|
| プロジェクト構造 | 複数のサブプロジェクト（apps/web-*） | 単一の独立プロジェクト |
| 依存関係の管理 | pnpm workspace | ローカル packages ディレクトリ |
| デプロイ方法 | 全体の monorepo が必要 | 単独でデプロイ可能 |
| バージョン管理 | 統一されたバージョン管理 | 独立したバージョン管理 |
| CI/CD | monorepo 設定が必要 | 独立した CI/CD 設定 |

## 📄 ライセンス

このプロジェクトは [MIT](LICENSE) ライセンスの下でオープンソース化されています。

## 👤 作成者

- **Ducr** - [GitHub](https://github.com/Ducr) - ducrong@126.com

## 🙏 謝辞

優秀なアーキテクチャと機能実装を提供してくれた [Vue Vben Admin](https://github.com/vbenjs/vue-vben-admin) プロジェクトに感謝します。

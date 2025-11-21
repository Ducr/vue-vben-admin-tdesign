---
outline: deep
---

# Quick Start {#quick-start}

## Prerequisites

::: info Environment Requirements

Before starting the project, ensure that your environment meets the following requirements:

- [Node.js](https://nodejs.org/en) version 20.15.0 or above. It is recommended to use [fnm](https://github.com/Schniz/fnm), [nvm](https://github.com/nvm-sh/nvm), or directly use [pnpm](https://pnpm.io/cli/env) for version management.
- [Git](https://git-scm.com/) any version.

To verify if your environment meets the above requirements, you can check the versions using the following commands:

```bash
# Ensure the correct node LTS version is displayed
node -v
# Ensure the correct git version is displayed
git -v
```

:::

## Starting the Project

### Obtain the Source Code

::: code-group

```bash [GitHub]
# Clone the code
git clone https://github.com/Ducr/vue-vben-admin-tdesign.git
```

```bash [Gitee]
# Clone the code
# The Gitee repository may not have the latest code
# Note: This repository currently has no Gitee mirror, please use the GitHub link
git clone https://github.com/Ducr/vue-vben-admin-tdesign.git
```

:::

::: danger Caution

Ensure that the directory where you store the code and all its parent directories do not contain Chinese, Korean, Japanese characters, or spaces, as this may cause errors when installing dependencies and starting the project.

:::

### Install Dependencies

Open a terminal in your code directory and execute the following commands:

```bash
# Enter the project directory
cd vue-vben-admin-tdesign

# Enable the project-specified version of pnpm
npm i -g corepack

# Install dependencies
pnpm install
```

::: tip Note

The project only supports using `pnpm` for installing dependencies. By default, `corepack` will be used to install the specified version of `pnpm`.

:::

### Run the Project

Execute the following command to run the project:

```bash
# Start the project
pnpm dev
```

Now, you can visit `http://localhost:5173` in your browser to view the project.

#### Running the Documentation Site

If you need to view the documentation site, you can run the following command:

```bash
pnpm run dev:docs
```

Then, you can visit `http://localhost:6173` in your browser to view the documentation.

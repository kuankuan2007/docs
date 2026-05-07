# @kuankuan/k-markdown-parser Documentation

*[查看中文版本 (Read this in Chinese)](readme.zh.md)*

This is the official documentation project for the `@kuankuan/k-markdown-parser` component library/parser. `@kuankuan/k-markdown-parser` is a feature-rich Markdown parsing library. This repository is primarily responsible for writing and displaying it's related usage guides, architectural concept explanations, and advanced tutorials.

## About the Architecture

This documentation site is forked and customized from the [multi-page-document-template](https://github.com/kuankuan2007/multi-page-document-template).
The template is driven by Vue 3 and Vite, natively supporting the extraction and display of Markdown files. It is very suitable for building library documentation systems with multi-level and multi-page routing.

## Quick Start

This project uses `pnpm` as the package manager. Before starting, please make sure you have installed Node.js (newer versions recommended) and `pnpm`.

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start the Development Server

```bash
pnpm run dev
```

Once started, you can preview the documentation content by visiting the local address output in the console. Editing the Markdown files under `src/articles/` will reflect changes in real-time.

### 3. Build for Production

```bash
pnpm run build
```

Executing this will generate a `dist` directory containing the compiled static resources for the documentation site, which can be directly deployed.

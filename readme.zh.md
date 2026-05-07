# @kuankuan/k-markdown-parser 文档

这是 `@kuankuan/k-markdown-parser` 组件库/解析器的官方文档项目。`@kuankuan/k-markdown-parser` 是一个功能丰富的 Markdown 解析库，本仓库主要负责其相关使用指南、架构概念说明以及进阶教程的编写与展示。

## 关于文档架构

本文档站点是基于 [multi-page-document-template](https://github.com/kuankuan2007/multi-page-document-template) 模板 Fork 并定制开发而来的。
该模板使用 Vue 3 和 Vite 驱动，原生支持 Markdown 文件的提取与展示，非常适合用来搭建具有多层级、多页面的类库文档系统。

## 快速开始

本项目使用 `pnpm` 作为包管理工具，在开始之前，请确保你已安装了 Node.js（推荐较新版本）以及 pnpm。

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm run dev
```

启动完成后，你可以通过浏览器访问控制台输出的本地地址来预览文档内容。编辑 `src/articles/` 下的 Markdown 文件即可实时查看到变更。

### 3. 构建生产环境产物

```bash
pnpm run build
```

执行后将会生成 `dist` 目录，内部包含编译后的文档站点静态资源，可直接用于部署。

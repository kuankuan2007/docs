# 新手指南

本指南将帮助你在项目中快速安装并启用 `k-markdown-parser` 进行 Markdown 解析。

## 1. 安装

包本身已经发布在 NPM。你可以使用包管理器安装：

```bash
npm install @kuankuan/k-markdown-parser
```

如果你使用 `pnpm`：

```bash
pnpm add @kuankuan/k-markdown-parser
```

同时也支持直接通过 CDN 并以 `<script>` 标签注入（导出全局对象 `KMarkdownParser`）：

```html
<script src="https://cdn.jsdelivr.net/npm/@kuankuan/k-markdown-parser/dist/index.iife.min.js"></script>
```

## 2. 第一个解析任务

解析器导出为单例类，实例化后暴露 `.parse` 方法。

```typescript
import KMarkdownParser from '@kuankuan/k-markdown-parser';

// 初始化
const parser = new KMarkdownParser();

// 传入原生 Markdown 字符串进行解析
const rootNode = parser.parse(`
# Hello

This is a **Markdown** string.
`);

// rootNode 是一颗包含详细参数的语法树
console.log(rootNode);
```

## 3. 从语法树拿到什么？

默认生成的 `rootNode` 是 `KMarkdownRootNode` 类的实例，它的 `content` 包含了按照解析结果平铺或嵌套的所有子节点层级（`KMarkdownTitleNode` / `KMarkdownParagraphNode` 等）。每一层级节点如果支持包含文本，它的对应 `content` 数组内可能是字符串字面量或嵌套的其他子代节点类型。

要进一步深入解析过程，请阅读[原理解析与系统概念](./concept)章节。

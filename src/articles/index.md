# @kuankuan/k-markdown-vue

[![npm version](https://img.shields.io/npm/v/@kuankuan/k-markdown-vue)](https://www.npmjs.com/package/@kuankuan/k-markdown-vue)
[![license](https://img.shields.io/badge/license-MulanPSL--2.0-blue)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-black?logo=github)](https://github.com/kuankuan2007/k-markdown-vue)

一个用于渲染 Markdown 的 Vue 3 组件：底层使用
[@kuankuan/k-markdown-parser](https://github.com/kuankuan2007/k-markdown-parser) 将 Markdown 解析为 AST，
再按节点类型进行渲染，并内置 KaTeX（LaTeX）与 highlight.js（代码高亮）。

## 特性

- Vue 3 + TypeScript
- 使用 `@kuankuan/k-markdown-parser` 进行快速解析
- KaTeX 渲染 LaTeX（按需开启）
- highlight.js 代码高亮
- XML 默认安全策略（默认：`warn`）
- 支持按节点类型自定义渲染组件

# k-markdown-parser 官方文档

|[![npm version](https://img.shields.io/npm/v/@kuankuan/k-markdown-parser)](https://www.npmjs.com/package/@kuankuan/k-markdown-parser)|[![license](https://img.shields.io/badge/license-MulanPSL--2.0-blue)](./LICENSE)|[![Github](https://img.shields.io/badge/GitHub-black?logo=github)](https://github.com/kuankuan2007/k-markdown-parser)|
|:---:|:---:|:---:|

欢迎来到 **k-markdown-parser** 的官方文档！

`@kuankuan/k-markdown-parser` 是一个由宽宽独立开发与维护的轻量、快速的 Markdown 解析器。它将 Markdown 文本转换为结构化的抽象语法树（AST）。

## 特性与设计哲学

1. **绝对纯净的运行环境 (Zero dependencies)**：零外部依赖，纯 JavaScript/TypeScript 编写。不需要任何特定于 Node.js 或浏览器的内置包，可在任何环境中运行（Deno、Bun、QuickJS、浏览器等）。
2. **极小体积 (Lightweight)**：IIFE 打包版本仅约 28KB，非常适合前端富文本环境。
3. **极速解析 (Fast)**：解析性能媲美 Showdown。
4. **正则驱动的设计 (Regex-powered)**：核心级与行内语法分析全部由正则表达式完成，这带来了极大的灵活性与出色的性能。
5. **高度模块化扩展 (Fully extensible)**：无论是“解析规则 (Syntaxes)”、“输出节点层 (Node Types)”还是整个解析流水线全部是可配置的。
6. **多种模块支持 (Multiple module formats)**：通过 ESM, CJS 与 IIFE 格式分发。

继续阅读 [新手指南](guide/index) 以快速在你的页面上接入 parser。

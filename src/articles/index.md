# k-markdown-parser 官方文档

欢迎来到 **k-markdown-parser** 的官方文档！

`@kuankuan/k-markdown-parser` 是一个由宽宽独立开发与维护的轻量、快速的 Markdown 解析器。它将 Markdown 文本转换为结构化的抽象语法树（AST）。

## 设计哲学

1. **绝对纯净的运行环境**：零外部依赖，纯 JavaScript/TypeScript 编写。不需要任何特定于 Node.js 或浏览器的内置包，可在 Deno、Bun、甚至嵌入式 QuickJS 环境中运行。
2. **极小体积**：IIFE 的打包版本仅约 28KB，非常适合前端富文本环境。
3. **正则驱动的设计**：所有的块级与行内语法分析全部由正则表达式完成，而不是传统的字符吃入/词法分析循环。解析过程通过多阶流水线管理碰撞状态。
4. **高度模块化扩展**：无论是“解析规则 (Syntaxes)”、“流水线组名 (Groups)”还是“输出节点层 (NodeMap)”全部是可配置且可覆盖的。

继续阅读 [新手指南](guide/index) 以快速在你的页面上接入 parser。

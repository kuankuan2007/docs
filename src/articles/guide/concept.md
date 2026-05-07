# 原理解析与系统概念

掌握 `k-markdown-parser` 最关键的一点是明确它的三个生命周期：**文本防干涉转义** -> **正则流分词匹配** -> **递归解析与 AST 拼装**。

## 1. 文本防干涉转义 (Markdown2Inner)

很多 Parser 对于处理转义符如 `\*` 或者转义嵌套环境（如代码块内部包裹符号）非常头疼。`k-markdown-parser` 的解决方案十分彻底：在真正解析运行前，对原文执行一轮“文本抹平”。

通过调用内部方法：

```typescript
const innerString = parser.markdown2Inner(text);
```

解析器会将所有特殊标点字符（例如 `#`, `_`, `~`, `\\` 等）转换为形如 `¨SL`、`¨WE`、`¨AS`（通过 `replacerTagStart` + Key 组合）的内部安全占位符。这避免了正则表达式编写时去处理各种令人作呕的回溯和转义判定。

## 2. 流水线阶段匹配

所有的解析规则组装为名为 `syntaxes` 的流水线：

- **Block 处理**：首先提取所有不可嵌套的块元素（如 `code-block`, `latex-block`）。
- **段落与空行分割**：通过匹配两个以上的换行符切分为独立段落。
- **特定容器结构**：提取表格（Table）、列表（List）、引用块（Quote）。
- **Inline 处理**：在每个元素的文字载体中处理加粗、链接、图片、行内代码等。

## 3. Abstract Syntax Tree (AST) 定制

所有在匹配命中的结构都被包装为 `KMarkdownNode<T>`。  
当调用 `const root = parser.parse(md)` 时，系统从根递归遍历生成的节点，最终交给消费端。用户完全可以自己编写自己的树渲染逻辑（例如用 Vue/React JSX 遍历这个 `rootNode` 并在你的框架里进行组件关联）。

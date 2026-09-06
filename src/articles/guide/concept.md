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

> **💡 实践案例：本站点是由该库驱动的！**
>
> 你当前所阅读的这个文档和网站，底层就是用本库自身来实现的！这个文档由 `k-markdown-parser` 和 `@kuankuan/k-markdown-vue` 共同提供支持：
>
> - `k-markdown-parser`：负责将 Markdown 内容深度解析为抽象语法树（AST）。
> - `@kuankuan/k-markdown-vue`：负责将语法树渲染到页面上展示。
>
> 如果你在使用 Vue 框架，可以参考或直接使用该渲染库：[k-markdown-vue](https://k-markdown-vue.doc.kuankuan.site/)

## 4. API 参考

`KMarkdownParser` 的实例对象除了 `.parse(text)` 之外，还暴露了以下常用方法：

- **`.parse(text: string): KMarkdownRootNode`**
  解析 Markdown 字符串并返回语法树的根节点。
- **`.markdown2Inner(text: string): string`**
  将原始 Markdown 文本转换为内部的防止干涉转义表示形式，这通常用于底层逻辑的定制。
- **`.inner2Markdown(text: string): string`**
  将包含内部占位符的文本恢复为正常的 Markdown。如果你要在节点中还原转义文字，这是必不可少的方法。
- **`.inner2Plant(text: string): string`**
  将内部表示形式转换为纯文本（剥离转义符号和占位符）。用于提取没有任何多余标点的清洗后文本内容。

## 5. 配置项 (Options)

在实例化解析器时，可以传入配置项 `new KMarkdownParser(options?)`。主要包括：

```typescript
type Option = Readonly<{
  syntaxes?: SyntaxesGroup[];
  replacerTagStart?: string;
  replacerTagMap?: {
    [key: symbol]: string;
    '\\\\': string;
    [key: string]: string;
  };
  nodeMap?: {
    [key: string]: typeof KMarkdownNode;
  };
  autoParseLink?: boolean;
}>;
```

- **`.syntaxes`**: 定义解析流水线（传递命名的语法集合），这是改变解析顺序和组合核心能力的开关。
- **`.replacerTagStart`**: 替换标记符号的定义，默认即可良好运作。若要变更占位符则可以通过此配置传递覆盖。
- **`.nodeMap`**: AST 节点的替换字典。若你需要替换内置的输出节点以便存储你的私有数据，请传递配置覆写。
- **`.autoParseLink`**: 默认开启，是否要识别并在普通文本中自动抓取裸 URL 转换成 Link 节点。

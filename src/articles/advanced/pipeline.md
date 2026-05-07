# 解析流水线 (Pipeline)

了解 `SyntaxesGroup` 的工作方式决定了你是否能够开发完美的第三方插件或解析规则。

## 默认架构

解析流水线以组（Group）的数组表示。

`quote` 语法单独成组，是为了让引用块内部内容也能从 `pre-paragraph`（分段处理）开始完整走一遍后续解析流水线；如果把 `quote` 放在 `paragraph` 组内，默认递归解析会从 `paragraph` 开始，从而跳过 `pre-paragraph`。

默认解析流水线如下：

| 语法组 | 包含语法 | 子内容解析起始组 |
| --- | --- | --- |
| `block` | 代码块、LaTeX 块 | （不解析） |
| `post-block` | `#` 标题、`---` 标题、分割线 | `inline` |
| `quote` | 引用块 | （默认） |
| `pre-paragraph` | 分段处理 | （默认） |
| `paragraph` | 表格、任务列表、无序列表、有序列表、段落 | （默认） |
| `post-paragraph` | 段落 | （默认） |
| `inline` | 行内代码、行内 LaTeX、粗体/斜体、删除线、上下标、图片、链接、邮箱、Emoji、XML | （默认） |

默认由以下七个阶段顺次构成：

1. **`block`**:
   包括 `code-block`、`latex-block`。这个组设置了 `next: null`。意味着命中它们的结构内部**不会**继续调用后续的任何匹配器（你肯定不希望在代码块里的 `**var**` 被意外加粗）。
2. **`post-block`**:
   包括 `title`（六级井号及下划线标题）、`line-between`（水平分割线）。设定为 `next: 'inline'`。意味着标题里面的文字只做行内分析。
3. **`quote`**:
   引用块语法。该组通常不设置 `next`，因此其子内容会从紧随其后的 `pre-paragraph` 开始递归解析。
4. **`pre-paragraph`**:
   负责将 Markdown 做分段（`segmentation`）判定。
5. **`paragraph`**:
   包括 `table`, `task-list`, `unordered-list`, `ordered-list`, 以及兜底的常规 `paragraph`。这一层将解析递归进入所有含有嵌套文本子元素的容器中。
6. **`post-paragraph`**:
   为了防止分段冲突进行的后置回扫。
7. **`inline`**:
   提取所有内联样式：`code-inline`, `latex-inline`, `bold`, `italic`, `line-through`, `sub`, `sup`, `image`, `link`, `email`, `emoji`, `xml`（HTML 标签提取）等...

## 数据结构

```typescript
export type SyntaxesGroup = {
  name: string;
  syntaxes: KMarkdownSyntax[];
  // 指定此阶段命中后产生的子内容，交由哪个组开始递归解析
  // undefined: 继续从紧随当前组背后的下一个组继续
  // string: 跳跃到指定组
  // null: 不解析子代
  next?: string | undefined | null | (string | null)[];
};
```

当需要自定义流水线时，你只需要覆写这个大数组。

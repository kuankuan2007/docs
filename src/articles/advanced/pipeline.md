# 解析流水线 (Pipeline)

了解 `SyntaxesGroup` 的工作方式决定了你是否能够开发完美的第三方插件或解析规则。

## 默认架构

解析流水线以组（Group）的数组表示。默认由以下六个阶段顺次构成：

1. **`block`**:
   包括 `code-block`、`latex-block`。这个组设置了 `next: null`。意味着命中它们的结构内部**不会**继续调用后续的任何匹配器（你肯定不希望在代码块里的 `**var**` 被意外加粗）。
2. **`post-block`**:
   包括 `title`（六级井号及下划线标题）、`line-between`（水平分割线）。设定为 `next: 'inline'`。意味着标题里面的文字只做行内分析。
3. **`pre-paragraph`**:
   负责将 Markdown 做分段（`segmentation`）判定。
4. **`paragraph`**:
   包括 `quote`, `table`, `task-list`, `unordered-list`, `ordered-list`, 以及兜底的常规 `paragraph`。这一层将解析递归进入所有含有嵌套文本子元素的容器中。
5. **`post-paragraph`**:
   为了防止分段冲突进行的后置回扫。
6. **`inline`**:
   提取所有内联样式：`code-inline`, `latex-inline`, `bold`, `italic`, `image`, `link`, `emoji`, `xml`（HTML 标签提取）等...

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

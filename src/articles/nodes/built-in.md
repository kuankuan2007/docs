# 内置默认节点映射组件列表

默认组件映射定义在当前仓库源码的 `src/nodesEle/default.ts`。当前文档只列出默认映射中明确存在的节点 id：

## 基础结构

- `title`
- `paragraph`
- `line-between`
- `quote-block`
- `image`

## 行内修饰

- `bold`
- `italic`
- `delete-line`
- `subscript`
- `superscript`
- `code-inline`
- `link`
- `email`

## 列表与表格

- `unordered-list`
- `unordered-list-item`
- `ordered-list`
- `ordered-list-item`
- `table`
- `table-row`

## 扩展节点

- `code-block`
- `latex-inline`
- `latex-block`
- `xml`

## 特殊回退键

- `defaultSymbol`：未知节点时使用的兜底组件。
- `stringSymbol`：纯字符串片段使用的组件。

这份列表与当前 `defaultComponents` 对象保持一致；如果未来新增节点类型，应同时更新这里的说明。

# 节点渲染机制总览

`@kuankuan/k-markdown-vue` 的核心扩展点是“按节点类型选择 Vue 组件”。

渲染流程大致如下：

1. `@kuankuan/k-markdown-parser` 生成 AST。
2. `KMdNode.vue` 根据 `node.id` 查找组件。
3. 若用户在 `options.components` 中提供了覆盖项，则优先使用覆盖组件。
4. 若未覆盖，则使用内置节点组件；仍未命中时回退到 `defaultSymbol`。

继续阅读：

- [内置节点组件列表](built-in)
- [如何编写自定义节点组件](custom)
- [当前文档站的自定义节点用例](project-example)

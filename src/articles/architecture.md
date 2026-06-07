# 架构设计

`@kuankuan/k-markdown-vue` 采用“解析”和“渲染”分离的结构：Markdown 文本先交给 `@kuankuan/k-markdown-parser` 生成 AST，再由 Vue 组件逐层渲染。

## 当前实现中的主链路

### 1. `KMarkdownVue.vue`

入口组件接收两个 props：

- `value: string`
- `options?: KMarkdownVueOptions`

它在内部会把解析结果交给后续渲染链路，再由子组件完成节点分发。

### 2. `KMdNode.vue`

这是渲染调度的核心组件。它负责：

- 根据节点类型选择合适的渲染组件。
- 支持用户通过 `options.components` 覆盖默认节点组件。
- 对未知节点和纯字符串分别提供回退处理。

### 3. `KMdContent.vue`

`KMdContent.vue` 负责承接一组子内容并继续渲染，不承担 Markdown 解析职责。

## 内置组件与支持层

### `src/nodesEle/`

这里存放默认节点组件，例如：

- `KMdEleTitle.vue`
- `KMdEleParagraph.vue`
- `KMdEleCodeBlock.vue`
- `KMdEleLink.vue`

### `src/supports/`

这里存放特殊能力的实现支撑：

- `KMdSupportLatex.vue`：使用 KaTeX 渲染 LaTeX。
- `KMdSupportXml.vue`：处理 XML 节点的显示、告警或自定义渲染。
- `supports/highlight/*`：处理代码高亮接口与默认高亮器。

## 一个重要设计点

当前自定义节点组件应尽量保持“只处理自己负责的节点”，其余内容交由库的默认渲染链路继续完成。

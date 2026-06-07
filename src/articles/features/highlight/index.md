# 代码高亮策略与默认实现

代码块节点由 `nodesEle/KMdEleCodeBlock.vue` 负责，它会继续调用 `supports/highlight/KMdSupportHighlight.vue` 决定是否启用高亮。

## `options.highlight`

当前类型为：

```ts
type HighlightOptions = boolean | HighlightInterface;
```

对应行为：

- `false`：关闭代码高亮。
- `true`：使用默认高亮器。
- `HighlightInterface` 实例：使用自定义高亮器。

## 默认高亮器的实现

默认高亮器位于 `supports/highlight/defaultHighlighter.ts`，行为如下：

1. 仅在真正需要时才动态加载 `highlight.js`。
2. 加载结果会在模块级缓存，避免重复导入。
3. 提供的默认实现是 `HighlightByHljs`。
4. 若未指定语言，或指定语言不受支持，则回退到 `highlightAuto()`。

## 依赖要求

`highlight.js` 是当前包的可选 peer dependency：

- 使用默认高亮器时，需要用户自行安装 `highlight.js`。
- 使用自定义高亮器时，可以完全不安装 `highlight.js`。

## 主题样式

默认高亮器只负责生成 HTML，不会替你注入主题 CSS。因此项目中仍需自行引入一个 `highlight.js` 主题，例如：

```ts
import 'highlight.js/styles/monokai-sublime.css';
```

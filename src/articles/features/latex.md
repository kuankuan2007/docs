# LaTeX 数学公式

LaTeX 节点由 `KMdEleLatexBlock.vue` / `KMdEleLatexInline.vue` 负责调度，底层实际渲染由 `supports/KMdSupportLatex.vue` 完成。

## `options.latex`

当前源码中的真实类型为：

```ts
type LatexOptions = 'ignore' | 'warn' | 'show' | KatexOptions;
```

各取值含义如下：

- `'ignore'`：忽略 LaTeX 节点，不渲染任何内容。
- `'warn'`：显示 `<LaTeX is not allowed>`。
- `'show'`：启用 KaTeX，并使用默认 `{ throwOnError: false }`。
- `KatexOptions`：启用 KaTeX，并将传入对象作为渲染配置。

## 默认行为

当前库的默认值是：

```ts
latex: 'warn'
```

这意味着如果你不显式开启 LaTeX，公式节点会显示告警文本，而不是直接渲染公式。

## 样式要求

通常只需要引入：

```ts
import '@kuankuan/k-markdown-vue/dist/index.css';
```

该样式已包含 KaTeX 所需 CSS，无需再额外引入 `katex/dist/katex.css`。

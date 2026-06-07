# API

## 组件

默认导出：`KMarkdownVue`。

Props：

- `value: string` — Markdown 源文本
- `options?: KMarkdownVueOptions` — 渲染/解析选项

## KMarkdownVueOptions

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `parserOptions` | `@kuankuan/k-markdown-parser` 的 `Option` | `undefined` | 直接传给 `new KMarkdownParser(parserOptions)` |
| `latex` | `'ignore' \| 'warn' \| 'show' \| KatexOptions` | `undefined` | `show` 启用 KaTeX；`undefined` 表示不渲染 LaTeX 节点 |
| `xml` | `'ignore' \| 'warn' \| 'show' \| (node) => VNode \| void` | `'warn'` | `show` 直接渲染 XML / HTML 节点 |
| `components` | `Record<string \| symbol, Component>` | 内置默认值 | 按节点 id 覆盖渲染组件 |

仅类型/符号导入（当你安装的包中包含 `src/` 时可用）：

```ts
import type { KMarkdownVueOptions } from '@kuankuan/k-markdown-vue/src/options';
import { defaultSymbol, stringSymbol } from '@kuankuan/k-markdown-vue/src/symbols';
```

补充说明：

- **`latex`**
  - `'show'` 使用 KaTeX 渲染，默认 `{ throwOnError: false }`。
  - `KatexOptions` 可自定义 KaTeX 选项（会合并）。
  - `'warn'` 会显示 `"<LaTeX is not allowed>"`。
  - `'ignore'`（以及 `undefined`）会让 LaTeX 节点渲染为空。

- **`xml`**
  - `'warn'` 显示 `"<XML is not allowed>"`。
  - `'show'` 会直接渲染 XML / HTML 节点。
  - `function` 会收到节点对象，可返回一个 `VNode`（也可以不返回）。

安全提示：如果 Markdown 内容不可信，请避免使用 `xml: 'show'`。

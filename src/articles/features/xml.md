# XML 安全渲染策略

Markdown 中的 XML / HTML 片段会被解析为 `xml` 节点。是否真正渲染这些节点，由 `options.xml` 决定。

## `options.xml`

当前源码中的真实类型为：

```ts
type XMLOptions = 'ignore' | 'warn' | 'show' | ((node: KMarkdownXMLNode) => VNode | void);
```

各取值行为如下：

| 取值 | 行为 |
| --- | --- |
| `'ignore'` | 不渲染 XML 节点。 |
| `'warn'` | 显示 `<XML is not allowed>`。 |
| `'show'` | 直接渲染 XML / HTML 节点。 |
| `function` | 将节点对象交给自定义函数，由调用方决定返回什么 VNode。 |

## 默认行为

默认值为：

```ts
xml: 'warn'
```

这是面向非完全可信 Markdown 输入的更稳妥选择。

## 风险提示

`'show'` 会将原始节点名和属性直接交给 Vue 运行时处理，只应在 Markdown 内容完全可信时使用。对外部用户输入或社区内容，不建议开启该模式。


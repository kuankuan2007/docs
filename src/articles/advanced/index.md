# 进阶深度定制概览

`k-markdown-parser` 提供强大的配置接口，允许你从解析的每一个毛孔中去修改库的行为。

## 初始化参数配置项

```typescript
type Option = Readonly<{
  // 定义全套解析流水线
  syntaxes?: Readonly<SyntaxesGroup[]>;

  // 定制内部占位符标志（默认是 '¨'）
  replacerTagStart?: string;

  // 定制内部不同符号的占位替换表
  replacerTagMap?: Readonly<{
    [key: symbol]: string;
    '\\': string;
    [key: string]: string;
  }>;

  // 定制 AST 节点生产表，覆盖默认节点的行为
  nodeMap?: Readonly<{
    [key: string]: typeof KMarkdownNode<Record<string, any>>;
  }>;

  // 是否自动识别由于没有嵌套在 []() 里但直接显式的 URL 为 link
  autoParseLink?: boolean;
}>;

const parser = new KMarkdownParser(options);
```

你只需要根据需要传递选项即可，缺少的选项会由 `createFullOptions` 通过合并默认值的方式自动补全。深入这方面的定制，你可以学习后续文章中关于 Pipeline 与 Syntaxes 的高级用法。

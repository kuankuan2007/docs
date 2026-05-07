# 自定义语法与正则匹配

开发和挂载针对 Markdown 的自定义拓展（如增加高亮标记 `==text==`，特定标签，指令等）。你需要了解 `KMarkdownSyntax` 接口。

## `KMarkdownSyntax` 接口定义

```typescript
export interface KMarkdownSyntax {
  // 语法唯一标识
  name: string;

  // 匹配器执行函数
  matcher: (
    text: string, // 转义完毕后待处理的目标字串
    option: FullOption, // Config 配置上下文
    parentNode: KMarkdownNode<Record<string, any>> // 正在工作的当前 AST 挂载点
  ) => KMarkdownSyntaxMatchResult[];
}
```

## `matcher` 的返回值

你需要在 `matcher` 函数内部返回一个数组 `KMarkdownSyntaxMatchResult[]`：

```typescript
export type KMarkdownSyntaxMatchResult = {
  // 你的正则成功捕获在原文中的起始截断 Index
  startIndex: number;

  // 被吃掉的字符总跨度（以便流水线引擎将他们切割并替换）
  length: number;

  // 返回描述你要生产 AST 子节点的数据（如果不存在则不切分子节点）
  node?: KMarkdownNodeCreateOptions;
};
```

## 运行机制

因为使用了 Regex 正则多段式驱动：  
在同一个组 `Group` 下执行的所有 `syntax.matcher()` 命中冲突时，解析器通过一个内部比较碰撞算法（Sort并优先最长匹配），来解决谁优先独占字符范围权。这意味着你可以通过编写相对容易看懂的正则是去吃入文本，剩下的边界冲突化解交给 `k-markdown-parser` 引擎。

export declare type ArticleOptions = {
  article: string;
  title: string;
  subArticles?: Record<string, ArticleOptions>;
};

const content: ArticleOptions = {
  article: 'index.md',
  title: '开端',
  subArticles: {
    guide: {
      article: 'guide/index.md',
      title: '新手指南',
      subArticles: {
        concept: {
          article: 'guide/concept.md',
          title: '原理解析与系统概念',
        },
      },
    },
    advanced: {
      article: 'advanced/index.md',
      title: '进阶深度定制',
      subArticles: {
        pipeline: {
          article: 'advanced/pipeline.md',
          title: '解析流水线 (Pipeline)',
        },
        syntaxes: {
          article: 'advanced/syntaxes.md',
          title: '自定义语法与正则匹配',
        },
        nodes: {
          article: 'advanced/nodes.md',
          title: 'AST 节点与扩展',
        },
      },
    },
  },
};

export const notFound: ArticleOptions = {
  article: '404.md',
  title: 'Not Found',
};
export default content;

declare module 'react-markdown' {
  import * as React from 'react';
  type ReactMarkdownProps = {
    children?: React.ReactNode;
    remarkPlugins?: unknown[];
    rehypePlugins?: unknown[];
  } & Record<string, unknown>;
  const ReactMarkdown: React.ComponentType<ReactMarkdownProps>;
  export default ReactMarkdown;
}

declare module 'remark-gfm' {
  const remarkGfm: unknown;
  export default remarkGfm;
}

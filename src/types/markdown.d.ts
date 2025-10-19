declare module 'react-markdown' {
  import * as React from 'react';
  type ReactMarkdownProps = {
    children?: React.ReactNode;
    remarkPlugins?: unknown[];
    rehypePlugins?: unknown[];
    components?: Record<string, React.ComponentType<any>>;
  } & Record<string, unknown>;
  const ReactMarkdown: React.ComponentType<ReactMarkdownProps>;
  export default ReactMarkdown;
}

declare module 'remark-gfm' {
  const remarkGfm: unknown;
  export default remarkGfm;
}

declare module 'mermaid' {
  export type RenderResult = { svg: string; bindFunctions?: (element: Element) => void };
  export function initialize(config: Record<string, unknown>): void;
  export function render(id: string, code: string): Promise<RenderResult>;
}

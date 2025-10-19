import { useEffect, useMemo, useRef, useState, isValidElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';

function MermaidBlock({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef<string>(
    `mermaid-${Math.random().toString(36).slice(2)}`
  );

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'default' });
    const render = async () => {
      try {
        const id = idRef.current;
        const { svg } = await mermaid.render(
          id || `mermaid-${Date.now()}`,
          code
        );
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (e) {
        if (containerRef.current) {
          containerRef.current.innerText =
            'Mermaidの描画に失敗しました。記法をご確認ください。';
        }
      }
    };
    render();
  }, [code]);

  return <div ref={containerRef} className="overflow-auto" />;
}

function App() {
  const [markdown, setMarkdown] = useState<string>(
    '# ようこそ\n\n左のテキストエリアに **Markdown** を入力すると、右側にプレビューが表示されます。\n\n- 箇条書き\n- [リンク](https://example.com)\n\n```ts\nconst hello = "world";\n```'
  );

  const isEmpty = useMemo(() => markdown.trim().length === 0, [markdown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-5xl mx-auto px-2 md:px-0">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            markdown-preview
          </h1>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="markdown-input" className="sr-only">
                Markdownを入力
              </label>
              <textarea
                id="markdown-input"
                aria-label="Markdownを入力"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="# 見出し\n**太字** _斜体_ \n[リンク](https://example.com) などが使えます"
                className="min-h-[280px] md:min-h-[420px] w-full resize-vertical px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="min-h-[280px] md:min-h-[420px] border border-gray-200 rounded-lg p-4 overflow-auto bg-gray-50">
              {isEmpty ? (
                <div className="h-full w-full text-gray-500 flex items-center justify-center text-center px-4">
                  上にMarkdownを入力するとここにプレビューが表示されます
                </div>
              ) : (
                <article className="max-w-none text-gray-800">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({
                        inline,
                        className,
                        children,
                        ...props
                      }: {
                        inline?: boolean;
                        className?: string;
                        children?: React.ReactNode;
                      } & React.HTMLAttributes<HTMLElement>) {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeContent = String(children ?? '').replace(
                          /\n$/,
                          ''
                        );
                        if (!inline && match && match[1] === 'mermaid') {
                          return <MermaidBlock code={codeContent} />;
                        }
                        return (
                          <code
                            className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                      pre({ children }: { children?: React.ReactNode }) {
                        if (isValidElement(children)) {
                          const child: any = children;
                          const className: string | undefined =
                            child.props?.className;
                          const isMermaid =
                            typeof className === 'string' &&
                            className.includes('language-mermaid');
                          if (isMermaid) {
                            const codeContent = String(
                              child.props?.children ?? ''
                            ).replace(/\n$/, '');
                            return <MermaidBlock code={codeContent} />;
                          }
                        }
                        return (
                          <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-auto">
                            {children}
                          </pre>
                        );
                      },
                      a({
                        children,
                        href,
                      }: {
                        children?: React.ReactNode;
                        href?: string;
                      }) {
                        return (
                          <a
                            className="text-blue-600 underline"
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="markdown-preview"
                          >
                            {children}
                          </a>
                        );
                      },
                    }}
                  >
                    {markdown}
                  </ReactMarkdown>
                </article>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

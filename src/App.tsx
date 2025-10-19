import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
            📝 Markdownプレビュー
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  左側にMarkdownを入力するとここにプレビューが表示されます
                </div>
              ) : (
                <article className="prose max-w-none prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-7 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
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

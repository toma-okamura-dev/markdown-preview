import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('Markdownプレビューア App', () => {
  test('アプリタイトルが表示されている', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'markdown-preview' })
    ).toBeInTheDocument();
  });

  test('テキスト入力でMarkdownがプレビューに反映される', () => {
    render(<App />);

    const textarea = screen.getByRole('textbox', { name: 'Markdownを入力' });

    fireEvent.change(textarea, { target: { value: '# タイトル\n\n本文' } });

    // h1 が描画される
    expect(
      screen.getByRole('heading', { level: 1, name: 'タイトル' })
    ).toBeInTheDocument();
    // 本文テキストが描画される
    expect(screen.getByText('本文')).toBeInTheDocument();
  });

  test('GFM（チェックリスト）が描画される', () => {
    render(<App />);

    const textarea = screen.getByRole('textbox', { name: 'Markdownを入力' });
    fireEvent.change(textarea, {
      target: { value: '- [x] 完了\n- [ ] 未完了' },
    });

    // チェックボックスが2つ描画される
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(2);
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });
});

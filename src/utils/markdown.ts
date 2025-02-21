import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
// import 'highlight.js/styles/github.css'
// import 'highlight.js/styles/atom-one-dark.css'
// import 'highlight.js/styles/atom-one-light.css'
import 'highlight.js/styles/monokai-sublime.css' // 使用黑色主题样式
// 使用 highlight.js 的主题样式
// import { DOMPurify } from 'dompurify'

// 配置 markdown-it 使用 highlight.js 渲染代码块
const md = new MarkdownIt({
    highlight: (code: string, language: string) => {
        const validLanguage = hljs.getLanguage(language)
            ? language
            : 'plaintext'
        return hljs.highlight(code, { language: validLanguage }).value
    },
})

// 解析 Markdown 并过滤不安全内容
export const renderMarkdown = (markdown: string): string => {
    const rawHtml = md.render(markdown)
    return rawHtml
}

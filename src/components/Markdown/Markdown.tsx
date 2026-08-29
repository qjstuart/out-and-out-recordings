import ReactMarkdown from 'react-markdown'

import { cn } from '#/lib/utils'

export type MarkdownProps = {
  children: string
  className?: string
}

export default function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={cn('[&_p]:mb-4 [&_p:last-child]:mb-0', className)}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  )
}

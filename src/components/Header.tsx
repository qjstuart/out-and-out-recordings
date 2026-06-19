interface HeaderProps {
  title?: string
}

export default function Header({ title = 'Website Title' }: HeaderProps) {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
        <a href="/" className="text-xl font-semibold text-zinc-900">
          {title}
        </a>
      </div>
    </header>
  )
}

import { fluidFont } from '../lib/fluid-font'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center">
        <a
          href="/"
          className="font-arabic whitespace-nowrap font-black leading-none text-white"
          style={{ fontSize: fluidFont(20, 41) }}
        >
          Out And Out Recordings
        </a>
      </div>

      <nav aria-label="Main navigation">
        <ul className="flex items-center justify-between gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-zinc-300 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

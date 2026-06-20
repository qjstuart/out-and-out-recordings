import { Link } from '@tanstack/react-router'
import { fluidFont } from '../../lib/fluid-font'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Contact', to: '/contact' },
] as const

export default function Header() {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center">
        <Link
          to="/"
          className="font-arabic whitespace-nowrap font-black leading-none text-white"
          style={{ fontSize: fluidFont(20, 41) }}
        >
          Out And Out Recordings
        </Link>
      </div>

      <nav aria-label="Main navigation">
        <ul className="flex items-center justify-between gap-4">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="group flex items-center gap-1.5 text-zinc-300 transition-colors hover:text-white"
                activeOptions={{ exact: true }}
                activeProps={{ className: 'is-active' }}
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-white transition-colors group-[.is-active]:bg-blue-500"
                />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

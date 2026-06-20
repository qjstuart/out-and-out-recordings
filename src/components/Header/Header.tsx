import { Link } from '@tanstack/react-router'
import { routeThemes, themeClasses } from '#/constants/theme'
import { fluidFont } from '#/lib/fluid-font'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Contact', to: '/contact' },
] as const

export default function Header() {
  return (
    <header className="flex flex-col mb-4">
      <div className="flex items-center">
        <Link
          to="/"
          className="font-arabic whitespace-nowrap font-black leading-none"
          style={{ fontSize: fluidFont(20, 50) }}
        >
          Out And Out Recordings
        </Link>
      </div>

      <nav aria-label="Main navigation">
        <ul className="flex items-center justify-between gap-4">
          {navItems.map((item) => {
            const theme = themeClasses[routeThemes[item.to]]

            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group flex items-center gap-1 hover:text-neutral-300"
                  activeOptions={{ exact: true }}
                  activeProps={{ className: 'is-active' }}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full bg-white ${theme.activeDot}`}
                  />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

import React from 'react'
import { Link } from 'gatsby'
import { useColorScheme } from '@/components/ColorSchemeProvider'
import Logo from '@/icons/logo.svg'
import Moon from '@/icons/moon.svg'
import Sun from '@/icons/sun.svg'

export interface SidebarProps extends React.HTMLProps<HTMLDivElement> {
  avatar: string
}

const Sidebar = ({ avatar, className = '', ...props }: SidebarProps) => {
  const [colorScheme, setColorScheme] = useColorScheme()
  return (
    <aside
      className={`z-20 flex h-18 md:h-20 lg:h-auto lg:w-26 lg:flex-col justify-between bg-grey-darker-alt overflow-hidden lg:rounded-r-sidebar ${className}`}
      {...props}
    >
      <Link
        to="/"
        className="logo relative w-18 md:w-20 lg:w-full h-full lg:h-sidebar rounded-r-sidebar overflow-hidden"
      >
        <div className="logo-pattern absolute top-1/2 left-0 right-0 h-18 md:h-20 lg:h-sidebar rounded-l-sidebar" />
        <Logo
          title="To home page"
          className="logo-icon absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </Link>
      <div className="flex-grow flex justify-end lg:items-end">
        <button
          onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
          aria-label="Dark mode"
          aria-pressed={colorScheme === 'dark'}
          className={`grid place-items-center px-8 lg:py-8 lg:w-full ${
            colorScheme === 'light' ? 'text-purple-light' : 'text-grey-light-alt2'
          } hover:text-grey-lighter focus:outline-none focus-visible:text-grey-lighter transition-colors`}
        >
          {colorScheme === 'light' ? <Moon /> : <Sun />}
        </button>
      </div>
      <div className="grid place-items-center px-8 py-6 border-l lg:border-0 lg:border-t border-grey-alt">
        <img src={avatar} alt="Avatar" width={40} height={40} className="rounded-full" />
      </div>
    </aside>
  )
}

export default Sidebar

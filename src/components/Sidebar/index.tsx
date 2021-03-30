import React from 'react'
import { Link } from 'gatsby'
import { useColorScheme } from '@/components/ColorSchemeProvider'
import { BsBoxArrowInRight } from 'react-icons/bs'
import Logo from '@/icons/logo.svg'
import Moon from '@/icons/moon.svg'
import Sun from '@/icons/sun.svg'

export interface SidebarProps extends React.HTMLProps<HTMLDivElement> {
  avatar: string
  onAvatarClick: () => void
  isLoggedIn?: boolean
}

const Sidebar = ({ avatar, onAvatarClick, isLoggedIn = false, className = '', ...props }: SidebarProps) => {
  const [colorScheme, setColorScheme] = useColorScheme()

  return (
    <aside
      className={`z-20 flex h-18 md:h-20 lg:h-auto lg:w-26 lg:flex-col justify-between bg-grey overflow-hidden lg:rounded-r-sidebar ${className}`}
      {...props}
    >
      <Link to="/" className="logo relative w-18 md:w-20 lg:w-full h-full lg:h-26 rounded-r-sidebar overflow-hidden">
        <div className="logo-pattern absolute top-1/2 left-0 right-0 h-18 md:h-20 lg:h-26 rounded-l-sidebar" />
        <Logo
          title="To home page"
          className="logo-icon absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 md:w-8 lg:w-10"
        />
      </Link>
      <div className="flex-grow flex justify-end lg:items-end">
        <button
          type="button"
          onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
          aria-label="Dark mode"
          aria-pressed={colorScheme === 'dark'}
          className={`grid place-items-center px-8 lg:py-8 lg:w-full text-purple-light hover:text-grey-lighter focus:outline-none focus-visible:text-grey-lighter transition-colors`}
        >
          {colorScheme === 'light' ? <Moon /> : <Sun />}
        </button>
      </div>
      <button
        type="button"
        className="group grid place-items-center px-8 py-6 border-l lg:border-0 lg:border-t border-purple-light focus:outline-none"
        onClick={onAvatarClick}
      >
        {isLoggedIn ? (
          <img
            src={avatar}
            alt="Log out"
            width={40}
            height={40}
            className="rounded-full w-8 h-8 lg:w-10 lg:h-10 group-hover:shadow-focus group-focus:shadow-focus"
          />
        ) : (
          <span className="grid place-items-center rounded-full w-8 h-8 lg:w-10 lg:h-10 bg-purple-dark text-white text-h4 group-hover:bg-purple group-focus:bg-purple transition-colors">
            <BsBoxArrowInRight title="Log in" />
          </span>
        )}
      </button>
    </aside>
  )
}

export default Sidebar

import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { useColorScheme } from '@/components/ColorSchemeProvider'
import Logo from '@/icons/logo.svg'
import Moon from '@/icons/moon.svg'
import Sun from '@/icons/sun.svg'

// TODO Fix image inside Storybook

const Sidebar = ({ className = '', ...props }: React.HTMLProps<HTMLDivElement>) => {
  const [colorScheme, setColorScheme] = useColorScheme()
  return (
    <aside
      className={`flex h-20 lg:h-auto lg:w-logo lg:flex-col justify-between bg-grey-darker-alt overflow-hidden lg:rounded-r-sidebar ${className}`}
      {...props}
    >
      <Link
        to="/"
        className="relative w-20 lg:w-full h-full lg:h-logo bg-purple-dark overflow-hidden rounded-r-sidebar"
      >
        <div className="absolute top-1/2 left-0 right-0 h-20 lg:h-logo bg-purple rounded-l-sidebar" />
        <Logo title="To home page" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </Link>
      <div className="flex-grow flex justify-end lg:items-end">
        <button
          onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
          aria-label="Dark mode"
          aria-pressed={colorScheme === 'dark'}
          className="grid place-items-center px-8 lg:py-8 lg:w-full"
        >
          {colorScheme === 'light' ? <Moon /> : <Sun />}
        </button>
      </div>
      <div className="grid place-items-center px-8 py-6 border-l lg:border-0 lg:border-t border-grey-alt">
        <StaticImage src="../../images/avatar.jpg" alt="Avatar" width={40} height={40} className="rounded-full" />
      </div>
    </aside>
  )
}

export default Sidebar

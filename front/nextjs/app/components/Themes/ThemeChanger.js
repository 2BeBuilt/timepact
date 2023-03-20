'use client'

import Header from '../Header'

import { useTheme } from 'next-themes'

import NoSsr from '../NoSsr'

export default function ThemeChanger({ children }) {
  const { theme, setTheme } = useTheme()
  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <NoSsr>
        <Header handleClick={handleClick} />
      </NoSsr>
      <main className="h-screen w-screen flex-1">{children}</main>
    </>
  )
}

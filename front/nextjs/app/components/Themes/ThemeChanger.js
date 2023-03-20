'use client'

import Header from '../Header'
import NoSsr from '../NoSsr'

import { useTheme } from 'next-themes'

export default function ThemeChanger({ children }) {
  const { resolvedTheme, setTheme } = useTheme()
  const handleClick = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <NoSsr>
        <Header resolvedTheme={resolvedTheme} handleClick={handleClick} />
      </NoSsr>
      <main className="h-screen w-screen flex-1">{children}</main>
    </>
  )
}

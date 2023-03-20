'use client'

import { Flowbite } from 'flowbite-react'
import { ThemeProvider } from 'next-themes'
import ThemeChanger from './ThemeChanger'

export default function Theme({ children }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Flowbite>
        <ThemeChanger>{children}</ThemeChanger>
      </Flowbite>
    </ThemeProvider>
  )
}

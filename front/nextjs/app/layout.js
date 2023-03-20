import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import Theme from './components/Themes/Theme'

export const metadata = {
  title: 'TimePact',
  description: 'Encrypt and save your data for the future',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  )
}

'use client'

import { getTheme } from '/utils/theme'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

import { Navbar, Button } from 'flowbite-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import Web3Providers from './Web3Providers'
import Logo from './Images/Logo'

export default function Header({ handleClick }) {
  const theme = getTheme()
  return (
    <Web3Providers>
      <Navbar fluid={false} rounded={true}>
        <Navbar.Brand href="/">
          <Logo />
          <span className="ml-2 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            TimePact
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <ConnectButton />
          <Button
            color={theme === 'dark' ? 'dark' : 'light'}
            pill={true}
            className="ml-2 m-a"
            onClick={handleClick}
          >
            {theme === 'dark' ? (
              <MoonIcon className="h-4 w-4" />
            ) : (
              <SunIcon className="h-4 w-4" />
            )}
          </Button>
          <Navbar.Toggle />
        </div>
      </Navbar>
    </Web3Providers>
  )
}

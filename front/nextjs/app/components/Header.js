'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

import { Navbar, Button } from 'flowbite-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Web3Providers from './Web3Providers'
import Logo from './Images/Logo'

export default function Header({ resolvedTheme, handleClick }) {
  const { isConnected } = useAccount()
  return (
    <Web3Providers resolvedTheme={resolvedTheme}>
      <Navbar fluid={false} rounded={true}>
        <Navbar.Brand href="/">
          <Logo />
          <span className="ml-2 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            TimePact
          </span>
        </Navbar.Brand>
        {isConnected && (
          <Navbar.Collapse>
            <Navbar.Link href="/pacts">Pacts</Navbar.Link>
          </Navbar.Collapse>
        )}
        <div className="flex md:order-2">
          <ConnectButton />
          <Button
            color={resolvedTheme === 'dark' ? 'dark' : 'light'}
            pill={true}
            className="ml-2 m-a"
            onClick={handleClick}
          >
            {resolvedTheme === 'dark' ? (
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

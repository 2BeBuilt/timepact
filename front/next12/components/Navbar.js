import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Image,
  HStack,
  Heading,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import NextLink from 'next/link'
import { useAccount } from 'wagmi'

const Links = [
  { label: 'Sign Pact', href: '/sign' },
  { label: 'My Pacts', href: '/pacts' },
]

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isConnected } = useAccount()
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <NextLink href="/">
            <Flex direction="row" justify="center" alignItems="center">
              <Box>
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src="logo.png"
                  alt="logo"
                  m={2}
                />
              </Box>
              <Heading fontSize="xl">TimePact</Heading>
            </Flex>
          </NextLink>
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NextLink key={link.label} href={link.href}>
                  <Heading fontSize="x">{link.label}</Heading>
                </NextLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <ConnectButton />
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

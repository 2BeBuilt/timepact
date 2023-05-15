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
  Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import NextLink from 'next/link'

const Links = [
  { label: 'Vision', href: '/vision' },
  { label: 'Sign Pact', href: '/sign' },
  { label: 'My Pacts', href: '/pacts' },
]

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      w={'full'}
      position={'fixed'}
      p={2}
      top={-1}
      zIndex={10}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Flex direction="row" justify="center" alignItems="center">
          <HStack spacing={0} mr={8}>
            <NextLink href="/">
              <Box>
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src="logo.png"
                  alt="logo"
                  m={2}
                />
              </Box>
            </NextLink>
            <NextLink href="/">
              <Heading fontSize="2xl" fontWeight={'550'}>
                TimePact
              </Heading>
            </NextLink>
          </HStack>
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NextLink key={link.label} href={link.href}>
                <Heading fontSize="lg" fontWeight={'550'}>
                  {link.label}
                </Heading>
              </NextLink>
            ))}
          </HStack>
        </Flex>
        <Center>
          <Stack direction={'row'} spacing={2}>
            <ConnectButton
              chainStatus={{
                smallScreen: 'none',
                largeScreen: 'name',
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
            />
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Center>
      </Flex>
    </Box>
  )
}

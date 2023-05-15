import {
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Heading,
  Center,
} from '@chakra-ui/react'

import NextLink from 'next/link'

const Links = [
  { label: 'Vision', href: '/vision' },
  { label: 'Sign Pact', href: '/sign' },
  { label: 'My Pacts', href: '/pacts' },
]

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.300', 'gray.900')}
      w={'full'}
      p={8}
      position={'fixed'}
      bottom={-1}
      zIndex={10}
      display={{ base: 'flex', md: 'none' }}
    >
      <HStack
        userSelect="none"
        as={'nav'}
        spacing={8}
        align={'center'}
        justify={'center'}
      >
        {Links.map((link) => (
          <NextLink key={link.label} href={link.href}>
            <Heading fontSize="lg" fontWeight={'550'}>
              {link.label}
            </Heading>
          </NextLink>
        ))}
      </HStack>
    </Box>
  )
}

import { Center } from '@chakra-ui/react'

export default function Page({ children }) {
  return (
    <Center pt={20} pb={{ base: 20, md: 0 }}>
      {children}
    </Center>
  )
}

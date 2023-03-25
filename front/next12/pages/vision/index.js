import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Stack,
  Flex,
  VStack,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import Head from 'next/head'
import PageHead from '@/components/PageHead'

const features = Array.apply(null, Array(8)).map(function (x, i) {
  return {
    id: i,
    title: 'Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
  }
})

export default function Vision() {
  return (
    <main>
      <PageHead title="Vision" />
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <Heading fontSize={'3xl'}>Vision</Heading>
          <Container maxW={'6xl'} mt={10}>
            <Flex direction="column" justify="center" alignItems="center">
              <Image src="oracle.png" borderRadius="full" />
            </Flex>
          </Container>
          <Text color={'gray.600'} fontSize={'lg'}>
            One of the key benefits of TimePact is that it is a modular
            technology, anyone can spin up TimePact nodes and create a
            decentralized privacy layer on top of Filecoin EVM and IPFS. This
            will enable more people to take advantage of the powerful
            combination of blockchain technology to secure their data. Moreover,
            the modular design of TimePact makes it scalable and flexible,
            ensuring that it can adapt to the changing needs of its users. This
            means that as more people start using TimePact, the service can
            scale up to accommodate the growing demand for its services. By
            creating a decentralized privacy layer on top of Filecoin EVM and
            IPFS, TimePact is helping to establish a new standard for data
            security and protection in the blockchain space. As more people
            adopt this technology, we can expect to see a significant increase
            in the level of privacy and security in the digital world.
          </Text>
        </Stack>
      </Box>
    </main>
  )
}

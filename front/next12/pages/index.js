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

export default function Home() {
  return (
    <main>
      <PageHead title="TimePact" />
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <Heading fontSize={'3xl'}>Welcome to the TimePact</Heading>
          <Text color={'gray.600'} fontSize={'xl'}>
            This app was designed to help you preserve the most necessary data
            in the blockchain
          </Text>
        </Stack>

        <Container maxW={'6xl'} mt={10}>
          <SimpleGrid columns={3} spacing={10}>
            <Flex direction="column" justify="center" alignItems="center">
              <Text fontSize="xl" mb={2}>
                You choose yout data
              </Text>
              <Image src="main/data.png" />
            </Flex>
            <Flex direction="column" justify="center" alignItems="center">
              <Text fontSize="xl" mb={2}>
                You choose the date of exposure
              </Text>
              <Image src="main/date.png" />
            </Flex>
            <Flex direction="column" justify="center" alignItems="center">
              <Text fontSize="xl" mb={2}>
                We encrypt, we secure
              </Text>
              <Image src="main/crypto-key.png" />
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>
    </main>
  )
}

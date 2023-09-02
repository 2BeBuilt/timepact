import {
  Box,
  Container,
  Heading,
  Image,
  Text,
  Stack,
  Flex,
  Center,
} from '@chakra-ui/react'

import Page from '@/components/Common/Page'
import PageHead from '@/components/Common/PageHead'

const features = Array.apply(null, Array(8)).map(function (x, i) {
  return {
    id: i,
    title: 'Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
  }
})

export default function Home() {
  return (
    <Page>
      <PageHead title="TimePact" />
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={'4xl'} textAlign={'center'}>
          <Heading fontSize={'3xl'}>TimePact</Heading>
          <Text color={'gray.600'} fontSize={'xl'}>
            Introducing TimePact - a blockchain marvel that blends ancient magic
            and futuristic technology to lock and encrypt your data. Enter into
            an Immutable Pact with an ancient librarian, who safeguards your
            information with powerful magic encryption. Receive a unique NFT key
            that can unlock and retrieve your data from the formidable IPFS or
            Filecoin Storage Providers at a pre-determined time. The keys can
            travel through space and time and can even be traded for mystical
            cryptographic currency on other blockchains, like Scroll. Step into
            the future with TimePact, where magic meets technology.
          </Text>
        </Stack>
        <Container maxW={'6xl'} mt={10}>
          <Stack spacing={10} direction={{ md: 'row', base: 'column' }}>
            <Flex direction="column" justify="center" alignItems="center">
              <Text fontSize="xl" mb={2}>
                You choose your data
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
                We encrypt, we secure, we deliver
              </Text>
              <Image src="main/crypto-key.png" />
            </Flex>
          </Stack>
        </Container>
      </Box>
    </Page>
  )
}

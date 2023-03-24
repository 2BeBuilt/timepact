import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Lorem,
  ModalHeader,
  ModalCloseButton,
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import convertToGateway from '@/utils/ipfsStringConverter'
import useTokenUri from '@/hooks/useTokenUri'
import useTokenId from '@/hooks/useTokenId'
import axios from 'axios'
import useTokenInfo from '@/hooks/useTokenInfo'

export default function Pact({ address, index }) {
  const [tokenId] = useTokenId(address, index)
  const [image, setImage] = useState(null)
  const [uri] = useTokenUri(tokenId)
  const [info] = useTokenInfo(tokenId)
  const [clicked, setClicked] = useState(false)
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(uri)
        .then(function (response) {
          const image = response.data.image.replace(
            'ipfs://',
            'https://ipfs.io/ipfs/'
          )
          setImage(image)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {})
    }
    uri && fetchData()
  }, [uri])
  return (
    <>
      <Center py={12}>
        <Box
          onClick={() => setClicked((prev) => !prev)}
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${image})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}
          >
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={image}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text
              color={'gray.500'}
              fontSize={'sm'}
              textTransform={'uppercase'}
            >
              Pact #{tokenId}
            </Text>
          </Stack>
        </Box>
      </Center>
      <Modal isOpen={clicked} onClose={() => setClicked((prev) => !prev)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pact #{tokenId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              {clicked && info && info[0].toString()}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={800} fontSize={'xl'}>
                {clicked && info && info[2].toString()}
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setClicked((prev) => !prev)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

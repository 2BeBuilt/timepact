import {
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

export default function Pact({ index }) {
  const [tokenId] = useTokenId(index)
  const [image, setImage] = useState(null)
  const [uri] = useTokenUri(tokenId)
  const [info] = useTokenInfo(tokenId)

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
    <Center py={12}>
      <Box
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
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Pact #{tokenId}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {console.log(info)}
            {info && info[0].toString()}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              $57
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              $199
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}

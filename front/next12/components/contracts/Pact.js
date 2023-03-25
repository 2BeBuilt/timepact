import {
  Spinner,
  Box,
  Center,
  useColorModeValue,
  Text,
  Stack,
  Image,
  Flex,
} from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react'
import useTokenUri from '@/hooks/useTokenUri'
import useTokenId from '@/hooks/useTokenId'
import axios from 'axios'
import useTokenInfo from '@/hooks/useTokenInfo'
import Countdown from 'react-countdown'
import PactModal from '../Modals/PactModal'
import { zeroPad } from 'react-countdown'
import UnlockPact from './UnlockPact'

export default function Pact({ address, index }) {
  const [tokenId] = useTokenId(address, index)
  const [cid, setCid] = useState(null)
  const [image, setImage] = useState(null)
  const [stamp, setStamp] = useState(null)
  const [locked, setLocked] = useState(null)
  const [uri] = useTokenUri(tokenId)
  const [info] = useTokenInfo(tokenId)
  const [clicked, setClicked] = useState(false)
  const handleClose = () => {
    setClicked((prev) => !prev)
  }
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

  useEffect(() => {
    info && setStamp(Number(info[1]))
    info && setCid(info[2])
    info && setLocked(info[3])
  }, [info])

  const [timeNow, setTimeNow] = useState(null)
  useEffect(() => {
    const getTimeNow = () => {
      axios.get('/api/time/now').then((response) => {
        setTimeNow(Math.floor(response.data / 1000))
      })
    }

    getTimeNow()
  }, [clicked])

  useEffect(() => {}, [tokenId])

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <></>
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )
    }
  }
  return (
    <>
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
            {image ? (
              <Image
                onClick={() => setClicked((prev) => !prev)}
                rounded={'lg'}
                height={230}
                width={282}
                objectFit={'cover'}
                src={image}
              />
            ) : (
              <Flex direction="column" align="center" justify="center">
                <Spinner size="xl" />
              </Flex>
            )}
          </Box>
          <Stack pt={10} align={'center'}>
            <Text
              color={'gray.500'}
              fontSize={'sm'}
              textTransform={'uppercase'}
            >
              {tokenId === null || tokenId === NaN ? '...' : `Pact #${tokenId}`}
            </Text>
            {stamp && timeNow ? (
              <>
                <Text
                  color={'gray.500'}
                  fontSize={'m'}
                  textTransform={'uppercase'}
                >
                  {console.log(tokenId, ' stamp ', new Date(stamp))}
                  {console.log(tokenId, ' stamp ', stamp)}
                  {console.log(tokenId, ' unlocked? ', !locked)}
                  <Countdown
                    date={new Date(stamp)}
                    intervalDelay={0}
                    precision={3}
                    renderer={renderer}
                  ></Countdown>
                </Text>
                <UnlockPact tokenId={tokenId} isLocked={locked} cid={cid} />
              </>
            ) : (
              <Text
                color={'gray.500'}
                fontSize={'m'}
                textTransform={'uppercase'}
              >
                ...
              </Text>
            )}
          </Stack>
        </Box>
      </Center>
      <PactModal
        clicked={clicked}
        tokenId={tokenId}
        info={info}
        handleClose={handleClose}
      />
    </>
  )
}

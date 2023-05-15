import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractEvent,
} from 'wagmi'
import contractAbi from '@/utils/constants/abiTimePact.json'
import { Spinner, Flex, Tooltip, Image } from '@chakra-ui/react'
import { pact } from '@/utils/constants/addresses'
import axios from 'axios'

export default function FileToScroll({ tokenId }) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: pact,
    abi: contractAbi,
    functionName: 'bridgeToScroll',
    args: [tokenId],
  })

  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  })

  useContractEvent({
    address: pact,
    abi: contractAbi,
    eventName: 'BridgeToScroll',
    listener(creator, unlock, filecoin, recipient, uri, fetchedTokenId) {
      const fTokenId = Number(fetchedTokenId)
      if (fTokenId === tokenId) {
        axios
          .get(
            `/api/bridge/filecoinToScroll?creator=${creator}&unlock=${unlock}&filecoin=${filecoin}&recipient=${recipient}&uri=${uri}&tokenId=${tokenId}`
          )
          .then((response) => {
            window.location.reload(false)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  })

  return (
    <>
      <Tooltip
        label={isLoading ? 'Bridging...' : 'Bridge to scroll'}
        fontSize="md"
      >
        <Flex cursor="pointer" onClick={!isLoading ? write : () => {}}>
          {isLoading ? (
            <Spinner size="md" />
          ) : (
            <Image
              borderRadius="full"
              boxSize="30px"
              src="portal.png"
              alt="portal icon"
            />
          )}
        </Flex>
      </Tooltip>
    </>
  )
}

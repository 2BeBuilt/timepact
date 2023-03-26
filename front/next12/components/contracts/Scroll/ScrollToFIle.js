import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractEvent,
} from 'wagmi'
import contractAbi from '@/utils/constants/abiScrollBridge.json'
import { Spinner, Flex, Tooltip, Image } from '@chakra-ui/react'
import { scroll } from '@/utils/constants/addresses'
import axios from 'axios'

export default function ScrollToFile({ tokenId }) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: scroll,
    abi: contractAbi,
    functionName: 'bridgeToFilecoin',
    args: [tokenId],
  })

  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  })

  useContractEvent({
    address: scroll,
    abi: contractAbi,
    eventName: 'BridgeToFilecoin',
    listener(fetchedTokenId, recipient) {
      const fTokenId = Number(fetchedTokenId)
      if (fTokenId === tokenId) {
        axios
          .get(
            `/api/bridge/scrollToFilecoin?tokenId=${tokenId}&recipient=${recipient}`
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
        label={isLoading ? 'Bridging...' : 'Bridge to filecoin'}
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

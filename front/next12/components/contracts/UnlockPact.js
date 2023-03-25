import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractEvent,
} from 'wagmi'
import contractAbi from '@/utils/constants/abiTimePact.json'
import { Button, Flex, Heading, Input } from '@chakra-ui/react'
import { pact } from '@/utils/constants/addresses'
import useCheckUnlock from '@/hooks/useCheckUnlock'
import { useState } from 'react'

export default function UnlockPact({ tokenId }) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: pact,
    abi: contractAbi,
    functionName: 'unlock',
    args: [tokenId],
  })

  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  })

  const [cid, setCid] = useState(null)
  useContractEvent({
    address: pact,
    abi: contractAbi,
    eventName: 'Unlocked',
    listener(fetchedTokenId, owner, cid) {
      const fTokenId = Number(fetchedTokenId)
      if (fTokenId === tokenId) {
        setCid(cid)
      }
    },
  })

  const retrieve = () => {
    window.open(`/api/ipfs/retrieve?cid=${cid}`, '_blank')
  }

  const [unlock] = useCheckUnlock(tokenId)
  return (
    <>
      <Flex align="center" justify="center" marginTop={4}>
        {unlock && (
          <>
            {!isSuccess ? (
              <Button
                isLoading={isLoading}
                disabled={!write || isLoading}
                onClick={write}
                ml={2}
              >
                Unlock
              </Button>
            ) : (
              <Button onClick={retrieve}>Download</Button>
            )}
          </>
        )}
      </Flex>
    </>
  )
}

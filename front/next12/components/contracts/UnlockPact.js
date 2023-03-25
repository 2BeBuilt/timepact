import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractEvent,
} from 'wagmi'
import contractAbi from '@/utils/constants/abiTimePact.json'
import { Button, Flex } from '@chakra-ui/react'
import { pact } from '@/utils/constants/addresses'
import useCheckUnlock from '@/hooks/useCheckUnlock'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function UnlockPact({ timeOut, tokenId, isLocked, cid }) {
  const [locked, setLocked] = useState(isLocked)
  useEffect(() => {
    setLocked(isLocked)
  }, [isLocked])

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

  useContractEvent({
    address: pact,
    abi: contractAbi,
    eventName: 'Unlocked',
    listener(fetchedTokenId, owner, cid) {
      const fTokenId = Number(fetchedTokenId)
      if (fTokenId === tokenId) {
        setLocked(false)
      }
    },
  })

  const retrieve = () => {
    axios.get(`/api/cid/encrypt?cid=${cid}`).then((response) => {
      console.log(response)
      window.open(`/api/ipfs/retrieve?cid=${response.data}`, '_blank')
    })
  }

  const [canUnlock] = useCheckUnlock(tokenId)

  const [seed, setSeed] = useState(1)
  const reset = () => {
    setSeed(Math.random())
  }

  return (
    <>
      <Flex align="center" justify="center" marginTop={4}>
        {timeOut && !canUnlock ? (
          <Button onClick={reset}>Soon</Button>
        ) : (
          <>
            {!locked ? (
              <Button onClick={retrieve}>Download</Button>
            ) : (
              !isSuccess && (
                <Button
                  isLoading={isLoading}
                  disabled={!write || isLoading}
                  onClick={write}
                  ml={2}
                >
                  Unlock
                </Button>
              )
            )}
          </>
        )}
      </Flex>
    </>
  )
}

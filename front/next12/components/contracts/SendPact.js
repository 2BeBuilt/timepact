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

export default function SendPact({ from, tokenId }) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: pact,
    abi: contractAbi,
    functionName: 'transferFrom',
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

  return (
    <>
      <Button>Transfer</Button>
    </>
  )
}

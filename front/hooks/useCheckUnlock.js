import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'
import { pact } from '@/utils/constants/addresses'

import contractAbi from '@/utils/constants/abiTimePact.json'

function useCheckUnlock(tokenId, timeOver) {
  const [canUnlock, setUnlock] = useState(null)
  const { data, isSuccess } = useContractRead({
    address: pact,
    abi: contractAbi,
    functionName: 'checkUnlock',
    args: [tokenId],
  })

  useEffect(() => {
    setUnlock(data)
  }, [data, isSuccess])

  return [canUnlock]
}

export { useCheckUnlock }

import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'
import { pact } from '@/utils/constants/addresses'
import contractAbi from '@/utils/constants/abiTimePact.json'

export default function useCheckUnlock(tokenId) {
  const [unlock, setUnlock] = useState(null)
  const { data, isSuccess } = useContractRead({
    address: pact,
    abi: contractAbi,
    functionName: 'checkUnlock',
    args: [tokenId],
  })
  useEffect(() => {
    console.log(data)
    setUnlock(data)
  }, [data, isSuccess])

  return [unlock]
}

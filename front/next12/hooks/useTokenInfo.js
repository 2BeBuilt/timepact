import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'
import { pact } from '@/utils/constants/addresses'
import contractAbi from '@/utils/constants/abiTimePact.json'

export default function useTokenInfo(tokenId) {
  const [info, setInfo] = useState(null)
  const { data, isSuccess } = useContractRead({
    address: pact,
    abi: contractAbi,
    functionName: 'tokenInfo',
    args: [tokenId],
  })
  useEffect(() => {
    setInfo(data)
  }, [data, isSuccess])

  return [info]
}

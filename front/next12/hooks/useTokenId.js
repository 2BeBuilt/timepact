import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'
import { pact } from '@/utils/constants/addresses'
import contractAbi from '@/utils/constants/abiTimePact.json'

export default function useTokenId(index) {
  const [id, setId] = useState(null)
  const { data, isSuccess } = useContractRead({
    address: pact,
    abi: contractAbi,
    functionName: 'tokenByIndex',
    args: [index],
  })
  useEffect(() => {
    setId(Number(data))
  }, [data, isSuccess])

  return [id]
}

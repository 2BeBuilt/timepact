import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'
import { pact } from '@/utils/constants/addresses'
import contractAbi from '@/utils/constants/abiTimePact.json'

export default function useBalanceOf(address) {
  const [amount, setAmount] = useState(null)
  const { data, isSuccess } = useContractRead({
    address: pact,
    abi: contractAbi,
    functionName: 'balanceOf',
    args: [address],
  })
  useEffect(() => {
    setAmount(Number(data))
  }, [data, isSuccess])

  return [amount]
}

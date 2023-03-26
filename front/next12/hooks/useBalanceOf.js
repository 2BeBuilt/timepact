import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'

export default function useBalanceOf(address, contract, abi) {
  const [amount, setAmount] = useState(null)
  const { data, isSuccess } = useContractRead({
    address: contract,
    abi: abi,
    functionName: 'balanceOf',
    args: [address],
  })
  useEffect(() => {
    setAmount(Number(data))
  }, [data, isSuccess])

  return [amount]
}

import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'

export default function useTokenId(address, index, contract, abi) {
  const [id, setId] = useState(null)
  const { data, isSuccess } = useContractRead({
    address: contract,
    abi: abi,
    functionName: 'tokenOfOwnerByIndex',
    args: [address, index],
  })
  useEffect(() => {
    setId(Number(data))
  }, [data, isSuccess])

  return [id]
}

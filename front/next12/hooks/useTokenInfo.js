import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'

export default function useTokenInfo(tokenId, contract, abi) {
  const [info, setInfo] = useState(null)
  const { data, isSuccess } = useContractRead({
    address: contract,
    abi: abi,
    functionName: 'tokenInfo',
    args: [tokenId],
  })
  useEffect(() => {
    setInfo(data)
  }, [data, isSuccess])

  return [info]
}

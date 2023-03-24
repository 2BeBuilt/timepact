import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'
import { pact } from '@/utils/constants/addresses'
import { convertToGateway } from '@/utils/ipfsStringConverter'
import contractAbi from '@/utils/constants/abiTimePact.json'

export default function useTokenUri(tokenId) {
  const [uri, setURI] = useState(null)
  const { data, isSuccess } = useContractRead({
    address: pact,
    abi: contractAbi,
    functionName: 'tokenURI',
    args: [tokenId],
  })
  useEffect(() => {
    const refactor = () => {
      console.log(data)
      setURI(data.replace('ipfs://', 'https://ipfs.io/ipfs/'))
    }
    data && refactor()
  }, [data, isSuccess])

  return [uri]
}

import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'

function useTokenUri(tokenId, contract, abi) {
  const [uri, setURI] = useState(null)
  const { data, isSuccess } = useContractRead({
    address: contract,
    abi: abi,
    functionName: 'tokenURI',
    args: [tokenId],
  })
  useEffect(() => {
    const refactor = () => {
      setURI(data.replace('ipfs://', 'https://ipfs.io/ipfs/'))
    }
    data && refactor()
  }, [data, isSuccess])

  return [uri]
}

export { useTokenUri }

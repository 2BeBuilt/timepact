import { Image, Flex, Tooltip, Spinner } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { pact } from '@/utils/constants/addresses'
import contractAbi from '@/utils/constants/abiTimePact.json'
import CID from 'cids'

const filecoin_name = 'filecoin'
const filecoin_logo = 'providers/filecoin-logo.svg'

const ipfs_name = 'IPFS'
const ipfs_logo = 'providers/ipfs-logo.png'

export default function ScrollProvider({ isProposed }) {
  const [proposed, setProposed] = useState(isProposed)
  useEffect(() => {
    setProposed(isProposed)
  }, [isProposed])

  return (
    <>
      <Tooltip label={proposed ? filecoin_name : ipfs_name} fontSize="md">
        <Flex>
          <Image
            borderRadius="full"
            boxSize="30px"
            src={proposed ? filecoin_logo : ipfs_logo}
            alt={proposed ? filecoin_name : ipfs_name}
          />
        </Flex>
      </Tooltip>
    </>
  )
}

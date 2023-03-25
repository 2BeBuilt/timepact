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

export default function Provider({ cid, tokenId, isProposed }) {
  const [proposed, setProposed] = useState(isProposed)
  useEffect(() => {
    setProposed(isProposed)
  }, [isProposed])

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: pact,
    abi: contractAbi,
    functionName: 'pactFilecoin',
    args: [
      cid,
      tokenId,
      [
        '0x' +
          new CID('bafkreiffpbhkmbbctrd56fgq4q3rg2tpiqpcsazfmli3ub2qmba7mxht7e')
            .toString('base16')
            .substring(1),
        151642,
        false,
        'bafkreiffpbhkmbbctrd56fgq4q3rg2tpiqpcsazfmli3ub2qmba7mxht7e',
        189200,
        789000,
        10,
        0,
        1,
        1,
        [
          'https://ipfs.io/ipfs/QmetJ2J2PyjPpr48fa3bPPiFvF7beDEtFYs766q12EXJ2E?filename=test.car',
          149000,
          false,
          false,
        ],
      ],
    ],
  })
  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <>
      <Tooltip
        label={
          isLoading
            ? 'Proposing...'
            : proposed || isSuccess
            ? filecoin_name
            : ipfs_name
        }
        fontSize="md"
      >
        <Flex cursor="pointer" onClick={!proposed ? write : () => {}}>
          {isLoading ? (
            <Spinner size="md" />
          ) : (
            <Image
              borderRadius="full"
              boxSize="23px"
              src={proposed || isSuccess ? filecoin_logo : ipfs_logo}
              alt={proposed || isSuccess ? filecoin_name : ipfs_name}
            />
          )}
        </Flex>
      </Tooltip>
    </>
  )
}

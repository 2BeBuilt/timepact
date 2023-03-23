import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import contractAbi from '@/utils/constants/abiTimePact.json'
import CID from 'cids'
import DefaultAlert from '../Alerts/DefaultAlert'
import { Button } from '@chakra-ui/react'

export default function SignPact({ onSuccess }) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: '0xf611Ed48E4280E34B67841029Cfc548507E83424',
    abi: contractAbi,
    functionName: 'pact',
    args: [
      'QmetJ2J2PyjPpr48fa3bPPiFvF7beDEtFYs766q12EXJ2E',
      'canvi',
      1679598588,
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
  const { data, error, isError, write } = useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
  isSuccess && onSuccess()
  return (
    <>
      <Button
        isLoading={isLoading}
        disabled={!write || isLoading}
        onClick={write}
      >
        Sign Pact
      </Button>
    </>
  )
}

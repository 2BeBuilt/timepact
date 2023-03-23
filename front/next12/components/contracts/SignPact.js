import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import contractAbi from '@/utils/constants/abiTimePact.json'
import CID from 'cids'
import { Button, Flex } from '@chakra-ui/react'
import { pact } from '@/utils/constants/addresses'
import DefaultAlert from '../Alerts/DefaultAlert'
import AlertContainer from '../Alerts/AlertContainer'
/*
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
      ]
*/

export default function SignPact({ cid, address }) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: pact,
    abi: contractAbi,
    functionName: 'pact',
    args: [cid, address, 1679598588],
  })
  const { data, error, isError, write } = useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <>
      <AlertContainer>
        <DefaultAlert
          isOpen={isSuccess}
          status="success"
          title="Pact was signed"
          description={`https://hyperspace.filfox.info/en/tx/${data?.hash}`}
        />
      </AlertContainer>
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

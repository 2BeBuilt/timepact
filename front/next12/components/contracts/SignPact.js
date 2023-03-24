import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import contractAbi from '@/utils/constants/abiTimePact.json'
import { Button, Flex } from '@chakra-ui/react'
import { pact } from '@/utils/constants/addresses'
import FileUpload from '../FileUpload'
import AlertContainer from '../Alerts/AlertContainer'
import { Input } from '@chakra-ui/react'
import { useState } from 'react'
import LinkAlert from '../Alerts/LinkAlert'
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

export default function SignPact({ address }) {
  const [cid, setCid] = useState('')
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
  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  })
  return (
    <>
      <Flex align="center" justify="center" marginTop={4}>
        <FileUpload />
        <Input
          placeholder="Cid"
          width="400px"
          mr={2}
          ml={2}
          onChange={(e) => {
            setCid(e.target.value)
          }}
          value={cid}
        />
        <Button
          isLoading={isLoading}
          disabled={!write || isLoading}
          onClick={write}
        >
          Sign Pact
        </Button>
      </Flex>
      <AlertContainer>
        <LinkAlert
          isOpen={isSuccess}
          status="success"
          title="Pact was signed"
          url={`https://hyperspace.filfox.info/en/tx/${data?.hash}`}
        />
        <LinkAlert
          isOpen={isError}
          status="error"
          title="Error occured!"
          url={`https://hyperspace.filfox.info/en/tx/${data?.hash}`}
        />
      </AlertContainer>
    </>
  )
}

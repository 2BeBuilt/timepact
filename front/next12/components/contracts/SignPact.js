import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import contractAbi from '@/utils/constants/abiTimePact.json'
import { Button, Flex, Heading, Input } from '@chakra-ui/react'
import { pact } from '@/utils/constants/addresses'
import FileUpload from '../FileUpload'
import AlertContainer from '../Alerts/AlertContainer'
import { useState } from 'react'
import LinkAlert from '../Alerts/LinkAlert'
import axios from 'axios'
import UploadModal from '../Modals/UploadModal'
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
  const [uploadModal, setUploadModal] = useState(false)
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: pact,
    abi: contractAbi,
    functionName: 'pact',
    args: [cid, address, 1679784613],
  })
  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  })
  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files)
    var formData = new FormData()
    for (let key in files) {
      formData.append('file' + key, files[key])
    }
    axios
      .post('/api/ipfs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        setCid(response.data.path)
        console.log(cid)
        setUploadModal(true)
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(function () {})
  }
  const handleCloseUploadModal = () => {
    setUploadModal(false)
  }

  return (
    <>
      <Flex align="center" justify="center" marginTop={4}>
        <FileUpload handleFilesSelected={handleFilesSelected} />
        <UploadModal isOpen={uploadModal} onClose={handleCloseUploadModal} />
        <Button
          isLoading={isLoading}
          disabled={!write || isLoading || !cid}
          onClick={write}
          ml={2}
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

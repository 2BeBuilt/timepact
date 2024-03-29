import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { pact } from '@/utils/constants/addresses'

import contractAbi from '@/utils/constants/abiTimePact.json'
import FileUpload from '@/components/FileUpload'
import AlertContainer from '@/components/Alerts/AlertContainer'
import LinkAlert from '@/components/Alerts/LinkAlert'
import axios from 'axios'
import UploadModal from '@/components/Modals/UploadModal'

export default function SignPact({ address }) {
  const [date, setDate] = useState(null)
  const [fDate, setFDate] = useState(null)
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
    args: [cid, address, date],
  })
  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  })
  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files)
    var formData = new FormData()
    for (let key in files) {
      formData.append('data', files[key])
    }
    axios
      .post(`/api/ipfs/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        setCid(response.data.path)
        setUploadModal(true)
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(function () {})
  }
  const handleDateChange = (e) => {
    const date = new Date(e.target.value).getTime()
    setFDate(date)
  }
  const handleCloseUploadModal = () => {
    axios.get(`/api/date/parse?stamp=${fDate}`).then((response) => {
      setDate(response.data)
    })
    setUploadModal(false)
  }
  return (
    <>
      <Flex direction="column" align="center" justify="center" marginTop={4}>
        <FileUpload handleFilesSelected={handleFilesSelected} />
        {!(date && cid) ? (
          <UploadModal
            isOpen={uploadModal}
            onClose={handleCloseUploadModal}
            handleDateChange={handleDateChange}
          />
        ) : (
          <>
            <Button
              isLoading={isLoading}
              disabled={!write || isLoading}
              onClick={write}
              mt={2}
            >
              Sign Pact
            </Button>
          </>
        )}
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

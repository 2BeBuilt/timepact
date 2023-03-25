import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import contractAbi from '@/utils/constants/abiTimePact.json'
import { Button, Flex, Text } from '@chakra-ui/react'
import { pact } from '@/utils/constants/addresses'
import FileUpload from '../FileUpload'
import AlertContainer from '../Alerts/AlertContainer'
import { useState } from 'react'
import LinkAlert from '../Alerts/LinkAlert'
import axios from 'axios'
import UploadModal from '../Modals/UploadModal'

export default function SignPact({ address }) {
  const [date, setDate] = useState(null)
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
        console.log(response)
        setUploadModal(true)
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(function () {})
  }
  const handleDateChange = (e) => {
    const fDate = new Date(e.target.value).getTime()
    console.log(fDate)
    axios.get(`/api/date/parse?stamp=${fDate}`).then((response) => {
      console.log(typeof response.data)
      setDate(response.data)
    })
  }
  const handleCloseUploadModal = () => {
    setUploadModal(false)
  }
  return (
    <>
      <Flex align="center" justify="center" marginTop={4}>
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
              ml={2}
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

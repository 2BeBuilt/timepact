import FileUpload from '@/components/FileUpload'
import { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import SignPact from '@/components/contracts/SignPact'
import DefaultAlert from '@/components/Alerts/DefaultAlert'

export default function Sign() {
  const [data, setData] = useState(null)
  const handleUpload = () => {
    console.log('Ok')
  }
  const handleSuccess = (data) => {
    setData(data)
  }
  return (
    <>
      <main>
        <Flex align="center" justify="center" marginTop="50vh">
          {data && (
            <DefaultAlert
              status="success"
              title="Pact was signed"
              description={`https://hyperspace.filfox.info/en/tx/${data?.hash}`}
            />
          )}
          <FileUpload onUpload={handleUpload} />
          <SignPact onSuccess={handleSuccess} />
        </Flex>
      </main>
    </>
  )
}

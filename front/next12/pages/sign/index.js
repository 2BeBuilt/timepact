import FileUpload from '@/components/FileUpload'
import { useState } from 'react'
import { Flex, Input } from '@chakra-ui/react'
import SignPact from '@/components/contracts/SignPact'

import { useAccount, useNetwork } from 'wagmi'
import PageAlerts from '@/components/Alerts/PageAlerts'

export default function Sign() {
  const { address, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  const handleUpload = () => {
    console.log('Ok')
  }

  const [cid, setCid] = useState('')
  return (
    <main>
      <PageAlerts chain={chain} isDisconnected={isDisconnected} />
      {!isDisconnected && (
        <Flex align="center" justify="center" marginTop={4}>
          <Input
            visibility={!isDisconnected}
            placeholder="Cid"
            width="400px"
            mr={2}
            onChange={(e) => {
              setCid(e.target.value)
            }}
            value={cid}
          />
          <SignPact address={address} cid={cid} />
        </Flex>
      )}
    </main>
  )
}

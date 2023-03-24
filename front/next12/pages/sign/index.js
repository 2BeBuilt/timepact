import FileUpload from '@/components/FileUpload'
import { useState } from 'react'
import { Flex, Input } from '@chakra-ui/react'
import SignPact from '@/components/contracts/SignPact'
import AlertContainer from '@/components/Alerts/AlertContainer'
import DefaultAlert from '@/components/Alerts/DefaultAlert'
import { useAccount, useNetwork } from 'wagmi'
import PageAlerts from '@/components/Alerts/PageAlerts'

export default function Sign() {
  const { address, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  const handleUpload = () => {
    console.log('Ok')
  }
  return (
    <main>
      {/*TODO wrong chain handler*/}
      {!isDisconnected && (
        <>
          <SignPact address={address} />
        </>
      )}
      <PageAlerts chain={chain} isDisconnected={isDisconnected} />
    </main>
  )
}
